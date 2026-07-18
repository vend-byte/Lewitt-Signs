'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Palette,
  CreditCard,
  FileText,
  BookOpen,
  Flag,
  Triangle,
  AppWindow,
  Car,
  Wallpaper,
  Signpost,
  Box,
  Lightbulb,
  Sticker,
  Shirt,
  Crown,
  Printer,
  Video,
  Play,
  Coffee,
  Package,
  CalendarDays,
  Presentation,
  Clapperboard,
  Image as ImageIcon,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Palette,
  CreditCard,
  FileText,
  BookOpen,
  Flag,
  Banner: Flag,
  Triangle,
  Window: AppWindow,
  AppWindow,
  Car,
  Wallpaper,
  Sign: Signpost,
  Signpost,
  Box,
  Lightbulb,
  Sticker,
  Shirt,
  Crown,
  Printer,
  Video,
  Play,
  Sparkles,
  Coffee,
  Package,
  CalendarDays,
  Presentation,
  Clapperboard,
  Image: ImageIcon,
}

export function ServiceIcon({ name, className }: { name?: string | null; className?: string }) {
  const Icon = (name && iconMap[name]) || Sparkles
  return <Icon className={className || 'w-6 h-6'} />
}

interface ServiceCardProps {
  title: string
  description?: string
  icon?: string
  href?: string
  index?: number
}

export function ServiceCard({ title, description, icon = 'Sparkles', href = '/services', index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 8) * 0.06, duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="group h-full"
    >
      <Link href={href} className="block h-full">
        <div className="card-hover h-full flex flex-col">
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-cta/20 border border-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-200">
            <ServiceIcon name={icon} className="w-6 h-6" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-muted text-sm flex-1 leading-relaxed">{description}</p>
          )}

          {/* Arrow */}
          <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Learn More <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

interface SectionHeadingProps {
  badge?: string
  title: string
  description?: string
  centered?: boolean
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function SectionHeading({ badge, title, description, centered = true }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center')}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium"
        >
          <Sparkles className="w-4 h-4" />
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="heading-2 text-white mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={cn('text-muted text-lg', centered && 'max-w-2xl mx-auto')}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

interface StatCardProps {
  value: string | number
  label: string
  suffix?: string
}

export function StatCard({ value, label, suffix = '' }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {value}
        {suffix}
      </div>
      <div className="text-muted text-sm uppercase tracking-wider">{label}</div>
    </motion.div>
  )
}

interface FeatureItemProps {
  text: string
  index?: number
}

export function FeatureItem({ text, index = 0 }: FeatureItemProps) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="flex items-center gap-3 text-muted"
    >
      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
      {text}
    </motion.li>
  )
}
