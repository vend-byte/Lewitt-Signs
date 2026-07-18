'use client'

import React, { useState } from 'react'
import { Send, Loader2, CheckCircle } from 'lucide-react'
import { subscribeNewsletter } from '@/actions/settings'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (state === 'loading') return

    setState('loading')
    setMessage('')

    const result = await subscribeNewsletter(email)

    if (result.success) {
      setState('success')
      setMessage('Thank you for subscribing!')
      setEmail('')
    } else {
      setState('error')
      setMessage(result.error || 'Something went wrong')
    }

    setTimeout(() => {
      setState('idle')
      setMessage('')
    }, 4000)
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="input flex-1 !py-2.5 text-sm"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          aria-label="Subscribe"
          className="shrink-0 w-11 h-11 rounded-md bg-cta text-background flex items-center justify-center hover:bg-cta-dark transition-all duration-200 disabled:opacity-50"
        >
          {state === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : state === 'success' ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>
      {message && (
        <p
          className={`text-xs mt-2 ${
            state === 'success' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
