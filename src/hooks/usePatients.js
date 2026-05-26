/**
 * usePatients Hook
 * Manages patient data operations
 */

import { useState, useEffect } from 'react'
import { patientService } from '../services/patientService'

export const usePatients = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = () => {
    setLoading(true)
    const data = patientService.getAllPatients()
    setPatients(data)
    setLoading(false)
  }

  const getPatient = (id) => {
    return patientService.getPatientById(id)
  }

  const createPatient = (data) => {
    const patient = patientService.createPatient(data)
    setPatients([...patients, patient])
    return patient
  }

  const updatePatient = (id, data) => {
    const updated = patientService.updatePatient(id, data)
    if (updated) {
      setPatients(
        patients.map((p) => (p.id === id ? updated : p))
      )
    }
    return updated
  }

  const deletePatient = (id) => {
    const success = patientService.deletePatient(id)
    if (success) {
      setPatients(patients.filter((p) => p.id !== id))
    }
    return success
  }

  const getStatistics = () => {
    return patientService.getStatistics()
  }

  const searchPatients = (query) => {
    return patientService.searchPatients(query)
  }

  return {
    patients,
    loading,
    getPatient,
    createPatient,
    updatePatient,
    deletePatient,
    getStatistics,
    searchPatients,
    reload: loadPatients,
  }
}
