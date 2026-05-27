/**
 * Recent Activity Component
 * Shows latest sessions and updates
 */

import { Card, CardHeader, CardBody, EmptyState } from '../common'
import './RecentActivity.css'

export const RecentActivity = ({ sessions, patients }) => {
  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p.id === patientId)
    return patient?.name || 'Unknown Patient'
  }

  const recentSessions = sessions.slice(0, 5)

  if (recentSessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h2>Recent Activity</h2>
        </CardHeader>
        <CardBody>
          <EmptyState
            icon="📋"
            title="No Activity Yet"
            description="Sessions will appear here as you log them"
          />
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="recent-activity-header">
          <h2>Recent Activity</h2>
          <a href="#" className="view-all-link">View all →</a>
        </div>
      </CardHeader>

      <CardBody className="recent-activity-body">
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
      </CardBody>
    </Card>
  )
}
