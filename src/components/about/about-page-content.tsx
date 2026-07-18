'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, animate } from 'framer-motion'
import {
  Award,
  Lightbulb,
  ShieldCheck,
  Heart,
  Rocket,
  Clock,
  Target,
  Eye,
  CheckCircle2,
  BadgeCheck,
  ArrowRight,
  Quote,
  type LucideIcon,
} from 'lucide-react'

const valueIcons: Record<string, LucideIcon> = {
  Award,
  Lightbulb,
  ShieldCheck,
  Heart,
  Rocket,
  Clock,
}

export interface AboutPageContentProps {
  story: string[]
  mission: string
  vision: string
  values: { title: string; description: string; icon: string }[]
  whyChoose: string[]
  services: string[]
  promise: string
  motto: string
  slogan: string
  stats: { value: number; suffix: string; label: string }[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

export function AboutPageContent({
  story,
  mission,
  vision,
  values,
  whyChoose,
  services,
  promise,
  motto,
  slogan,
  stats,
}: AboutPageContentProps) {
  return (
    <>
      {/* ------------------------------------------------ Page hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <BadgeCheck className="w-4 h-4" />
            About Us
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="heading-1 text-white mb-6"
          >
            The Story Behind
            <br />
            <span className="text-gradient">LEWITT SIGNS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto"
          >
            {slogan}
          </motion.p>
        </div>
      </section>

      {/* ------------------------------------------------ Story */}
      <section className="section !pt-8 bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-10">
                  <Image
                    src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&h=900&fit=crop"
                    alt="Creative design workspace at Lewitt Signs"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&h=900&fit=crop"
                    alt="Brand strategy and planning"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating experience card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                  <BadgeCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-none">5+ Years</p>
                  <p className="text-muted text-xs mt-1">of Experience</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Text */}
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-primary font-semibold text-sm uppercase tracking-[0.2em]"
              >
                Who We Are
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="heading-2 text-white mt-3 mb-6"
              >
                Modern Printing & Creative Branding
              </motion.h2>

              <div className="space-y-5">
                {story.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="text-muted leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Motto chips */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-3 mt-8"
              >
                {motto.split('•').map((word) => (
                  <span
                    key={word}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white"
                  >
                    {word.trim()}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Mission & Vision */}
      <section className="py-20 bg-card border-y border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl bg-background border border-white/5 p-8 lg:p-10 hover:border-primary/30 transition-all duration-200 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-200" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-muted leading-relaxed">{mission}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="group relative rounded-2xl bg-background border border-white/5 p-8 lg:p-10 hover:border-cta/30 transition-all duration-200 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-cta/10 rounded-full blur-3xl group-hover:bg-cta/20 transition-all duration-200" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-cta/15 border border-cta/25 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-cta" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-muted leading-relaxed">{vision}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Core Values */}
      <section className="section bg-background">
        <div className="container-custom">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-semibold text-sm uppercase tracking-[0.2em]"
            >
              What Drives Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-2 text-white mt-3"
            >
              Our Core Values
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = valueIcons[value.icon] || Award
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 3) * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card-hover group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cta/20 border border-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2.5">{value.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Stats band */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-card to-cta/5 border-y border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-muted text-xs lg:text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Why Choose Us */}
      <section className="section bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-primary font-semibold text-sm uppercase tracking-[0.2em]"
              >
                Why Choose Us
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="heading-2 text-white mt-3 mb-5"
              >
                Why Choose Lewitt Signs?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-muted leading-relaxed mb-8"
              >
                We combine premium materials, modern technology, and a passionate team
                to deliver branding that makes your business stand out - every single time.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link href="/contact" className="btn-primary">
                  Start Your Project <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {whyChoose.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 2) * 0.08 + Math.floor(index / 2) * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-white/5 hover:border-primary/25 transition-all duration-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-white text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Services cloud */}
      <section className="py-20 bg-card border-y border-white/5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-semibold text-sm uppercase tracking-[0.2em]"
            >
              What We Do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-2 text-white mt-3 mb-4"
            >
              A Comprehensive Range of Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-muted max-w-2xl mx-auto"
            >
              From a single business card to complete corporate branding - we do it all.
            </motion.p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <motion.span
                key={service}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className="px-5 py-2.5 rounded-full bg-background border border-white/10 text-sm font-medium text-white hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-default"
              >
                {service}
              </motion.span>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="btn-secondary">
              Explore All Services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Promise / Motto / Slogan */}
      <section className="section bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8"
            >
              <Quote className="w-7 h-7 text-primary" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-2 text-white mb-6"
            >
              Our Promise
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted text-lg leading-relaxed mb-10"
            >
              {promise}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-2xl md:text-3xl font-bold">
                <span className="text-white">Printing </span>
                <span className="text-primary">• </span>
                <span className="text-white">Branding </span>
                <span className="text-primary">• </span>
                <span className="text-gradient">Impact</span>
              </p>
              <p className="text-muted italic">{slogan}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ CTA */}
      <section className="py-24 bg-gradient-to-br from-primary/15 via-card to-cta/10 border-t border-white/5">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-2 text-white mb-4"
          >
            Ready to Elevate Your Brand?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted text-lg mb-3 max-w-2xl mx-auto"
          >
            Whether you&apos;re launching a new business, promoting an event, or
            refreshing your company&apos;s image, Lewitt Signs is your trusted partner
            for premium printing and branding solutions.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-white font-semibold text-lg mb-8"
          >
            Let&apos;s create something extraordinary together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Contact Us
            </Link>
            <Link href="/services" className="btn-secondary text-lg px-8 py-4">
              Explore Our Services
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
