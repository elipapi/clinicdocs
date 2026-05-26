import { useState, useEffect } from 'react'
import { useAuth } from './hooks'
import { AppLayout } from './layouts/AppLayout'
import { Login } from './pages/Login'
import {
  Dashboard,
  Patients,
  Sessions,
  Reports,
  Settings,
} from './pages'
import './App.css'

function App() {
  const { user, isAuthenticated, loading, login, logout } = useAuth()
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    if (isAuthenticated && !user) {
      setCurrentPage('dashboard')
    }
  }, [isAuthenticated, user])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    const handleLogin = (decoded) => {
      try {
        login(decoded)
        setLoginError('')
      } catch (error) {
        setLoginError('Failed to sign in. Please try again.')
      }
    }

    return <Login onLogin={handleLogin} error={loginError} />
  }

  // Render authenticated app
  return (
    <AppLayout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      user={user}
      onLogout={logout}
    >
      {currentPage === 'dashboard' && <Dashboard onNavigatePage={setCurrentPage} />}
      {currentPage === 'patients' && <Patients />}
      {currentPage === 'sessions' && <Sessions />}
      {currentPage === 'reports' && <Reports />}
      {currentPage === 'settings' && <Settings onLogout={logout} />}
    </AppLayout>
  )
}

export default App