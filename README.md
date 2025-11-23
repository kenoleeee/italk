# 🌟 iTalk - AI Language Learning Platform

**Practice languages naturally with AI-powered conversations**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%20AI-4285F4)](https://ai.google.dev/)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red)](https://opensource.org/)
[![GitHub](https://img.shields.io/badge/GitHub-kenoleeee-181717?logo=github)](https://github.com/kenoleeee/italk)

> An open-source, privacy-first language learning app that uses Google's Gemini AI to provide personalized conversational practice. No accounts, no tracking, just learning.

---

## 📖 Read in Other Languages

🇬🇧 [English](README.md) | 🇷🇺 [Русский](README.ru.md) | 🇺🇦 [Українська](README.ua.md) | 🇨🇳 [中文](README.zh.md)

---

## ✨ Features

### 🎯 Core Features
- 💬 **AI Chat Practice** - Natural conversations adapted to your level
- 🎤 **Voice Practice** - Real-time speech recognition and synthesis
- 🔥 **Streak Tracking** - Stay motivated with daily practice streaks
- 📅 **Weekly Goals** - Set and track weekly practice targets
- 🎓 **Adaptive Learning** - AI adjusts to your CEFR level (A1-C2)
- 🌍 **50+ Languages** - Learn any language supported by Gemini

### 🎨 User Experience
- ✨ **Beautiful UI** - Modern, responsive design
- 🌓 **Dark/Light Mode** - Comfortable in any lighting
- 📱 **Mobile First** - Perfect on phones, tablets, and desktops
- 🚀 **Lightning Fast** - Built with Vite for instant loading
- 🔒 **Privacy First** - No accounts, no servers, no tracking

### 🎯 Smart Features
- 📊 **Progress Tracking** - Visual streak and goal progress
- 🎲 **Topic Variety** - Practice with diverse conversation topics
- 💡 **Level-Aware AI** - Vocabulary and grammar adjusted to your level
- 🗣️ **Natural Conversations** - Casual, friendly AI responses

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Gemini API Key** ([Get free key](https://ai.google.dev/))

### Installation

```bash
# Clone the repository
git clone https://github.com/kenoleeee/italk.git
cd italk

# Install dependencies
npm install

# Start development server
npm run dev
```

### ⚠️ Important: API Key Setup

**This is an open-source project.** Users add their own API keys through the app:

1. Open the app at `http://localhost:5173`
2. Go to **Settings** ⚙️
3. Add your **Gemini API key**
4. Start practicing!

#### Get Your Free API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Copy your key
4. Paste it in Settings

> **Privacy Note:** Your API key is stored locally in your browser and never sent anywhere except to Google's Gemini API.

---

## 📖 How to Use

### 1️⃣ Configure Your Settings

Navigate to **Settings** page:

- 🔑 **Add API Key** - Required for first use
- 🌍 **Learning Language** - What language you want to learn
- 🎓 **Proficiency Level** - A1 (Beginner) to C2 (Proficient)
- 🌓 **Theme** - Light, Dark, or System
- 🗣️ **Interface Language** - English, Russian, Spanish, French, German

### 2️⃣ Choose Practice Mode

**Chat Mode** 💬
- Type messages to practice writing
- Get instant AI feedback
- Build vocabulary and grammar
- Perfect for beginners

**Voice Mode** 🎤
- Speak naturally with AI
- Practice pronunciation
- Improve listening skills
- Real-time speech recognition

### 3️⃣ Stay Motivated

**Daily Streak** 🔥
- Practice every day to build your streak
- Track your longest streak
- Visual progress indicators

**Weekly Goals** 📅
- Set practice goals (default: 7 days/week)
- See your weekly progress
- Celebrate achievements

---

## 🎓 CEFR Levels Explained

The app adapts to your Common European Framework of Reference (CEFR) level:

| Level | Name | Description | AI Behavior |
|-------|------|-------------|-------------|
| **A1** | Beginner | Basic words and phrases | Simplest vocabulary, short sentences, slow speech |
| **A2** | Elementary | Simple everyday topics | Common phrases, simple grammar, clear speech |
| **B1** | Intermediate | Familiar topics independently | Standard vocabulary, various tenses, natural pace |
| **B2** | Upper Intermediate | Complex and abstract ideas | Advanced vocabulary, nuanced expression |
| **C1** | Advanced | Fluent and professional | Sophisticated language, idioms, full speed |
| **C2** | Proficient | Near-native mastery | Native-like complexity, subtle meanings |

---

## 🛠️ Technology Stack

### Frontend
- ⚛️ **React 19** - UI library
- ⚡ **Vite 7** - Build tool and dev server
- 🎨 **Tailwind CSS 4** - Utility-first styling
- 🧭 **React Router v7** - Client-side routing

### AI & Features
- 🤖 **Google Gemini 2.5 Flash** - AI conversations
- 🎤 **Web Speech API** - Voice recognition & synthesis
- 🌐 **i18next** - Internationalization
- 💾 **localStorage** - Client-side data storage

### Developer Tools
- 📦 **npm** - Package manager
- 🔧 **ESLint** - Code linting
- 🎯 **Modern JavaScript** - ES6+ features

---

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

Output: `dist/` directory with optimized static files.

### Deploy Options

#### 🔷 Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### 🟢 Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

#### 📄 GitHub Pages

```bash
npm run build
npx gh-pages -d dist
```

#### ☁️ Any Static Host

Upload the `dist/` folder to:
- Cloudflare Pages
- Firebase Hosting
- AWS S3 + CloudFront
- DigitalOcean App Platform

### Environment Variables

**For Public Deployment:**
- ❌ DO NOT include API keys in `.env`
- ✅ Users add their own keys in Settings

**For Private/Development:**
```bash
VITE_GEMINI_API_KEY=your_key_here  # Optional fallback
```

---

## 🎨 Customization

### Add New Learning Language

```javascript
// src/constants/languages.js
export const LANGUAGE_NAMES = {
  en: 'English',
  es: 'Español',
  jp: '日本語',  // Add your language
  // ...
}
```

### Customize AI Personality

```javascript
// src/constants/languageLevels.js
export const LANGUAGE_LEVELS = [
  {
    level: 'A1',
    aiInstructions: 'Your custom AI instructions...'
  }
]
```

### Add New UI Language

1. Create translation file:
```json
// src/i18n/locales/jp.json
{
  "common": {
    "appName": "italk.",
    "send": "送信"
  }
  // ... more translations
}
```

2. Import in `i18n/config.js`:
```javascript
import jp from './locales/jp.json'

resources: {
  jp: { translation: jp }
}
```

### Change Theme Colors

```css
/* src/index.css */
:root {
  --accent: #your-color;
  --bg-primary: #your-bg;
}
```

---

## 🔐 Privacy & Data

### What We DON'T Collect
- ❌ No user accounts
- ❌ No personal information
- ❌ No analytics or tracking
- ❌ No cookies (except localStorage)
- ❌ No backend servers

### What's Stored Locally

All data stays in your browser's `localStorage`:

| Key | Purpose | Example |
|-----|---------|---------|
| `italk_gemini_api_key` | Your Gemini API key | `AIza...` |
| `learningLanguage` | Language you're learning | `spanish` |
| `italk_language_level` | Your proficiency level | `B1` |
| `italk_streak` | Streak tracking data | `{ current: 5, longest: 10 }` |
| `italk_weekly_goal` | Weekly practice goals | `{ daysCompleted: 3, goal: 7 }` |
| `italk_sessions` | Practice session history | `[...]` |
| `theme` | UI theme preference | `dark` |
| `i18nextLng` | Interface language | `en` |

### Clear Your Data

Settings → Browser Developer Tools → Application → Storage → Clear

---

## 🌍 Supported Languages

### Interface Languages (5)
- 🇬🇧 English
- 🇷🇺 Русский (Russian)
- 🇪🇸 Español (Spanish)
- 🇫🇷 Français (French)
- 🇩🇪 Deutsch (German)

### Learning Languages (50+)

Practice any language supported by Gemini AI:

**European:**
English, Spanish, French, German, Italian, Portuguese, Russian, Polish, Dutch, Swedish, Norwegian, Danish, Finnish, Czech, Greek, Turkish

**Asian:**
Chinese (Mandarin & Cantonese), Japanese, Korean, Hindi, Arabic, Hebrew, Thai, Vietnamese, Indonesian, Tagalog

**And many more!**

---

## 🤝 Contributing

We welcome contributions! Here's how:

### Quick Contribution

1. **Fork** the repo
2. **Create** feature branch: `git checkout -b feature/AmazingFeature`
3. **Commit** changes: `git commit -m 'Add AmazingFeature'`
4. **Push** branch: `git push origin feature/AmazingFeature`
5. **Open** Pull Request

### Contribution Ideas

**Features:**
- [ ] 📊 Advanced progress analytics
- [ ] 📚 Vocabulary flashcards
- [ ] 🎯 Grammar exercises
- [ ] 🏆 Achievement badges
- [ ] 📱 PWA / Offline mode
- [ ] 🔄 Import/Export data
- [ ] 🎨 More themes
- [ ] 🌐 More UI languages

**Improvements:**
- [ ] Better AI prompts for specific languages
- [ ] Voice synthesis improvements
- [ ] Mobile UX enhancements
- [ ] Accessibility (a11y) improvements
- [ ] Performance optimizations

**Documentation:**
- [ ] Video tutorials
- [ ] More language guides
- [ ] API documentation
- [ ] Contribution guidelines

---

## 📝 License

**MIT License** - See [LICENSE](LICENSE) file for details.

You are free to:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Private use

---

## 🙏 Acknowledgments

Built with amazing open-source tools:

- [Google Gemini AI](https://ai.google.dev/) - Conversational AI
- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Router](https://reactrouter.com/) - Routing
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [i18next](https://www.i18next.com/) - Internationalization

---

## 💬 Support & Community

### Need Help?

- 📖 **Documentation**: You're reading it!
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/kenoleeee/italk/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/kenoleeee/italk/discussions)
- 📧 **Email**: support@italk.app

### Stay Updated

- ⭐ **Star** this repo to show support
- 👀 **Watch** for updates
- 🍴 **Fork** to create your own version

---

## 📊 Project Roadmap

### ✅ Completed (v1.0)
- [x] Chat and voice practice modes
- [x] Multi-language support (5 interface languages)
- [x] CEFR level adaptation
- [x] Dark/light theme
- [x] Streak tracking
- [x] Weekly goals
- [x] Open-source release

---

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=kenoleeee/italk&type=Date)](https://star-history.com/#kenoleeee/italk&Date)

---

## 🎯 Why iTalk?

### For Learners
- 🆓 **Free & Open Source** - No subscriptions or fees
- 🔒 **Private** - Your data never leaves your device
- 🎓 **Adaptive** - Grows with your skill level
- 🌍 **Flexible** - Learn any language, anytime

### For Developers
- 📖 **Well-documented** - Easy to understand and modify
- 🛠️ **Modern Stack** - Latest React, Vite, Tailwind
- 🧩 **Modular** - Clean architecture, easy to extend
- 🤝 **Community-driven** - Welcoming contributions

### For Educators
- 🎓 **Pedagogically Sound** - Based on CEFR framework
- 📊 **Track Progress** - Visual indicators for motivation
- 🎯 **Topic-based** - Realistic conversation scenarios
- 🔧 **Customizable** - Adapt to your teaching style

---

## ❓ FAQ

### Is iTalk really free?

Yes! iTalk is 100% free and open-source. You only need a free Gemini API key from Google.

### Do I need to create an account?

No! iTalk works without any accounts. Just add your API key and start learning.

### Is my data safe?

Absolutely. All data stays in your browser. We don't have servers, so we literally can't access your data.

### Can I use this offline?

Currently, you need internet for AI features. Offline mode is planned for future versions.

### Which browsers are supported?

- ✅ Chrome/Edge (best for voice features)
- ✅ Firefox (limited voice support)
- ✅ Safari (limited voice support)
- ✅ Mobile browsers

### How much does the Gemini API cost?

Gemini has a generous free tier. For most users, it's completely free. See [Google's pricing](https://ai.google.dev/pricing).

### Can I contribute?

Yes! We welcome all contributions. See the [Contributing](#-contributing) section.

---

**Made with ❤️ by language learners, for language learners**

Created by [Timur (kenol)](https://github.com/kenoleeee)

[⭐ Star this repo](https://github.com/kenoleeee/italk) • [🐛 Report Bug](https://github.com/kenoleeee/italk/issues) • [💡 Request Feature](https://github.com/kenoleeee/italk/discussions)
