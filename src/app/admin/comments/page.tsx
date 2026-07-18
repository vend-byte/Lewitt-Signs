import { Metadata } from 'next'
import { db } from '@/lib/db'
import { deleteComment } from '@/actions/comments'
import { Star, Trash2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reviews | LEWITT SIGNS Admin',
}

export default async function CommentsAdminPage() {
  const comments = await db.comment.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Reviews</h1>
        <p className="text-muted text-sm mt-1">Client star ratings and reviews submitted from the website. Reviews appear publicly the moment they're submitted.</p>
      </div>

      {comments.length === 0 ? (
        <div className="card p-8 text-center text-muted">
          No reviews yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {comments.map((comment: any) => (
            <div key={comment.id} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">{comment.authorName}</p>
                  <div className="mt-1 flex items-center gap-0.5 text-cta">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${index < comment.rating ? 'fill-cta' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                </div>
                <form action={async () => {
                  'use server'
                  await deleteComment(comment.id)
                }}>
                  <button
                    type="submit"
                    aria-label="Delete review"
                    className="p-2 rounded-lg text-muted hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
              {comment.message ? (
                <p className="mt-3 text-sm text-muted">{comment.message}</p>
              ) : null}
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
