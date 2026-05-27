/**
 * Search Input Component
 * Reusable search field with debouncing
 */

import { useState, useEffect, useCallback } from 'react'
import './SearchInput.css'

export const SearchInput = ({
  placeholder = 'Search...',
  onSearch,
  debounceMs = 300,
  value,
  onChange,
  icon = '🔍',
}) => {
  const [searchValue, setSearchValue] = useState(value || '')
  const [debounceTimer, setDebounceTimer] = useState(null)

  useEffect(() => {
    setSearchValue(value || '')
  }, [value])

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value
      setSearchValue(newValue)

      if (onChange) {
        onChange(newValue)
      }

      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }

      const timer = setTimeout(() => {
        if (onSearch) {
          onSearch(newValue)
        }
      }, debounceMs)

      setDebounceTimer(timer)
    },
    [onSearch, onChange, debounceMs, debounceTimer]
  )

  const handleClear = () => {
    setSearchValue('')
    if (onChange) {
      onChange('')
    }
    if (onSearch) {
      onSearch('')
    }
  }

  return (
    <div className="search-input-wrapper">
      <span className="search-icon">{icon}</span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
      />
      {searchValue && (
        <button
          className="search-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  )
}
