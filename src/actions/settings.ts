'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import {
  DEFAULT_WHATSAPP,
  SETTINGS_DEFAULTS,
  groupForKey,
  type WhatsAppSettings,
} from '@/lib/settings'

// ---------------------------------------------------------------------------
// Readers
// ---------------------------------------------------------------------------

export async function getWhatsAppSettings(): Promise<WhatsAppSettings> {
  try {
    const rows = await db.setting.findMany({ where: { group: 'whatsapp' } })
    const map = new Map(rows.map((r) => [r.key, r.value]))

    const position = map.get('whatsapp.position')
    return {
      number: map.get('whatsapp.number') || DEFAULT_WHATSAPP.number,
      enabled: (map.get('whatsapp.enabled') ?? 'true') === 'true',
      color: map.get('whatsapp.color') || DEFAULT_WHATSAPP.color,
      position: position === 'bottom-left' ? 'bottom-left' : 'bottom-right',
      pulse: (map.get('whatsapp.pulse') ?? 'true') === 'true',
      glow: (map.get('whatsapp.glow') ?? 'true') === 'true',
      newTab: (map.get('whatsapp.newTab') ?? 'true') === 'true',
    }
  } catch {
    return { ...DEFAULT_WHATSAPP }
  }
}

export async function getSettingsMap(): Promise<Record<string, string>> {
  try {
    const rows = await db.setting.findMany()
    const map: Record<string, string> = { ...SETTINGS_DEFAULTS }
    for (const row of rows) {
      map[row.key] = row.value
    }
    return map
  } catch {
    return { ...SETTINGS_DEFAULTS }
  }
}

// ---------------------------------------------------------------------------
// Writers
// ---------------------------------------------------------------------------

export async function saveSettings(
  entries: Record<string, string>
): Promise<{ success: boolean; error?: string }> {
  try {
    await Promise.all(
      Object.entries(entries).map(([key, value]) =>
        db.setting.upsert({
          where: { key },
          update: { value: String(value), group: groupForKey(key) },
          create: { key, value: String(value), group: groupForKey(key) },
        })
      )
    )

    // Revalidate everything so public pages pick up changes instantly
    revalidatePath('/', 'layout')
    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error) {
    console.error('saveSettings error:', error)
    return { success: false, error: 'Failed to save settings' }
  }
}

export async function subscribeNewsletter(
  email: string
): Promise<{ success: boolean; error?: string }> {
  const trimmed = (email || '').trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { success: false, error: 'Please enter a valid email address' }
  }

  try {
    await db.subscriber.upsert({
      where: { email: trimmed },
      update: {},
      create: { email: trimmed },
    })
    return { success: true }
  } catch (error) {
    console.error('subscribeNewsletter error:', error)
    return { success: false, error: 'Subscription failed. Please try again.' }
  }
}
