import { useState, useEffect, useCallback } from 'react'

/**
 * Hook for managing weekly practice goals
 * Tracks days practiced this week and stores in localStorage
 */
export function useWeeklyGoal(goalDays = 7) {
  const [weeklyData, setWeeklyData] = useState(() => {
    const saved = localStorage.getItem('italk_weekly_goal')
    return saved ? JSON.parse(saved) : {
      weekStart: getWeekStart(),
      daysCompleted: [],
      goal: goalDays
    }
  })

  // Get start of current week (Monday)
  function getWeekStart() {
    const now = new Date()
    const day = now.getDay()
    const diff = now.getDate() - day + (day === 0 ? -6 : 1) // Adjust to Monday
    const monday = new Date(now.setDate(diff))
    monday.setHours(0, 0, 0, 0)
    return monday.toISOString()
  }

  // Check if we need to reset weekly data
  useEffect(() => {
    const checkWeek = () => {
      const currentWeekStart = getWeekStart()
      
      if (weeklyData.weekStart !== currentWeekStart) {
        // New week started - reset
        const newData = {
          weekStart: currentWeekStart,
          daysCompleted: [],
          goal: weeklyData.goal
        }
        setWeeklyData(newData)
        localStorage.setItem('italk_weekly_goal', JSON.stringify(newData))
      }
    }

    checkWeek()
  }, [weeklyData.weekStart, weeklyData.goal])

  // Record practice for today
  const recordPractice = useCallback(() => {
    const today = new Date().toDateString()
    
    // If already recorded today, don't add again
    if (weeklyData.daysCompleted.includes(today)) {
      return weeklyData.daysCompleted.length
    }

    const newData = {
      ...weeklyData,
      daysCompleted: [...weeklyData.daysCompleted, today]
    }

    setWeeklyData(newData)
    localStorage.setItem('italk_weekly_goal', JSON.stringify(newData))
    
    return newData.daysCompleted.length
  }, [weeklyData])

  // Set new goal
  const setGoal = useCallback((newGoal) => {
    const newData = {
      ...weeklyData,
      goal: newGoal
    }
    setWeeklyData(newData)
    localStorage.setItem('italk_weekly_goal', JSON.stringify(newData))
  }, [weeklyData])

  // Reset weekly data (for testing)
  const resetWeeklyGoal = useCallback(() => {
    const newData = {
      weekStart: getWeekStart(),
      daysCompleted: [],
      goal: goalDays
    }
    setWeeklyData(newData)
    localStorage.setItem('italk_weekly_goal', JSON.stringify(newData))
  }, [goalDays])

  const daysCompleted = weeklyData.daysCompleted.length
  const progress = Math.round((daysCompleted / weeklyData.goal) * 100)

  return {
    daysCompleted,
    goal: weeklyData.goal,
    progress,
    isCompleted: daysCompleted >= weeklyData.goal,
    recordPractice,
    setGoal,
    resetWeeklyGoal
  }
}

