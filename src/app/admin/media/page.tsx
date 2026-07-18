import { Metadata } from 'next'
import { getSettingsMap } from '@/actions/settings'

export const metadata: Metadata = {
  title: 'Media Library | LEWITT SIGNS Admin',
}

export default async function MediaAdminPage() {
  const settings = await getSettingsMap().catch(() => ({} as Record<string, string>))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Media Library</h1>
        <p className="text-muted text-sm mt-1">Upload and manage images and media assets for the website.</p>
      </div>

      <div className="card p-8 text-center text-muted">
        Cloudinary uploads are available through the media upload endpoint. Configure your media settings in the admin settings panel.
      </div>

      <div className="card p-5">
        <p className="text-sm text-muted">Connected site name: {settings['general.siteName'] || 'LEWITT SIGNS'}</p>
      </div>
    </div>
  )
}
