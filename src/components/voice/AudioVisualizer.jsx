import { useEffect, useState, memo } from 'react'

function AudioVisualizer({ isActive }) {
  const [bars, setBars] = useState([0, 0, 0, 0, 0])

  useEffect(() => {
    if (!isActive) {
      setBars([0, 0, 0, 0, 0])
      return
    }

    const interval = setInterval(() => {
      setBars([
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ])
    }, 100)

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 h-32 sm:h-40">
      {bars.map((height, index) => (
        <div
          key={index}
          className="w-4 sm:w-6 bg-accent rounded-full transition-all duration-100"
          style={{
            height: isActive ? `${Math.max(height, 20)}%` : '20%',
            opacity: isActive ? 0.8 : 0.3,
          }}
        />
      ))}
    </div>
  )
}

export default memo(AudioVisualizer)

