import { Metadata } from 'next'
import { getPortfolioItems, deletePortfolio } from '@/actions/services'
import { PortfolioUploadForm } from '@/components/ui/portfolio-upload-form'
import { Trash2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Portfolio | LEWITT SIGNS Admin',
}

export default async function PortfolioAdminPage() {
  const portfolio = await getPortfolioItems().catch(() => [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Portfolio</h1>
        <p className="text-muted text-sm mt-1">Upload photos of finished projects for clients to see.</p>
      </div>

      <PortfolioUploadForm />

      {portfolio.length === 0 ? (
        <div className="card p-8 text-center text-muted">
          No projects yet. Add your first one above.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {portfolio.map((item: any) => (
            <div key={item.id} className="card p-5 space-y-3">
              {item.images?.[0]?.url ? (
                <img src={item.images[0].url} alt={item.title} className="w-full h-40 object-cover rounded-lg" />
              ) : null}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.category || 'General project'}</p>
                </div>
                <form action={async () => {
                  'use server'
                  await deletePortfolio(item.id)
                }}>
                  <button
                    type="submit"
                    aria-label="Delete project"
                    className="p-2 rounded-lg text-muted hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
