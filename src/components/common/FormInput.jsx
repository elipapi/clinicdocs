/**
 * Form Input Component
 * Reusable input field with validation and feedback
 */

import './FormInput.css'

export const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  helpText,
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="form-required">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        className={`form-input ${error ? 'form-input-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
      {helpText && !error && <span className="form-help">{helpText}</span>}
    </div>
  )
}
