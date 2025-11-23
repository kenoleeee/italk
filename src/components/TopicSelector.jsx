import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'

function TopicSelector({ selectedTopic, onTopicChange }) {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [customInput, setCustomInput] = useState('')
  
  const suggestions = useMemo(() => [
    { emoji: '✈️', text: t('home.topics.travel') },
    { emoji: '🏠', text: t('home.topics.dailyLife') },
    { emoji: '💼', text: t('home.topics.work') },
    { emoji: '💻', text: t('home.topics.tech') },
    { emoji: '🍕', text: t('home.topics.food') },
    { emoji: '🎭', text: t('home.topics.culture') },
    { emoji: '📚', text: t('home.topics.study') },
    { emoji: '🎨', text: t('home.topics.hobbies') }
  ], [t])

  // Close modal on Escape key
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isModalOpen])

  const selectTopic = useCallback((topic) => {
    onTopicChange(topic)
    setCustomInput('')
    setIsModalOpen(false)
  }, [onTopicChange])

  const handleCustomSubmit = useCallback(() => {
    const custom = customInput.trim()
    if (custom) {
      onTopicChange(custom)
      setCustomInput('')
      setIsModalOpen(false)
    }
  }, [customInput, onTopicChange])

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all"
        style={{ borderColor: 'var(--border)' }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <span className="text-sm">
          {selectedTopic ? `📋 ${selectedTopic}` : '📋 Choose topic'}
        </span>
        <span className="text-xs opacity-70">▼</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="backdrop-blur-md border rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-medium">{t('home.topics.title')}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 rounded-full border transition-all flex items-center justify-center"
                style={{ borderColor: 'var(--border)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Topic Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {suggestions.map(({ emoji, text }) => (
                <button
                  key={text}
                  className="p-4 rounded-2xl border transition-all hover:scale-105"
                  style={{
                    backgroundColor: selectedTopic === text ? 'var(--accent)' : 'transparent',
                    borderColor: selectedTopic === text ? 'var(--accent)' : 'var(--border)',
                    color: selectedTopic === text ? 'var(--bg-primary)' : 'var(--text-primary)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedTopic !== text) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-primary)'
                      e.currentTarget.style.borderColor = 'var(--border-hover)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedTopic !== text) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }
                  }}
                  onClick={() => selectTopic(text)}
                >
                  <div className="text-2xl mb-1">{emoji}</div>
                  <div className="text-sm">{text}</div>
                </button>
              ))}
            </div>

            {/* Custom Topic Input */}
            <div className="border-t pt-6" style={{ borderColor: 'var(--border)' }}>
              <p className="text-sm opacity-70 mb-3 text-center">{t('home.topics.orCustom')}</p>
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-transparent border rounded-2xl px-4 py-2 outline-none text-sm"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  placeholder={t('home.topics.placeholder')}
                  value={customInput}
                  onChange={e => setCustomInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleCustomSubmit()}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                />
                <button
                  onClick={handleCustomSubmit}
                  disabled={!customInput.trim()}
                  className="px-6 py-2 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg-primary)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  {t('common.add')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default memo(TopicSelector)

