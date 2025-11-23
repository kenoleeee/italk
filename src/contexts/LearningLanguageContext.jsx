import { createContext, useState, useEffect, useMemo } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const LearningLanguageContext = createContext()

export function LearningLanguageProvider({ children }) {
  const [learningLanguage, setLearningLanguage] = useState(() => {
    // Load from localStorage or default to English
    return localStorage.getItem('learningLanguage') || 'en'
  })

  useEffect(() => {
    // Save to localStorage whenever it changes
    localStorage.setItem('learningLanguage', learningLanguage)
  }, [learningLanguage])

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    learningLanguage,
    setLearningLanguage,
  }), [learningLanguage])

  return (
    <LearningLanguageContext.Provider value={value}>
      {children}
    </LearningLanguageContext.Provider>
  )
}

