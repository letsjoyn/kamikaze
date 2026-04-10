const CLAUDE_ENDPOINT = "https://api.anthropic.com/v1/messages";

export async function getClaudeVerdict(context, fallbackText) {
    const apiKey = window.MEDIARB_CLAUDE_API_KEY;
    if (!apiKey) {
        return {
            text: fallbackText,
            source: "local-fallback",
        };
    }

    try {
        const response = await fetch(CLAUDE_ENDPOINT, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 220,
                temperature: 0.2,
                messages: [
                    {
                        role: "user",
                        content: `Write a clinical, concise conflict resolution verdict for hospital resource allocation. Context: ${JSON.stringify(context)}`,
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`Claude API error: ${response.status}`);
        }

        const data = await response.json();
        const text = data?.content?.[0]?.text?.trim();

        return {
            text: text || fallbackText,
            source: text ? "claude" : "local-fallback",
        };
    } catch (_) {
        return {
            text: fallbackText,
            source: "local-fallback",
        };
    }
}
