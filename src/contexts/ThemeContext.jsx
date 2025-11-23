import { createContext, useState, useEffect, useMemo, useCallback } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    
    // Default to system
    return 'system'
  })

  const [actualTheme, setActualTheme] = useState('dark')

  useEffect(() => {
    const root = document.documentElement

    const applyTheme = (themeToApply) => {
      if (themeToApply === 'light') {
        root.classList.remove('dark')
        root.classList.add('light')
        setActualTheme('light')
      } else {
        root.classList.remove('light')
        root.classList.add('dark')
        setActualTheme('dark')
      }
    }

    if (theme === 'system') {
      // Check system preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      applyTheme(mediaQuery.matches ? 'dark' : 'light')

      // Listen for system theme changes
      const handler = (e) => applyTheme(e.matches ? 'dark' : 'light')
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      applyTheme(theme)
    }
  }, [theme])

  // Memoize changeTheme function
  const changeTheme = useCallback((newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ 
    theme, 
    actualTheme,
    changeTheme 
  }), [theme, actualTheme, changeTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

