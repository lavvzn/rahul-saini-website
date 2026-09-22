'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { randomUUID } from 'crypto'
import { getPressItems, savePressItems } from '@/lib/cms'
import type { PressItem } from '@/lib/cms'

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function createPressItemAction(formData: FormData) {
  const items = await getPressItems()
  const headline = formData.get('headline') as string
  const slug = slugify(formData.get('slug') as string || headline)

  if (items.find((i) => i.slug === slug)) {
    return { error: 'A press item with this slug already exists.' }
  }

  const item: PressItem = {
    id: randomUUID(),
    slug,
    publication: formData.get('publication') as string,
    headline,
    date: formData.get('date') as string || 'Press Feature',
    excerpt: formData.get('excerpt') as string,
    url: formData.get('url') as string || undefined,
    published: formData.get('published') === 'on',
    order: items.length,
  }

  items.push(item)
  await savePressItems(items)
  revalidatePath('/press')
  revalidatePath('/')
  redirect('/admin/press')
}

export async function updatePressItemAction(id: string, formData: FormData) {
  const items = await getPressItems()
  const idx = items.findIndex((i) => i.id === id)
  if (idx === -1) return { error: 'Press item not found.' }

  const headline = formData.get('headline') as string
  const slug = slugify(formData.get('slug') as string || headline)

  items[idx] = {
    ...items[idx],
    slug,
    publication: formData.get('publication') as string,
    headline,
    date: formData.get('date') as string,
    excerpt: formData.get('excerpt') as string,
    url: formData.get('url') as string || undefined,
    published: formData.get('published') === 'on',
  }

  await savePressItems(items)
  revalidatePath('/press')
  revalidatePath('/')
  redirect('/admin/press')
}

export async function deletePressItemAction(id: string) {
  const items = await getPressItems()
  const filtered = items.filter((i) => i.id !== id)
  await savePressItems(filtered)
  revalidatePath('/press')
  revalidatePath('/')
}

export async function togglePressPublishedAction(id: string) {
  const items = await getPressItems()
  const idx = items.findIndex((i) => i.id === id)
  if (idx !== -1) {
    items[idx].published = !items[idx].published
    await savePressItems(items)
    revalidatePath('/press')
    revalidatePath('/')
  }
}
