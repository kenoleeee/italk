import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MdPerson } from 'react-icons/md'

function Header() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  return (
    <nav className="flex items-center justify-between p-4 sm:p-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Link to="/">
        <h1 className="text-24px sm:text-32px font-bold hover:cursor-pointer" style={{ color: 'var(--accent)' }}>
          {t('common.appName')}
        </h1>
      </Link>
      
      {/* Account button for mobile - visible only on small screens */}
      <button
        onClick={() => navigate('/account')}
        className="lg:hidden p-2 rounded-full transition-all hover:scale-110"
        style={{ 
          backgroundColor: 'var(--bg-secondary)',
          border: '2px solid var(--border)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)'
        }}
        aria-label={t('navigation.account')}
      >
        <MdPerson className="text-xl" style={{ color: 'var(--accent)' }} />
      </button>
    </nav>
  )
}

export default memo(Header)