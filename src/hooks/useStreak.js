import { useState, useEffect, useCallback } from 'react'

/**
 * Hook for managing user's practice streak
 * Tracks consecutive days of practice and stores in localStorage
 */
export function useStreak() {
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('italk_streak')
    return saved ? JSON.parse(saved) : {
      current: 0,
      lastPracticeDate: null,
      longestStreak: 0,
      totalDays: 0
    }
  })

  // Check if we need to update streak on mount
  useEffect(() => {
    const checkStreak = () => {
      const today = new Date().toDateString()
      const lastDate = streak.lastPracticeDate

      if (!lastDate) {
        // First time using the app
        return
      }

      const lastPractice = new Date(lastDate).toDateString()
      const yesterday = new Date(Date.now() - 86400000).toDateString()

      if (lastPractice !== today && lastPractice !== yesterday) {
        // Streak is broken - reset to 0
        const newStreak = {
          ...streak,
          current: 0
        }
        setStreak(newStreak)
        localStorage.setItem('italk_streak', JSON.stringify(newStreak))
      }
    }

    checkStreak()
  }, []) // Only run on mount

  // Mark today as practiced
  const recordPractice = useCallback(() => {
    const today = new Date().toDateString()
    const lastDate = streak.lastPracticeDate
    
    // If already practiced today, don't increment
    if (lastDate && new Date(lastDate).toDateString() === today) {
      return streak.current
    }

    const yesterday = new Date(Date.now() - 86400000).toDateString()
    const lastPractice = lastDate ? new Date(lastDate).toDateString() : null
    
    let newCurrent = streak.current
    
    if (!lastDate) {
      // First practice ever
      newCurrent = 1
    } else if (lastPractice === yesterday) {
      // Continuing streak
      newCurrent = streak.current + 1
    } else if (lastPractice === today) {
      // Already practiced today
      newCurrent = streak.current
    } else {
      // Streak was broken, start new
      newCurrent = 1
    }

    const newStreak = {
      current: newCurrent,
      lastPracticeDate: new Date().toISOString(),
      longestStreak: Math.max(newCurrent, streak.longestStreak),
      totalDays: streak.totalDays + 1
    }

    setStreak(newStreak)
    localStorage.setItem('italk_streak', JSON.stringify(newStreak))
    
    return newCurrent
  }, [streak])

  // Reset streak (for testing)
  const resetStreak = useCallback(() => {
    const newStreak = {
      current: 0,
      lastPracticeDate: null,
      longestStreak: 0,
      totalDays: 0
    }
    setStreak(newStreak)
    localStorage.setItem('italk_streak', JSON.stringify(newStreak))
  }, [])

  return {
    current: streak.current,
    longestStreak: streak.longestStreak,
    totalDays: streak.totalDays,
    lastPracticeDate: streak.lastPracticeDate,
    recordPractice,
    resetStreak
  }
}

