/**
 * useReports Hook
 * Manages report operations
 */

import { useState, useEffect } from 'react'
import { reportService } from '../services/reportService'

export const useReports = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = () => {
    setLoading(true)
    const data = reportService.getAllReports()
    setReports(data)
    setLoading(false)
  }

  const getReportsByPatient = (patientId) => {
    return reportService.getReportsByPatientId(patientId)
  }

  const createReport = (data) => {
    const report = reportService.createReport(data)
    setReports([...reports, report])
    return report
  }

  const updateReport = (id, data) => {
    const updated = reportService.updateReport(id, data)
    if (updated) {
      setReports(
        reports.map((r) => (r.id === id ? updated : r))
      )
    }
    return updated
  }

  const deleteReport = (id) => {
    const success = reportService.deleteReport(id)
    if (success) {
      setReports(reports.filter((r) => r.id !== id))
    }
    return success
  }

  return {
    reports,
    loading,
    getReportsByPatient,
    createReport,
    updateReport,
    deleteReport,
    reload: loadReports,
  }
}
