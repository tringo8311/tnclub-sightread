import type { LucideProps } from '@/icons'
import React from 'react'

export default function Logo(props: LucideProps) {
  const { width, height, className, style } = props
  return (
    <svg
      width={width ?? 36}
      height={height ?? 36}
      className={className}
      style={style}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="tnLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="tnKeysGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>

      {/* Sleek Modern Eighth Note Emblem (Clef Note) */}
      {/* Note Stem & Flag */}
      <path
        d="M34 16V36C34 39.3137 30.866 42 27 42C23.134 42 20 39.3137 20 36C20 32.6863 23.134 30 27 30C29.2 30 31.15 30.86 32.5 32.22V22C32.5 22 41 18 45 16V22C41 24 34.5 26 34.5 26"
        fill="url(#tnLogoGrad)"
      />

      {/* Elegant Acoustic Soundwave Accents */}
      <path
        d="M44 26C47 28.5 49 32 49 36C49 40 47 43.5 44 46"
        stroke="url(#tnLogoGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
      <path
        d="M50 22C54.5 25.5 57.5 30.5 57.5 36C57.5 41.5 54.5 46.5 50 50"
        stroke="url(#tnLogoGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
    </svg>
  )
}
