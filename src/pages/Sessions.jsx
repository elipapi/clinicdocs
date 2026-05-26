/**
 * Sessions Page
 */

import { useState } from 'react'
import { useSessions, usePatients } from '../hooks'
import './Sessions.css'

export const Sessions = () => {
  const { sessions, createSession, updateSession, deleteSession } = useSessions()
  const { patients } = usePatients()
  const [selectedSession, setSelectedSession] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    patientId: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    duration: '',
  })

  const handleAddSession = () => {
    setFormData({
      patientId: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      duration: '',
    })
    setFormOpen(true)
    setSelectedSession(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedSession) {
      updateSession(selectedSession.id, formData)
    } else {
      createSession(formData)
    }
    setFormOpen(false)
    setSelectedSession(null)
  }

  const handleDeleteSession = (id) => {
    if (confirm('Are you sure?')) {
      deleteSession(id)
      if (selectedSession?.id === id) {
        setSelectedSession(null)
      }
    }
  }

  const getPatientName = (patientId) => {
    return patients.find((p) => p.id === parseInt(patientId))?.name || 'Unknown'
  }

  return (
    <div className="sessions-page">
      <div className="page-header">
        <div>
          <h1>Sessions</h1>
          <p className="page-subtitle">Track treatment sessions</p>
        </div>
        <button className="btn-primary" onClick={handleAddSession}>
          ➕ Log Session
        </button>
      </div>

      <div className="sessions-container">
        <div className="sessions-list">
          {sessions.length === 0 ? (
            <p className="empty-state">No sessions logged yet.</p>
          ) : (
            sessions
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((session) => (
                <div
                  key={session.id}
                  className={`session-item ${
                    selectedSession?.id === session.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedSession(session)}
                >
                  <div className="session-date">
                    {new Date(session.date).toLocaleDateString()}
                  </div>
                  <div className="session-content">
                    <h3>{getPatientName(session.patientId)}</h3>
                    <p>Duration: {session.duration} min</p>
                  </div>
                </div>
              ))
          )}
        </div>

        {selectedSession && (
          <div className="session-detail">
            <h2>Session Details</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <strong>Patient</strong>
                <p>{getPatientName(selectedSession.patientId)}</p>
              </div>
              <div className="detail-item">
                <strong>Date</strong>
                <p>
                  {new Date(selectedSession.date).toLocaleDateString()}
                </p>
              </div>
              <div className="detail-item">
                <strong>Duration</strong>
                <p>{selectedSession.duration} minutes</p>
              </div>
            </div>

            <div className="notes-section">
              <h3>Notes</h3>
              <p>{selectedSession.notes || 'No notes'}</p>
            </div>

            <div className="actions">
              <button
                className="btn-secondary"
                onClick={() => {
                  setFormData({
                    patientId: selectedSession.patientId,
                    date: selectedSession.date.split('T')[0],
                    notes: selectedSession.notes,
                    duration: selectedSession.duration,
                  })
                  setFormOpen(true)
                }}
              >
                Edit
              </button>
              <button
                className="btn-danger"
                onClick={() => handleDeleteSession(selectedSession.id)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {formOpen && (
        <div className="modal-overlay" onClick={() => setFormOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Log Session</h2>
            <form onSubmit={handleSubmit}>
              <select
                value={formData.patientId}
                onChange={(e) =>
                  setFormData({ ...formData, patientId: e.target.value })
                }
                required
              >
                <option value="">Select Patient</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Duration (minutes)"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              />

              <textarea
                placeholder="Session Notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setFormOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
