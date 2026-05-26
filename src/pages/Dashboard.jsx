/**
 * Dashboard Page
 */

import { usePatients, useSessions } from '../hooks'
import { StatsCards, RecentActivity, QuickActions } from '../components/dashboard'
import './Dashboard.css'

export const Dashboard = ({ onNavigatePage }) => {
  const { patients } = usePatients()
  const { sessions } = useSessions()
  
  const stats = {
    totalPatients: patients.length,
    activeTreatments: patients.filter((p) => p.nextSession).length,
    completedCases: patients.filter((p) => !p.nextSession).length,
  }

  const handleNewPatient = () => {
    onNavigatePage('patients')
  }

  const handleLogSession = () => {
    onNavigatePage('sessions')
  }

  const handleGenerateReport = () => {
    onNavigatePage('reports')
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">Welcome back! Here's your clinic overview.</p>
        </div>
      </div>

      <StatsCards stats={stats} />

      <QuickActions
        onNewPatient={handleNewPatient}
        onLogSession={handleLogSession}
        onGenerateReport={handleGenerateReport}
      />

      <div className="dashboard-grid">
        <RecentActivity sessions={sessions} patients={patients} />

        <div className="insights-panel panel">
          <h2>AI Treatment Insights</h2>
          {patients.length > 0 ? (
            <div className="insights-content">
              <div className="insight-item">
                <h3>Top Condition</h3>
                <p className="insight-value">
                  {patients[0].condition}
                </p>
              </div>
              <div className="insight-item">
                <h3>Average Adherence</h3>
                <p className="insight-value">
                  {(
                    patients.reduce((sum, p) => sum + p.adherence, 0) /
                    patients.length
                  ).toFixed(0)}
                  %
                </p>
              </div>
              <div className="insight-item">
                <h3>Average Pain Level</h3>
                <p className="insight-value">
                  {(
                    patients.reduce((sum, p) => sum + p.painLevel, 0) /
                    patients.length
                  ).toFixed(1)}
                  /10
                </p>
              </div>
            </div>
          ) : (
            <p className="empty-state">No patient data available yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
