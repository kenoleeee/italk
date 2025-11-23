import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LearningLanguageProvider } from './contexts/LearningLanguageContext'
import LoadingScreen from './components/LoadingScreen'
import BottomNavigation from './components/BottomNavigation'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/homePage'))
const ChatPage = lazy(() => import('./pages/ChatPage'))
const VoicePage = lazy(() => import('./pages/VoicePage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))

function AppContent() { 
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <LearningLanguageProvider>
        <div className="min-h-screen min-w-screen bg-background">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/voice" element={<VoicePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Suspense>
          {!isLoading && <BottomNavigation />}
        </div>
      </LearningLanguageProvider>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
