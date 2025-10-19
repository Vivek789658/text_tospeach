# 🎤 Multilingual Text to Speech Web Application

A modern React.js web application that converts text to speech with support for multiple languages, including Hindi and English mixed text.

## ✨ Features

- **Multilingual Support**: Automatically detects and handles Hindi, English, and mixed language text
- **Voice Selection**: Choose from available system voices
- **Voice Controls**: Adjust speed, pitch, and volume
- **Modern UI**: Beautiful, responsive design with glassmorphism effects
- **Real-time Language Detection**: Shows detected language for the input text
- **Sample Texts**: Pre-loaded sample texts for testing different languages
- **Browser Compatibility**: Works with modern browsers that support Web Speech API

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone or download the project files**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## 🎯 How to Use

1. **Enter Text**: Type or paste your text in the text area. You can mix Hindi and English text.
2. **Select Voice**: Choose from available voices in the dropdown menu.
3. **Adjust Settings**: Use the sliders to control speed, pitch, and volume.
4. **Speak**: Click the "Speak" button to convert text to speech.
5. **Control Playback**: Use Stop, Pause/Resume, and Clear buttons as needed.

## 🌐 Supported Languages

- **English**: Full support with multiple voice options
- **Hindi**: Support for Hindi text and voices
- **Mixed Text**: Automatic detection and appropriate voice selection for Hindi-English mixed content

## 🎨 Sample Texts

The application includes sample texts to test different language combinations:

- English: "Hello, this is a test of English text to speech."
- Hindi: "नमस्ते, यह हिंदी टेक्स्ट टू स्पीच का टेस्ट है।"
- Mixed: "Hello नमस्ते, this is a mixed language test."

## 🔧 Technical Details

### Technologies Used

- **React.js**: Frontend framework
- **Web Speech API**: Browser-native text-to-speech functionality
- **CSS3**: Modern styling with gradients and animations
- **JavaScript ES6+**: Modern JavaScript features

### Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ❌ Internet Explorer (not supported)

### Voice Requirements

- The application uses system voices available on your device
- For best results with Hindi text, ensure your system has Hindi voices installed
- Google Chrome typically provides the best voice quality and language support

## 🎵 Voice Controls

- **Speed**: Adjust speaking rate (0.5x to 2x)
- **Pitch**: Control voice pitch (0.5 to 2.0)
- **Volume**: Set output volume (0% to 100%)
- **Voice Selection**: Choose from available system voices

## 🐛 Troubleshooting

### Common Issues

1. **No voices available**: Ensure your browser supports Web Speech API
2. **Poor Hindi pronunciation**: Try different voice options or install Hindi language packs
3. **Audio not playing**: Check browser permissions and system audio settings
4. **Slow performance**: Close other browser tabs and applications

### Browser Permissions

Make sure your browser allows:
- Audio playback
- Microphone access (if required by browser)
- JavaScript execution

## 📱 Mobile Support

The application is fully responsive and works on mobile devices, though voice quality may vary depending on the device and browser.

## 🔮 Future Enhancements

- Support for more languages
- Voice recording and download
- Custom voice training
- Batch text processing
- Voice cloning capabilities



## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

---

**Note**: This application uses the Web Speech API, which is supported by most modern browsers. For the best experience, use Google Chrome with a stable internet connection.
