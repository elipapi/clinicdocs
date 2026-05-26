/**
 * Topbar Navigation Component
 */

import './Topbar.css'

export const Topbar = ({ user, searchQuery, onSearchChange, onProfileClick }) => {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="topbar-actions">
        <button className="notification-btn" title="Notifications">
          <span>🔔</span>
          <span className="notification-badge">3</span>
        </button>

        <div className="user-profile">
          <button 
            className="profile-btn"
            onClick={onProfileClick}
          >
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="profile-info">
              <span className="profile-name">{user?.name}</span>
              <span className="profile-role">Physiotherapist</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
