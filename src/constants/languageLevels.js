/**
 * CEFR Language Proficiency Levels
 * Common European Framework of Reference for Languages
 */

export const LANGUAGE_LEVELS = {
  A1: {
    id: 'A1',
    name: 'A1',
    key: 'levels.a1',
    description: 'levels.a1Description',
    order: 1,
    color: '#10b981', // green
    aiInstructions: 'Use very simple vocabulary and short sentences. Speak slowly and clearly. Use present tense mostly. Avoid complex grammar structures.'
  },
  A2: {
    id: 'A2',
    name: 'A2',
    key: 'levels.a2',
    description: 'levels.a2Description',
    order: 2,
    color: '#3b82f6', // blue
    aiInstructions: 'Use simple vocabulary and basic sentence structures. Introduce simple past and future tenses. Use common everyday expressions.'
  },
  B1: {
    id: 'B1',
    name: 'B1',
    key: 'levels.b1',
    description: 'levels.b1Description',
    order: 3,
    color: '#8b5cf6', // purple
    aiInstructions: 'Use standard vocabulary with some less common words. Use various tenses. Introduce more complex sentence structures. Discuss concrete and some abstract topics.'
  },
  B2: {
    id: 'B2',
    name: 'B2',
    key: 'levels.b2',
    description: 'levels.b2Description',
    order: 4,
    color: '#f59e0b', // amber
    aiInstructions: 'Use a wide range of vocabulary including idiomatic expressions. Use complex grammar structures. Discuss abstract topics and nuanced ideas. Speak at normal native speed.'
  },
  C1: {
    id: 'C1',
    name: 'C1',
    key: 'levels.c1',
    description: 'levels.c1Description',
    order: 5,
    color: '#ef4444', // red
    aiInstructions: 'Use advanced vocabulary and sophisticated expressions. Use complex grammar naturally. Discuss abstract and specialized topics. Include subtle nuances and cultural references.'
  },
  C2: {
    id: 'C2',
    name: 'C2',
    key: 'levels.c2',
    description: 'levels.c2Description',
    order: 6,
    color: '#dc2626', // dark red
    aiInstructions: 'Use native-level vocabulary including rare words and expressions. Use all grammar structures naturally. Discuss any topic with precision and nuance. Include idioms and cultural subtleties.'
  }
}

export const LANGUAGE_LEVELS_ARRAY = Object.values(LANGUAGE_LEVELS).sort((a, b) => a.order - b.order)

export const getLanguageLevel = (levelId) => {
  return LANGUAGE_LEVELS[levelId] || LANGUAGE_LEVELS.A1
}

export const getAIInstructions = (levelId) => {
  const level = getLanguageLevel(levelId)
  return level.aiInstructions
}

export const DEFAULT_LANGUAGE_LEVEL = 'A2'

