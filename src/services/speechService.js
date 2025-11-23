import { SPEECH_LANGUAGE_CODES } from '../constants/languages'

class SpeechService {
  constructor() {
    this.recognition = null
    this.synthesis = window.speechSynthesis
    this.isListening = false
    this.voices = []
    this.voicesLoaded = false
    
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      this.recognition = new SpeechRecognition()
      this.recognition.continuous = false
      this.recognition.interimResults = true
      this.recognition.maxAlternatives = 1
    }

    // Load voices
    this.loadVoices()
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = () => this.loadVoices()
    }
  }

  loadVoices() {
    this.voices = this.synthesis.getVoices()
    this.voicesLoaded = this.voices.length > 0
  }

  // Start listening
  startListening(language = 'en-US', onResult, onError) {
    if (!this.recognition) {
      onError?.(new Error('Speech recognition not supported in this browser'))
      return
    }

    this.recognition.lang = language
    this.isListening = true

    this.recognition.onresult = (event) => {
      const results = event.results
      const transcript = results[results.length - 1][0].transcript
      const isFinal = results[results.length - 1].isFinal
      
      onResult?.({ transcript, isFinal })
    }

    this.recognition.onerror = (event) => {
      this.isListening = false
      onError?.(event.error)
    }

    this.recognition.onend = () => {
      this.isListening = false
    }

    try {
      this.recognition.start()
    } catch (error) {
      console.error('Error starting recognition:', error)
      onError?.(error)
    }
  }

  // Stop listening
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
      this.isListening = false
    }
  }

  // Speak text
  speak(text, language = 'en-US', onEnd, onError) {
    if (!this.synthesis) {
      onError?.(new Error('Speech synthesis not supported'))
      return
    }

    // Cancel any ongoing speech
    this.synthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language
    utterance.rate = 0.9 // Slightly slower for learning
    utterance.pitch = 1.0
    utterance.volume = 1.0

    // Find appropriate voice for language
    const voice = this.voices.find(v => v.lang.startsWith(language.split('-')[0]))
    if (voice) {
      utterance.voice = voice
    }

    utterance.onend = () => {
      onEnd?.()
    }

    utterance.onerror = (event) => {
      onError?.(event.error)
    }

    this.synthesis.speak(utterance)
  }

  // Stop speaking
  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel()
    }
  }

  // Check if speech recognition is supported
  isSpeechRecognitionSupported() {
    return !!this.recognition
  }

  // Check if speech synthesis is supported
  isSpeechSynthesisSupported() {
    return !!this.synthesis
  }

  // Get language code for speech APIs
  getLanguageCode(languageKey) {
    return SPEECH_LANGUAGE_CODES[languageKey] || 'en-US'
  }
}

export default new SpeechService()

