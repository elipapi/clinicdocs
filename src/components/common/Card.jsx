/**
 * Card Component
 * Reusable card container with consistent styling
 */

import './Card.css'

export const Card = ({
  children,
  className = '',
  hoverable = false,
  onClick,
  ...props
}) => {
  return (
    <div
      className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = '' }) => (
  <div className={`card-header ${className}`}>{children}</div>
)

export const CardBody = ({ children, className = '' }) => (
  <div className={`card-body ${className}`}>{children}</div>
)

export const CardFooter = ({ children, className = '' }) => (
  <div className={`card-footer ${className}`}>{children}</div>
)
