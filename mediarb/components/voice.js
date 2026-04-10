export function isVoiceSupported() {
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function initVoice(doctorId, state, renderDoctors, addLog) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Voice not supported in this browser. Use Chrome.");
        return null;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.lang = "en-IN";
    rec.interimResults = false;

    rec.onresult = (e) => {
        const transcript = (e.results?.[0]?.[0]?.transcript || "").toLowerCase();
        const d = state.doctors.find((x) => x.id === doctorId);
        if (!d) return;

        const urgMatch = transcript.match(/urgency?\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)/);
        if (urgMatch) {
            const wordMap = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
            d.urgency = parseInt(urgMatch[1], 10) || wordMap[urgMatch[1]] || d.urgency;
        }

        const waitMatch = transcript.match(/wait(?:ing|ed)?\s*(\d+)/);
        if (waitMatch) d.waitHrs = parseInt(waitMatch[1], 10);

        const sevMatch = transcript.match(/severity\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)/);
        if (sevMatch) {
            const wordMap = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
            d.severity = parseInt(sevMatch[1], 10) || wordMap[sevMatch[1]] || d.severity;
        }

        const ageMatch = transcript.match(/age\s*(\d{1,3})/);
        if (ageMatch) d.age = parseInt(ageMatch[1], 10);

        if (transcript.includes("cardiac") || transcript.includes("heart")) d.diagnosis = "Cardiac Arrest";
        if (transcript.includes("sepsis") || transcript.includes("septic")) d.diagnosis = "Septic Shock";
        if (transcript.includes("trauma")) d.diagnosis = "Multi-organ Failure";
        if (transcript.includes("stroke")) d.diagnosis = "Stroke";

        d.urgency = Math.min(10, Math.max(1, Number(d.urgency) || 1));
        d.waitHrs = Math.min(12, Math.max(0, Number(d.waitHrs) || 0));
        d.severity = Math.min(10, Math.max(1, Number(d.severity) || 1));
        d.age = Math.min(110, Math.max(1, Number(d.age) || 1));

        renderDoctors();
        addLog(`Voice input parsed for ${d.name}: "${transcript}"`, "green");
    };

    rec.onerror = (e) => addLog(`Voice error: ${e.error}`, "amber");
    rec.start();
    addLog(`Voice input activated for Doctor ${doctorId}`, "default");

    return rec;
}
