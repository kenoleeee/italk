import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme'
import { useLearningLanguage } from '../hooks/useLearningLanguage'
import { useLanguageLevel } from '../hooks/useLanguageLevel'
import { useGeminiApiKey } from '../hooks/useGeminiApiKey'
import Header from '../components/Header'
import LanguageSelector from '../components/LanguageSelector'
import LanguageLevelSelector from '../components/LanguageLevelSelector'
import { MdEmail, MdKey, MdVisibility, MdVisibilityOff, MdCheck, MdClose } from 'react-icons/md'

function SettingsPage() {
  const { t, i18n } = useTranslation()
  const { theme, changeTheme } = useTheme()
  const { learningLanguage, setLearningLanguage } = useLearningLanguage()
  const { languageLevel, setLanguageLevel } = useLanguageLevel()
  const { apiKey, setApiKey, isConfigured } = useGeminiApiKey()
  const [language, setLanguage] = useState(i18n.language || 'en')
  const [tempApiKey, setTempApiKey] = useState(apiKey)
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKeySaved, setApiKeySaved] = useState(false)

  useEffect(() => {
    setLanguage(i18n.language)
  }, [i18n.language])

  useEffect(() => {
    setTempApiKey(apiKey)
  }, [apiKey])

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang)
    i18n.changeLanguage(newLang)
  }

  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme)
  }

  const handleSaveApiKey = () => {
    setApiKey(tempApiKey)
    setApiKeySaved(true)
    setTimeout(() => setApiKeySaved(false), 2000)
  }

  const handleClearApiKey = () => {
    setTempApiKey('')
    setApiKey('')
    setApiKeySaved(false)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-8 pb-24 lg:pb-8" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl sm:text-4xl mb-2">{t('settings.title')}</h1>
            <p className="text-base opacity-70">{t('settings.subtitle')}</p>
          </div>

          {/* Gemini API Key */}
          <section className="p-6 rounded-2xl border" style={{ 
            borderColor: isConfigured ? 'var(--accent)' : 'var(--border)',
            backgroundColor: isConfigured ? 'var(--bg-secondary)' : 'transparent'
          }}>
            <h2 className="text-xl sm:text-2xl mb-1 flex items-center gap-2">
              <MdKey /> {t('settings.apiKey.title')}
            </h2>
            <p className="text-sm opacity-70 mb-4">{t('settings.apiKey.subtitle')}</p>
            
            <div className="space-y-3">
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder={t('settings.apiKey.placeholder')}
                  className="w-full p-3 pr-12 rounded-xl border bg-transparent"
                  style={{ 
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 opacity-70 hover:opacity-100"
                  aria-label={showApiKey ? "Hide API key" : "Show API key"}
                >
                  {showApiKey ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleSaveApiKey}
                  disabled={!tempApiKey.trim() || tempApiKey === apiKey}
                  className="flex-1 py-3 px-4 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg-primary)'
                  }}
                >
                  {apiKeySaved ? (
                    <>
                      <MdCheck size={20} />
                      {t('settings.apiKey.saved')}
                    </>
                  ) : (
                    t('settings.apiKey.save')
                  )}
                </button>
                
                {apiKey && (
                  <button
                    onClick={handleClearApiKey}
                    className="py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <MdClose size={20} />
                    {t('settings.apiKey.clear')}
                  </button>
                )}
              </div>

              <div className="text-xs opacity-60 space-y-1">
                <p>💡 {t('settings.apiKey.hint1')}</p>
                <p>🔒 {t('settings.apiKey.hint2')}</p>
                <a 
                  href="https://ai.google.dev/gemini-api/docs/api-key" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  📖 {t('settings.apiKey.learnMore')}
                </a>
              </div>
            </div>
          </section>

          {/* Language Settings */}
          <section className="p-6 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-xl sm:text-2xl mb-1 flex items-center gap-2">
              {t('settings.language.title')}
            </h2>
            <p className="text-sm opacity-70 mb-4">{t('settings.language.subtitle')}</p>
            
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all" style={{ borderColor: 'var(--border)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                <input
                  type="radio"
                  name="language"
                  value="en"
                  checked={language === 'en'}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span className="text-base">{t('settings.language.english')}</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all" style={{ borderColor: 'var(--border)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                <input
                  type="radio"
                  name="language"
                  value="ru"
                  checked={language === 'ru'}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span className="text-base">{t('settings.language.russian')}</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all" style={{ borderColor: 'var(--border)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                <input
                  type="radio"
                  name="language"
                  value="es"
                  checked={language === 'es'}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span className="text-base">{t('settings.language.spanish')}</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all" style={{ borderColor: 'var(--border)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                <input
                  type="radio"
                  name="language"
                  value="fr"
                  checked={language === 'fr'}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span className="text-base">{t('settings.language.french')}</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all" style={{ borderColor: 'var(--border)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                <input
                  type="radio"
                  name="language"
                  value="de"
                  checked={language === 'de'}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span className="text-base">{t('settings.language.german')}</span>
              </label>
            </div>
          </section>

          {/* Learning Language */}
          <section className="p-6 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-xl sm:text-2xl mb-1 flex items-center gap-2">
              🌍 {t('home.hub.account.learningLanguage')}
            </h2>
            <p className="text-sm opacity-70 mb-4">{t('home.hub.account.selectLanguage')}</p>
            <div className="flex justify-center">
              <LanguageSelector 
                selectedLanguage={learningLanguage}
                onLanguageChange={setLearningLanguage}
              />
            </div>
          </section>

          {/* Language Level */}
          <section className="p-6 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-xl sm:text-2xl mb-1 flex items-center gap-2">
              🎓 {t('account.languageLevel.title')}
            </h2>
            <p className="text-sm opacity-70 mb-4">{t('account.languageLevel.description')}</p>
            <LanguageLevelSelector 
              selectedLevel={languageLevel}
              onLevelChange={setLanguageLevel}
            />
          </section>

          {/* Theme Settings */}
          <section className="p-6 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-xl sm:text-2xl mb-1 flex items-center gap-2">
              {t('settings.theme.title')}
            </h2>
            <p className="text-sm opacity-70 mb-4">{t('settings.theme.subtitle')}</p>
            
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all" style={{ borderColor: 'var(--border)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === 'light'}
                  onChange={(e) => handleThemeChange(e.target.value)}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <div className="flex-1">
                  <span className="text-base block">{t('settings.theme.light')}</span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('settings.theme.lightDesc')}</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all" style={{ borderColor: 'var(--border)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={(e) => handleThemeChange(e.target.value)}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <div className="flex-1">
                  <span className="text-base block">{t('settings.theme.dark')}</span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('settings.theme.darkDesc')}</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all" style={{ borderColor: 'var(--border)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  checked={theme === 'system'}
                  onChange={(e) => handleThemeChange(e.target.value)}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <div className="flex-1">
                  <span className="text-base block">{t('settings.theme.system')}</span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('settings.theme.systemDesc')}</span>
                </div>
              </label>
            </div>
          </section>

          {/* Information */}
          <section className="p-6 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-xl sm:text-2xl mb-1 flex items-center gap-2">
              {t('settings.information.title')}
            </h2>
            <p className="text-sm opacity-70 mb-4">{t('settings.information.subtitle')}</p>
            
            <div className="space-y-3">
              <a
                href="#privacy"
                className="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all"
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
                <span className="text-base">{t('settings.information.privacy')}</span>
                <span className="text-xl" style={{ color: 'var(--text-secondary)' }}>→</span>
              </a>

              <a
                href="#terms"
                className="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all"
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
                <span className="text-base">{t('settings.information.terms')}</span>
                <span className="text-xl" style={{ color: 'var(--text-secondary)' }}>→</span>
              </a>

              <a
                href="mailto:support@italk.app"
                className="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all"
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
                <span className="text-base">{t('settings.information.support')}</span>
                <MdEmail className="text-xl" style={{ color: 'var(--text-secondary)' }} />
              </a>
            </div>
          </section>

          {/* App Version */}
          <div className="text-center py-4">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('settings.version')}</p>
          </div>
        </div>
      </main>
    </>
  )
}

export default SettingsPage

