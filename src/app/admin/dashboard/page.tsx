import { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/db'
import {
  FileInput,
  Image as ImageIcon,
  Wrench,
  DollarSign,
  ArrowUpRight,
  Clock,
  FileText,
  Star,
  MessageSquare,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dashboard | Lewitt Signs Admin',
  description: 'Admin dashboard for Lewitt Signs',
}

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-500/10 text-blue-400',
  REVIEWING: 'bg-yellow-500/10 text-yellow-400',
  FOLLOW_UP: 'bg-cta/10 text-cta',
  RESOLVED: 'bg-green-500/10 text-green-400',
  REJECTED: 'bg-red-500/10 text-red-400',
  ARCHIVED: 'bg-gray-500/10 text-gray-400',
}

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default async function DashboardPage() {
  const [
    contactCount,
    portfolioCount,
    serviceCount,
    reviews,
    recentMessages,
    recentPortfolio,
    recentService,
    recentBlog,
  ] = await Promise.all([
    db.contactMessage.count(),
    db.portfolio.count({ where: { deletedAt: null } }),
    db.service.count({ where: { deletedAt: null } }),
    db.comment.findMany({ where: { status: 'APPROVED' } }),
    db.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 4 }),
    db.portfolio.findFirst({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } }),
    db.service.findFirst({ where: { deletedAt: null }, orderBy: { updatedAt: 'desc' } }),
    db.blog.findFirst({ where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' } }),
  ])

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  const stats = [
    {
      title: 'Contact Messages',
      value: String(contactCount),
      icon: FileInput,
      color: 'text-cta',
      bgColor: 'bg-cta/10',
    },
    {
      title: 'Portfolio Items',
      value: String(portfolioCount),
      icon: ImageIcon,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Services',
      value: String(serviceCount),
      icon: Wrench,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Reviews',
      value: reviews.length > 0 ? `${reviews.length} (${avgRating}★)` : '0',
      icon: Star,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
  ]

  const quickActions = [
    { title: 'Add Service', href: '/admin/services', icon: Wrench },
    { title: 'Add Portfolio', href: '/admin/portfolio', icon: ImageIcon },
    { title: 'Write Blog Post', href: '/admin/blog', icon: FileText },
    { title: 'View Messages', href: '/admin/contacts', icon: FileInput },
    { title: 'View Reviews', href: '/admin/comments', icon: MessageSquare },
    { title: 'Settings', href: '/admin/settings', icon: DollarSign },
  ]

  const activityItems = [
    recentPortfolio && {
      action: `Portfolio item "${recentPortfolio.title}" added`,
      time: timeAgo(recentPortfolio.createdAt),
      icon: ImageIcon,
      date: recentPortfolio.createdAt,
    },
    recentService && {
      action: `Service "${recentService.title}" updated`,
      time: timeAgo(recentService.updatedAt),
      icon: Wrench,
      date: recentService.updatedAt,
    },
    recentBlog && {
      action: `Blog post "${recentBlog.title}" published`,
      time: recentBlog.publishedAt ? timeAgo(recentBlog.publishedAt) : '',
      icon: FileText,
      date: recentBlog.publishedAt || recentBlog.createdAt,
    },
    recentMessages[0] && {
      action: `New contact message from ${recentMessages[0].fullName}`,
      time: timeAgo(recentMessages[0].createdAt),
      icon: FileInput,
      date: recentMessages[0].createdAt,
    },
  ]
    .filter(Boolean)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-muted text-sm mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/contacts" className="btn-secondary text-sm">
            View All Messages
          </Link>
          <Link href="/admin/services" className="btn-primary text-sm">
            Add New Service
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="card p-5">
            <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-muted text-sm mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Contact Messages */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Contact Messages</h2>
            <Link href="/admin/contacts" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <p className="text-muted text-sm">No contact messages yet.</p>
          ) : (
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cta flex items-center justify-center text-background font-bold">
                      {message.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-white">{message.fullName}</p>
                      <p className="text-muted text-sm">{message.subject}</p>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-muted flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {timeAgo(message.createdAt)}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[message.status] || statusColors.NEW}`}>
                    {message.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-6">Quick Actions</h2>

          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-200">
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{action.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-6">Recent Activity</h2>

        {activityItems.length === 0 ? (
          <p className="text-muted text-sm">No recent activity yet.</p>
        ) : (
          <div className="space-y-4">
            {activityItems.map((activity: any, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <activity.icon className="w-4 h-4 text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-xs text-muted mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
