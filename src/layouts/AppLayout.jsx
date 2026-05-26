/**
 * Main App Layout Component
 * Wraps authenticated pages with Sidebar and Topbar
 */

import { useState } from 'react'
import { Sidebar, Topbar } from '../components/layout'
import './AppLayout.css'

export const AppLayout = ({
  children,
  currentPage,
  onNavigate,
  user,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query)
    // Emit search event that parent can handle
    window.dispatchEvent(
      new CustomEvent('app-search', { detail: { query } })
    )
  }

  return (
    <div className="app-layout">
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        user={user}
        onLogout={onLogout}
      />

      <div className="app-main">
        <Topbar
          user={user}
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
        />

        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  )
}
