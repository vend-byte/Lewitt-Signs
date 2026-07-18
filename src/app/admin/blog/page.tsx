import { Metadata } from 'next'
import { getBlogs } from '@/actions/services'

export const metadata: Metadata = {
  title: 'Blog | LEWITT SIGNS Admin',
}

export default async function BlogAdminPage() {
  const blogs = await getBlogs().catch(() => [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Blog</h1>
        <p className="text-muted text-sm mt-1">Manage published posts and editorial content.</p>
      </div>

      <div className="card p-8 text-center text-muted">
        Blog entries will appear here once created from the content workflow.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {blogs.map((blog) => (
          <div key={blog.id} className="card p-5">
            <p className="font-semibold text-white">{blog.title}</p>
            <p className="mt-2 text-sm text-muted">{blog.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
