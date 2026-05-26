/**
 * Quick Actions Component
 * Fast access to common tasks
 */

import './QuickActions.css'

export const QuickActions = ({ onNewPatient, onLogSession, onGenerateReport }) => {
  const actions = [
    {
      id: 'new-patient',
      icon: '➕',
      label: 'New Patient',
      description: 'Add a new patient',
      color: 'blue',
      onClick: onNewPatient,
    },
    {
      id: 'log-session',
      icon: '📋',
      label: 'Log Session',
      description: 'Record a treatment session',
      color: 'green',
      onClick: onLogSession,
    },
    {
      id: 'generate-report',
      icon: '📄',
      label: 'Generate Report',
      description: 'Create treatment report',
      color: 'purple',
      onClick: onGenerateReport,
    },
  ]

  return (
    <div className="quick-actions">
      <h3 className="quick-actions-title">Quick Actions</h3>
      <div className="quick-actions-grid">
        {actions.map((action) => (
          <button
            key={action.id}
            className={`quick-action-btn action-${action.color}`}
            onClick={action.onClick}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-label">{action.label}</span>
            <span className="action-desc">{action.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
