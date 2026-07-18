import type { NextAuthConfig } from 'next-auth'

// Edge-safe auth configuration (no bcrypt / prisma imports here)
export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    authorized({ auth, request }: { auth: any; request: any }) {
      const isLoggedIn = !!auth?.user
      const { pathname } = request.nextUrl

      if (pathname.startsWith('/admin/login') || pathname.startsWith('/auth/login')) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/admin/dashboard', request.nextUrl))
        }
        return true
      }

      // Protect admin routes
      if (pathname.startsWith('/admin')) {
        return isLoggedIn
      }

      return true
    },
    jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  providers: [], // Configured in src/lib/auth.ts (node runtime)
} satisfies NextAuthConfig
