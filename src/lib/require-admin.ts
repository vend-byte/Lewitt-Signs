import { auth } from '@/lib/auth'

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

/**
 * Call at the top of every admin-only server action.
 * Throws if there is no valid, logged-in session.
 */
export async function requireAdmin() {
  const session = await auth()
  if (!session?.user) {
    throw new UnauthorizedError()
  }
  return session
}
