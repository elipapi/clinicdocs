/**
 * Reports Page
 */

import { useState } from 'react'
import { useReports, usePatients, useSessions } from '../hooks'
import { reportService } from '../services/reportService'
import './Reports.css'

export const Reports = () => {
  const { reports, createReport } = useReports()
  const { patients } = usePatients()
  const { sessions } = useSessions()
  const [formOpen, setFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    patientId: '',
  })

  const handleGenerateReport = (e) => {
    e.preventDefault()
    if (!formData.patientId) return

    const patient = patients.find((p) => p.id === parseInt(formData.patientId))
    const patientSessions = sessions.filter(
      (s) => s.patientId === parseInt(formData.patientId)
    )
    const summary = reportService.generateReportSummary(
      parseInt(formData.patientId),
      patientSessions
    )

    createReport({
      patientId: parseInt(formData.patientId),
      summary,
      progress: `Patient progress notes for ${patient.name}`,
      recommendations: [
        'Continue with current protocol',
        'Monitor pain levels weekly',
        'Schedule reassessment in 2 weeks',
      ],
    })

    setFormData({ patientId: '' })
    setFormOpen(false)
  }

  const getPatientName = (patientId) => {
    return patients.find((p) => p.id === patientId)?.name || 'Unknown'
  }

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p className="page-subtitle">Clinical progress reports</p>
        </div>
        <button className="btn-primary" onClick={() => setFormOpen(true)}>
          📄 Generate Report
        </button>
      </div>

      <div className="reports-grid">
        {reports.length === 0 ? (
          <p className="empty-state">No reports generated yet.</p>
        ) : (
          reports
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <h3>{getPatientName(report.patientId)}</h3>
                  <span className="report-date">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="report-summary">{report.summary}</p>
                <div className="report-recommendations">
                  <strong>Recommendations:</strong>
                  <ul>
                    {report.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
                <button className="btn-link">View Full Report →</button>
              </div>
            ))
        )}
      </div>

      {formOpen && (
        <div className="modal-overlay" onClick={() => setFormOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Generate Report</h2>
            <form onSubmit={handleGenerateReport}>
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

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Generate
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
