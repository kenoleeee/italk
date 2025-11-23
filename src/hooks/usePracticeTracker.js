import { useCallback } from 'react'
import { useStreak } from './useStreak'
import { useWeeklyGoal } from './useWeeklyGoal'

/**
 * Combined hook for tracking all practice metrics
 * Automatically updates both streak and weekly goal
 */
export function usePracticeTracker() {
  const streak = useStreak()
  const weeklyGoal = useWeeklyGoal()

  // Record a practice session
  const recordPracticeSession = useCallback((sessionData = {}) => {
    // Update streak
    const newStreak = streak.recordPractice()
    
    // Update weekly goal
    const daysThisWeek = weeklyGoal.recordPractice()

    // Save session data
    const session = {
      timestamp: new Date().toISOString(),
      date: new Date().toDateString(),
      streak: newStreak,
      weeklyProgress: daysThisWeek,
      ...sessionData
    }

    // Add to sessions history
    const sessions = JSON.parse(localStorage.getItem('italk_sessions') || '[]')
    sessions.push(session)
    
    // Keep only last 100 sessions
    const recentSessions = sessions.slice(-100)
    localStorage.setItem('italk_sessions', JSON.stringify(recentSessions))

    return {
      streak: newStreak,
      weeklyProgress: daysThisWeek,
      session
    }
  }, [streak, weeklyGoal])

  // Get total sessions count
  const getTotalSessions = useCallback(() => {
    const sessions = JSON.parse(localStorage.getItem('italk_sessions') || '[]')
    return sessions.length
  }, [])

  // Get sessions for today
  const getTodaySessions = useCallback(() => {
    const sessions = JSON.parse(localStorage.getItem('italk_sessions') || '[]')
    const today = new Date().toDateString()
    return sessions.filter(s => s.date === today)
  }, [])

  return {
    // Streak data
    streak: streak.current,
    longestStreak: streak.longestStreak,
    totalDays: streak.totalDays,
    
    // Weekly goal data
    weeklyProgress: weeklyGoal.daysCompleted,
    weeklyGoal: weeklyGoal.goal,
    weeklyProgressPercent: weeklyGoal.progress,
    weeklyGoalCompleted: weeklyGoal.isCompleted,
    
    // Actions
    recordPracticeSession,
    getTotalSessions,
    getTodaySessions,
    setWeeklyGoal: weeklyGoal.setGoal,
    
    // Reset functions (for testing)
    resetStreak: streak.resetStreak,
    resetWeeklyGoal: weeklyGoal.resetWeeklyGoal
  }
}

