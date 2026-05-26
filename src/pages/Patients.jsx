/**
 * Patients Page
 */

import { useState } from 'react'
import { usePatients } from '../hooks'
import { googleApiService } from '../services/googleApiService'
import './Patients.css'

export const Patients = () => {
  const { patients, createPatient, updatePatient, deletePatient } = usePatients()
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    condition: '',
    age: '',
    notes: '',
  })

  const handleAddPatient = () => {
    setFormData({ name: '', condition: '', age: '', notes: '' })
    setFormOpen(true)
    setSelectedPatient(null)
  }

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient)
    setFormData({
      name: patient.name,
      condition: patient.condition,
      age: patient.age,
      notes: patient.notes,
    })
    setFormOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedPatient) {
      updatePatient(selectedPatient.id, formData)
    } else {
      createPatient(formData)
    }
    setFormOpen(false)
    setSelectedPatient(null)
  }

  const handleDeletePatient = (id) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      deletePatient(id)
      if (selectedPatient?.id === id) {
        setSelectedPatient(null)
      }
    }
  }

  return (
    <div className="patients-page">
      <div className="page-header">
        <div>
          <h1>Patients</h1>
          <p className="page-subtitle">Manage your patient database</p>
        </div>
        <button className="btn-primary" onClick={handleAddPatient}>
          ➕ Add Patient
        </button>
      </div>

      <div className="patients-container">
        <div className="patients-list">
          {patients.length === 0 ? (
            <p className="empty-state">No patients yet. Add your first patient!</p>
          ) : (
            patients.map((patient) => (
              <div
                key={patient.id}
                className={`patient-card ${
                  selectedPatient?.id === patient.id ? 'active' : ''
                }`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="patient-avatar">
                  {patient.name.charAt(0).toUpperCase()}
                </div>
                <div className="patient-info">
                  <h3>{patient.name}</h3>
                  <p>{patient.condition}</p>
                </div>
                <div className="patient-status">
                  <span className={`status-badge ${patient.adherence > 85 ? 'high' : 'low'}`}>
                    {patient.adherence}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedPatient && (
          <div className="patient-detail">
            <h2>{selectedPatient.name}</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <strong>Condition</strong>
                <p>{selectedPatient.condition}</p>
              </div>
              <div className="detail-item">
                <strong>Age</strong>
                <p>{selectedPatient.age || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <strong>Pain Level</strong>
                <p>{selectedPatient.painLevel}/10</p>
              </div>
              <div className="detail-item">
                <strong>Mobility</strong>
                <p>{selectedPatient.mobility}%</p>
              </div>
              <div className="detail-item">
                <strong>Adherence</strong>
                <p>{selectedPatient.adherence}%</p>
              </div>
              <div className="detail-item">
                <strong>Next Session</strong>
                <p>{selectedPatient.nextSession || 'Not scheduled'}</p>
              </div>
            </div>

            <div className="goals-section">
              <h3>Treatment Goals</h3>
              <ul>
                {selectedPatient.goals.map((goal, idx) => (
                  <li key={idx}>{goal}</li>
                ))}
              </ul>
            </div>

            <div className="actions">
              <button
                className="btn-secondary"
                onClick={() => handleEditPatient(selectedPatient)}
              >
                Edit
              </button>
              <button
                className="btn-danger"
                onClick={() => handleDeletePatient(selectedPatient.id)}
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
            <h2>{selectedPatient ? 'Edit Patient' : 'Add New Patient'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Patient Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Condition"
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
              <textarea
                placeholder="Notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {selectedPatient ? 'Update' : 'Create'}
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
