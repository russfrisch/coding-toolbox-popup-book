import React from 'react'

export function Button({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'

  const variants = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-500',
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
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}