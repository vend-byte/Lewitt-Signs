import { Metadata } from 'next'
import { getTestimonials } from '@/actions/services'

export const metadata: Metadata = {
  title: 'Testimonials | LEWITT SIGNS Admin',
}

export default async function TestimonialsAdminPage() {
  const testimonials = await getTestimonials().catch(() => [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Testimonials</h1>
        <p className="text-muted text-sm mt-1">Manage client reviews and social proof.</p>
      </div>

      <div className="card p-8 text-center text-muted">
        Add or update testimonials from the website content workflow.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((item) => (
          <div key={item.id} className="card p-5">
            <p className="font-semibold text-white">{item.clientName}</p>
            <p className="mt-2 text-sm text-muted">{item.company || 'Independent client'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
