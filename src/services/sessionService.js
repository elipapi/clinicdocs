/**
 * Session Service
 * Manages session data operations
 */

import { STORAGE_KEYS } from '../utils/constants'
import { SessionModel } from '../utils/models'

class SessionService {
  constructor() {
    this.sessions = this.loadSessions()
  }

  /**
   * Load sessions from storage
   */
  loadSessions() {
    const stored = localStorage.getItem(STORAGE_KEYS.SESSIONS)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return []
      }
    }
    return []
  }

  /**
   * Save sessions to storage
   */
  saveSessions() {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(this.sessions))
  }

  /**
   * Get all sessions
   */
  getAllSessions() {
    return [...this.sessions]
  }

  /**
   * Get sessions for a patient
   */
  getSessionsByPatientId(patientId) {
    return this.sessions.filter((s) => s.patientId === patientId)
  }

  /**
   * Get session by ID
   */
  getSessionById(id) {
    return this.sessions.find((s) => s.id === id)
  }

  /**
   * Create new session
   */
  createSession(data) {
    const session = SessionModel.create(data)
    this.sessions.push(session)
    this.saveSessions()
    return session
  }

  /**
   * Update session
   */
  updateSession(id, data) {
    const session = this.sessions.find((s) => s.id === id)
    if (!session) return null

    Object.assign(session, data)
    this.saveSessions()
    return session
  }

  /**
   * Delete session
   */
  deleteSession(id) {
    const index = this.sessions.findIndex((s) => s.id === id)
    if (index === -1) return false

    this.sessions.splice(index, 1)
    this.saveSessions()
    return true
  }

  /**
   * Get recent sessions
   */
  getRecentSessions(limit = 10) {
    return this.sessions
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, limit)
  }
}

export const sessionService = new SessionService()
