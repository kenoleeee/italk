import { memo } from 'react'

function MicrophoneButton({ isActive, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 transition-all ${
        disabled
          ? 'bg-transparent border-accent/30 opacity-50 cursor-not-allowed'
          : isActive
          ? 'bg-accent border-accent shadow-lg shadow-accent/50'
          : 'bg-transparent border-accent hover:border-white/60'
      }`}
      aria-label={isActive ? 'Stop recording' : 'Start recording'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    </button>
  )
}

export default memo(MicrophoneButton)

