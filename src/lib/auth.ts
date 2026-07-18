import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from '@/auth.config'
import { db } from './db'
import { verifyPassword } from './utils'

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const identifier = ((credentials?.email as string) || '').trim()
        const password = (credentials?.password as string) || ''

        if (!identifier || !password) {
          return null
        }

        try {
          // Allow login with username ("admin") or email
          const user = await db.user.findFirst({
            where: {
              deletedAt: null,
              OR: [{ email: identifier }, { name: identifier }],
            },
          })

          if (!user || !user.password) {
            return null
          }

          const isValid = await verifyPassword(password, user.password)

          if (!isValid) {
            return null
          }

          // Update last login (non-blocking)
          db.user
            .update({ where: { id: user.id }, data: { lastLogin: new Date() } })
            .catch(() => {})

          // Log the login (non-blocking)
          db.systemLog
            .create({
              data: {
                userId: user.id,
                action: 'LOGIN',
                details: { method: 'credentials' },
              },
            })
            .catch(() => {})

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.avatar,
          } as any
        } catch {
          return null
        }
      },
    }),
  ],
})

export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import('bcryptjs')
  return bcrypt.hash(password, 12)
}
