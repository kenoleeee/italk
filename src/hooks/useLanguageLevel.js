import { useState, useEffect } from 'react'
import { DEFAULT_LANGUAGE_LEVEL } from '../constants/languageLevels'

/**
 * Hook for managing user's language proficiency level
 * Stores level in localStorage
 */
export function useLanguageLevel() {
  const [languageLevel, setLanguageLevelState] = useState(() => {
    return localStorage.getItem('italk_language_level') || DEFAULT_LANGUAGE_LEVEL
  })

  const setLanguageLevel = (level) => {
    setLanguageLevelState(level)
    localStorage.setItem('italk_language_level', level)
  }

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('italk_language_level')
    if (saved && saved !== languageLevel) {
      setLanguageLevelState(saved)
    }
  }, [languageLevel])

  return { languageLevel, setLanguageLevel }
}

