export function isVoiceSupported() {
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function startVoiceInput({ onResult, onError, onEnd, lang = "en-IN" }) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        if (typeof onError === "function") {
            onError(new Error("Speech recognition not supported in this browser."));
        }
        return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript || "";
        if (typeof onResult === "function") {
            onResult(transcript.trim());
        }
    };

    recognition.onerror = (event) => {
        if (typeof onError === "function") {
            onError(new Error(event.error || "voice_error"));
        }
    };

    recognition.onend = () => {
        if (typeof onEnd === "function") {
            onEnd();
        }
    };

    recognition.start();
    return recognition;
}
