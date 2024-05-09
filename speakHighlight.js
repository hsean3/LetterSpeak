function speakAndHighlight() {
    const text = document.getElementById('letterInput').value;
    const textDisplay = document.getElementById('textDisplay');
    textDisplay.innerHTML = ''; // Clear previous content

    const speech = new SpeechSynthesisUtterance(text);
    let charIndex = 0; // To keep track of the character index

    // Event listener for the 'boundary' event to highlight letters
    speech.onboundary = function(event) {
        if (event.name === 'word') {
            const word = text.slice(event.charIndex, event.charIndex + event.charLength);
            const before = text.slice(0, event.charIndex);
            const after = text.slice(event.charIndex + event.charLength);

            // Update the display with highlighted word
            textDisplay.innerHTML = escapeHtml(before) + '<span class="highlight">' + escapeHtml(word) + '</span>' + escapeHtml(after);
        }
    };

    window.speechSynthesis.speak(speech);
}

function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
