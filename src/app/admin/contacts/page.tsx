import Link from 'next/link'
import { MessageSquare, Search, Eye, Archive, Trash2 } from 'lucide-react'
import { getContactMessages, updateContactMessageStatus, deleteContactMessage } from '@/actions/services'

export const metadata = {
  title: 'Contact Messages | LEWITT SIGNS Admin',
}

export default async function AdminContactsPage() {
  const messages = await getContactMessages().catch(() => [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-primary text-sm font-medium">Admin Inbox</p>
          <h1 className="text-3xl font-semibold text-white">Contact Messages</h1>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-3 text-sm text-muted">
          {messages.length} total
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-card p-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted">
          <Search className="h-4 w-4" />
          Search and manage incoming customer enquiries.
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-muted">
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Subject</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Date</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className="border-b border-white/5 text-white">
                  <td className="px-3 py-3">
                    <div className="font-medium">{message.fullName}</div>
                    <div className="text-xs text-muted">{message.email}</div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-medium">{message.subject}</div>
                    <div className="text-xs text-muted line-clamp-2">{message.message}</div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs uppercase text-primary">
                      {message.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-muted">{new Date(message.createdAt).toLocaleDateString()}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <form action={async () => { 'use server'; await updateContactMessageStatus(message.id, 'READ') }}>
                        <button className="rounded-lg border border-white/10 p-2 text-muted hover:text-white" title="Mark as read">
                          <Eye className="h-4 w-4" />
                        </button>
                      </form>
                      <form action={async () => { 'use server'; await updateContactMessageStatus(message.id, 'ARCHIVED') }}>
                        <button className="rounded-lg border border-white/10 p-2 text-muted hover:text-white" title="Archive">
                          <Archive className="h-4 w-4" />
                        </button>
                      </form>
                      <form action={async () => { 'use server'; await deleteContactMessage(message.id) }}>
                        <button className="rounded-lg border border-white/10 p-2 text-red-400 hover:bg-red-500/10" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
