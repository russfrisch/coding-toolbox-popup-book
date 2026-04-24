import React from 'react'

export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-indigo-600 text-white',
    secondary: 'bg-slate-100 text-slate-700',
    outline: 'border border-slate-200 bg-transparent text-slate-700',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}