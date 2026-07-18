'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function deleteComment(id: string) {
  await db.comment.delete({ where: { id } })
  revalidatePath('/admin/comments')
  revalidatePath('/testimonials')
}

export async function getRecentReviews(limit = 3) {
  return db.comment.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

