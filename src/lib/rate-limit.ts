import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Comments/reviews: 5 submissions per 10 minutes per IP
export const commentsRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '10 m'),
  prefix: 'ratelimit:comments',
})

// Uploads: 10 uploads per 10 minutes per IP (admin-only endpoint, but still worth limiting)
export const uploadRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 m'),
  prefix: 'ratelimit:upload',
})

// Contact form: 3 submissions per 15 minutes per IP
export const contactRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '15 m'),
  prefix: 'ratelimit:contact',
})

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp
  return 'unknown'
}
