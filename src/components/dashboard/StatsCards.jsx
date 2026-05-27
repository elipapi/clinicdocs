/**
 * Stats Cards Component
 * Displays key statistics with visual hierarchy
 */

import { Card, CardBody } from '../common'
import './StatsCards.css'

export const StatsCards = ({ stats }) => {
  const cards = [
    {
      label: 'Total Patients',
      value: stats.totalPatients,
      icon: '👥',
      color: 'blue',
    },
    {
      label: 'Active Treatments',
      value: stats.activeTreatments,
      icon: '⚡',
      color: 'green',
    },
    {
      label: 'Completed Cases',
      value: stats.completedCases,
      icon: '✓',
      color: 'purple',
    },
    {
      label: 'This Month',
      value: '12',
      icon: '📅',
      color: 'orange',
    },
  ]

  return (
    <div className="stats-grid">
      {cards.map((card) => (
        <Card key={card.label} className={`stat-card stat-${card.color}`}>
          <CardBody className="stat-body">
            <div className="stat-header">
              <span className="stat-icon">{card.icon}</span>
              <span className="stat-label">{card.label}</span>
            </div>
            <div className="stat-value">{card.value}</div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
