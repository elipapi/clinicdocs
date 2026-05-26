/**
 * useSessions Hook
 * Manages session data operations
 */

import { useState, useEffect } from 'react'
import { sessionService } from '../services/sessionService'

export const useSessions = () => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = () => {
    setLoading(true)
    const data = sessionService.getAllSessions()
    setSessions(data)
    setLoading(false)
  }

  const getSessionsByPatient = (patientId) => {
    return sessionService.getSessionsByPatientId(patientId)
  }

  const createSession = (data) => {
    const session = sessionService.createSession(data)
    setSessions([...sessions, session])
    return session
  }

  const updateSession = (id, data) => {
    const updated = sessionService.updateSession(id, data)
    if (updated) {
      setSessions(
        sessions.map((s) => (s.id === id ? updated : s))
      )
    }
    return updated
  }

  const deleteSession = (id) => {
    const success = sessionService.deleteSession(id)
    if (success) {
      setSessions(sessions.filter((s) => s.id !== id))
    }
    return success
  }

  const getRecentSessions = (limit) => {
    return sessionService.getRecentSessions(limit)
  }

  return {
    sessions,
    loading,
    getSessionsByPatient,
    createSession,
    updateSession,
    deleteSession,
    getRecentSessions,
    reload: loadSessions,
  }
}
