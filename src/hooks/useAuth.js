/**
 * useAuth Hook
 * Manages authentication state
 */

import { useState, useEffect } from 'react'
import { authService } from '../services/authService'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setIsAuthenticated(!!currentUser)
    setLoading(false)
  }, [])

  const login = (decoded) => {
    const user = authService.loginWithGoogle(decoded)
    setUser(user)
    setIsAuthenticated(true)
    return user
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  }
}
