'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSiteContent, saveSiteContent } from '@/lib/cms'
import { saveUploadedFile } from '@/lib/cms/upload'

function parseParagraphs(raw: string): string[] {
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

export async function updateAboutContentAction(formData: FormData) {
  const content = await getSiteContent()

  let portraitHero = content.portraitHero
  const heroFile = formData.get('portraitHeroFile') as File
  if (heroFile && heroFile.size > 0) {
    portraitHero = await saveUploadedFile(heroFile)
  } else if (formData.get('portraitHeroUrl')) {
    portraitHero = formData.get('portraitHeroUrl') as string
  }

  let portraitAbout = content.portraitAbout
  const aboutFile = formData.get('portraitAboutFile') as File
  if (aboutFile && aboutFile.size > 0) {
    portraitAbout = await saveUploadedFile(aboutFile)
  } else if (formData.get('portraitAboutUrl')) {
    portraitAbout = formData.get('portraitAboutUrl') as string
  }

  content.aboutShort = formData.get('aboutShort') as string
  content.aboutLong = parseParagraphs(formData.get('aboutLong') as string)
  content.portraitHero = portraitHero
  content.portraitAbout = portraitAbout

  await saveSiteContent(content)
  revalidatePath('/about')
  revalidatePath('/')
  redirect('/admin/about')
}
