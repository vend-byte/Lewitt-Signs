import { Metadata } from 'next'
import { getServices } from '@/actions/services'
import { ServicesManager } from '@/components/admin/services-manager'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Services | LEWITT SIGNS Admin',
}

export default async function ServicesAdminPage() {
  const services = await getServices().catch(() => [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Services</h1>
        <p className="text-muted text-sm mt-1">
          Add, edit, hide, and manage the services shown on your website.
        </p>
      </div>

      <ServicesManager services={services} />
    </div>
  )
}
