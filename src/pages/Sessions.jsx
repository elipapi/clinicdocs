/**
 * Sessions Page
 * Track and manage treatment sessions
 */

import { useState } from 'react'
import { useSessions, usePatients } from '../hooks'
import { Button, Card, CardHeader, CardBody, CardFooter, FormInput, Badge, EmptyState } from '../components/common'
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
  const [formErrors, setFormErrors] = useState({})

  const handleAddSession = () => {
    setFormData({
      patientId: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      duration: '',
    })
    setFormErrors({})
    setFormOpen(true)
    setSelectedSession(null)
  }

  const handleEditSession = (session) => {
    setSelectedSession(session)
    setFormData({
      patientId: session.patientId,
      date: session.date.split('T')[0],
      notes: session.notes,
      duration: session.duration,
    })
    setFormErrors({})
    setFormOpen(true)
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.patientId) {
      errors.patientId = 'Please select a patient'
    }
    if (!formData.date) {
      errors.date = 'Date is required'
    }
    if (formData.duration && isNaN(formData.duration)) {
      errors.duration = 'Duration must be a number'
    }
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validateForm()
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    if (selectedSession) {
      updateSession(selectedSession.id, formData)
    } else {
      createSession(formData)
    }
    setFormOpen(false)
    setSelectedSession(null)
    setFormErrors({})
  }

  const handleDeleteSession = (id) => {
    if (confirm('Are you sure you want to delete this session?')) {
      deleteSession(id)
      if (selectedSession?.id === id) {
        setSelectedSession(null)
      }
    }
  }

  const getPatientName = (patientId) => {
    return patients.find((p) => p.id === parseInt(patientId))?.name || 'Unknown'
  }

  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  return (
    <div className="sessions-page">
      <div className="page-header">
        <div>
          <h1>Sessions</h1>
          <p className="page-subtitle">Track and manage treatment sessions</p>
        </div>
        <Button variant="primary" size="lg" onClick={handleAddSession}>
          ➕ Log Session
        </Button>
      </div>

      <div className="sessions-container">
        <div className="sessions-list">
          {sortedSessions.length === 0 ? (
            <EmptyState
              icon="📋"
              title="No Sessions Yet"
              description="Start tracking sessions to monitor patient progress"
              action={handleAddSession}
              actionLabel="Log First Session"
            />
          ) : (
            sortedSessions.map((session) => (
              <Card
                key={session.id}
                className={`session-card ${
                  selectedSession?.id === session.id ? 'active' : ''
                }`}
                hoverable
                onClick={() => setSelectedSession(session)}
              >
                <div className="session-card-content">
                  <div className="session-date-display">
                    <span className="date-day">
                      {new Date(session.date).getDate()}
                    </span>
                    <span className="date-month">
                      {new Date(session.date).toLocaleDateString('en-US', {
                        month: 'short',
                      })}
                    </span>
                  </div>
                  <div className="session-info">
                    <h3>{getPatientName(session.patientId)}</h3>
                    <p className="duration">{session.duration} min</p>
                  </div>
                  <Badge variant="success">{session.duration} min</Badge>
                </div>
              </Card>
            ))
          )}
        </div>

        {selectedSession && (
          <Card className="session-detail-card">
            <CardHeader>
              <h2>Session Details</h2>
            </CardHeader>
            <CardBody>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Patient</span>
                  <p className="detail-value">
                    {getPatientName(selectedSession.patientId)}
                  </p>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date</span>
                  <p className="detail-value">
                    {new Date(selectedSession.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Duration</span>
                  <p className="detail-value">{selectedSession.duration} min</p>
                </div>
              </div>

              {selectedSession.notes && (
                <div className="notes-section mb-6">
                  <h3>Notes</h3>
                  <p>{selectedSession.notes}</p>
                </div>
              )}
            </CardBody>
            <CardFooter>
              <Button
                variant="secondary"
                onClick={() => handleEditSession(selectedSession)}
              >
                ✏️ Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteSession(selectedSession.id)}
              >
                🗑️ Delete
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      {formOpen && (
        <div className="modal-overlay" onClick={() => setFormOpen(false)}>
          <Card className="modal">
            <CardHeader>
              <h2>{selectedSession ? 'Edit Session' : 'Log New Session'}</h2>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardBody className="form-body">
                <div className="form-group">
                  <label htmlFor="patientId" className="form-label">
                    Patient
                    <span className="form-required">*</span>
                  </label>
                  <select
                    id="patientId"
                    className={`form-select ${formErrors.patientId ? 'form-input-error' : ''}`}
                    value={formData.patientId}
                    onChange={(e) =>
                      setFormData({ ...formData, patientId: e.target.value })
                    }
                  >
                    <option value="">Select a patient...</option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.patientId && (
                    <span className="form-error">{formErrors.patientId}</span>
                  )}
                </div>

                <FormInput
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  error={formErrors.date}
                  required
                />

                <FormInput
                  label="Duration"
                  name="duration"
                  type="number"
                  placeholder="45"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  error={formErrors.duration}
                  helpText="in minutes"
                />

                <div className="form-group">
                  <label htmlFor="notes" className="form-label">
                    Session Notes
                  </label>
                  <textarea
                    id="notes"
                    placeholder="What did you work on during this session?"
                    className="form-textarea"
                    rows="4"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
              </CardBody>

              <CardFooter>
                <Button type="submit" variant="primary">
                  {selectedSession ? 'Update Session' : 'Log Session'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setFormOpen(false)}
                >
                  Cancel
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
