# Contributing to iTalk

First off, thank you for considering contributing to iTalk! 🎉

It's people like you that make iTalk such a great tool for language learners worldwide.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by respect, inclusivity, and constructive communication. By participating, you are expected to uphold these values.

## 🤔 How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues to avoid duplicates.

**When reporting bugs, include:**
- Clear, descriptive title
- Steps to reproduce the behavior
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser/OS information
- Console errors (if any)

### Suggesting Features 💡

We love new ideas! Before suggesting:
- Check if the feature already exists
- Check existing feature requests
- Think about how it benefits most users

**When suggesting features, include:**
- Clear use case
- Why it's important
- How it should work
- Mockups or examples (optional)

### Improving Documentation 📖

Documentation improvements are always welcome:
- Fix typos or unclear instructions
- Add examples
- Translate to new languages
- Improve code comments

### Writing Code 💻

See [Development Process](#development-process) below.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**
```bash
# Click 'Fork' button on GitHub
```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/italk.git
   cd italk
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/kenoleeee/italk.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create .env file**
   ```bash
   echo "VITE_GEMINI_API_KEY=your_test_key" > .env
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Development Process

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `style/` - Code style/formatting
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Build the project
npm run build

# Check for linting errors
npm run lint

# Test in browser
npm run dev
```

**Manual testing checklist:**
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Works in Chrome/Firefox/Safari
- [ ] Mobile responsive
- [ ] Dark/Light mode works
- [ ] Translations work (if UI changes)

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

**Commit message format:**
```
type: short description

Longer description if needed

Closes #123
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

Go to GitHub and create a Pull Request from your fork to the main repository.

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review of code
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Tested in multiple browsers
- [ ] UI changes work in dark/light mode

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Before/After screenshots

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested on multiple browsers
```

### Review Process

1. Maintainers will review your PR
2. They may request changes
3. Make requested changes and push again
4. Once approved, it will be merged!

## 📝 Style Guidelines

### JavaScript/React

```javascript
// Use functional components
function MyComponent() {
  // Use descriptive names
  const [isLoading, setIsLoading] = useState(false)
  
  // Use useCallback for functions
  const handleClick = useCallback(() => {
    // Do something
  }, [])
  
  return <div>Content</div>
}

// Export at bottom
export default MyComponent
```

### File Organization

```
src/
├── components/      # Reusable UI components
├── pages/           # Page components
├── hooks/           # Custom hooks
├── contexts/        # React contexts
├── services/        # API/external services
├── constants/       # Constants and configs
├── i18n/           # Translations
└── utils/          # Utility functions
```

### CSS/Tailwind

```javascript
// Use Tailwind classes
<div className="flex items-center gap-4 p-6 rounded-2xl">
  {/* Content */}
</div>

// Use CSS variables for colors
style={{ 
  backgroundColor: 'var(--bg-primary)',
  color: 'var(--text-primary)'
}}
```

### Naming Conventions

- **Components**: PascalCase (`MyComponent.jsx`)
- **Hooks**: camelCase with 'use' prefix (`useMyHook.js`)
- **Constants**: UPPER_SNAKE_CASE (`MY_CONSTANT`)
- **Functions**: camelCase (`myFunction`)
- **CSS Classes**: kebab-case (from Tailwind)

## 🌍 Adding Translations

### Add New UI Language

1. Create translation file:
   ```bash
   src/i18n/locales/pt.json  # Portuguese example
   ```

2. Copy structure from `en.json`:
   ```json
   {
     "common": {
       "appName": "italk.",
       "send": "Enviar"
     }
   }
   ```

3. Import in `src/i18n/config.js`:
   ```javascript
   import pt from './locales/pt.json'
   
   resources: {
     pt: { translation: pt }
   }
   ```

4. Update `SettingsPage.jsx` with new language option

## 🧪 Testing Guidelines

While we don't have automated tests yet, manual testing is crucial:

### Test Checklist

**API Key Flow:**
- [ ] App prompts for API key when not set
- [ ] Can save API key in Settings
- [ ] Chat works after adding key
- [ ] Voice works after adding key
- [ ] Clear error messages without key

**Streak & Goals:**
- [ ] Streak increments on practice
- [ ] Weekly goal updates correctly
- [ ] Progress displays accurately
- [ ] Streak doesn't increment twice same day

**Multi-language:**
- [ ] Interface language changes work
- [ ] Learning language selection works
- [ ] All UI strings translated
- [ ] No missing translations

**Themes:**
- [ ] Light mode displays correctly
- [ ] Dark mode displays correctly
- [ ] System theme follows OS
- [ ] All colors use CSS variables

**Responsive:**
- [ ] Works on mobile (< 640px)
- [ ] Works on tablet (640-1024px)
- [ ] Works on desktop (> 1024px)
- [ ] Navigation adapts to screen size

## 🐛 Debugging Tips

### Common Issues

**API Key Not Working:**
```javascript
// Check in browser console
localStorage.getItem('italk_gemini_api_key')

// Check service
import geminiService from './services/geminiService'
console.log(geminiService.isConfigured())
```

**Translations Missing:**
```javascript
// Check current language
localStorage.getItem('i18nextLng')

// Check translation key
import { useTranslation } from 'react-i18next'
const { t } = useTranslation()
console.log(t('your.key.here'))
```

## 🤝 Community

### Getting Help

- 💬 **Discussions**: [GitHub Discussions](https://github.com/kenoleeee/italk/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/kenoleeee/italk/issues)
- 📧 **Email**: support@italk.app

### Code Review Process

1. **Be respectful** - Everyone is learning
2. **Be specific** - Point out exact issues
3. **Be constructive** - Suggest improvements
4. **Be timely** - Review within a few days

### Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Given credit in commits

---

## 📚 Resources

### Learn React
- [Official React Docs](https://react.dev/)
- [React Hooks Guide](https://react.dev/reference/react)

### Learn Tailwind
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind Components](https://tailwindui.com/)

### Learn Gemini API
- [Gemini API Docs](https://ai.google.dev/docs)
- [Gemini Quickstart](https://ai.google.dev/tutorials/web_quickstart)

---

## ✨ Thank You!

Your contributions make iTalk better for everyone. Whether it's:
- 🐛 Fixing a bug
- ✨ Adding a feature
- 📖 Improving docs
- 🌍 Adding translations
- 💡 Suggesting ideas

**Every contribution matters!** 🎉

Happy coding! 💻

---

**Questions?** Open a [discussion](https://github.com/kenoleeee/italk/discussions) or [issue](https://github.com/kenoleeee/italk/issues).

