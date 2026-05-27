/**
 * Patients Page
 * Manage patient database with improved form experience
 */

import { useState } from 'react'
import { usePatients } from '../hooks'
import { Button, Card, CardHeader, CardBody, CardFooter, FormInput, Badge } from '../components/common'
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
  const [formErrors, setFormErrors] = useState({})

  const handleAddPatient = () => {
    setFormData({ name: '', condition: '', age: '', notes: '' })
    setFormErrors({})
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
    setFormErrors({})
    setFormOpen(true)
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) {
      errors.name = 'Patient name is required'
    }
    if (!formData.condition.trim()) {
      errors.condition = 'Condition is required'
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

    if (selectedPatient) {
      updatePatient(selectedPatient.id, formData)
    } else {
      createPatient(formData)
    }
    setFormOpen(false)
    setSelectedPatient(null)
    setFormErrors({})
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
          <p className="page-subtitle">Manage your patient database and treatment plans</p>
        </div>
        <Button variant="primary" size="lg" onClick={handleAddPatient}>
          ➕ Add Patient
        </Button>
      </div>

      <div className="patients-container">
        <div className="patients-list">
          {patients.length === 0 ? (
            <div className="empty-state-container">
              <div className="empty-state-icon">👥</div>
              <p className="empty-state">No patients yet</p>
              <p className="empty-state-hint">Add your first patient to get started</p>
            </div>
          ) : (
            patients.map((patient) => (
              <Card
                key={patient.id}
                className={`patient-card ${
                  selectedPatient?.id === patient.id ? 'active' : ''
                }`}
                hoverable
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="patient-card-content">
                  <div className="patient-avatar">
                    {patient.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="patient-info-compact">
                    <h3>{patient.name}</h3>
                    <p className="condition">{patient.condition}</p>
                  </div>
                  <Badge variant="success" className="adherence-badge">
                    {patient.adherence}%
                  </Badge>
                </div>
              </Card>
            ))
          )}
        </div>

        {selectedPatient && (
          <Card className="patient-detail-card">
            <CardHeader>
              <h2>{selectedPatient.name}</h2>
            </CardHeader>
            <CardBody>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Condition</span>
                  <p className="detail-value">{selectedPatient.condition}</p>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Age</span>
                  <p className="detail-value">{selectedPatient.age || 'N/A'}</p>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Pain Level</span>
                  <p className="detail-value">{selectedPatient.painLevel}/10</p>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Mobility</span>
                  <p className="detail-value">{selectedPatient.mobility}%</p>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Adherence</span>
                  <p className="detail-value">{selectedPatient.adherence}%</p>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Next Session</span>
                  <p className="detail-value">{selectedPatient.nextSession || 'Not scheduled'}</p>
                </div>
              </div>

              {selectedPatient.goals && selectedPatient.goals.length > 0 && (
                <div className="goals-section mb-6">
                  <h3>Treatment Goals</h3>
                  <ul className="goals-list">
                    {selectedPatient.goals.map((goal, idx) => (
                      <li key={idx}>{goal}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardBody>
            <CardFooter>
              <Button
                variant="secondary"
                onClick={() => handleEditPatient(selectedPatient)}
              >
                ✏️ Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeletePatient(selectedPatient.id)}
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
              <h2>{selectedPatient ? 'Edit Patient' : 'Add New Patient'}</h2>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardBody className="form-body">
                <FormInput
                  label="Patient Name"
                  name="name"
                  placeholder="e.g., John Smith"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  error={formErrors.name}
                  required
                />

                <FormInput
                  label="Condition"
                  name="condition"
                  placeholder="e.g., Lower Back Pain"
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                  error={formErrors.condition}
                  required
                />

                <FormInput
                  label="Age"
                  name="age"
                  type="number"
                  placeholder="e.g., 45"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                />

                <div className="form-group">
                  <label htmlFor="notes" className="form-label">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    placeholder="Additional patient information..."
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
                <Button
                  type="submit"
                  variant="primary"
                >
                  {selectedPatient ? 'Update Patient' : 'Create Patient'}
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
