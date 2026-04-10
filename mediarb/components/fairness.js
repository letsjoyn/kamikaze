export function giniCoefficient(values) {
    const sanitized = values
        .map((v) => (Number.isFinite(v) ? Math.max(v, 0) : 0))
        .sort((a, b) => a - b);

    const n = sanitized.length;
    if (n === 0) return 0;

    const sum = sanitized.reduce((acc, v) => acc + v, 0);
    if (sum === 0) return 0;

    let cumulativeWeighted = 0;
    for (let i = 0; i < n; i += 1) {
        cumulativeWeighted += (i + 1) * sanitized[i];
    }

    const gini = (2 * cumulativeWeighted) / (n * sum) - (n + 1) / n;
    return +gini.toFixed(4);
}
