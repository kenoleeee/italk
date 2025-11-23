import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react'
import { LEARNING_LANGUAGES } from '../constants/languages'

function LanguageSelector({ selectedLanguage, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const selected = useMemo(() => 
    LEARNING_LANGUAGES.find(lang => lang.code === selectedLanguage) || LEARNING_LANGUAGES[0],
    [selectedLanguage]
  )

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = useCallback((lang) => {
    onLanguageChange(lang.code)
    setIsOpen(false)
  }, [onLanguageChange])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-2xl border border-accent hover:border-white/60 transition-all text-sm sm:text-base"
        aria-label="Select learning language"
      >
        <span className="text-lg">{selected.flag}</span>
        <span className="hidden sm:inline text-accent hover:text-white">{selected.name}</span>
        <span className="text-accent">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-accent rounded-2xl shadow-lg overflow-hidden z-50">
          <div className="max-h-80 overflow-y-auto">
            {LEARNING_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/20 transition-all text-left ${
                  lang.code === selectedLanguage ? 'bg-accent/10' : ''
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
                {lang.code === selectedLanguage && (
                  <span className="ml-auto text-accent">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(LanguageSelector)

