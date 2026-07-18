'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/require-admin'

export async function deleteComment(id: string) {
  await requireAdmin()
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
