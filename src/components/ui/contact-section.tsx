'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube, Send, CheckCircle2 } from 'lucide-react'
import { createContactMessage } from '@/actions/services'

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(5, 'Phone number is required'),
  companyName: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Please share a bit more detail'),
})

type ContactFormValues = z.infer<typeof contactSchema>

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
]

interface ContactSectionProps {
  settings: Record<string, string>
}

export function ContactSection({ settings }: ContactSectionProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    const result = await createContactMessage(data)
    setIsSubmitting(false)

    if (result.success) {
      setSubmitted(true)
      reset()
    }
  }

  return (
    <section className="section bg-background pt-32 pb-20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12">
          <div className="rounded-3xl border border-white/10 bg-card/70 p-8 lg:p-10 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Contact LEWITT SIGNS
            </div>
            <h1 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">LEWITT SIGNS</h1>
            <p className="mt-3 text-lg text-primary">Printing • Branding • Impact</p>
            <p className="mt-6 text-base leading-8 text-muted">
              From premium signage to corporate branding, our team is ready to help you create a lasting impression. Reach out today for a tailored solution.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <Phone className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted">Phone</p>
                  <a href={`tel:${settings['contact.phone']?.replace(/\s/g, '')}`} className="font-medium text-white hover:text-primary">
                    {settings['contact.phone']}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <Mail className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted">Email</p>
                  <a href={`mailto:${settings['contact.email']}`} className="font-medium text-white hover:text-primary">
                    {settings['contact.email']}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted">Address</p>
                  <p className="font-medium text-white">{settings['contact.address']}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <Clock className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted">Business Hours</p>
                  <p className="font-medium text-white">{settings['contact.hours']}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-muted">Follow us</div>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <a key={name} href={href} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition hover:border-primary hover:text-primary">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="LEWITT SIGNS location"
                src="https://www.google.com/maps?q=Kimathi%20Street%2C%20Nairobi%2C%20Kenya&z=14&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-card/70 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl lg:p-10">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-white">Send us a message</h2>
                <p className="mt-2 text-sm text-muted">We usually reply within one business day.</p>
              </div>
              {submitted ? <CheckCircle2 className="h-7 w-7 text-emerald-400" /> : null}
            </div>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                Thanks! Your message has been received and will be reviewed by our team shortly.
              </div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-muted">Full Name</label>
                  <input {...register('fullName')} className="w-full rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-white outline-none ring-0 transition focus:border-primary" />
                  {errors.fullName ? <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p> : null}
                </div>
                <div>
                  <label className="mb-2 block text-sm text-muted">Email Address</label>
                  <input type="email" {...register('email')} className="w-full rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-white outline-none transition focus:border-primary" />
                  {errors.email ? <p className="mt-1 text-sm text-red-400">{errors.email.message}</p> : null}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-muted">Phone Number</label>
                  <input {...register('phone')} className="w-full rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-white outline-none transition focus:border-primary" />
                  {errors.phone ? <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p> : null}
                </div>
                <div>
                  <label className="mb-2 block text-sm text-muted">Company Name</label>
                  <input {...register('companyName')} className="w-full rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-white outline-none transition focus:border-primary" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted">Subject</label>
                <input {...register('subject')} className="w-full rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-white outline-none transition focus:border-primary" />
                {errors.subject ? <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p> : null}
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted">Message</label>
                <textarea rows={5} {...register('message')} className="w-full rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-white outline-none transition focus:border-primary" />
                {errors.message ? <p className="mt-1 text-sm text-red-400">{errors.message.message}</p> : null}
              </div>

              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70">
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
