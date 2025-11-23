import { memo } from 'react'

function ChatBubble({ role = 'assistant', text, time }) {
  const isUser = role === 'user'
  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className="max-w-[80%] sm:max-w-[70%] rounded-2xl px-3 py-2 text-sm sm:text-base leading-relaxed border"
        style={{
          backgroundColor: isUser ? 'var(--accent)' : 'transparent',
          borderColor: 'var(--border)',
          color: isUser ? 'var(--bg-primary)' : 'var(--text-primary)'
        }}
      >
        <p className="whitespace-pre-wrap">{text}</p>
        {time && <div className="text-[10px] mt-1 opacity-70">{time}</div>}
      </div>
    </div>
  )
}

export default memo(ChatBubble)


