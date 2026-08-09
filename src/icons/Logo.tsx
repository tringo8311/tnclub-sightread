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

      {/* Outer Decorative Ring */}
      <circle cx="32" cy="32" r="30" fill="url(#tnLogoGrad)" opacity="0.12" />
      <circle
        cx="32"
        cy="32"
        r="28"
        stroke="url(#tnLogoGrad)"
        strokeWidth="2"
        strokeDasharray="100 12"
      />

      {/* Treble Note + Grand Piano Wave */}
      <path
        d="M20 42C20 34 24 26 32 20C39 15 47 13 50 17C53 20 51 26 46 30C41 33 35 33 32 29C29 25 29 19 34 15"
        stroke="url(#tnLogoGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Piano Keyboard Arc */}
      <path
        d="M13 41H51V45C51 47.5 49 49.5 46.5 49.5H17.5C15 49.5 13 47.5 13 45V41Z"
        fill="url(#tnKeysGrad)"
      />
      {/* Black Keys */}
      <rect x="18" y="41" width="3.5" height="5.5" rx="0.5" fill="#0F172A" />
      <rect x="24.5" y="41" width="3.5" height="5.5" rx="0.5" fill="#0F172A" />
      <rect x="31" y="41" width="3.5" height="5.5" rx="0.5" fill="#0F172A" />
      <rect x="39.5" y="41" width="3.5" height="5.5" rx="0.5" fill="#0F172A" />
      <rect x="46" y="41" width="3.5" height="5.5" rx="0.5" fill="#0F172A" />

      {/* Sparkle Accent */}
      <path
        d="M48 10L49.5 14.5L54 16L49.5 17.5L48 22L46.5 17.5L42 16L46.5 14.5L48 10Z"
        fill="#FBBF24"
      />
    </svg>
  )
}
