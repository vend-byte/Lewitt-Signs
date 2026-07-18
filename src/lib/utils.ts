import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import bcrypt from 'bcryptjs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function generateOrder(items: { order: number }[], targetIndex?: number): number {
  const orders = items.map(item => item.order).sort((a, b) => a - b)
  
  if (targetIndex !== undefined) {
    if (orders.length === 0) return 0
    if (targetIndex === 0) return Math.min(...orders) - 1
    if (targetIndex >= orders.length) return Math.max(...orders) + 1
    
    const before = orders[targetIndex - 1]
    const after = orders[targetIndex]
    return Math.floor((before + after) / 2)
  }
  
  return orders.length > 0 ? Math.max(...orders) + 1 : 0
}

export function reorder<T extends { order: number }>(items: T[], sourceIndex: number, destinationIndex: number): T[] {
  const result = Array.from(items)
  const [removed] = result.splice(sourceIndex, 1)
  result.splice(destinationIndex, 0, removed)
  
  return result.map((item, index) => ({
    ...item,
    order: index,
  }))
}

export const SERVICE_ICONS = [
  'Palette',
  'CreditCard',
  'FileText',
  'Flag',
  'Triangle',
  'Sparkles',
  'Car',
  'AppWindow',
  'Wallpaper',
  'Signpost',
  'Box',
  'Printer',
  'Sticker',
  'Image',
  'Shirt',
  'Coffee',
  'Crown',
  'Package',
  'CalendarDays',
  'Presentation',
  'Clapperboard',
  'Lightbulb',
  'BookOpen',
] as const

// Official LEWITT SIGNS service catalogue (21 services)
export const DEFAULT_SERVICES = [
  { title: 'Logo Design', icon: 'Palette', description: 'Distinctive, memorable logos that capture your brand essence' },
  { title: 'Business Cards', icon: 'CreditCard', description: 'Premium business cards that make lasting first impressions' },
  { title: 'Flyers & Brochures', icon: 'FileText', description: 'Eye-catching flyers and brochures that tell your story beautifully' },
  { title: 'Roll-Up Banners', icon: 'Flag', description: 'Portable exhibition banners for trade shows and events' },
  { title: 'X-Banners & Teardrops', icon: 'Triangle', description: 'Unique display flags that stand out anywhere' },
  { title: 'Corporate Branding', icon: 'Sparkles', description: 'Complete corporate identity packages that build trust' },
  { title: 'Vehicle Branding', icon: 'Car', description: 'Turn your fleet into moving billboards' },
  { title: 'Window Graphics', icon: 'AppWindow', description: 'Transform windows into stunning brand displays' },
  { title: 'Wall Branding', icon: 'Wallpaper', description: 'Transform your spaces with custom wall graphics' },
  { title: 'Sign Boards', icon: 'Signpost', description: 'Durable indoor and outdoor sign boards built to last' },
  { title: '3D Signage', icon: 'Box', description: 'Impactful three-dimensional signs that demand attention' },
  { title: 'Large Format Printing', icon: 'Printer', description: 'High-quality large-scale prints with vivid color' },
  { title: 'Stickers & Labels', icon: 'Sticker', description: 'Custom stickers and labels for branding and packaging' },
  { title: 'Posters', icon: 'Image', description: 'Bold, high-resolution posters for promotions and events' },
  { title: 'T-Shirt Printing', icon: 'Shirt', description: 'Branded apparel for teams, events, and promotions' },
  { title: 'Mug Printing', icon: 'Coffee', description: 'Custom printed mugs for gifts and merchandise' },
  { title: 'Caps & Promotional Merchandise', icon: 'Crown', description: 'Caps and promotional items that spread your brand' },
  { title: 'Packaging Design', icon: 'Package', description: 'Packaging that makes your product impossible to ignore' },
  { title: 'Event Branding', icon: 'CalendarDays', description: 'Complete branding for events, launches, and activations' },
  { title: 'Exhibition Displays', icon: 'Presentation', description: 'Professional exhibition stands and display systems' },
  { title: 'Video Editing & Motion Graphics', icon: 'Clapperboard', description: 'Dynamic video content and motion graphics' },
]

export const PORTFOLIO_CATEGORIES = [
  'All',
  'Logo Design',
  'Business Cards',
  'Banners',
  'Vehicle Branding',
  'Signage',
  'Corporate Branding',
  'Apparel',
  'Window Graphics',
  '3D Signage',
]

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', direction: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', direction: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', direction: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', direction: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', direction: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', direction: 'ltr' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', direction: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr' },
]

export const SOCIAL_LINKS = [
  { name: 'Facebook', icon: 'Facebook', color: '#1877F2' },
  { name: 'Instagram', icon: 'Instagram', color: '#E4405F' },
  { name: 'TikTok', icon: 'Music', color: '#000000' },
  { name: 'YouTube', icon: 'Youtube', color: '#FF0000' },
  { name: 'LinkedIn', icon: 'Linkedin', color: '#0A66C2' },
  { name: 'Twitter', icon: 'Twitter', color: '#1DA1F2' },
  { name: 'Pinterest', icon: 'MapPin', color: '#E60023' },
]

export const PERMISSIONS = {
  SUPER_ADMIN: ['*'],
  ADMIN: [
    'dashboard:view',
    'pages:manage',
    'services:manage',
    'portfolio:manage',
    'media:manage',
    'pricing:manage',
    'testimonials:manage',
    'faq:manage',
    'blog:manage',
    'contact:manage',
    'settings:manage',
    'analytics:view',
  ],
  EDITOR: [
    'dashboard:view',
    'services:manage',
    'portfolio:manage',
    'blog:manage',
    'testimonials:manage',
    'faq:manage',
    'media:manage',
  ],
}