import { useEffect, useState, memo } from 'react'
import { useTheme } from '../hooks/useTheme'

function LoadingScreen({ onLoadingComplete }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(true)
  const { actualTheme } = useTheme()

  useEffect(() => {
    // Блокируем прокрутку во время загрузки
    document.body.classList.add('loading')
    
    // Минимальное время показа загрузочного экрана
    const timer = setTimeout(() => {
      setIsAnimating(false)
      // Задержка перед скрытием для плавности анимации
      setTimeout(() => {
        setIsVisible(false)
        document.body.classList.remove('loading')
        if (onLoadingComplete) {
          onLoadingComplete()
        }
      }, 500) // Время fade-out анимации
    }, 2500) // Общее время показа загрузочного экрана

    return () => {
      clearTimeout(timer)
      document.body.classList.remove('loading')
    }
  }, [onLoadingComplete])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundColor: actualTheme === 'dark' ? '#0F0F0F' : '#F5F1ED'
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Название приложения с большой анимацией */}
        <div className="text-center">
          <h1 
            className="text-7xl font-bold mb-4 animate-title"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              color: actualTheme === 'dark' ? '#FBFBFB' : '#3E2723'
            }}
          >
            iTalk
          </h1>
          <p 
            className="text-xl animate-subtitle"
            style={{
              color: actualTheme === 'dark' ? 'rgba(251, 251, 251, 0.7)' : 'rgba(62, 39, 35, 0.7)'
            }}
          >
            Learn languages naturally
          </p>
        </div>

        {/* Индикатор загрузки */}
        <div className="loading-dots flex gap-2 mt-4">
          <div 
            className="w-3 h-3 rounded-full animate-bounce"
            style={{ 
              backgroundColor: actualTheme === 'dark' ? '#716969' : '#8B6F47',
              animationDelay: '0ms'
            }}
          />
          <div 
            className="w-3 h-3 rounded-full animate-bounce"
            style={{ 
              backgroundColor: actualTheme === 'dark' ? '#716969' : '#8B6F47',
              animationDelay: '150ms'
            }}
          />
          <div 
            className="w-3 h-3 rounded-full animate-bounce"
            style={{ 
              backgroundColor: actualTheme === 'dark' ? '#716969' : '#8B6F47',
              animationDelay: '300ms'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes titleAnimation {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(-50px);
            letter-spacing: -0.5em;
          }
          50% {
            transform: scale(1.1) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            letter-spacing: 0;
          }
        }

        @keyframes subtitleAnimation {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.9;
          }
        }

        .animate-title {
          animation: titleAnimation 1s ease-out, pulse 2s ease-in-out infinite 1.2s;
        }

        .animate-subtitle {
          animation: subtitleAnimation 0.8s ease-out 0.6s both;
        }
      `}</style>
    </div>
  )
}

export default memo(LoadingScreen)


