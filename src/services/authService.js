/**
 * Authentication Service
 * Handles login, logout, and session management
 */

import { STORAGE_KEYS, ROLES } from '../utils/constants'
import { UserModel } from '../utils/models'

class AuthService {
  constructor() {
    this.currentUser = null
    this.init()
  }

  init() {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION)
    if (session) {
      try {
        this.currentUser = JSON.parse(session)
      } catch {
        this.logout()
      }
    }
  }

  /**
   * Login with Google credential
   */
  loginWithGoogle(decoded) {
    const user = UserModel.create({
      name: decoded.name || decoded.email,
      email: decoded.email,
      role: ROLES.PHYSIO,
      avatar: decoded.picture,
    })
    
    this.currentUser = user
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user))
    
    return user
  }

  /**
   * Get current authenticated user
   */
  getCurrentUser() {
    return this.currentUser
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.currentUser
  }

  /**
   * Logout user
   */
  logout() {
    this.currentUser = null
    localStorage.removeItem(STORAGE_KEYS.SESSION)
  }

  /**
   * Get user role
   */
  getUserRole() {
    return this.currentUser?.role || null
  }

  /**
   * Check if user has specific role
   */
  hasRole(role) {
    return this.currentUser?.role === role
  }
}

export const authService = new AuthService()
