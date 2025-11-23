import { GoogleGenerativeAI } from '@google/generative-ai'
import { getLanguageLearningPrompt, getVoicePracticePrompt } from './prompts'

class GeminiService {
  constructor() {
    this.chat = null
    this.model = null
    this.history = []
    this.genAI = null
  }

  // Get API key from localStorage or environment
  getApiKey() {
    // First check localStorage (user's own key)
    const userApiKey = localStorage.getItem('italk_gemini_api_key')
    if (userApiKey && userApiKey.trim()) {
      return userApiKey.trim()
    }
    
    // Fallback to environment variable
    const envApiKey = import.meta.env.VITE_GEMINI_API_KEY || ''
    return envApiKey
  }

  // Initialize GoogleGenerativeAI instance
  initializeGenAI() {
    const apiKey = this.getApiKey()
    if (!apiKey || apiKey === 'your_api_key_here') {
      return null
    }
    this.genAI = new GoogleGenerativeAI(apiKey)
    return this.genAI
  }

  // Initialize chat session
  async initChat(userLanguage = 'English', topics = [], languageLevel = 'A2', isVoiceMode = false) {
    const genAI = this.initializeGenAI()
    
    if (!genAI) {
      throw new Error('Gemini API key not configured. Please add your API key in Settings.')
    }

    try {
      // Get the generative model
      this.model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        generationConfig: {
          temperature: 0.85, // Higher for more natural, conversational responses
          topK: 40,          
          topP: 0.9,         
          maxOutputTokens: isVoiceMode ? 100 : 200, // Shorter for voice
        },
      })

      // Get appropriate prompt based on mode and level
      const basePrompt = isVoiceMode 
        ? getVoicePracticePrompt(languageLevel)
        : getLanguageLearningPrompt(languageLevel)

      // Create custom system message for this session
      const customPrompt = `${basePrompt}

Current chat: Practicing ${userLanguage}. Topic: ${topics.length > 0 ? topics[0] : 'anything'}.
Remember: User's proficiency level is ${languageLevel}.
Start casual!`

      // Start chat with history
      this.chat = this.model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: customPrompt }],
          },
          {
            role: 'model',
            parts: [{ text: `Got it! I'll adapt to ${languageLevel} level and keep the convo flowing 😊` }],
          },
        ],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: isVoiceMode ? 100 : 200,
        },
      })

      return true
    } catch (error) {
      console.error('Error initializing Gemini chat:', error)
      throw error
    }
  }

  // Send message and get response
  async sendMessage(message) {
    if (!this.chat) {
      throw new Error('Chat not initialized. Call initChat() first.')
    }

    try {
      const result = await this.chat.sendMessage(message)
      const response = await result.response
      const text = response.text()
      
      // Store in history
      this.history.push(
        { role: 'user', text: message },
        { role: 'assistant', text }
      )

      return text
    } catch (error) {
      console.error('Error sending message to Gemini:', error)
      throw error
    }
  }

  // Get chat history
  getHistory() {
    return this.history
  }

  // Clear chat history and start new session
  resetChat() {
    this.chat = null
    this.history = []
  }

  // Check if API is configured
  isConfigured() {
    const apiKey = this.getApiKey()
    return !!apiKey && apiKey !== 'your_api_key_here' && apiKey.trim().length > 0
  }
}

// Export singleton instance
export default new GeminiService()

