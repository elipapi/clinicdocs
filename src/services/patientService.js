/**
 * Patient Service
 * Manages patient data operations
 */

import { STORAGE_KEYS, DEFAULT_PATIENTS } from '../utils/constants'
import { PatientModel } from '../utils/models'

class PatientService {
  constructor() {
    this.patients = this.loadPatients()
  }

  /**
   * Load patients from storage or use defaults
   */
  loadPatients() {
    const stored = localStorage.getItem(STORAGE_KEYS.PATIENTS)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return [...DEFAULT_PATIENTS]
      }
    }
    return [...DEFAULT_PATIENTS]
  }

  /**
   * Save patients to storage
   */
  savePatients() {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(this.patients))
  }

  /**
   * Get all patients
   */
  getAllPatients() {
    return [...this.patients]
  }

  /**
   * Get patient by ID
   */
  getPatientById(id) {
    return this.patients.find((p) => p.id === id)
  }

  /**
   * Create new patient
   */
  createPatient(data) {
    const patient = PatientModel.create(data)
    this.patients.push(patient)
    this.savePatients()
    return patient
  }

  /**
   * Update patient
   */
  updatePatient(id, data) {
    const patient = this.patients.find((p) => p.id === id)
    if (!patient) return null

    Object.assign(patient, data)
    this.savePatients()
    return patient
  }

  /**
   * Delete patient
   */
  deletePatient(id) {
    const index = this.patients.findIndex((p) => p.id === id)
    if (index === -1) return false

    this.patients.splice(index, 1)
    this.savePatients()
    return true
  }

  /**
   * Get patient statistics
   */
  getStatistics() {
    return {
      totalPatients: this.patients.length,
      activeTreatments: this.patients.filter((p) => p.nextSession).length,
      completedCases: this.patients.filter((p) => !p.nextSession).length,
    }
  }

  /**
   * Search patients
   */
  searchPatients(query) {
    const lower = query.toLowerCase()
    return this.patients.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.condition.toLowerCase().includes(lower)
    )
  }
}

export const patientService = new PatientService()
