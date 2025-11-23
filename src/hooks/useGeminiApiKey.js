import { useState, useEffect, useCallback } from 'react'

/**
 * Hook for managing Gemini API key in localStorage
 */
export function useGeminiApiKey() {
  const [apiKey, setApiKeyState] = useState(() => {
    return localStorage.getItem('italk_gemini_api_key') || ''
  })

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('italk_gemini_api_key', apiKey)
    } else {
      localStorage.removeItem('italk_gemini_api_key')
    }
  }, [apiKey])

  const setApiKey = useCallback((key) => {
    setApiKeyState(key.trim())
  }, [])

  const clearApiKey = useCallback(() => {
    setApiKeyState('')
    localStorage.removeItem('italk_gemini_api_key')
  }, [])

  const isConfigured = useCallback(() => {
    return apiKey && apiKey.length > 0
  }, [apiKey])

  return {
    apiKey,
    setApiKey,
    clearApiKey,
    isConfigured: isConfigured()
  }
}

