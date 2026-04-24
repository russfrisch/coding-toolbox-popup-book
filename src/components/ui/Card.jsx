import React from 'react'

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white/90 shadow-lg ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-5 ${className}`}>{children}</div>
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-5 pb-0 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = '' }) {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
}