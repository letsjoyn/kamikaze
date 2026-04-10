const RESOURCE_CRITICALITY = {
    "ICU Bed": 1,
    Ventilator: 1,
    "OT Slot": 0.85,
    "MRI Scanner": 0.65,
    "Blood Bank": 0.9,
};

export function computeScore(doctor) {
    const urgScore = (doctor.urgency / 10) * 45;
    const waitScore = (Math.min(doctor.waitHrs, 12) / 12) * 25;
    const sevScore = (doctor.severity / 10) * 20;
    const ageRisk = doctor.age > 65 ? 10 : doctor.age > 50 ? 7 : doctor.age < 5 ? 9 : 5;
    const ageScore = (ageRisk / 10) * 10;

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

export function detectEdgeCases(doctors) {
    const edges = [];

    doctors.forEach((d) => {
        if (!d.urgency || d.urgency < 1 || d.urgency > 10) {
            edges.push(`${d.name}: urgency out of valid range (${d.urgency})`);
        }
        if (!d.severity || d.severity < 1) {
            edges.push(`${d.name}: missing severity - using default (7)`);
        }
        if (d.urgency >= 9 && d.severity <= 3) {
            edges.push(`${d.name}: contradiction - urgency ${d.urgency} but severity ${d.severity}. Flagged for review.`);
        }
        if (!d.age || d.age < 1) {
            edges.push(`${d.name}: invalid patient age - using actuarial default`);
        }
    });

    const scores = doctors.map((d) => computeScore(d).total);
    const unique = new Set(scores);
    if (unique.size < scores.length) {
        edges.push("Tie detected in weighted scores - escalation protocol activated");
    }

    return edges;
}

export function getResolutionMethod(cis) {
    if (cis < 40) return "Consensus";
    if (cis < 75) return "Weighted Scoring";
    return "Triage Protocol";
}

export function generateVerdict(winner, method, cis) {
    const reasons = {
        Consensus: `Under consensus scoring (CIS ${cis} - low conflict), ${winner.name}'s request was processed first with the highest urgency score, satisfying first-come-first-served protocol.`,
        "Weighted Scoring": `Under weighted scoring (CIS ${cis} - medium conflict), a multi-factor formula applied: urgency x45%, wait time x25%, severity x20%, age risk x10%. ${winner.name} achieved the highest composite score of ${computeScore(winner).total.toFixed(1)}.`,
        "Triage Protocol": `Under SALT/START triage protocol (CIS ${cis} - HIGH conflict), strict medical priority rules were applied. ${winner.name}'s patient presents the most critical immediate risk: urgency ${winner.urgency}/10, severity ${winner.severity}/10, with ${winner.waitHrs}h wait time accumulated.`,
    };

    return reasons[method] || "";
}

export function resolveConflict(doctors, method) {
    const scored = doctors.map((d, index) => ({ ...d, reqOrder: index, ...computeScore(d) }));

    if (method === "Consensus") {
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
