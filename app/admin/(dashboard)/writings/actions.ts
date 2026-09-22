'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { randomUUID } from 'crypto'
import { getWritings, saveWritings } from '@/lib/cms'
import { saveUploadedFile } from '@/lib/cms/upload'
import type { Writing } from '@/lib/cms'

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function parseParagraphs(raw: string): string[] {
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

export async function createWritingAction(formData: FormData) {
  const writings = await getWritings()
  const title = formData.get('title') as string
  const slug = slugify(formData.get('slug') as string || title)

  if (writings.find((w) => w.slug === slug)) {
    return { error: 'A writing entry with this slug already exists.' }
  }

  let image = ''
  const imageFile = formData.get('image') as File
  if (imageFile && imageFile.size > 0) {
    image = await saveUploadedFile(imageFile)
  } else if (formData.get('imageUrl')) {
    image = formData.get('imageUrl') as string
  }

  const writing: Writing = {
    id: randomUUID(),
    slug,
    title,
    date: formData.get('date') as string || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    excerpt: formData.get('excerpt') as string,
    image,
    content: parseParagraphs(formData.get('content') as string),
    published: formData.get('published') === 'on',
    order: writings.length,
  }

  writings.push(writing)
  await saveWritings(writings)
  revalidatePath('/writings')
  revalidatePath('/')
  redirect('/admin/writings')
}

export async function updateWritingAction(id: string, formData: FormData) {
  const writings = await getWritings()
  const idx = writings.findIndex((w) => w.id === id)
  if (idx === -1) return { error: 'Writing not found.' }

  let image = writings[idx].image
  const imageFile = formData.get('image') as File
  if (imageFile && imageFile.size > 0) {
    image = await saveUploadedFile(imageFile)
  } else if (formData.get('imageUrl')) {
    image = formData.get('imageUrl') as string
  }

  const slug = slugify(formData.get('slug') as string || (formData.get('title') as string))

  writings[idx] = {
    ...writings[idx],
    slug,
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    excerpt: formData.get('excerpt') as string,
    image,
    content: parseParagraphs(formData.get('content') as string),
    published: formData.get('published') === 'on',
  }

  await saveWritings(writings)
  revalidatePath('/writings')
  revalidatePath(`/writings/${slug}`)
  revalidatePath('/')
  redirect('/admin/writings')
}

export async function deleteWritingAction(id: string) {
  const writings = await getWritings()
  const filtered = writings.filter((w) => w.id !== id)
  await saveWritings(filtered)
  revalidatePath('/writings')
  revalidatePath('/')
}

export async function toggleWritingPublishedAction(id: string) {
  const writings = await getWritings()
  const idx = writings.findIndex((w) => w.id === id)
  if (idx !== -1) {
    writings[idx].published = !writings[idx].published
    await saveWritings(writings)
    revalidatePath('/writings')
    revalidatePath('/')
  }
}
