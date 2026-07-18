// Shared settings constants & types (safe to import from anywhere)

export const DEFAULT_WHATSAPP = {
  number: '254795109943',
  enabled: true,
  color: '#25D366',
  position: 'bottom-right' as 'bottom-right' | 'bottom-left',
  pulse: true,
  glow: true,
  newTab: true,
}

export interface WhatsAppSettings {
  number: string
  enabled: boolean
  color: string
  position: 'bottom-right' | 'bottom-left'
  pulse: boolean
  glow: boolean
  newTab: boolean
}

export const SETTINGS_DEFAULTS: Record<string, string> = {
  // WhatsApp
  'whatsapp.number': DEFAULT_WHATSAPP.number,
  'whatsapp.enabled': 'true',
  'whatsapp.color': DEFAULT_WHATSAPP.color,
  'whatsapp.position': 'bottom-right',
  'whatsapp.pulse': 'true',
  'whatsapp.glow': 'true',
  'whatsapp.newTab': 'true',
  // General
  'general.siteName': 'LEWITT SIGNS',
  'general.tagline': 'Printing • Branding • Impact',
  'general.footerText': 'LEWITT SIGNS',
  'general.timezone': 'Africa/Nairobi',
  'general.currency': 'KES',
  'general.country': 'Kenya',
  // Website toggles
  'website.maintenanceMode': 'false',
  'website.comingSoonMode': 'false',
  'website.enableBlog': 'true',
  'website.enablePortfolio': 'true',
  'website.enablePricing': 'true',
  'website.enableTestimonials': 'true',
  'website.enableFAQ': 'true',
  'website.enableNewsletter': 'true',
  'website.enableAnimations': 'true',
  'website.enableBackToTop': 'true',
  // Contact
  'contact.phone': '0795109943',
  'contact.secondaryPhone': '',
  'contact.email': 'info@lewittsigns.com',
  'contact.supportEmail': 'support@lewittsigns.com',
  'contact.address': 'Kimathi Street, Nairobi, Kenya',
  'contact.hours': 'Mon - Sat: 8:00 AM - 6:00 PM',
  'contact.mapsEmbed': '',
  // Social
  'social.facebook': '#',
  'social.instagram': '#',
  'social.tiktok': '#',
  'social.youtube': '#',
  'social.linkedin': '#',
  'social.twitter': '#',
  // SEO
  'seo.title': 'LEWITT SIGNS | Premium Printing & Branding Solutions',
  'seo.description':
    'Transform your brand with Lewitt Signs. Expert printing, signage, and branding services that make your business stand out.',
  'seo.keywords': 'printing, branding, signage, logo design, business cards, banners, vehicle branding',
  'seo.ogImage': '',
  'seo.googleAnalytics': '',
}

export function groupForKey(key: string): string {
  const prefix = key.split('.')[0]
  const known = ['whatsapp', 'general', 'website', 'contact', 'social', 'seo', 'appearance']
  return known.includes(prefix) ? prefix : 'general'
}
