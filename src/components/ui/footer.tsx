import Link from 'next/link'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react'
import { getSettingsMap } from '@/actions/settings'
import { Logo } from './logo'
import { NewsletterForm } from './newsletter-form'

/** TikTok brand icon (not available in Lucide) */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.31-2.83V9.4a6.34 6.34 0 1 0 5.76 6.32V8.73a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.16Z" />
    </svg>
  )
}

const QUICK_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export async function Footer() {
  const s = await getSettingsMap()

  const phone = s['contact.phone']
  const email = s['contact.email']
  const address = s['contact.address']
  const hours = s['contact.hours']
  const siteName = s['general.siteName'] || 'LEWITT SIGNS'
  const tagline = s['general.tagline'] || 'Printing • Branding • Impact'
  const year = new Date().getFullYear()

  const socials = [
    { name: 'Facebook', url: s['social.facebook'], Icon: Facebook },
    { name: 'Instagram', url: s['social.instagram'], Icon: Instagram },
    { name: 'TikTok', url: s['social.tiktok'], Icon: TikTokIcon },
    { name: 'LinkedIn', url: s['social.linkedin'], Icon: Linkedin },
    { name: 'YouTube', url: s['social.youtube'], Icon: Youtube },
  ].filter((item) => item.url)

  return (
    <footer className="bg-card border-t border-white/5">
      {/* Main footer */}
      <div className="container-custom py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Logo href="/" size="lg" markId="footer" />
            <p className="text-primary text-sm font-medium tracking-wide">
              {tagline}
            </p>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Premium printing, signage, and branding solutions crafted to make
              your business impossible to ignore.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map(({ name, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-muted hover:bg-primary hover:text-background hover:border-primary transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              {hours && (
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted text-sm">{hours}</span>
                </li>
              )}
              {phone && (
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-muted hover:text-white transition-colors duration-200 text-sm"
                  >
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <a
                    href={`mailto:${email}`}
                    className="text-muted hover:text-white transition-colors duration-200 text-sm"
                  >
                    {email}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted text-sm">{address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-muted text-sm mb-4">
              Subscribe for special offers, design tips, and updates.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted text-xs sm:text-sm text-center md:text-left">
              © {year} {siteName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-muted hover:text-white transition-colors duration-200 text-xs sm:text-sm"
              >
                Privacy Policy
              </Link>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <Link
                href="/terms"
                className="text-muted hover:text-white transition-colors duration-200 text-xs sm:text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
