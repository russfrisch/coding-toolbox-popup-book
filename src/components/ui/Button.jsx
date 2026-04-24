import React from 'react'

export function Button({ children, onClick, variant = 'default', size = 'md', className = '' }) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all cursor-pointer'
  
  const variants = {
    default: 'bg-slate-900 text-white hover:bg-slate-800',
    outline: 'border border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  
  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}