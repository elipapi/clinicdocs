/**
 * Empty State Component
 * Displayed when no data is available
 */

import './EmptyState.css'

export const EmptyState = ({
  icon = '📭',
  title = 'No data found',
  description,
  action,
  actionLabel = 'Add new item',
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      {description && <p className="empty-state-description">{description}</p>}
      {action && (
        <button className="empty-state-action" onClick={action}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
