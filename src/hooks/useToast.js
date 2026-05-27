/**
 * useToast Hook
 * Manages toast notifications across the application
 */

import { useState, useCallback } from 'react'

let toastId = 0

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(
    ({ type = 'info', title, message, duration = 4000 }) => {
      const id = `toast-${toastId++}`
      const newToast = { id, type, title, message }

      setToasts((prev) => [...prev, newToast])

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }

      return id
    },
    []
  )

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const success = useCallback(
    ({ title, message, duration }) => {
      return addToast({
        type: 'success',
        title: title || 'Success',
        message,
        duration: duration ?? 3000,
      })
    },
    [addToast]
  )

  const error = useCallback(
    ({ title, message, duration }) => {
      return addToast({
        type: 'error',
        title: title || 'Error',
        message,
        duration: duration ?? 5000,
      })
    },
    [addToast]
  )

  const warning = useCallback(
    ({ title, message, duration }) => {
      return addToast({
        type: 'warning',
        title: title || 'Warning',
        message,
        duration: duration ?? 4000,
      })
    },
    [addToast]
  )

  const info = useCallback(
    ({ title, message, duration }) => {
      return addToast({
        type: 'info',
        title: title || 'Info',
        message,
        duration: duration ?? 4000,
      })
    },
    [addToast]
  )

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  }
}
