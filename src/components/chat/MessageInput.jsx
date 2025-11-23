import { useState, useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'

function MessageInput({ onSend, isLoading }) {
  const { t } = useTranslation()
  const [value, setValue] = useState('')

  const handleSend = useCallback(() => {
    const text = value.trim()
    if (!text || isLoading) return
    onSend?.(text)
    setValue('')
  }, [value, isLoading, onSend])

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  return (
    <div className="w-full max-w-[1024px] mx-auto px-3 sm:px-4 py-3">
      <div className="relative flex items-end gap-2 border rounded-2xl p-2 bg-transparent" style={{ borderColor: 'var(--border)' }}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder={isLoading ? t('chat.placeholderLoading') : t('chat.placeholder')}
          disabled={isLoading}
          className="min-h-[44px] max-h-[160px] flex-1 bg-transparent outline-none resize-none text-sm sm:text-base py-2 px-2 disabled:opacity-50"
          style={{ color: 'var(--text-primary)' }}
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || isLoading}
          className="shrink-0 px-3 py-2 rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border transition-all"
          style={{
            backgroundColor: !value.trim() || isLoading ? 'var(--bg-secondary)' : 'var(--accent)',
            borderColor: 'var(--border)',
            color: !value.trim() || isLoading ? 'var(--text-secondary)' : 'var(--bg-primary)'
          }}
          onMouseEnter={(e) => {
            if (value.trim() && !isLoading) {
              e.currentTarget.style.opacity = '0.9'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1'
          }}
        >
          {isLoading ? '...' : t('common.send')}
        </button>
      </div>
    </div>
  )
}

export default memo(MessageInput)


