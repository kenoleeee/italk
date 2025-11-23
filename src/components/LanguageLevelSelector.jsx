import { useTranslation } from 'react-i18next'
import { LANGUAGE_LEVELS_ARRAY } from '../constants/languageLevels'
import { MdCheck } from 'react-icons/md'

function LanguageLevelSelector({ selectedLevel, onLevelChange }) {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {LANGUAGE_LEVELS_ARRAY.map((level) => {
        const isSelected = selectedLevel === level.id
        
        return (
          <button
            key={level.id}
            onClick={() => onLevelChange(level.id)}
            className="relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              borderColor: isSelected ? level.color : 'var(--border)',
              backgroundColor: isSelected 
                ? `${level.color}15` 
                : 'var(--bg-primary)',
              opacity: isSelected ? 1 : 0.8
            }}
          >
            {/* Level Badge */}
            <div className="flex items-center justify-between mb-2">
              <div 
                className="text-lg font-bold px-3 py-1 rounded-lg"
                style={{ 
                  backgroundColor: level.color,
                  color: 'white'
                }}
              >
                {level.name}
              </div>
              {isSelected && (
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: level.color,
                    color: 'white'
                  }}
                >
                  <MdCheck className="text-sm" />
                </div>
              )}
            </div>

            {/* Level Name */}
            <div className="text-left">
              <div className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                {t(level.key)}
              </div>
              <div className="text-xs opacity-70" style={{ color: 'var(--text-secondary)' }}>
                {t(level.description)}
              </div>
            </div>

            {/* Selected Indicator */}
            {isSelected && (
              <div 
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  boxShadow: `0 0 0 3px ${level.color}40`
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default LanguageLevelSelector

