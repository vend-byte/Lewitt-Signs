'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Home,
  Wrench,
  Image as ImageIcon,
  FolderOpen,
  DollarSign,
  MessageSquare,
  HelpCircle,
  FileText,
  Phone,
  FileInput,
  BarChart3,
  Users,
  Settings,
  Shield,
  Database,
  ScrollText,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'
import { logoutAction } from '@/actions/auth'

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Landing Page', href: '/admin/landing', icon: Home },
  { name: 'Services', href: '/admin/services', icon: Wrench },
  { name: 'Portfolio', href: '/admin/portfolio', icon: ImageIcon },
  { name: 'Media Library', href: '/admin/media', icon: FolderOpen },
  { name: 'Pricing', href: '/admin/pricing', icon: DollarSign },
  { name: 'Reviews', href: '/admin/comments', icon: MessageSquare },
  { name: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Contact Info', href: '/admin/contact', icon: Phone },
  { name: 'Contact Messages', href: '/admin/contacts', icon: FileInput },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Security', href: '/admin/security', icon: Shield },
  { name: 'Backups', href: '/admin/backups', icon: Database },
  { name: 'Logs', href: '/admin/logs', icon: ScrollText },
]

function SidebarContent({ pathname, collapsed }: { pathname: string; collapsed: boolean }) {
  return (
    <>
      <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-8.5rem)]">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link
              key={link.href}
              href={link.href}
              title={collapsed ? link.name : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted hover:bg-white/5 hover:text-white'
              )}
            >
              <link.icon className={cn('w-5 h-5 shrink-0', collapsed && 'mx-auto')} />
              {!collapsed && <span className="text-sm font-medium">{link.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/5 space-y-1 bg-card">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted hover:bg-white/5 hover:text-white transition-all duration-200"
        >
          <ExternalLink className={cn('w-5 h-5 shrink-0', collapsed && 'mx-auto')} />
          {!collapsed && <span className="text-sm font-medium">View Website</span>}
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 w-full"
          >
            <LogOut className={cn('w-5 h-5 shrink-0', collapsed && 'mx-auto')} />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </form>
      </div>
    </>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Login page gets no sidebar/chrome — it's not authenticated yet
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full z-40 bg-card border-r border-white/5 transition-all duration-200 hidden lg:block',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Branding */}
        <div className="flex items-center h-20 px-4 border-b border-white/5">
          {collapsed ? (
            <Link href="/admin/dashboard" className="mx-auto">
              <Logo href="/admin/dashboard" size="sm" markId="admin-collapsed" showWordmark={false} />
            </Link>
          ) : (
            <Logo href="/admin/dashboard" size="sm" markId="admin" />
          )}
        </div>

        <SidebarContent pathname={pathname} collapsed={collapsed} />

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-card border border-white/10 flex items-center justify-center text-muted hover:text-white hover:bg-card-hover transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 lg:hidden bg-card/95 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between h-16 px-4">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded-lg text-muted hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Logo href="/admin/dashboard" size="sm" markId="admin-mobile" />

          <form action={logoutAction}>
            <button
              type="submit"
              aria-label="Logout"
              className="p-2 rounded-lg text-muted hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </form>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 left-0 h-full z-50 w-72 bg-card border-r border-white/5 lg:hidden"
            >
              <div className="flex items-center justify-between h-20 px-4 border-b border-white/5">
                <Logo href="/admin/dashboard" size="sm" markId="admin-drawer" />
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-lg text-muted hover:bg-white/5 hover:text-white transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-12rem)]">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <link.icon className="w-5 h-5 shrink-0" />
                      <span className="text-sm font-medium">{link.name}</span>
                    </Link>
                  )
                })}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/5 space-y-1 bg-card">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted hover:bg-white/5 hover:text-white transition-all duration-200"
                >
                  <ExternalLink className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">View Website</span>
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 w-full"
                  >
                    <LogOut className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </form>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={cn(
          'min-h-screen transition-all duration-200',
          collapsed ? 'lg:ml-20' : 'lg:ml-64'
        )}
      >
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  )
}