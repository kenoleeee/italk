import { useContext } from 'react'
import { LearningLanguageContext } from '../contexts/LearningLanguageContext'

export function useLearningLanguage() {
  const context = useContext(LearningLanguageContext)
  if (!context) {
    throw new Error('useLearningLanguage must be used within LearningLanguageProvider')
  }
  return context
}

