import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import LoginForm from './login-form'

export default async function AdminLoginPage() {
  const session = await auth()

  if (session?.user) {
    return redirect('/admin/dashboard')
  }

  return <LoginForm />
}
