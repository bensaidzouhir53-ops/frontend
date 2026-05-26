'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils'

interface LungLogoProps {
  className?: string
  /** Use on dark backgrounds (footer) for white + gold accents */
  variant?: 'brand' | 'light'
}

export default function LungLogo({ className, variant = 'brand' }: LungLogoProps) {
  const uid = useId().replace(/:/g, '')
  const isLight = variant === 'light'

  const lungFill = `lungFill-${uid}`
  const lungGlow = `lungGlow-${uid}`
  const goldAccent = `goldAccent-${uid}`

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={lungFill} x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor={isLight ? '#FFFFFF' : '#0F766E'} />
          <stop offset="1" stopColor={isLight ? '#EEF7F4' : '#0B4F4A'} />
        </linearGradient>
        <linearGradient id={lungGlow} x1="16" y1="20" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={isLight ? '#D7A85C' : '#A7C4B5'} stopOpacity="0.35" />
          <stop offset="1" stopColor={isLight ? '#FFFFFF' : '#0F766E'} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={goldAccent} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D7A85C" />
          <stop offset="1" stopColor="#B8893F" />
        </linearGradient>
      </defs>

      {/* Soft premium backdrop */}
      <circle cx="32" cy="34" r="26" fill={`url(#${lungGlow})`} />

      {/* Trachea */}
      <path
        d="M32 10v12"
        stroke={isLight ? '#FFFFFF' : '#0B4F4A'}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M32 18c-1.5 0-3 1.2-3 3v2"
        stroke={`url(#${goldAccent})`}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M32 18c1.5 0 3 1.2 3 3v2"
        stroke={`url(#${goldAccent})`}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Left lung */}
      <path
        d="M32 22c-6 0-12 4-14 11-1.5 5 0 11 4 15 3 3 7 4 10 2 2-1.5 3.5-4 4-7 0.5-2.5 0-5-1-7-1.5-3.5-5-6-9-7-2.5-0.5-4.5 0-6 1.5"
        fill={`url(#${lungFill})`}
        stroke={isLight ? '#FFFFFF' : '#0B4F4A'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Right lung */}
      <path
        d="M32 22c6 0 12 4 14 11 1.5 5 0 11-4 15-3 3-7 4-10 2-2-1.5-3.5-4-4-7-0.5-2.5 0-5 1-7 1.5-3.5 5-6 9-7 2.5-0.5 4.5 0 6 1.5"
        fill={`url(#${lungFill})`}
        stroke={isLight ? '#FFFFFF' : '#0B4F4A'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Premium breath lines */}
      <path
        d="M8 30c4-2 8-2 12 0"
        stroke={`url(#${goldAccent})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M44 30c4-2 8-2 12 0"
        stroke={`url(#${goldAccent})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M26 48c2 2 4 3 6 3s4-1 6-3"
        stroke="#D7A85C"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Herbal leaf accent */}
      <path
        d="M32 52c0-4 2.5-6 5-7 1.2-0.5 2.5-0.4 3.5 0.2-2.2 0.8-3.8 2.8-4 5.3-0.8-1.8-2.4-3-4.5-3.5z"
        fill="#D7A85C"
        opacity="0.95"
      />
      <path
        d="M37 45.5c1.8 1.2 2.8 3 2.6 5"
        stroke="#B8893F"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}
