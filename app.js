document.getElementById('letterInput').addEventListener('input', function(e) {
    const text = e.target.value;
    const lastChar = text.slice(-1);
    speak(lastChar.toUpperCase());


    if (text === 'maui') {
        showImage('maui.png');  // Assume this is the correct path to Maui's image
    } else if (text === 'panda') {
        showImage('panda.jpg');  // Assume this is the correct path to Panda's image
    } else if (text === 'turtle') {
        showImage('oogway.jpg');  // Assume this is the correct path to Oogway's image
    } else {
        hideImage();
    }
});



function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    let voiceSelect = document.getElementById('voiceSelect')
    let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    let voices = speechSynthesis.getVoices();
    const textDisplay = document.getElementById('textDisplay');


    // Choose a voice; this example arbitrarily picks one, you can add logic to choose based on name or attributes
    speech.voice = voices.find(voice => voice.name === selectedOption);

    // Optional: Set pitch and rate to make it sound less robotic
    speech.pitch = 1; // Range between 0 and 2
    speech.rate = 1;  // Range between 0.1 and 10

    window.speechSynthesis.speak(speech);

 
    };




function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
        return;
    }

    let select = document.getElementById('voiceSelect');
    let voices = speechSynthesis.getVoices();

    // Log voices to the console or create a UI to allow users to choose
    select.innerHTML = '';
    voices.forEach((voice, index) => {
        let option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        select.appendChild(option);
    });
}

// Wait for the 'voiceschanged' event to ensure voices are loaded
speechSynthesis.onvoiceschanged = populateVoiceList;
function showImage(src) {
    const image = document.getElementById('imageDisplay');
    image.src = src;
    image.style.display = 'block';
}

function hideImage() {
    const image = document.getElementById('imageDisplay');
    image.style.display = 'none';
}
