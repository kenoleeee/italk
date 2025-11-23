import Header from '../components/Header'
import { useState, useMemo, useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLearningLanguage } from '../hooks/useLearningLanguage'
import { usePracticeTracker } from '../hooks/usePracticeTracker'
import LanguageSelector from '../components/LanguageSelector'
import TopicOfTheDay from '../components/TopicOfTheDay'
import { MdLocalFireDepartment, MdChat, MdMic, MdCasino, MdSettings, MdCheck } from 'react-icons/md'

function HomePage() {
  const { t } = useTranslation()
  const { streak, weeklyProgress, weeklyGoal } = usePracticeTracker()
  
  return (
    <>
      <Header/>
      <TopicOfTheDay />
      
      {/* Desktop Layout - Hidden on mobile */}
      <main className="hidden lg:block min-h-screen px-4 sm:px-6 md:px-8 py-12" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar - Navigation */}
            <div className="lg:col-span-4 xl:col-span-4">
              <LeftSidebar />
            </div>

            {/* Center Content - Progress Card */}
            <div className="lg:col-span-4 xl:col-span-4">
              <div className="p-8 rounded-3xl border-2 backdrop-blur-sm shadow-lg transition-all duration-300 sticky top-6" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
                {/* Welcome Section - Inside Card */}
                <div className="text-center space-y-3 mb-8 pb-8 border-b" style={{ borderColor: 'var(--border)' }}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: 'var(--accent)' }}>
                    {t('home.hub.title')}
                  </h1>
                  <p className="text-sm sm:text-base opacity-70 max-w-xl mx-auto">
                    {t('home.hub.subtitle')}
                  </p>
                </div>
                
                {/* Streak */}
                <div className="text-center mb-8 p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg-primary)' }}>
                      <div className="flex items-center justify-center gap-4 mb-3">
                        <MdLocalFireDepartment className="text-6xl animate-pulse" style={{ color: 'var(--accent)' }} />
                        <div>
                          <div className="text-5xl font-bold" style={{ color: 'var(--accent)' }}>{streak}</div>
                          <div className="text-sm opacity-70 uppercase tracking-wider">{t('home.hub.streak.days')}</div>
                        </div>
                      </div>
                      <p className="text-sm opacity-60 mt-2">{t('home.hub.streak.title')}</p>
                    </div>
                    
                  {/* Weekly Goal */}
                  <div className="mb-6">
                    <div className="text-center mb-4">
                      <p className="text-sm font-medium opacity-70">{t('home.hub.streak.weeklyGoal')}</p>
                      <p className="text-xs opacity-50 mt-1">{weeklyProgress} / {weeklyGoal} {t('home.hub.streak.days')}</p>
                    </div>
                    <div className="flex justify-center gap-3">
                      {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                        <div
                          key={day}
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            day < weeklyProgress
                              ? 'shadow-lg scale-110'
                              : 'bg-transparent'
                          }`}
                          style={{
                            backgroundColor: day < weeklyProgress ? 'var(--accent)' : 'transparent',
                            borderColor: day < weeklyProgress ? 'var(--accent)' : 'var(--border)',
                            color: day < weeklyProgress ? 'var(--bg-primary)' : 'var(--text-primary)'
                          }}
                        >
                          {day < weeklyProgress && <MdCheck className="text-base font-bold" />}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs opacity-50 mt-3 px-2">
                      <span className="font-medium">M</span>
                      <span className="font-medium">T</span>
                      <span className="font-medium">W</span>
                      <span className="font-medium">T</span>
                      <span className="font-medium">F</span>
                      <span className="font-medium">S</span>
                      <span className="font-medium">S</span>
                    </div>
                  </div>
              </div>
            </div>

            {/* Right Sidebar - Quick Settings */}
            <div className="lg:col-span-4 xl:col-span-4">
              <RightSidebar />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Layout - Visible only on mobile */}
      <main className="lg:hidden min-h-screen px-4 py-8 pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <MobileHub />
      </main>
    </>
  )
}

// Left Sidebar - Navigation
const LeftSidebar = memo(function LeftSidebar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedTopic, setSelectedTopic] = useState('')
  const [customInput, setCustomInput] = useState('')

  const suggestions = useMemo(() => [
    t('home.topics.travel'),
    t('home.topics.dailyLife'),
    t('home.topics.work'),
    t('home.topics.tech'),
    t('home.topics.food'),
    t('home.topics.culture'),
    t('home.topics.study'),
    t('home.topics.hobbies')
  ], [t])

  const selectTopic = useCallback((topic) => {
    setSelectedTopic(topic)
    setCustomInput('')
  }, [])

  const handleCustomInputChange = useCallback((value) => {
    setCustomInput(value)
  }, [])

  const handleCustomInputBlur = useCallback(() => {
    const trimmed = customInput.trim()
    if (trimmed) {
      setSelectedTopic(trimmed)
      setCustomInput('')
    }
  }, [customInput])

  const handleCustomInputKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const trimmed = customInput.trim()
      if (trimmed) {
        setSelectedTopic(trimmed)
        setCustomInput('')
      }
    }
  }, [customInput])

  const startPractice = useCallback((type) => {
    const customTopic = customInput.trim()
    const topic = customTopic || selectedTopic || t('home.topics.travel')
    
    if (type === 'chat') {
      navigate('/chat', { state: { topic } })
    } else {
      navigate('/voice', { state: { topic } })
    }
  }, [customInput, selectedTopic, t, navigate])

  return (
    <div className="p-6 rounded-2xl border space-y-6 sticky top-6 transition-all duration-300" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">{t('home.hub.navigation.title')}</h2>
        <p className="text-xs opacity-70">{t('home.hub.navigation.subtitle')}</p>
      </div>

      {/* Topic Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-center">{t('home.hub.navigation.selectTopic')}</h3>
        
        {/* Selected topic display */}
        {selectedTopic && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--accent)' }}>
              <span className="text-sm font-medium">{selectedTopic}</span>
              <button 
                aria-label={t('home.topics.clearTopic')} 
                className="opacity-70 hover:opacity-100 text-lg" 
                onClick={() => {
                  setSelectedTopic('')
                  setCustomInput('')
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Topic suggestions */}
        <div className="flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button
              key={s}
              className="px-3 py-1.5 rounded-xl text-xs transition-all border"
              style={{
                backgroundColor: selectedTopic === s ? 'var(--accent)' : 'transparent',
                borderColor: selectedTopic === s ? 'var(--accent)' : 'var(--border)',
                color: selectedTopic === s ? 'var(--bg-primary)' : 'var(--text-primary)'
              }}
              onMouseEnter={(e) => {
                if (selectedTopic !== s) e.currentTarget.style.backgroundColor = 'var(--bg-primary)'
              }}
              onMouseLeave={(e) => {
                if (selectedTopic !== s) e.currentTarget.style.backgroundColor = 'transparent'
              }}
              onClick={() => selectTopic(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Custom topic input */}
        <div>
          <p className="text-xs opacity-70 mb-2">{t('home.topics.orCustom')}</p>
          <input
            className="w-full bg-transparent border rounded-xl px-3 py-2 outline-none text-sm"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder={t('home.topics.placeholder')}
            value={customInput}
            onChange={e => handleCustomInputChange(e.target.value)}
            onKeyDown={handleCustomInputKeyDown}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              handleCustomInputBlur()
            }}
          />
        </div>
      </div>

      {/* Mode Selection Buttons */}
      <div className="space-y-3 pt-4">
        <button 
          onClick={() => startPractice('chat')}
          className="w-full p-4 rounded-xl border-2 transition-all duration-300 text-left group hover:scale-105 hover:shadow-lg"
          style={{ borderColor: 'var(--border)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-hover)'
            e.currentTarget.style.backgroundColor = 'var(--bg-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold mb-1 flex items-center gap-2">
                <MdChat className="text-xl" />
                {t('home.hub.navigation.chatMode')}
              </h4>
              <p className="text-xs opacity-70">{t('home.hub.navigation.chatDescription')}</p>
            </div>
            <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
          </div>
        </button>

        <button 
          onClick={() => startPractice('voice')}
          className="w-full p-4 rounded-xl border-2 transition-all duration-300 text-left group hover:scale-105 hover:shadow-lg"
          style={{ borderColor: 'var(--border)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-hover)'
            e.currentTarget.style.backgroundColor = 'var(--bg-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold mb-1 flex items-center gap-2">
                <MdMic className="text-xl" />
                {t('home.hub.navigation.voiceMode')}
              </h4>
              <p className="text-xs opacity-70">{t('home.hub.navigation.voiceDescription')}</p>
            </div>
            <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
          </div>
        </button>
      </div>
    </div>
  )
})

// Right Sidebar - Quick Settings
const RightSidebar = memo(function RightSidebar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { learningLanguage, setLearningLanguage } = useLearningLanguage()

  return (
    <div className="p-6 rounded-2xl border space-y-6 sticky top-6 transition-all duration-300" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
      {/* Quick Access */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-center">⚡ Quick Start</h2>
        <div className="space-y-3">
          <button 
            onClick={() => navigate('/settings')}
            className="w-full p-4 rounded-xl border transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2 hover:scale-105"
            style={{ 
              borderColor: 'var(--border)',
              backgroundColor: 'var(--bg-primary)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
              e.currentTarget.style.borderColor = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-primary)'
              e.currentTarget.style.borderColor = 'var(--border)'
            }}
          >
            <div className="flex items-center gap-2">
              <MdSettings className="text-xl" />
              <span>{t('common.settings')}</span>
            </div>
            <span className="text-xl opacity-50">→</span>
          </button>
        </div>
      </div>

      {/* Learning Language */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-center opacity-70">{t('home.hub.account.learningLanguage')}</h3>
        <div className="flex justify-center">
          <LanguageSelector 
            selectedLanguage={learningLanguage}
            onLanguageChange={setLearningLanguage}
          />
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-xs text-center opacity-60">
          💾 All data stored locally in your browser
        </p>
      </div>
    </div>
  )
})

// Mobile Hub - Simple version for mobile devices
const MobileHub = memo(function MobileHub() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedTopic, setSelectedTopic] = useState('')
  const [customInput, setCustomInput] = useState('')

  const suggestions = useMemo(() => [
    t('home.topics.travel'),
    t('home.topics.dailyLife'),
    t('home.topics.work'),
    t('home.topics.tech'),
    t('home.topics.food'),
    t('home.topics.culture'),
    t('home.topics.study'),
    t('home.topics.hobbies')
  ], [t])

  const handleRandomTopic = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * suggestions.length)
    setSelectedTopic(suggestions[randomIndex])
    setCustomInput('')
  }, [suggestions])

  const handleCustomInputChange = useCallback((value) => {
    setCustomInput(value)
  }, [])

  const handleCustomInputKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const trimmed = customInput.trim()
      if (trimmed) {
        setSelectedTopic(trimmed)
        setCustomInput('')
      }
    }
  }, [customInput])

  const startPractice = useCallback((type) => {
    const customTopic = customInput.trim()
    const topic = customTopic || selectedTopic || t('home.topics.travel')
    
    if (type === 'chat') {
      navigate('/chat', { state: { topic } })
    } else {
      navigate('/voice', { state: { topic } })
    }
  }, [customInput, selectedTopic, t, navigate])

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Welcome Card */}
      <div 
        className="p-6 rounded-3xl border-2 backdrop-blur-sm shadow-lg" 
        style={{ 
          borderColor: 'var(--border)', 
          backgroundColor: 'var(--bg-secondary)' 
        }}
      >
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--accent)' }}>
            {t('home.hub.title')}
          </h1>
          <p className="text-sm opacity-70">
            {t('home.hub.subtitle')}
          </p>
        </div>
      </div>

      {/* Topic Selection Card */}
      <div 
        className="p-6 rounded-2xl border space-y-4" 
        style={{ 
          borderColor: 'var(--border)', 
          backgroundColor: 'var(--bg-secondary)' 
        }}
      >
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">{t('home.hub.navigation.selectTopic')}</h2>
        </div>

        {/* Selected Topic Display */}
        {selectedTopic && (
          <div className="flex justify-center">
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-xl border" 
              style={{ 
                backgroundColor: 'var(--bg-primary)', 
                borderColor: 'var(--accent)' 
              }}
            >
              <span className="text-sm font-medium">{selectedTopic}</span>
              <button 
                aria-label={t('home.topics.clearTopic')} 
                className="opacity-70 hover:opacity-100 text-xl" 
                onClick={() => {
                  setSelectedTopic('')
                  setCustomInput('')
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Custom Topic Input */}
        <div>
          <input
            className="w-full bg-transparent border rounded-xl px-4 py-3 outline-none text-sm"
            style={{ 
              borderColor: 'var(--border)', 
              color: 'var(--text-primary)' 
            }}
            placeholder={t('home.topics.placeholder')}
            value={customInput}
            onChange={e => handleCustomInputChange(e.target.value)}
            onKeyDown={handleCustomInputKeyDown}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Random Topic Button */}
        <button 
          onClick={handleRandomTopic}
          className="w-full p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
          style={{ borderColor: 'var(--border)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.backgroundColor = 'var(--bg-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          <MdCasino className="text-2xl" />
          <span className="font-bold">{t('home.topics.random')}</span>
        </button>
      </div>

      {/* Start Practice Buttons */}
      <div className="space-y-3">
        <button 
          onClick={() => startPractice('chat')}
          className="w-full p-5 rounded-xl border-2 transition-all duration-300 text-left group hover:scale-105 hover:shadow-lg"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-hover)'
            e.currentTarget.style.backgroundColor = 'var(--bg-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold mb-1 flex items-center gap-2">
                <MdChat className="text-2xl" />
                {t('home.hub.navigation.chatMode')}
              </h4>
              <p className="text-xs opacity-70">{t('home.hub.navigation.chatDescription')}</p>
            </div>
            <span className="text-3xl group-hover:translate-x-2 transition-transform duration-300">→</span>
          </div>
        </button>

        <button 
          onClick={() => startPractice('voice')}
          className="w-full p-5 rounded-xl border-2 transition-all duration-300 text-left group hover:scale-105 hover:shadow-lg"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-hover)'
            e.currentTarget.style.backgroundColor = 'var(--bg-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold mb-1 flex items-center gap-2">
                <MdMic className="text-2xl" />
                {t('home.hub.navigation.voiceMode')}
              </h4>
              <p className="text-xs opacity-70">{t('home.hub.navigation.voiceDescription')}</p>
            </div>
            <span className="text-3xl group-hover:translate-x-2 transition-transform duration-300">→</span>
          </div>
        </button>
      </div>
    </div>
  )
})

export default HomePage