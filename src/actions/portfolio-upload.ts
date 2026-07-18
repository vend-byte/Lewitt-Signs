'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/require-admin'

interface UploadedImage {
  url: string
  publicId?: string
  width?: number
  height?: number
  format?: string
  bytes?: number
}

export async function createPortfolioWithImages(data: {
  title: string
  description?: string
  category?: string
  images: UploadedImage[]
}) {
  await requireAdmin()
  const portfolio = await db.portfolio.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      services: [],
      featured: false,
      order: 0,
      images: {
        create: data.images.map((img) => ({
          url: img.url,
          publicId: img.publicId,
          width: img.width,
          height: img.height,
          format: img.format,
          bytes: img.bytes,
        })),
      },
    },
  })

  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
  revalidatePath('/')
  return portfolio
}
