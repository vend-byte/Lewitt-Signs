'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  ChevronRight,
  Clock3,
  Facebook,
  Home,
  HelpCircle,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Music4,
  Newspaper,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  Youtube,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo, LogoMark } from './logo'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About Us', href: '/about', icon: Sparkles },
  { label: 'Services', href: '/services', icon: BriefcaseBusiness },
  { label: 'Portfolio', href: '/portfolio', icon: Star },
  { label: 'Testimonials', href: '/testimonials', icon: Star },
  { label: 'Blog', href: '/blog', icon: Newspaper },
  { label: 'FAQ', href: '/faq', icon: HelpCircle },
  { label: 'Contact', href: '/contact', icon: Phone },
  { label: 'Admin Login', href: '/admin/login', icon: ShieldCheck },
]

const bottomNavItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Services', href: '/services', icon: BriefcaseBusiness },
  { label: 'Portfolio', href: '/portfolio', icon: Star },
  { label: 'Contact', href: '/contact', icon: Phone },
]

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.79 14.03c-.24.68-1.4 1.32-1.94 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.95-.3-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.34-.14-.2-1.17-1.56-1.17-2.97 0-1.41.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.3.38-.43.51-.14.14-.29.29-.13.57.17.29.75 1.24 1.61 2 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.64.77 1.92.91.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
    </svg>
  )
}

interface NavigationProps {
  phoneNumber?: string
  whatsappNumber?: string
  email?: string
  address?: string
  hours?: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    tiktok?: string
    linkedin?: string
    youtube?: string
  }
  siteName?: string
  tagline?: string
}

export function Navigation({
  phoneNumber = '+254 712 345 678',
  whatsappNumber,
  email = 'info@lewittsigns.com',
  address = 'Kimathi Street, Nairobi, Kenya',
  hours = 'Mon - Sat: 8:00 AM - 6:00 PM',
  socialLinks,
  siteName = 'LEWITT SIGNS',
  tagline = 'Printing · Branding · Impact',
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const displayPhone = useMemo(() => phoneNumber.replace(/\D/g, ''), [phoneNumber])
  const displayWhatsApp = useMemo(() => (whatsappNumber || phoneNumber).replace(/\D/g, ''), [phoneNumber, whatsappNumber])

  const socialItems = useMemo(
    () => [
      { key: 'facebook', label: 'Facebook', href: socialLinks?.facebook || '#', icon: Facebook },
      { key: 'instagram', label: 'Instagram', href: socialLinks?.instagram || '#', icon: Instagram },
      { key: 'tiktok', label: 'TikTok', href: socialLinks?.tiktok || '#', icon: Music4 },
      { key: 'linkedin', label: 'LinkedIn', href: socialLinks?.linkedin || '#', icon: Linkedin },
      { key: 'youtube', label: 'YouTube', href: socialLinks?.youtube || '#', icon: Youtube },
    ],
    [socialLinks]
  )

  return (
    <>
      {/* Keeps page content from hiding behind the fixed mobile bottom nav — scoped globally so no other file needs editing */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          body {
            padding-bottom: 4.5rem;
          }
        }
      `}</style>

      {/* Desktop + Mobile Top Header */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          isScrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <nav className="container-custom">
          <div className="flex h-16 items-center justify-between sm:h-20">
            <div className="flex min-w-0 flex-1 items-center">
              <Logo href="/" size="md" markId="nav" className="hidden lg:flex" />

              <Link href="/" className="flex items-center gap-2 lg:hidden" aria-label="LEWITT SIGNS home">
                <LogoMark id="mobile-nav" className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
                <div className="min-w-0 leading-tight">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/80">
                    LEWITT
                  </p>
                  <p className="truncate text-sm font-semibold text-white sm:text-base">SIGNS</p>
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex lg:items-center lg:gap-7">
              {navItems.filter((item) => item.href !== '/admin/login').map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'nav-link text-sm font-medium',
                    isActive(item.href) && 'nav-link-active'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Link href="/contact" className="btn-primary text-sm px-5 py-2.5">
                Contact Us
              </Link>
              <Link
                href="/admin/login"
                aria-label="Admin login"
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_18px_rgba(0,240,255,0.28)] transition-all duration-200 hover:scale-105"
              >
                <span className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping" />
                <ShieldCheck className="relative h-5 w-5" />
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
              <a
                href={`tel:${displayPhone}`}
                aria-label="Call us"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-primary transition-all duration-200 hover:bg-white/10"
              >
                <Phone className="h-4.5 w-4.5" />
              </a>

              <a
                href={`https://wa.me/${displayWhatsApp}`}
                aria-label="WhatsApp us"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.18)] transition-all duration-200 hover:scale-105"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
              </a>

              <Link
                href="/admin/login"
                aria-label="Admin login"
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_18px_rgba(0,240,255,0.24)] transition-all duration-200 hover:scale-105"
              >
                <span className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping" />
                <ShieldCheck className="relative h-4.5 w-4.5" />
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Sticky Bottom Navigation (mobile only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-background/95 backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-4">
          {bottomNavItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 py-2.5 transition-all duration-200"
                style={{ minHeight: '44px' }}
              >
                <Icon className={cn('h-5 w-5 transition-all duration-200', active ? 'text-primary scale-110' : 'text-muted')} />
                <span className={cn('text-[11px] font-medium', active ? 'text-primary' : 'text-muted')}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Right Slide-Out Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-xl lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[85vw] max-w-[430px] flex-col border-l border-white/10 bg-[rgba(7,11,20,0.96)] shadow-2xl shadow-black/50 backdrop-blur-2xl lg:hidden"
            >
              <div className="border-b border-white/10 px-4 py-4 sm:px-5">
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href="/"
                    className="flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogoMark id="mobile-drawer" className="h-12 w-12 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                        {siteName}
                      </p>
                      <p className="mt-1 text-sm text-muted">{tagline}</p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-all duration-200 hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
                <div className="grid gap-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 * index, duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            'flex items-center justify-between rounded-2xl border px-4 py-3.5 text-[15px] font-medium transition-all duration-200',
                            isActive(item.href)
                              ? 'border-primary/25 bg-primary/10 text-primary'
                              : 'border-transparent bg-white/[0.03] text-muted hover:border-white/10 hover:bg-white/[0.05] hover:text-white'
                          )}
                          style={{ minHeight: '44px' }}
                        >
                          <span className="flex items-center gap-3">
                            <Icon className="h-4.5 w-4.5" />
                            {item.label}
                          </span>
                          <ChevronRight className="h-4 w-4 opacity-70" />
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${displayPhone}`}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/25 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-300 transition-all duration-200 hover:scale-[1.02]"
                    style={{ minHeight: '44px' }}
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${displayWhatsApp}`}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300 transition-all duration-200 hover:scale-[1.02]"
                    style={{ minHeight: '44px' }}
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
                    style={{ minHeight: '44px' }}
                  >
                    <Mail className="h-4 w-4" />
                    Email Us
                  </a>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
                    style={{ minHeight: '44px' }}
                  >
                    <MapPin className="h-4 w-4" />
                    Find Us
                  </Link>
                </div>
              </div>

              <div className="border-t border-white/10 px-4 py-4 sm:px-5">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="space-y-2 text-sm text-muted">
                    <a href={`tel:${displayPhone}`} className="flex items-center gap-2 text-white/90 hover:text-primary">
                      <Phone className="h-4 w-4" />
                      {phoneNumber}
                    </a>
                    <a href={`https://wa.me/${displayWhatsApp}`} className="flex items-center gap-2 text-white/90 hover:text-primary">
                      <WhatsAppIcon className="h-4 w-4" />
                      {whatsappNumber || phoneNumber}
                    </a>
                    <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/90 hover:text-primary">
                      <Mail className="h-4 w-4" />
                      {email}
                    </a>
                    <p className="flex items-center gap-2 text-white/90">
                      <MapPin className="h-4 w-4" />
                      {address}
                    </p>
                    <p className="flex items-center gap-2 text-white/90">
                      <Clock3 className="h-4 w-4" />
                      {hours}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {socialItems.map(({ key, label, href, icon: Icon }) => (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-background/60 text-muted transition hover:border-primary/30 hover:text-primary"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}