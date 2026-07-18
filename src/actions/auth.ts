'use server'

import { redirect } from 'next/navigation'
import { signIn, signOut } from '@/lib/auth'
import { AuthError } from 'next-auth'

export async function loginAction(
  formData: FormData
): Promise<{ error?: string }> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })
    redirect('/admin/dashboard')
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Invalid username or password. Please try again.' }
    }
    throw error
  }
}

export async function logoutAction(): Promise<void> {
  await signOut({ redirectTo: '/auth/login' })
}
