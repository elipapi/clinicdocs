/**
 * Recent Activity Component
 * Shows latest sessions and updates
 */

import './RecentActivity.css'

export const RecentActivity = ({ sessions, patients }) => {
  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p.id === patientId)
    return patient?.name || 'Unknown Patient'
  }

  const recentSessions = sessions.slice(0, 5)

  if (recentSessions.length === 0) {
    return (
      <div className="recent-activity panel">
        <h2>Recent Activity</h2>
        <p className="empty-state">No sessions logged yet.</p>
      </div>
    )
  }

  return (
    <div className="recent-activity panel">
      <div className="panel-header">
        <h2>Recent Activity</h2>
        <a href="#" className="view-all-link">View all →</a>
      </div>

      <div className="activity-list">
        {recentSessions.map((session, idx) => (
          <div key={session.id} className="activity-item">
            <div className="activity-avatar">
              {String.fromCharCode(65 + idx)}
            </div>
            <div className="activity-content">
              <p className="activity-title">
                <strong>{getPatientName(session.patientId)}</strong>
              </p>
              <p className="activity-note">
                {session.notes || 'Session logged'}
              </p>
              <p className="activity-time">
                {new Date(session.date).toLocaleDateString()}
              </p>
            </div>
            <div className="activity-badge">
              ✓
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
