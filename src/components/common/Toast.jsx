/**
 * Toast Notification Component
 * Provides user feedback for actions
 */

import './Toast.css'

export const Toast = ({ id, type = 'info', title, message, onClose }) => {
  return (
    <div className={`toast toast-${type}`} role="alert">
      <div className="toast-content">
        <div className="toast-header">
          <span className="toast-icon">
            {type === 'success' && '✓'}
            {type === 'error' && '✕'}
            {type === 'warning' && '!'}
            {type === 'info' && 'ℹ'}
          </span>
          {title && <strong className="toast-title">{title}</strong>}
        </div>
        {message && <p className="toast-message">{message}</p>}
      </div>
      {onClose && (
        <button
          className="toast-close"
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      )}
    </div>
  )
}

/**
 * Toast Container Component
 * Manages multiple toast notifications
 */
export const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  )
}
