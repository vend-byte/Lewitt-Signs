import { Metadata } from 'next'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Users | LEWITT SIGNS Admin',
}

export default async function UsersAdminPage() {
  const users = await db.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true }, orderBy: { createdAt: 'desc' } }).catch(() => [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-muted text-sm mt-1">Manage administrator accounts and roles.</p>
      </div>

      <div className="card p-8 text-center text-muted">
        The application currently uses the seeded administrator account and the role-based access layer.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {users.map((user: any) => (
          <div key={user.id} className="card p-5">
            <p className="font-semibold text-white">{user.name || user.email}</p>
            <p className="mt-2 text-sm text-muted">Role: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
