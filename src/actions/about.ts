'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getAbout() {
  try {
    return await db.about.findFirst()
  } catch {
    return null
  }
}

export async function updateAbout(data: {
  mission?: string
  vision?: string
  story?: string
  stats?: { value: number; suffix: string; label: string }[]
}) {
  const existing = await db.about.findFirst()

  const payload = {
    mission: data.mission,
    vision: data.vision,
    story: data.story,
    ...(data.stats ? { stats: data.stats as any } : {}),
  }

  const result = existing
    ? await db.about.update({ where: { id: existing.id }, data: payload })
    : await db.about.create({
        data: {
          mission: data.mission ?? null,
          vision: data.vision ?? null,
          story: data.story ?? null,
          stats: (data.stats as any) ?? [],
        },
      })

  revalidatePath('/about')
  return result
}
