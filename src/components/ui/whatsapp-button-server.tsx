import { getWhatsAppSettings } from '@/actions/settings'
import { WhatsAppButton } from './whatsapp-button'

/**
 * Server wrapper that reads the WhatsApp settings from the database.
 * Renders nothing when the floating button is disabled in Settings.
 */
export async function WhatsAppButtonServer() {
  const settings = await getWhatsAppSettings()

  if (!settings.enabled || !settings.number) {
    return null
  }

  return (
    <WhatsAppButton
      phoneNumber={settings.number}
      color={settings.color}
      position={settings.position}
      pulse={settings.pulse}
      glow={settings.glow}
      newTab={settings.newTab}
    />
  )
}
