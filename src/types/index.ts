// Type exports from Prisma schema
// These will be auto-generated when Prisma client is generated

export interface User {
  id: string
  email: string
  password: string
  name: string | null
  avatar: string | null
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR'
  lastLogin: Date | null
  emailVerified: Date | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface Service {
  id: string
  title: string
  description: string | null
  icon: string | null
  image: string | null
  order: number
  status: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface Portfolio {
  id: string
  title: string
  description: string | null
  category: string | null
  services: string[]
  featured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface PortfolioImage {
  id: string
  portfolioId: string
  url: string
  publicId: string | null
  width: number | null
  height: number | null
  format: string | null
  bytes: number | null
  alt: string | null
  createdAt: Date
}

export interface Blog {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  featuredImage: string | null
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  publishedAt: Date | null
  authorId: string | null
  categoryId: string | null
  tags: string[]
  seoTitle: string | null
  seoDescription: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface Category {
  id: string
  name: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

export interface Setting {
  id: string
  key: string
  value: string
  group: string
  type: string
  createdAt: Date
  updatedAt: Date
}

export interface ContactMessage {
  id: string
  fullName: string
  email: string
  phone: string | null
  companyName: string | null
  subject: string
  message: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface Testimonial {
  id: string
  clientName: string
  company: string | null
  position: string | null
  photo: string | null
  review: string
  rating: number
  order: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface FAQ {
  id: string
  question: string
  answer: string
  order: number
  status: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface PricingPlan {
  id: string
  name: string
  description: string | null
  price: number | null
  currency: string
  features: unknown[]
  order: number
  status: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface Hero {
  id: string
  title: string
  subtitle: string | null
  primaryButton: string | null
  primaryButtonLink: string | null
  secondaryButton: string | null
  secondaryButtonLink: string | null
  backgroundImage: string | null
  backgroundVideo: string | null
  overlayOpacity: number
  createdAt: Date
  updatedAt: Date
}

export interface SystemLog {
  id: string
  userId: string | null
  action: string
  details: unknown | null
  ipAddress: string | null
  userAgent: string | null
  createdAt: Date
}

export interface Media {
  id: string
  url: string
  publicId: string | null
  width: number | null
  height: number | null
  format: string | null
  bytes: number | null
  folder: string | null
  createdAt: Date
}

export interface Language {
  id: string
  code: string
  name: string
  nativeName: string | null
  direction: string
  status: boolean
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Translation {
  id: string
  languageId: string
  key: string
  value: string
  createdAt: Date
  updatedAt: Date
}

export interface About {
  id: string
  mission: string | null
  vision: string | null
  story: string | null
  stats: unknown
  createdAt: Date
  updatedAt: Date
}

export interface Footer {
  id: string
  section: string
  content: string
  order: number
  status: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Contact {
  id: string
  type: string
  value: string
  label: string | null
  icon: string | null
  order: number
  status: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Backup {
  id: string
  name: string
  type: string
  fileName: string | null
  size: number | null
  status: string
  createdAt: Date
  completedAt: Date | null
}

export interface AnalyticsEvent {
  id: string
  event: string
  properties: unknown | null
  visitorId: string | null
  ipAddress: string | null
  userAgent: string | null
  country: string | null
  city: string | null
  device: string | null
  browser: string | null
  os: string | null
  referrer: string | null
  createdAt: Date
}

// Types with relations
export type ServiceWithRelations = Service
export type PortfolioWithImages = Portfolio & {
  images: PortfolioImage[]
}
export type BlogWithRelations = Blog & {
  author: Pick<User, 'id' | 'name' | 'avatar'> | null
  category: Pick<Category, 'id' | 'name' | 'slug'> | null
}

export interface Settings {
  general: {
    websiteName: string
    tagline: string
    logo: string
    favicon: string
    browserTitle: string
    footerText: string
    timezone: string
    currency: string
    country: string
    defaultLanguage: string
    dateFormat: string
    timeFormat: string
  }
  website: {
    maintenanceMode: boolean
    comingSoonMode: boolean
    enableBlog: boolean
    enablePortfolio: boolean
    enablePricing: boolean
    enableTestimonials: boolean
    enableFAQ: boolean
    enableSearch: boolean
    enableWhatsApp: boolean
    enableCall: boolean
    enableNewsletter: boolean
    enableAnimations: boolean
    enableLoader: boolean
    enableCookieBanner: boolean
    enableBackToTop: boolean
  }
  contact: {
    mainPhone: string
    secondaryPhone: string
    whatsAppNumber: string
    emergencyPhone: string
    salesEmail: string
    supportEmail: string
    officeAddress: string
    googleMapsEmbed: string
    businessHours: string
  }
  social: {
    facebook: string
    instagram: string
    tiktok: string
    youtube: string
    linkedin: string
    threads: string
    pinterest: string
    twitter: string
  }
  seo: {
    homeTitle: string
    metaDescription: string
    keywords: string
    canonicalUrl: string
    ogImage: string
    twitterCard: string
    googleAnalytics: string
    googleSearchConsole: string
    facebookPixel: string
    schemaJsonLd: string
    robotsTxt: string
    enableSitemap: boolean
  }
  appearance: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    fontFamily: string
    theme: 'dark' | 'light'
    borderRadius: string
    containerWidth: string
    animationSpeed: string
  }
}

export interface DashboardStats {
  totalVisitors: number
  totalPortfolioItems: number
  totalServices: number
  totalImagesUploaded: number
  storageUsed: number
  recentActivities: SystemLog[]
}

export interface HeroData {
  title: string
  subtitle: string
  primaryButton: string
  primaryButtonLink: string
  secondaryButton: string
  secondaryButtonLink: string
  backgroundImage: string
  overlayOpacity: number
}

export interface AboutData {
  mission: string
  vision: string
  story: string
  stats: { label: string; value: string; icon: string }[]
}

export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface TableColumn<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
}

export interface FilterOption {
  label: string
  value: string
}

export interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface UploadResponse {
  url: string
  publicId: string
  width: number
  height: number
  format: string
  bytes: number
}

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
}

export interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}