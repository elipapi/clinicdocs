/**
 * Report Service
 * Manages report generation and retrieval
 */

import { STORAGE_KEYS } from '../utils/constants'
import { ReportModel } from '../utils/models'

class ReportService {
  constructor() {
    this.reports = this.loadReports()
  }

  /**
   * Load reports from storage
   */
  loadReports() {
    const stored = localStorage.getItem(STORAGE_KEYS.REPORTS)
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
   * Save reports to storage
   */
  saveReports() {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(this.reports))
  }

  /**
   * Get all reports
   */
  getAllReports() {
    return [...this.reports]
  }

  /**
   * Get reports for a patient
   */
  getReportsByPatientId(patientId) {
    return this.reports.filter((r) => r.patientId === patientId)
  }

  /**
   * Get report by ID
   */
  getReportById(id) {
    return this.reports.find((r) => r.id === id)
  }

  /**
   * Create new report
   */
  createReport(data) {
    const report = ReportModel.create(data)
    this.reports.push(report)
    this.saveReports()
    return report
  }

  /**
   * Update report
   */
  updateReport(id, data) {
    const report = this.reports.find((r) => r.id === id)
    if (!report) return null

    Object.assign(report, {
      ...data,
      updatedAt: new Date().toISOString(),
    })
    this.saveReports()
    return report
  }

  /**
   * Delete report
   */
  deleteReport(id) {
    const index = this.reports.findIndex((r) => r.id === id)
    if (index === -1) return false

    this.reports.splice(index, 1)
    this.saveReports()
    return true
  }

  /**
   * Generate report summary from sessions
   */
  generateReportSummary(patientId, sessions) {
    if (!sessions || sessions.length === 0) {
      return 'No sessions available to generate summary.'
    }

    const totalSessions = sessions.length
    const totalDuration = sessions.reduce((sum, s) => sum + (s.duration || 0), 0)
    const avgDuration = totalDuration / totalSessions

    return `Completed ${totalSessions} sessions with average duration of ${avgDuration.toFixed(1)} minutes.`
  }
}

export const reportService = new ReportService()
