'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { randomUUID } from 'crypto'
import { getBlogPosts, saveBlogPosts } from '@/lib/cms'
import { saveUploadedFile } from '@/lib/cms/upload'
import type { BlogPost } from '@/lib/cms'

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

export async function createBlogPostAction(formData: FormData) {
  const posts = await getBlogPosts()
  const title = formData.get('title') as string
  const slug = slugify(formData.get('slug') as string || title)

  if (posts.find((p) => p.slug === slug)) {
    return { error: 'A blog post with this slug already exists.' }
  }

  let image = '/images/blog/blog-01.png'
  const imageFile = formData.get('image') as File
  if (imageFile && imageFile.size > 0) {
    image = await saveUploadedFile(imageFile)
  } else if (formData.get('imageUrl')) {
    image = formData.get('imageUrl') as string
  }

  const post: BlogPost = {
    id: randomUUID(),
    slug,
    title,
    category: formData.get('category') as string || 'General',
    date: formData.get('date') as string || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    image,
    excerpt: formData.get('excerpt') as string,
    readingTime: formData.get('readingTime') as string || '5 min read',
    content: parseParagraphs(formData.get('content') as string),
    published: formData.get('published') === 'on',
    featured: formData.get('featured') === 'on',
    order: posts.length,
  }

  posts.push(post)
  await saveBlogPosts(posts)
  revalidatePath('/blog')
  revalidatePath('/')
  redirect('/admin/blog')
}

export async function updateBlogPostAction(id: string, formData: FormData) {
  const posts = await getBlogPosts()
  const idx = posts.findIndex((p) => p.id === id)
  if (idx === -1) return { error: 'Post not found.' }

  let image = posts[idx].image
  const imageFile = formData.get('image') as File
  if (imageFile && imageFile.size > 0) {
    image = await saveUploadedFile(imageFile)
  } else if (formData.get('imageUrl')) {
    image = formData.get('imageUrl') as string
  }

  const slug = slugify(formData.get('slug') as string || (formData.get('title') as string))

  posts[idx] = {
    ...posts[idx],
    slug,
    title: formData.get('title') as string,
    category: formData.get('category') as string || 'General',
    date: formData.get('date') as string,
    image,
    excerpt: formData.get('excerpt') as string,
    readingTime: formData.get('readingTime') as string,
    content: parseParagraphs(formData.get('content') as string),
    published: formData.get('published') === 'on',
    featured: formData.get('featured') === 'on',
  }

  await saveBlogPosts(posts)
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/')
  redirect('/admin/blog')
}

export async function deleteBlogPostAction(id: string) {
  const posts = await getBlogPosts()
  const filtered = posts.filter((p) => p.id !== id)
  await saveBlogPosts(filtered)
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function toggleBlogPublishedAction(id: string) {
  const posts = await getBlogPosts()
  const idx = posts.findIndex((p) => p.id === id)
  if (idx !== -1) {
    posts[idx].published = !posts[idx].published
    await saveBlogPosts(posts)
    revalidatePath('/blog')
    revalidatePath('/')
  }
}
