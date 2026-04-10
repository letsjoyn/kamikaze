const CLAUDE_ENDPOINT = "https://api.anthropic.com/v1/messages";
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

function buildPrompt(winner, rejected, method, cis, resource) {
    return `You are MediArb, a hospital resource conflict resolver.
A conflict for resource: "${resource}" has been resolved.

Resolution method: ${method} (Conflict Intensity Score: ${cis}/100)

WINNER: ${winner.name} (${winner.dept}, ${winner.rank})
- Urgency: ${winner.urgency}/10
- Severity: ${winner.severity}/10
- Wait time: ${winner.waitHrs}h
- Patient age: ${winner.age}
- Diagnosis: ${winner.diagnosis}
- Composite score: ${winner.total}

REJECTED CLAIMANTS:
${rejected.map((r) => `- ${r.name}: score ${r.total}, urgency ${r.urgency}, diagnosis ${r.diagnosis}`).join("\n")}

Write a 3-sentence clinical verdict explaining:
1. Why ${winner.name} was allocated the resource
2. Why each rejected claimant was not selected
3. What the next steps are for rejected claimants

Be direct, medical, and transparent. No fluff.`;
}

async function callClaude(prompt, apiKey) {
    const response = await fetch(CLAUDE_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 300,
            messages: [{ role: "user", content: prompt }],
        }),
    });

    if (!response.ok) {
        throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    return data?.content?.[0]?.text?.trim() || "";
}

async function callGemini(prompt, apiKey) {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
            generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 300,
            },
        }),
    });

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
}

export async function getAIVerdict(winner, rejected, method, cis, resource) {
    const prompt = buildPrompt(winner, rejected, method, cis, resource);
    const apiKey = window.MEDIARB_AI_API_KEY || "";
    const provider = (window.MEDIARB_AI_PROVIDER || "gemini").toLowerCase();

    if (!apiKey) {
        return `Under ${method}, ${winner.name} was allocated ${resource} based on the strongest combined urgency, severity, and wait-time profile. Rejected claimants had comparatively lower composite priority at this conflict level, so they were deferred. They remain in the queue with monitored ETA updates and escalation if clinical risk rises.`;
    }

    try {
        if (provider === "claude") {
            return await callClaude(prompt, apiKey);
        }
        return await callGemini(prompt, apiKey);
    } catch (_) {
        return `Under ${method}, ${winner.name} was allocated ${resource} based on the strongest combined urgency, severity, and wait-time profile. Rejected claimants had comparatively lower composite priority at this conflict level, so they were deferred. They remain in the queue with monitored ETA updates and escalation if clinical risk rises.`;
    }
}
