/**
 * Skeleton Loader Component
 * Shows loading state with skeleton screens
 */

import './Skeleton.css'

export const Skeleton = ({ width = '100%', height = '20px', className = '' }) => (
  <div className={`skeleton ${className}`} style={{ width, height }} />
)

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton" style={{ height: '12px', width: '60%', marginBottom: '12px' }} />
    <div className="skeleton" style={{ height: '10px', width: '100%', marginBottom: '8px' }} />
    <div className="skeleton" style={{ height: '10px', width: '85%' }} />
  </div>
)

export const SkeletonTable = ({ rows = 3 }) => (
  <div className="skeleton-table">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="skeleton-table-row">
        <div className="skeleton" style={{ height: '12px', width: '40%' }} />
        <div className="skeleton" style={{ height: '12px', width: '25%' }} />
        <div className="skeleton" style={{ height: '12px', width: '20%' }} />
      </div>
    ))}
  </div>
)
