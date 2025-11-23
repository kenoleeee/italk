import { memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MdHome, MdMic, MdChat, MdSettings } from 'react-icons/md'

function BottomNavigation() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/', label: t('navigation.home'), Icon: MdHome },
    { path: '/voice', label: t('navigation.voice'), Icon: MdMic },
    { path: '/chat', label: t('navigation.chat'), Icon: MdChat },
    { path: '/settings', label: t('navigation.settings'), Icon: MdSettings }
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <nav 
      className="fixed bottom-4 left-4 right-4 z-50 backdrop-blur-lg lg:hidden rounded-full shadow-2xl"
      style={{ 
        backgroundColor: 'var(--bg-secondary)',
        border: '2px solid var(--border)'
      }}
    >
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="flex items-center justify-around">
          {navItems.map(({ path, label, Icon }) => {
            const active = isActive(path)
            return (
              <button
                key={path}
                onClick={() => handleNavigate(path)}
                className="flex flex-col items-center justify-center py-3 px-3 transition-all min-w-0 flex-1 rounded-full"
                style={{
                  color: active ? 'var(--accent)' : 'var(--text-secondary)',
                  backgroundColor: active ? 'var(--bg-primary)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.backgroundColor = 'var(--bg-primary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <Icon className="text-2xl mb-1" />
                <span 
                  className="text-[10px] font-medium truncate w-full text-center"
                  style={{ 
                    fontWeight: active ? '700' : '500'
                  }}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default memo(BottomNavigation)

