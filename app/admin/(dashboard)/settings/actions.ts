'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSiteContent, saveSiteContent } from '@/lib/cms'

export async function updateSiteSettingsAction(formData: FormData) {
  const content = await getSiteContent()

  content.authorName = formData.get('authorName') as string || 'Rahul Saini'
  content.role = formData.get('role') as string || 'Author & Novelist'
  content.tagline = formData.get('tagline') as string
  content.email = formData.get('email') as string
  content.metaTitle = formData.get('metaTitle') as string
  content.metaDescription = formData.get('metaDescription') as string
  content.footerText = formData.get('footerText') as string

  // Parse social links
  const socialLabels = formData.getAll('socialLabel') as string[]
  const socialHrefs = formData.getAll('socialHref') as string[]
  content.social = socialLabels.map((label, i) => ({
    label,
    href: socialHrefs[i] || '#',
  })).filter((s) => s.label.trim().length > 0)

  await saveSiteContent(content)
  revalidatePath('/', 'layout')
  redirect('/admin/settings')
}
