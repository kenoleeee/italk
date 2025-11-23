import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { MdCoffee, MdMovie, MdPublic, MdRestaurant, MdWork, MdMenuBook, MdMusicNote, MdAutoAwesome, MdChat, MdMic } from 'react-icons/md'

function TopicOfTheDay() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  // Список тем для каждого дня
  const dailyTopics = useMemo(() => [
    { Icon: MdCoffee, topic: t('topicOfDay.topics.morningRoutine') },
    { Icon: MdMovie, topic: t('topicOfDay.topics.favoriteMovie') },
    { Icon: MdPublic, topic: t('topicOfDay.topics.dreamDestination') },
    { Icon: MdRestaurant, topic: t('topicOfDay.topics.cooking') },
    { Icon: MdWork, topic: t('topicOfDay.topics.careerGoals') },
    { Icon: MdMenuBook, topic: t('topicOfDay.topics.lastBook') },
    { Icon: MdMusicNote, topic: t('topicOfDay.topics.musicTaste') }
  ], [t])

  // Получить тему дня на основе текущей даты
  const todayTopic = useMemo(() => {
    const today = new Date()
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
    return dailyTopics[dayOfYear % dailyTopics.length]
  }, [dailyTopics])

  useEffect(() => {
    // Проверить, показывали ли уже в этой сессии
    const shownInSession = sessionStorage.getItem('topicOfDayShownInSession')
    
    if (!shownInSession) {
      // Показать с небольшой задержкой для лучшего UX
      const showTimer = setTimeout(() => {
        setIsVisible(true)
        sessionStorage.setItem('topicOfDayShownInSession', 'true')
      }, 500)

      // Автоматически закрыть через 1 минуту (60000 мс)
      const hideTimer = setTimeout(() => {
        setIsVisible(false)
      }, 60500)

      return () => {
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [])

  const handleClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleStartWithTopic = useCallback((mode) => {
    setIsVisible(false)
    if (mode === 'chat') {
      navigate('/chat', { state: { topic: todayTopic.topic } })
    } else {
      navigate('/voice', { state: { topic: todayTopic.topic } })
    }
  }, [navigate, todayTopic.topic])

  if (!isVisible) return null

  return (
    <div className="fixed left-4 top-24 z-50 animate-slide-in">
      <div 
        className="rounded-2xl border shadow-2xl p-6 max-w-sm backdrop-blur-md"
        style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          borderColor: 'var(--accent)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-6 h-6 rounded-full border flex items-center justify-center transition-all hover:scale-110"
          style={{ borderColor: 'var(--border)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          aria-label="Close"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <MdAutoAwesome className="text-2xl" />
            <h3 className="text-lg font-bold" style={{ color: 'var(--accent)' }}>
              {t('topicOfDay.title')}
            </h3>
          </div>
          <p className="text-xs opacity-70">{t('topicOfDay.subtitle')}</p>
        </div>

        {/* Topic */}
        <div 
          className="p-4 rounded-xl mb-4 border"
          style={{ 
            backgroundColor: 'var(--bg-primary)', 
            borderColor: 'var(--border)' 
          }}
        >
          <div className="flex items-center gap-3">
            <todayTopic.Icon className="text-3xl" />
            <div>
              <p className="text-sm font-medium">{todayTopic.topic}</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          <button
            onClick={() => handleStartWithTopic('chat')}
            className="w-full p-3 rounded-xl transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2 hover:scale-105"
            style={{ 
              backgroundColor: 'var(--accent)', 
              color: 'var(--bg-primary)' 
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <MdChat />
            <span>{t('topicOfDay.startChat')}</span>
          </button>
          
          <button
            onClick={() => handleStartWithTopic('voice')}
            className="w-full p-3 rounded-xl border transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 hover:scale-105"
            style={{ borderColor: 'var(--border)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <MdMic />
            <span>{t('topicOfDay.startVoice')}</span>
          </button>
        </div>

        {/* Auto-close indicator */}
        <p className="text-[10px] text-center mt-3 opacity-50">
          {t('topicOfDay.autoClose')}
        </p>
      </div>
    </div>
  )
}

export default memo(TopicOfTheDay)

