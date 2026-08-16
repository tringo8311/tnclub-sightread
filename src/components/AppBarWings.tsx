import React from 'react'

interface WingIconProps {
  className?: string
}

export function WingIconLeft({ className }: WingIconProps) {
  return (
    <svg className={className} viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 20C55 20 30 14 15 4C28 10 50 14 80 14V20Z" fill="url(#wingGradLeft)" />
      <path d="M80 12C50 12 30 8 18 0C32 6 52 9 80 9V12Z" fill="url(#wingGradLeft)" opacity="0.75" />
      <path d="M80 24C45 24 20 17 0 8C22 14 48 18 80 18V24Z" fill="url(#wingGradLeft)" opacity="0.4" />
      <defs>
        <linearGradient id="wingGradLeft" x1="0" y1="0" x2="80" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function WingIconRight({ className }: WingIconProps) {
  return (
    <svg className={className} viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 20C25 20 50 14 65 4C52 10 30 14 0 14V20Z" fill="url(#wingGradRight)" />
      <path d="M0 12C30 12 50 8 62 0C48 6 28 9 0 9V12Z" fill="url(#wingGradRight)" opacity="0.75" />
      <path d="M0 24C35 24 60 17 80 8C58 14 32 18 0 18V24Z" fill="url(#wingGradRight)" opacity="0.4" />
      <defs>
        <linearGradient id="wingGradRight" x1="80" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
    </svg>
  )
}
