'use server'

import { redirect } from 'next/navigation'
import { compare } from 'bcryptjs'
import { createSession, setSessionCookie } from '@/lib/auth/session'

export async function loginAction(formData: FormData) {
  const email = (formData.get('email') as string || '').trim().toLowerCase()
  const password = (formData.get('password') as string || '').trim()

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@rahulsaini.com').trim().toLowerCase()
  const adminHash = (process.env.ADMIN_PASSWORD_HASH || '$2b$10$ChOitwSn142jlgOmTOuMXexZyHB17FF9OK9TVqakz6J1aPauDDoey').trim()

  if (email !== adminEmail) {
    return { error: 'Invalid email or password.' }
  }

  const valid = await compare(password, adminHash)
  if (!valid) {
    return { error: 'Invalid email or password.' }
  }

  const token = await createSession(email)
  await setSessionCookie(token)
  redirect('/admin')
}

export async function logoutAction() {
  const { clearSessionCookie } = await import('@/lib/auth/session')
  await clearSessionCookie()
  redirect('/admin/login')
}
