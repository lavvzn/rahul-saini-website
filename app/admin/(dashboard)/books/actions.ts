'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { randomUUID } from 'crypto'
import { getBooks, saveBooks } from '@/lib/cms'
import { saveUploadedFile } from '@/lib/cms/upload'
import type { Book } from '@/lib/cms'

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function parseDescription(raw: string): string[] {
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

export async function createBookAction(formData: FormData) {
  const books = await getBooks()
  const title = formData.get('title') as string
  const slug = slugify(formData.get('slug') as string || title)

  // Check slug uniqueness
  if (books.find((b) => b.slug === slug)) {
    return { error: 'A book with this slug already exists.' }
  }

  let cover = '/images/books/book-01.png'
  const coverFile = formData.get('cover') as File
  if (coverFile && coverFile.size > 0) {
    cover = await saveUploadedFile(coverFile)
  } else if (formData.get('coverUrl')) {
    cover = formData.get('coverUrl') as string
  }

  const book: Book = {
    id: randomUUID(),
    slug,
    title,
    year: formData.get('year') as string,
    cover,
    shortDescription: formData.get('shortDescription') as string,
    description: parseDescription(formData.get('description') as string),
    publisher: formData.get('publisher') as string,
    isbn: formData.get('isbn') as string,
    pages: formData.get('pages') as string,
    language: formData.get('language') as string || 'English',
    price: formData.get('price') as string,
    availability: (formData.get('availability') as Book['availability']) || 'In Stock',
    published: formData.get('published') === 'on',
    featured: formData.get('featured') === 'on',
    order: books.length,
  }

  books.push(book)
  await saveBooks(books)
  revalidatePath('/books')
  revalidatePath('/')
  redirect('/admin/books')
}

export async function updateBookAction(id: string, formData: FormData) {
  const books = await getBooks()
  const idx = books.findIndex((b) => b.id === id)
  if (idx === -1) return { error: 'Book not found.' }

  let cover = books[idx].cover
  const coverFile = formData.get('cover') as File
  if (coverFile && coverFile.size > 0) {
    cover = await saveUploadedFile(coverFile)
  } else if (formData.get('coverUrl') as string) {
    cover = formData.get('coverUrl') as string
  }

  const slug = slugify(formData.get('slug') as string || (formData.get('title') as string))

  books[idx] = {
    ...books[idx],
    slug,
    title: formData.get('title') as string,
    year: formData.get('year') as string,
    cover,
    shortDescription: formData.get('shortDescription') as string,
    description: parseDescription(formData.get('description') as string),
    publisher: formData.get('publisher') as string,
    isbn: formData.get('isbn') as string,
    pages: formData.get('pages') as string,
    language: formData.get('language') as string || 'English',
    price: formData.get('price') as string,
    availability: (formData.get('availability') as Book['availability']) || 'In Stock',
    published: formData.get('published') === 'on',
    featured: formData.get('featured') === 'on',
  }

  await saveBooks(books)
  revalidatePath('/books')
  revalidatePath(`/books/${slug}`)
  revalidatePath('/')
  redirect('/admin/books')
}

export async function deleteBookAction(id: string) {
  const books = await getBooks()
  const filtered = books.filter((b) => b.id !== id)
  await saveBooks(filtered)
  revalidatePath('/books')
  revalidatePath('/')
}

export async function toggleBookPublishedAction(id: string) {
  const books = await getBooks()
  const idx = books.findIndex((b) => b.id === id)
  if (idx !== -1) {
    books[idx].published = !books[idx].published
    await saveBooks(books)
    revalidatePath('/books')
    revalidatePath('/')
  }
}

export async function reorderBooksAction(ids: string[]) {
  const books = await getBooks()
  ids.forEach((id, i) => {
    const idx = books.findIndex((b) => b.id === id)
    if (idx !== -1) books[idx].order = i
  })
  await saveBooks(books)
  revalidatePath('/books')
  revalidatePath('/')
}
