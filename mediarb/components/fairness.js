export function computeGini(scores) {
        if (scores.length < 2) return 0;
        const sorted = [...scores].sort((a, b) => a - b);
        const n = sorted.length;
        const mean = sorted.reduce((a, b) => a + b, 0) / n;
        if (mean === 0) return 0;
        let numerator = 0;
        for (let i = 0; i < n; i += 1) {
                for (let j = 0; j < n; j += 1) {
                        numerator += Math.abs(sorted[i] - sorted[j]);
                }
        }
        return +(numerator / (2 * n * n * mean)).toFixed(3);
}

export function renderFairnessPanel(scored) {
        const gini = computeGini(scored.map((d) => d.total));
        const fairness = ((1 - gini) * 100).toFixed(1);
        const color = fairness > 70 ? "var(--green)" : fairness > 40 ? "var(--amber)" : "var(--red)";

        return `
        <div class="panel fade-in">
            <div class="panel-header">
                <div class="panel-title">Fairness metric</div>
                <div style="font-size:11px;color:var(--t3)">Gini coefficient: ${gini}</div>
            </div>
            <div class="panel-body">
                <div style="display:flex;align-items:flex-end;gap:12px;margin-bottom:8px">
                    <div style="font-size:36px;font-weight:300;font-family:'DM Mono',monospace;color:${color}">${fairness}%</div>
                    <div style="font-size:12px;color:var(--t2);margin-bottom:6px">
                        ${fairness > 70 ? "Fair distribution" : fairness > 40 ? "Moderate imbalance" : "High imbalance - review required"}
                    </div>
                </div>
                <div style="height:3px;background:var(--s4);border-radius:2px;overflow:hidden">
                    <div style="height:100%;width:${fairness}%;background:${color};border-radius:2px;transition:width 0.8s cubic-bezier(0.4,0,0.2,1)"></div>
                </div>
                <div style="font-size:11px;color:var(--t3);margin-top:6px">
                    Lower Gini = more equal scoring. 0 = perfect equality, 1 = maximum inequality.
                </div>
            </div>
        </div>
    `;
}

export function giniCoefficient(values) {
        return computeGini(values);
}
