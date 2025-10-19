import React from 'react';
import TextToSpeech from './components/TextToSpeech';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>🎤 Multilingual Text to Speech</h1>
                <p>Convert your text to speech in multiple languages</p>
            </header>
            <main>
                <TextToSpeech />
            </main>
        </div>
    );
}

export default App;
