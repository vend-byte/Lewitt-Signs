import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import { authConfig } from '@/auth.config'

// Lightweight, Edge-safe auth instance - no Prisma, no bcrypt, no Credentials provider.
// Separate NextAuth() call from the one in lib/auth.ts; only reads the JWT
// from the cookie to populate req.auth, never runs authorize().
const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  if (pathname === '/admin/login' || pathname === '/auth/login') {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
}
