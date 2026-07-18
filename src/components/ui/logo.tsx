import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  href?: string
  size?: 'sm' | 'md' | 'lg'
  markId?: string
  className?: string
  showWordmark?: boolean
}

/**
 * Geometric "L" monogram with a custom diagonal cut accent.
 * The markId prop keeps SVG gradient ids unique when the logo
 * is rendered multiple times on the same page.
 */
export function LogoMark({
  id = 'ls-mark',
  className,
}: {
  id?: string
  className?: string
}) {
  const gradId = `${id}-grad`
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn('logo-mark-svg', className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="4"
          y1="4"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00F0FF" />
          <stop offset="1" stopColor="#0E9DFF" />
        </linearGradient>
      </defs>
      {/* Rounded container */}
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="12"
        stroke={`url(#${gradId})`}
        strokeWidth="2.25"
        fill="rgba(0, 240, 255, 0.05)"
      />
      {/* Bold geometric L */}
      <path
        d="M18 14V33H30"
        stroke={`url(#${gradId})`}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Custom diagonal cut accent */}
      <path
        d="M26.5 21.5L34 14"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  )
}

/**
 * LEWITT SIGNS wordmark.
 * "LEWITT" in white with a subtle electric-blue halo,
 * "SIGNS" in an electric-blue gradient with a glow.
 */
export function Logo({
  href = '/',
  size = 'md',
  markId = 'ls',
  className,
  showWordmark = true,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="LEWITT SIGNS - Home"
      className={cn('logo-wrap group', `logo-${size}`, className)}
    >
      <LogoMark id={markId} className="logo-mark" />
      {showWordmark && (
        <span className="logo-wordmark">
          <span className="logo-word-lewitt">LEWITT</span>
          <span className="logo-divider" aria-hidden="true" />
          <span className="logo-word-signs">SIGNS</span>
        </span>
      )}
    </Link>
  )
}
