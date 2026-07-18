import { Metadata } from 'next'
import { getSettingsMap } from '@/actions/settings'

export const metadata: Metadata = {
  title: 'Contact | LEWITT SIGNS Admin',
}

export default async function ContactAdminPage() {
  const settings = await getSettingsMap().catch(() => ({} as Record<string, string>))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Contact</h1>
        <p className="text-muted text-sm mt-1">Manage the public contact details shown on the website.</p>
      </div>

      <div className="card p-6 space-y-3 text-sm text-muted">
        <p><span className="text-white">Phone:</span> {settings['contact.phone'] || '+254 712 345 678'}</p>
        <p><span className="text-white">Email:</span> {settings['contact.email'] || 'info@lewittsigns.com'}</p>
        <p><span className="text-white">Address:</span> {settings['contact.address'] || 'Kimathi Street, Nairobi, Kenya'}</p>
        <p><span className="text-white">Hours:</span> {settings['contact.hours'] || 'Mon - Sat: 8:00 AM - 6:00 PM'}</p>
      </div>
    </div>
  )
}
