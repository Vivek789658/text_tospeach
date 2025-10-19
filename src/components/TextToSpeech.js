import React, { useState, useEffect, useRef } from 'react';
import './TextToSpeech.css';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState('');
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [volume, setVolume] = useState(1);
    const [language, setLanguage] = useState('auto');
    const [isSupported, setIsSupported] = useState(false);

    const utteranceRef = useRef(null);

    // Check for speech synthesis support
    useEffect(() => {
        if ('speechSynthesis' in window) {
            setIsSupported(true);
            loadVoices();
        } else {
            setIsSupported(false);
        }
    }, []);

    // Load available voices
    const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);

        // Set default voice (prefer English or Hindi)
        const englishVoice = availableVoices.find(voice =>
            voice.lang.startsWith('en') && voice.name.includes('Google')
        );
        const hindiVoice = availableVoices.find(voice =>
            voice.lang.startsWith('hi') && voice.name.includes('Google')
        );

        if (hindiVoice) {
            setSelectedVoice(hindiVoice.name);
        } else if (englishVoice) {
            setSelectedVoice(englishVoice.name);
        } else if (availableVoices.length > 0) {
            setSelectedVoice(availableVoices[0].name);
        }
    };

    // Reload voices when they become available
    useEffect(() => {
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    // Detect language of the text
    const detectLanguage = (text) => {
        // Simple language detection based on character patterns
        const hindiPattern = /[\u0900-\u097F]/;
        const englishPattern = /[a-zA-Z]/;

        const hasHindi = hindiPattern.test(text);
        const hasEnglish = englishPattern.test(text);

        if (hasHindi && hasEnglish) {
            return 'mixed';
        } else if (hasHindi) {
            return 'hi';
        } else if (hasEnglish) {
            return 'en';
        }
        return 'en';
    };


    const getVoiceForText = (text) => {
        const detectedLang = detectLanguage(text);
        const availableVoices = speechSynthesis.getVoices();

        if (detectedLang === 'hi' || detectedLang === 'mixed') {

            const hindiVoice = availableVoices.find(voice =>
                voice.lang.startsWith('hi') && voice.name.includes('Google')
            );
            if (hindiVoice) return hindiVoice;
        }


        const selectedVoiceObj = availableVoices.find(voice => voice.name === selectedVoice);
        return selectedVoiceObj || availableVoices[0];
    };


    const speak = () => {
        if (!text.trim()) {
            alert('Please enter some text to speak');
            return;
        }

        if (isPlaying) {
            speechSynthesis.cancel();
            setIsPlaying(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        const voice = getVoiceForText(text);

        if (voice) {
            utterance.voice = voice;
        }

        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;

        utterance.onstart = () => {
            setIsPlaying(true);
        };

        utterance.onend = () => {
            setIsPlaying(false);
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            setIsPlaying(false);
            alert('Error occurred while speaking. Please try again.');
        };

        utteranceRef.current = utterance;
        speechSynthesis.speak(utterance);
    };


    const stop = () => {
        speechSynthesis.cancel();
        setIsPlaying(false);
    };


    const pause = () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.pause();
        } else if (speechSynthesis.paused) {
            speechSynthesis.resume();
        }
    };


    const clearText = () => {
        setText('');
        if (isPlaying) {
            stop();
        }
    };


    const sampleTexts = [
        "Hello, this is a test of English text to speech.",
        "नमस्ते, यह हिंदी टेक्स्ट टू स्पीच का टेस्ट है।",
        "Hello नमस्ते, this is a mixed language test.",
        "Welcome to our multilingual text to speech application."
    ];

    const loadSampleText = (sampleText) => {
        setText(sampleText);
    };

    if (!isSupported) {
        return (
            <div className="tts-container">
                <div className="error-message">
                    <h2>❌ Speech Synthesis Not Supported</h2>
                    <p>Your browser doesn't support the Web Speech API. Please use a modern browser like Chrome, Firefox, or Safari.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="tts-container">
            <div className="tts-card">
                <h2>🎯 Text to Speech Converter</h2>


                <div className="input-section">
                    <label htmlFor="text-input">Enter your text:</label>
                    <textarea
                        id="text-input"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type your text here... You can mix Hindi and English: नमस्ते Hello, how are you? आप कैसे हैं?"
                        rows="6"
                        className="text-input"
                    />
                </div>


                <div className="sample-texts">
                    <h3>Try these sample texts:</h3>
                    <div className="sample-buttons">
                        {sampleTexts.map((sample, index) => (
                            <button
                                key={index}
                                onClick={() => loadSampleText(sample)}
                                className="sample-btn"
                            >
                                {sample.length > 30 ? sample.substring(0, 30) + '...' : sample}
                            </button>
                        ))}
                    </div>
                </div>


                <div className="voice-controls">
                    <div className="control-group">
                        <label htmlFor="voice-select">Voice:</label>
                        <select
                            id="voice-select"
                            value={selectedVoice}
                            onChange={(e) => setSelectedVoice(e.target.value)}
                            className="voice-select"
                        >
                            {voices.map((voice, index) => (
                                <option key={index} value={voice.name}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="control-group">
                        <label htmlFor="rate-slider">Speed: {rate.toFixed(1)}x</label>
                        <input
                            id="rate-slider"
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(parseFloat(e.target.value))}
                            className="slider"
                        />
                    </div>

                    <div className="control-group">
                        <label htmlFor="pitch-slider">Pitch: {pitch.toFixed(1)}</label>
                        <input
                            id="pitch-slider"
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={pitch}
                            onChange={(e) => setPitch(parseFloat(e.target.value))}
                            className="slider"
                        />
                    </div>

                    <div className="control-group">
                        <label htmlFor="volume-slider">Volume: {Math.round(volume * 100)}%</label>
                        <input
                            id="volume-slider"
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="slider"
                        />
                    </div>
                </div>


                <div className="action-buttons">
                    <button
                        onClick={speak}
                        className={`action-btn ${isPlaying ? 'stop' : 'play'}`}
                        disabled={!text.trim()}
                    >
                        {isPlaying ? '⏹️ Stop' : '▶️ Speak'}
                    </button>

                    <button
                        onClick={pause}
                        className="action-btn pause"
                        disabled={!text.trim()}
                    >
                        ⏸️ Pause/Resume
                    </button>

                    <button
                        onClick={clearText}
                        className="action-btn clear"
                    >
                        🗑️ Clear
                    </button>
                </div>


                {text && (
                    <div className="language-info">
                        <p>
                            <strong>Detected Language:</strong> {
                                detectLanguage(text) === 'mixed' ? 'Mixed (Hindi + English)' :
                                    detectLanguage(text) === 'hi' ? 'Hindi' :
                                        detectLanguage(text) === 'en' ? 'English' : 'Unknown'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextToSpeech;
