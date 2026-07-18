'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Services Actions
export async function getServices() {
  return db.service.findMany({
    where: { deletedAt: null },
    orderBy: { order: 'asc' },
  })
}

export async function getServiceById(id: string) {
  return db.service.findUnique({
    where: { id },
  })
}

export async function createService(data: {
  title: string
  description?: string
  icon?: string
  image?: string
  order?: number
  status?: boolean
}) {
  const service = await db.service.create({
    data: {
      title: data.title,
      description: data.description,
      icon: data.icon,
      image: data.image,
      order: data.order ?? 0,
      status: data.status ?? true,
    },
  })
  
  revalidatePath('/admin/services')
  revalidatePath('/services')
  revalidatePath('/')
  return service
}

export async function updateService(id: string, data: {
  title?: string
  description?: string
  icon?: string
  image?: string
  order?: number
  status?: boolean
}) {
  const service = await db.service.update({
    where: { id },
    data,
  })
  
  revalidatePath('/admin/services')
  revalidatePath('/services')
  revalidatePath('/')
  return service
}

export async function deleteService(id: string) {
  // Soft delete
  await db.service.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
  
  revalidatePath('/admin/services')
  revalidatePath('/services')
  revalidatePath('/')
}

export async function reorderServices(ids: string[]) {
  await Promise.all(
    ids.map((id, index) =>
      db.service.update({
        where: { id },
        data: { order: index },
      })
    )
  )
  
  revalidatePath('/admin/services')
  revalidatePath('/services')
}

// Portfolio Actions
export async function getPortfolioItems() {
  return db.portfolio.findMany({
    where: { deletedAt: null },
    include: { images: true },
    orderBy: { order: 'asc' },
  })
}

export async function getPortfolioById(id: string) {
  return db.portfolio.findUnique({
    where: { id },
    include: { images: true },
  })
}

export async function createPortfolio(data: {
  title: string
  description?: string
  category?: string
  services?: string[]
  featured?: boolean
  order?: number
}) {
  const portfolio = await db.portfolio.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      services: data.services ?? [],
      featured: data.featured ?? false,
      order: data.order ?? 0,
    },
  })
  
  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
  revalidatePath('/')
  return portfolio
}

export async function updatePortfolio(id: string, data: {
  title?: string
  description?: string
  category?: string
  services?: string[]
  featured?: boolean
  order?: number
}) {
  const portfolio = await db.portfolio.update({
    where: { id },
    data,
  })
  
  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
  revalidatePath('/')
  return portfolio
}

export async function deletePortfolio(id: string) {
  await db.portfolio.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
  
  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
  revalidatePath('/')
}

// Contact Message Actions
export async function getContactMessages() {
  return db.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function createContactMessage(data: {
  fullName: string
  email: string
  phone?: string
  companyName?: string
  subject: string
  message: string
}) {
  const message = await db.contactMessage.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      companyName: data.companyName,
      subject: data.subject,
      message: data.message,
      status: 'NEW',
    },
  })

  revalidatePath('/admin/contacts')
  return { success: true, message }
}

export async function updateContactMessageStatus(id: string, status: string) {
  await db.contactMessage.update({
    where: { id },
    data: { status },
  })

  revalidatePath('/admin/contacts')
}

export async function deleteContactMessage(id: string) {
  await db.contactMessage.delete({ where: { id } })
  revalidatePath('/admin/contacts')
}

// Settings Actions
export async function getSetting(key: string) {
  const setting = await db.setting.findUnique({
    where: { key },
  })
  return setting?.value
}

export async function getSettings(group?: string) {
  const settings = await db.setting.findMany({
    where: group ? { group } : undefined,
  })
  
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value
    return acc
  }, {} as Record<string, string>)
}

export async function updateSetting(key: string, value: string) {
  await db.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value, group: 'general' },
  })
  
  revalidatePath('/admin/settings')
}

export async function updateSettings(settings: Record<string, string>) {
  await Promise.all(
    Object.entries(settings).map(([key, value]) =>
      db.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value, group: 'general' },
      })
    )
  )
  
  revalidatePath('/admin/settings')
}

// Hero Actions
export async function getHero() {
  return db.hero.findFirst()
}

export async function updateHero(data: {
  title: string
  subtitle?: string | null
  primaryButton?: string | null
  primaryButtonLink?: string | null
  secondaryButton?: string | null
  secondaryButtonLink?: string | null
  backgroundImage?: string | null
  backgroundVideo?: string | null
  overlayOpacity?: number
}) {
  const hero = await db.hero.findFirst()
  
  if (hero) {
    return db.hero.update({
      where: { id: hero.id },
      data,
    })
  } else {
    return db.hero.create({ data })
  }
}

// Testimonial Actions
export async function getTestimonials() {
  return db.testimonial.findMany({
    where: { deletedAt: null },
    orderBy: { order: 'asc' },
  })
}

export async function createTestimonial(data: {
  clientName: string
  company?: string
  position?: string
  photo?: string
  review: string
  rating?: number
  order?: number
}) {
  const testimonial = await db.testimonial.create({
    data: {
      clientName: data.clientName,
      company: data.company,
      position: data.position,
      photo: data.photo,
      review: data.review,
      rating: data.rating ?? 5,
      order: data.order ?? 0,
    },
  })
  
  revalidatePath('/admin/testimonials')
  revalidatePath('/testimonials')
  revalidatePath('/')
  return testimonial
}

export async function updateTestimonial(id: string, data: {
  clientName?: string
  company?: string
  position?: string
  photo?: string
  review?: string
  rating?: number
  order?: number
}) {
  const testimonial = await db.testimonial.update({
    where: { id },
    data,
  })
  
  revalidatePath('/admin/testimonials')
  revalidatePath('/testimonials')
  revalidatePath('/')
  return testimonial
}

export async function deleteTestimonial(id: string) {
  await db.testimonial.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
  
  revalidatePath('/admin/testimonials')
  revalidatePath('/testimonials')
  revalidatePath('/')
}

// FAQ Actions
export async function getFAQs() {
  return db.fAQ.findMany({
    where: { deletedAt: null },
    orderBy: { order: 'asc' },
  })
}

export async function createFAQ(data: {
  question: string
  answer: string
  order?: number
  status?: boolean
}) {
  const faq = await db.fAQ.create({
    data: {
      question: data.question,
      answer: data.answer,
      order: data.order ?? 0,
      status: data.status ?? true,
    },
  })
  
  revalidatePath('/admin/faq')
  revalidatePath('/faq')
  revalidatePath('/')
  return faq
}

export async function updateFAQ(id: string, data: {
  question?: string
  answer?: string
  order?: number
  status?: boolean
}) {
  const faq = await db.fAQ.update({
    where: { id },
    data,
  })
  
  revalidatePath('/admin/faq')
  revalidatePath('/faq')
  revalidatePath('/')
  return faq
}

export async function deleteFAQ(id: string) {
  await db.fAQ.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
  
  revalidatePath('/admin/faq')
  revalidatePath('/faq')
  revalidatePath('/')
}

// Blog Actions
export async function getBlogs() {
  return db.blog.findMany({
    where: { deletedAt: null },
    include: { author: true, category: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getBlogBySlug(slug: string) {
  return db.blog.findUnique({
    where: { slug },
    include: { author: true, category: true },
  })
}

export async function createBlog(data: {
  title: string
  slug: string
  content?: string
  excerpt?: string
  featuredImage?: string
  status?: string
  authorId?: string
  categoryId?: string
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
}) {
  const blog = await db.blog.create({
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      featuredImage: data.featuredImage,
      status: (data.status as any) ?? 'DRAFT',
      authorId: data.authorId,
      categoryId: data.categoryId,
      tags: data.tags ?? [],
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
    },
  })
  
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath('/')
  return blog
}

export async function updateBlog(id: string, data: {
  title?: string
  slug?: string
  content?: string
  excerpt?: string
  featuredImage?: string
  status?: string
  categoryId?: string | null
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
}) {
  const updateData: any = { ...data }
  if (data.status === 'PUBLISHED') {
    updateData.publishedAt = new Date()
  }
  
  const blog = await db.blog.update({
    where: { id },
    data: updateData,
  })
  
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath('/')
  return blog
}

export async function deleteBlog(id: string) {
  await db.blog.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
  
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath('/')
}

// Pricing Plan Actions
export async function getPricingPlans() {
  return db.pricingPlan.findMany({
    where: { deletedAt: null },
    orderBy: { order: 'asc' },
  })
}

export async function createPricingPlan(data: {
  name: string
  description?: string
  price?: number
  currency?: string
  features?: string[]
  order?: number
  status?: boolean
}) {
  const plan = await db.pricingPlan.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      currency: data.currency ?? 'USD',
      features: data.features ?? [],
      order: data.order ?? 0,
      status: data.status ?? true,
    },
  })
  
  revalidatePath('/admin/pricing')
  revalidatePath('/pricing')
  revalidatePath('/')
  return plan
}

export async function updatePricingPlan(id: string, data: {
  name?: string
  description?: string
  price?: number
  currency?: string
  features?: string[]
  order?: number
  status?: boolean
}) {
  const plan = await db.pricingPlan.update({
    where: { id },
    data,
  })
  
  revalidatePath('/admin/pricing')
  revalidatePath('/pricing')
  revalidatePath('/')
  return plan
}

export async function deletePricingPlan(id: string) {
  await db.pricingPlan.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
  
  revalidatePath('/admin/pricing')
  revalidatePath('/pricing')
  revalidatePath('/')
}
