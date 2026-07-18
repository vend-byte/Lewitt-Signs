"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ChevronRight, 
  ArrowRight,
  Star,
  Shield,
  Zap,
  Award
} from 'lucide-react'

interface HeroProps {
  title: string
  subtitle?: string
  primaryButton?: string
  primaryButtonLink?: string
  secondaryButton?: string
  secondaryButtonLink?: string
  backgroundImage?: string
  overlayOpacity?: number
  backgroundVideo?: string
  experienceYears?: number
}

function ExperienceBadge({ years = 5, className = '' }: { years?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      <motion.div
        animate={{ 
          y: [0, -6, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="glass-premium rounded-2xl px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 shadow-2xl shadow-black/30 border border-white/10"
      >
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-primary/20 to-cta/10 border border-primary/25 flex items-center justify-center shrink-0">
          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
        <div className="text-left">
          <p className="text-white font-bold text-base sm:text-lg leading-none">{years}+ Years</p>
          <p className="text-muted text-[10px] sm:text-xs mt-1">of Excellence</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Hero({
  title,
  subtitle,
  primaryButton = 'Contact Us',
  primaryButtonLink = '/contact',
  secondaryButton = 'View Portfolio',
  secondaryButtonLink = '/portfolio',
  backgroundImage,
  overlayOpacity = 0.65,
  backgroundVideo,
  experienceYears = 5,
}: HeroProps) {
  const lines = title.split('\n').filter((l) => l.trim().length > 0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Generate particles only on client side
  const particles = isMounted ? [...Array(12)].map((_, i) => ({
    width: 1.5 + Math.random() * 3,
    height: 1.5 + Math.random() * 3,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 3,
    yOffset: 30 + Math.random() * 20,
    xOffset: (Math.random() - 0.5) * 20,
  })) : []

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse at 20% 50%, rgba(0,240,255,0.08) 0%, transparent 60%)',
              'radial-gradient(ellipse at 80% 50%, rgba(0,240,255,0.08) 0%, transparent 60%)',
              'radial-gradient(ellipse at 20% 50%, rgba(0,240,255,0.08) 0%, transparent 60%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Background Media */}
      <div className="absolute inset-0">
        {backgroundVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : backgroundImage ? (
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
        ) : null}
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/90"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Animated Orbs - Only render on client */}
      {isMounted && (
        <>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -top-40 -left-40 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-primary/10 blur-[80px] sm:blur-[100px]"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-40 -right-40 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-cta/8 blur-[80px] sm:blur-[100px]"
              animate={{
                x: [0, -100, 0],
                y: [0, 50, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-primary/5 blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Floating Particles - Only render on client */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/20"
                style={{
                  width: p.width,
                  height: p.height,
                  top: `${p.top}%`,
                  left: `${p.left}%`,
                }}
                animate={{
                  y: [0, -p.yOffset, 0],
                  x: [0, p.xOffset, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 container-custom text-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Brand Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 mb-6 sm:mb-8 glass-premium border border-white/10"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cta animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.18em] text-white uppercase">
              LEWITT <span className="text-primary">SIGNS</span>
            </span>
            <span className="hidden sm:inline-block w-px h-4 bg-white/10" />
            <span className="hidden sm:inline text-[10px] sm:text-xs text-muted tracking-wider">
              Premium Print
            </span>
          </motion.div>

          {/* Title - Fully Responsive */}
          <motion.h1 
            className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {lines.map((line, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.12, duration: 0.6, ease: 'easeOut' }}
                className={`block ${index === 1 ? 'text-gradient' : ''}`}
              >
                {line.trim()}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-muted max-w-2xl mx-auto mb-8 sm:mb-10 px-2 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href={primaryButtonLink}
              className="group relative w-full sm:w-auto min-w-[180px] md:min-w-[200px] px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-cta to-cta-dark text-background font-bold rounded-xl text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(228,255,0,0.3)] flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">{primaryButton}</span>
              <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cta via-white/30 to-cta-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </Link>

            <Link
              href={secondaryButtonLink}
              className="group w-full sm:w-auto min-w-[160px] md:min-w-[180px] px-6 sm:px-8 py-3.5 sm:py-4 border border-white/15 text-white font-semibold rounded-xl text-sm sm:text-base md:text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 flex items-center justify-center gap-2 backdrop-blur-sm hover:scale-105"
            >
              {secondaryButton}
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs md:text-sm text-muted"
          >
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-cta fill-cta" />
              4.9/5 Rating
            </span>
            <span className="hidden xs:inline-block w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
              100% Satisfaction
            </span>
            <span className="hidden xs:inline-block w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
              Fast Turnaround
            </span>
          </motion.div>

          {/* Experience Badge - Mobile/Tablet */}
          <div className="mt-10 sm:mt-12 flex justify-center lg:hidden">
            <ExperienceBadge years={experienceYears} />
          </div>
        </div>
      </div>

      {/* Experience Badge - Desktop */}
      <div className="hidden lg:block absolute bottom-24 right-8 xl:right-16 2xl:right-24 z-10">
        <ExperienceBadge years={experienceYears} />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-muted/40 font-medium">
            Scroll
          </span>
          <motion.div 
            className="w-4 h-7 sm:w-5 sm:h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5"
            animate={{
              borderColor: ['rgba(255,255,255,0.15)', 'rgba(0,240,255,0.3)', 'rgba(255,255,255,0.15)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
