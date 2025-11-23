import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLearningLanguage } from '../hooks/useLearningLanguage'
import { useLanguageLevel } from '../hooks/useLanguageLevel'
import { usePracticeTracker } from '../hooks/usePracticeTracker'
import Header from '../components/Header'
import ChatBubble from '../components/chat/ChatBubble'
import MessageInput from '../components/chat/MessageInput'
import TopicSelector from '../components/TopicSelector'
import geminiService from '../services/geminiService'
import { LANGUAGE_NAMES } from '../constants/languages'

function ChatPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { learningLanguage } = useLearningLanguage()
  const { languageLevel } = useLanguageLevel()
  const { recordPracticeSession } = usePracticeTracker()
  const [selectedTopic, setSelectedTopic] = useState(location.state?.topic || t('home.topics.travel'))
  
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const scrollRef = useRef(null)

  // Initialize Gemini chat on component mount
  useEffect(() => {
    async function initializeChat() {
      try {
        // Check if API is configured
        if (!geminiService.isConfigured()) {
          setError('api_not_configured')
          setMessages([
            { 
              id: 1, 
              role: 'assistant', 
              text: t('chat.errors.noApiKey'), 
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            }
          ])
          return
        }

        setIsLoading(true)
        
        const learningLanguageName = LANGUAGE_NAMES[learningLanguage] || 'English'
        
        // Initialize chat with language learning context, selected topic, and user's level
        await geminiService.initChat(learningLanguageName, [selectedTopic], languageLevel, false)
        
        // Get initial greeting from AI - short prompt to trigger casual response
        const greeting = await geminiService.sendMessage('Hey!')
        
        setMessages([
          { 
            id: Date.now(), 
            role: 'assistant', 
            text: greeting, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          }
        ])
      } catch (err) {
        console.error('Failed to initialize chat:', err)
        setError(err.message)
        
        // Check if it's an API key error
        const errorMessage = err.message.toLowerCase().includes('api key') 
          ? t('chat.errors.invalidApiKey')
          : `${t('chat.errors.errorPrefix')}${err.message}`
        
        setMessages([
          { 
            id: 1, 
            role: 'assistant', 
            text: errorMessage, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }

      initializeChat()
  }, [t, selectedTopic, learningLanguage, languageLevel])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = useCallback(async (text) => {
    if (!text.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMessage])

    // If API not configured, show error message
    if (!geminiService.isConfigured() || error === 'api_not_configured') {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            role: 'assistant',
            text: t('chat.errors.pleaseConfigureApi'),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ])
      }, 500)
      return
    }

    setIsLoading(true)

    try {
      // Send message to Gemini
      const response = await geminiService.sendMessage(text)
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: 'assistant',
          text: response,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])

      // Record practice session
      recordPracticeSession({
        type: 'chat',
        topic: selectedTopic,
        language: learningLanguage,
        level: languageLevel,
        messageCount: messages.length + 2 // +2 for user message and AI response
      })
    } catch (err) {
      console.error('Error sending message:', err)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: 'assistant',
          text: `${t('chat.errors.errorPrefix')}${err.message}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, error, t])

  return (
    <>
    <Header />
    <div className="min-h-screen min-w-screen flex flex-col pb-16 lg:pb-0" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <main className="flex-1 w-full">
          <div className="max-w-[1024px] mx-auto px-4 py-4">
            {/* Back Button and Topic Selector */}
            <div className="mb-4 flex items-center justify-between gap-4">
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
            
            {/* API Key Warning */}
            {!geminiService.isConfigured() && (
              <div className="mb-4 p-6 rounded-2xl border text-center" style={{ 
                borderColor: 'var(--accent)', 
                backgroundColor: 'var(--bg-secondary)' 
              }}>
                <p className="text-base mb-3 whitespace-pre-line">{t('chat.errors.noApiKey')}</p>
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
            
            <div className="flex flex-col gap-3 pb-20 lg:pb-0">
            {messages.map((m) => (
              <ChatBubble key={m.id} role={m.role} text={m.text} time={m.time} />)
            )}
            <div ref={scrollRef} />
          </div>
        </div>
            </main>
            <div className="fixed lg:sticky bottom-16 lg:bottom-0 left-0 right-0 w-full backdrop-blur border-t z-40" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
              <MessageInput onSend={handleSend} isLoading={isLoading} />
            </div>
    </div>
    </>
  )
}

export default ChatPage


