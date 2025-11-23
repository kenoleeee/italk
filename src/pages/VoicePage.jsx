import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLearningLanguage } from '../hooks/useLearningLanguage'
import { useLanguageLevel } from '../hooks/useLanguageLevel'
import { usePracticeTracker } from '../hooks/usePracticeTracker'
import Header from '../components/Header'
import MicrophoneButton from '../components/voice/MicrophoneButton'
import AudioVisualizer from '../components/voice/AudioVisualizer'
import TopicSelector from '../components/TopicSelector'
import speechService from '../services/speechService'
import geminiService from '../services/geminiService'
import { LANGUAGE_NAMES } from '../constants/languages'

function VoicePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { learningLanguage } = useLearningLanguage()
  const { languageLevel } = useLanguageLevel()
  const { recordPracticeSession } = usePracticeTracker()
  const [selectedTopic, setSelectedTopic] = useState(location.state?.topic || t('home.topics.travel'))
  
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState(null)
  const [conversationHistory, setConversationHistory] = useState([])
  const [browserSupport, setBrowserSupport] = useState({
    recognition: true,
    synthesis: true
  })
  
  const chatInitialized = useRef(false)

  // Check browser support on mount
  useEffect(() => {
    const recognitionSupported = speechService.isSpeechRecognitionSupported()
    const synthesisSupported = speechService.isSpeechSynthesisSupported()
    
    setBrowserSupport({
      recognition: recognitionSupported,
      synthesis: synthesisSupported
    })

    if (!recognitionSupported) {
      setError(t('voice.errors.browserNotSupported'))
    }
  }, [t])

  // Initialize Gemini chat on component mount
  useEffect(() => {
    async function initializeChat() {
      if (chatInitialized.current) return
      
      console.log('Initializing chat...')
      
      try {
        if (!geminiService.isConfigured()) {
          console.error('Gemini API not configured')
          setError(t('voice.errors.noApiKey'))
          return
        }

        const learningLanguageName = LANGUAGE_NAMES[learningLanguage] || 'English'
        
        console.log('Initializing Gemini with:', { learningLanguageName, selectedTopic, languageLevel })
        
        // Reset any previous chat
        geminiService.resetChat()
        
        // Initialize with voice mode enabled and user's language level
        await geminiService.initChat(learningLanguageName, [selectedTopic], languageLevel, true)
        
        console.log('Gemini initialized, sending greeting...')
        
        // Get initial greeting
        const greeting = await geminiService.sendMessage(
          `Start a friendly conversation about "${selectedTopic}" in ${learningLanguageName}. Keep it short (2-3 sentences).`
        )
        
        console.log('Greeting received:', greeting)
        
        setConversationHistory([{ role: 'assistant', text: greeting }])
        
        // Speak the greeting only if synthesis is supported
        if (browserSupport.synthesis) {
          const langCode = speechService.getLanguageCode(learningLanguage)
          speechService.speak(greeting, langCode, () => {
            setIsSpeaking(false)
          }, (err) => {
            console.error('Speech synthesis error:', err)
            setIsSpeaking(false)
          })
          setIsSpeaking(true)
        }
        
        chatInitialized.current = true
        console.log('Chat initialized successfully')
      } catch (err) {
        console.error('Error initializing chat:', err)
        
        // Check if it's an API key error
        const errorMessage = err.message.toLowerCase().includes('api key') 
          ? t('voice.errors.invalidApiKey')
          : t('chat.errors.errorPrefix') + err.message
        
        setError(errorMessage)
      }
    }

    initializeChat()
    
    return () => {
      // Cleanup on unmount
      speechService.stopSpeaking()
      speechService.stopListening()
    }
  }, [learningLanguage, selectedTopic, languageLevel, t, browserSupport.synthesis])

  const handleUserSpeech = useCallback(async (text) => {
    if (!text.trim()) {
      console.log('Empty text, skipping')
      return
    }

    console.log('Handling user speech:', text)
    setIsProcessing(true)
    setConversationHistory(prev => [...prev, { role: 'user', text }])

    try {
      console.log('Sending message to Gemini...')
      // Get AI response
      const response = await geminiService.sendMessage(text)
      console.log('AI response received:', response)
      
      setConversationHistory(prev => [...prev, { role: 'assistant', text: response }])

      // Speak the response only if synthesis is supported
      if (browserSupport.synthesis) {
        const langCode = speechService.getLanguageCode(learningLanguage)
        setIsSpeaking(true)
        speechService.speak(response, langCode, () => {
          setIsSpeaking(false)
          console.log('Finished speaking')
        }, (err) => {
          console.error('Speech synthesis error:', err)
          setIsSpeaking(false)
        })
      }

      // Record practice session
      recordPracticeSession({
        type: 'voice',
        topic: selectedTopic,
        language: learningLanguage,
        level: languageLevel,
        messageCount: conversationHistory.length + 2 // +2 for user message and AI response
      })

    } catch (err) {
      console.error('Error getting AI response:', err)
      setError(t('chat.errors.errorPrefix') + err.message)
    } finally {
      setIsProcessing(false)
    }
  }, [learningLanguage, browserSupport.synthesis, t])

  const toggleRecording = useCallback(async () => {
    if (isRecording) {
      // Stop recording
      speechService.stopListening()
      setIsRecording(false)
      setInterimTranscript('')
    } else {
      // Check browser support
      if (!browserSupport.recognition) {
        setError(t('voice.errors.browserNotSupported'))
        return
      }

      // Request microphone permission
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true })
      } catch (err) {
        console.error('Microphone permission error:', err)
        setError(t('voice.errors.microphonePermission'))
        return
      }

      // Start recording
      setError(null)
      const langCode = speechService.getLanguageCode(learningLanguage)
      
      console.log('Starting speech recognition with language:', langCode)
      
      speechService.startListening(
        langCode,
        ({ transcript: text, isFinal }) => {
          console.log('Speech result:', { text, isFinal })
          if (isFinal) {
            setInterimTranscript('')
            setIsRecording(false)
            handleUserSpeech(text)
          } else {
            setInterimTranscript(text)
          }
        },
        (err) => {
          console.error('Speech recognition error:', err)
          let errorMessage = t('voice.errors.recognitionError')
          
          if (err === 'not-allowed') {
            errorMessage = t('voice.errors.microphonePermission')
          } else if (err === 'no-speech') {
            errorMessage = t('voice.errors.noSpeech')
          } else if (err === 'network') {
            errorMessage = t('voice.errors.networkError')
          }
          
          setError(errorMessage)
          setIsRecording(false)
          setInterimTranscript('')
        }
      )
      
      setIsRecording(true)
    }
  }, [isRecording, browserSupport.recognition, learningLanguage, t, handleUserSpeech])

  return (
    <div className="min-h-screen min-w-screen pb-16 lg:pb-0" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          {/* Back Button and Topic Selector */}
          <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 rounded-2xl border transition-all flex items-center gap-2"
                    style={{ borderColor: 'var(--border)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-hover)'
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <span>←</span>
                    <span className="hidden sm:inline">Назад</span>
                  </button>
            <TopicSelector 
              selectedTopic={selectedTopic}
              onTopicChange={setSelectedTopic}
            />
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl mb-3">{t('voice.title')}</h1>
            
            {/* API Key Not Configured */}
            {!geminiService.isConfigured() && (
              <div className="p-6 rounded-2xl border mb-4" style={{ 
                borderColor: 'var(--accent)', 
                backgroundColor: 'var(--bg-secondary)' 
              }}>
                <p className="text-base mb-3 whitespace-pre-line">{t('voice.errors.noApiKey')}</p>
                <button
                  onClick={() => navigate('/settings')}
                  className="px-6 py-3 rounded-xl font-medium transition-all"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg-primary)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  {t('navigation.settings')} ⚙️
                </button>
              </div>
            )}
            
            {/* Browser Not Supported */}
            {!browserSupport.recognition && (
              <div className="p-4 rounded-2xl border mb-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
                <p className="text-sm text-yellow-400 mb-2">⚠️ {t('voice.errors.browserNotSupported')}</p>
                <p className="text-xs opacity-70">{t('voice.errors.browserSuggestion')}</p>
              </div>
            )}
            
            <p className="text-base sm:text-lg opacity-80">
              {isRecording && t('voice.listening')}
              {isSpeaking && t('voice.aiSpeaking')}
              {isProcessing && t('voice.processing')}
              {!isRecording && !isSpeaking && !isProcessing && browserSupport.recognition && geminiService.isConfigured() && t('voice.clickToStart')}
            </p>
            {error && browserSupport.recognition && geminiService.isConfigured() && (
              <p className="text-sm text-red-400 mt-2 whitespace-pre-line">{error}</p>
            )}
          </div>

          {/* Audio Visualizer */}
          <div className="w-full max-w-md mx-auto p-6 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
            <AudioVisualizer isActive={isRecording || isSpeaking} />
          </div>

          {/* Interim Transcript */}
          {interimTranscript && (
            <div className="text-center">
              <p className="text-sm opacity-60 italic">{interimTranscript}</p>
            </div>
          )}

          {/* Microphone Button */}
          <div className="flex justify-center">
            <MicrophoneButton 
              isActive={isRecording} 
              onClick={toggleRecording}
              disabled={isSpeaking || isProcessing || !geminiService.isConfigured()}
            />
          </div>

          {/* Conversation History */}
          <div className="space-y-4 mt-8 max-h-[400px] overflow-y-auto">
            {conversationHistory.map((msg, index) => (
              <div 
                key={index}
                className={`p-4 rounded-2xl border text-left ${
                  msg.role === 'user' ? 'ml-8' : 'mr-8'
                }`}
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: msg.role === 'user' ? 'var(--bg-primary)' : 'var(--text-primary)'
                }}
              >
                <div className="text-xs opacity-70 mb-1">
                  {msg.role === 'user' ? t('voice.youSaid') : t('voice.ai')}
                </div>
                <p className="text-sm sm:text-base">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-12 p-4 rounded-2xl border border-accent/20">
            <h3 className="text-sm sm:text-base mb-2 opacity-70">{t('voice.tips.title')}</h3>
            <ul className="text-xs sm:text-sm space-y-1 opacity-60 text-left">
              <li>{t('voice.tips.tip1')}</li>
              <li>{t('voice.tips.tip2')}</li>
              <li>{t('voice.tips.tip3')}</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default VoicePage

