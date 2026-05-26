/**
 * Settings Page
 */

import { useAuth } from '../hooks'
import './Settings.css'

export const Settings = ({ onLogout }) => {
  const { user } = useAuth()

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p className="page-subtitle">Manage your account and preferences</p>
      </div>

      <div className="settings-container">
        <div className="settings-section">
          <h2>Account</h2>
          <div className="settings-item">
            <strong>Name</strong>
            <p>{user?.name}</p>
          </div>
          <div className="settings-item">
            <strong>Email</strong>
            <p>{user?.email}</p>
          </div>
          <div className="settings-item">
            <strong>Role</strong>
            <p>Physiotherapist</p>
          </div>
        </div>

        <div className="settings-section">
          <h2>Preferences</h2>
          <div className="preference-item">
            <label>
              <input type="checkbox" defaultChecked /> Email notifications for new sessions
            </label>
          </div>
          <div className="preference-item">
            <label>
              <input type="checkbox" defaultChecked /> AI treatment suggestions
            </label>
          </div>
          <div className="preference-item">
            <label>
              <input type="checkbox" /> Dark mode
            </label>
          </div>
        </div>

        <div className="settings-section danger">
          <h2>Logout</h2>
          <p>You will be logged out from all devices.</p>
          <button className="btn-danger" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
