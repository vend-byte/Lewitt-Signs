'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

interface CommentItem {
  id: string
  authorName: string
  message: string
  rating: number
  createdAt: string
}

export function CommentsSection({ pageSlug }: { pageSlug?: string }) {
  const [comments, setComments] = useState<CommentItem[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/comments')
      .then((res) => res.json())
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch(() => setComments([]))
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setStatus('')

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authorName: name, email, message, rating, pageSlug }),
    })

    const data = await res.json()

    if (data.success) {
      setStatus('Thanks for your review!')
      setName('')
      setEmail('')
      setMessage('')
      setRating(5)
      setComments((current) => [
        {
          id: data.comment.id,
          authorName: data.comment.authorName,
          message: data.comment.message,
          rating: data.comment.rating,
          createdAt: data.comment.createdAt,
        },
        ...current,
      ])
    } else {
      setStatus(data.error || 'Unable to submit your review right now.')
    }

    setLoading(false)
  }

  return (
    <section className="mt-12 rounded-3xl border border-white/10 bg-card/70 p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">Client Reviews</h2>
        <p className="mt-2 text-sm leading-7 text-muted">Rate your experience with LEWITT SIGNS and leave a review for other visitors to see.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="mb-2 text-sm text-muted">Your rating</p>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1
              const filled = value <= (hoverRating || rating)
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Rate ${value} star${value > 1 ? 's' : ''}`}
                  className="p-1"
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${filled ? 'fill-cta text-cta' : 'text-muted'}`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-sm text-white outline-none" placeholder="Your name" required />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-sm text-white outline-none" placeholder="Your email (optional)" />
        </div>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-sm text-white outline-none" placeholder="Write your review (optional)" />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
          {status ? <p className="text-sm text-primary">{status}</p> : null}
        </div>
      </form>

      <div className="mt-8 space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-muted">No reviews yet. Be the first to share your experience.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="rounded-2xl border border-white/10 bg-background/40 p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-white">{comment.authorName}</p>
                <div className="flex items-center gap-0.5 text-cta">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${index < comment.rating ? 'fill-cta' : 'text-muted'}`}
                    />
                  ))}
                </div>
              </div>
              {comment.message ? (
                <p className="mt-2 text-sm leading-7 text-muted">{comment.message}</p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
