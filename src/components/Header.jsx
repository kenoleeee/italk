import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Header() {
  const { t } = useTranslation()
  
  return (
    <nav className="flex items-center justify-between p-4 sm:p-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Link to="/">
        <h1 className="text-24px sm:text-32px font-bold hover:cursor-pointer" style={{ color: 'var(--accent)' }}>
          {t('common.appName')}
        </h1>
      </Link>
    </nav>
  )
}

export default memo(Header)