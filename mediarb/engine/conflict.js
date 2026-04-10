const RESOURCE_CRITICALITY = {
    "ICU Bed": 1,
    Ventilator: 1,
    "OT Slot": 0.85,
    "MRI Scanner": 0.65,
    "Blood Bank": 0.9,
};

const DEFAULT_WEIGHTS = {
    urgency: 45,
    wait: 25,
    severity: 20,
    age: 10,
};

function normalizeWeights(weights = DEFAULT_WEIGHTS) {
    const safe = {
        urgency: Math.max(0, Number(weights.urgency) || 0),
        wait: Math.max(0, Number(weights.wait) || 0),
        severity: Math.max(0, Number(weights.severity) || 0),
        age: Math.max(0, Number(weights.age) || 0),
    };
    const total = safe.urgency + safe.wait + safe.severity + safe.age;
    if (total === 0) return { ...DEFAULT_WEIGHTS };
    return {
        urgency: (safe.urgency / total) * 100,
        wait: (safe.wait / total) * 100,
        severity: (safe.severity / total) * 100,
        age: (safe.age / total) * 100,
    };
}

export function computeScore(doctor, weights = DEFAULT_WEIGHTS) {
    const normalized = normalizeWeights(weights);
    const urgScore = (doctor.urgency / 10) * normalized.urgency;
    const waitScore = (Math.min(doctor.waitHrs, 12) / 12) * normalized.wait;
    const sevScore = (doctor.severity / 10) * normalized.severity;
    const ageRisk = doctor.age > 65 ? 10 : doctor.age > 50 ? 7 : doctor.age < 5 ? 9 : 5;
    const ageScore = (ageRisk / 10) * normalized.age;

    return {
        total: +(urgScore + waitScore + sevScore + ageScore).toFixed(2),
        urgScore: +urgScore.toFixed(2),
        waitScore: +waitScore.toFixed(2),
        sevScore: +sevScore.toFixed(2),
        ageScore: +ageScore.toFixed(2),
    };
}

export function computeCIS(doctors, resourceType) {
    const urgencies = doctors.map((d) => d.urgency);
    const maxUrgGap = Math.max(...urgencies) - Math.min(...urgencies);
    const nFactor = Math.min((doctors.length - 1) / 5, 1) * 30;
    const gapFactor = (maxUrgGap / 9) * 35;
    const critFactor = (RESOURCE_CRITICALITY[resourceType] || 0.8) * 20;
    const maxWait = Math.max(...doctors.map((d) => d.waitHrs));
    const waitFactor = Math.min(maxWait / 12, 1) * 15;

    return Math.min(Math.round(nFactor + gapFactor + critFactor + waitFactor), 100);
}

export function detectEdgeCases(doctors, weights = DEFAULT_WEIGHTS) {
    const edges = [];

    doctors.forEach((d) => {
        if (!d.urgency || d.urgency < 1 || d.urgency > 10) {
            edges.push(`${d.name}: urgency out of valid range (${d.urgency})`);
        }
        if (!d.severity || d.severity < 1 || d.severity > 10) {
            edges.push(`${d.name}: missing severity - using default (7)`);
        }
        if (d.urgency >= 9 && d.severity <= 3) {
            edges.push(`${d.name}: contradiction - urgency ${d.urgency} but severity ${d.severity}. Flagged for review.`);
        }
        if (!d.age || d.age < 1 || d.age > 110) {
            edges.push(`${d.name}: invalid patient age - using actuarial default`);
        }
    });

    const scores = doctors.map((d) => computeScore(d, weights).total);
    const unique = new Set(scores);
    if (unique.size < scores.length) {
        edges.push("Tie detected in weighted scores - escalation protocol activated");
    }

    return edges;
}

export function getResolutionMethod(cis) {
    if (cis < 40) return "FIFO + Urgency";
    if (cis < 75) return "Weighted Scoring";
    return "Triage Protocol";
}

export function generateVerdict(winner, method, cis, weights = DEFAULT_WEIGHTS) {
    const normalized = normalizeWeights(weights);
    const urgencyW = normalized.urgency.toFixed(1);
    const waitW = normalized.wait.toFixed(1);
    const severityW = normalized.severity.toFixed(1);
    const ageW = normalized.age.toFixed(1);
    const reasons = {
        "FIFO + Urgency": `Under FIFO + urgency scoring (CIS ${cis} - low conflict), ${winner.name}'s request was prioritized by request order with urgency tie-break support.`,
        "Weighted Scoring": `Under weighted scoring (CIS ${cis} - medium conflict), a multi-factor formula applied: urgency x${urgencyW}%, wait time x${waitW}%, severity x${severityW}%, age risk x${ageW}%. ${winner.name} achieved the highest composite score of ${computeScore(winner, weights).total.toFixed(1)}.`,
        "Triage Protocol": `Under SALT/START triage protocol (CIS ${cis} - HIGH conflict), strict medical priority rules were applied. ${winner.name}'s patient presents the most critical immediate risk: urgency ${winner.urgency}/10, severity ${winner.severity}/10, with ${winner.waitHrs}h wait time accumulated.`,
    };

    return reasons[method] || "";
}

export function resolveConflict(doctors, method, options = {}) {
    const { weights = DEFAULT_WEIGHTS, dominanceMap = {}, dominancePenaltyStep = 2, dominancePenaltyCap = 12 } = options;
    const scored = doctors.map((d, index) => {
        const base = computeScore(d, weights);
        const wins = dominanceMap[d.name] || 0;
        const dominancePenalty = Math.min(wins * dominancePenaltyStep, dominancePenaltyCap);
        const adjustedTotal = Math.max(0, +(base.total - dominancePenalty).toFixed(2));
        return {
            ...d,
            reqOrder: index,
            ...base,
            baseTotal: base.total,
            dominancePenalty,
            total: adjustedTotal,
        };
    });

    if (method === "FIFO + Urgency") {
        scored.sort((a, b) => {
            if (a.reqOrder !== b.reqOrder) return a.reqOrder - b.reqOrder;
            return b.urgency - a.urgency;
        });
    } else {
        scored.sort((a, b) => b.total - a.total);
    }

    if (scored.length >= 2 && scored[0].total === scored[1].total) {
        const rankOrder = { Attending: 0, "Senior Resident": 1, "Junior Resident": 2 };
        scored.sort((a, b) => (rankOrder[a.rank] || 3) - (rankOrder[b.rank] || 3));
    }

    return {
        winner: scored[0],
        rejected: scored.slice(1),
        scored,
    };
}
