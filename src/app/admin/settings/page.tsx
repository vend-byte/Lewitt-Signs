import { Metadata } from 'next'
import { getSettingsMap } from '@/actions/settings'
import { SettingsForm } from '@/components/admin/settings-form'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Settings | LEWITT SIGNS Admin',
}

export default async function SettingsPage() {
  const settings = await getSettingsMap()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-muted text-sm mt-1">
          Manage every aspect of your website. Changes apply instantly after saving.
        </p>
      </div>

      <SettingsForm initial={settings} />
    </div>
  )
}
