'use client'
import { useState, useEffect } from 'react'
import { X, AlertTriangle } from 'lucide-react'

export default function ErrorBanner({ message, type = 'error', autoHide = 5000 }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, autoHide)

      return () => clearTimeout(timer)
    }
  }, [autoHide])

  if (!visible) return null

  const styles = {
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
    success: 'bg-green-500'
  }

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
      <div className={`${styles[type]} text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 max-w-md`}>
        <AlertTriangle size={24} />
        <div className="flex-1">
          <p className="font-semibold">{message}</p>
        </div>
        <button 
          onClick={() => setVisible(false)}
          className="hover:bg-white/20 p-1 rounded transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  )
}
