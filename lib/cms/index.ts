/**
 * lib/cms/index.ts
 *
 * Single Source of Truth for all content on the website.
 * Operates in dual mode:
 * 1. Supabase Mode: Active when NEXT_PUBLIC_SUPABASE_URL is set in environment.
 * 2. Local JSON Mode: Fallback when Supabase keys are not provided.
 */

import fs from 'fs/promises'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

const DATA_DIR = path.join(process.cwd(), 'data')

function isSupabaseConfigured(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co'
  )
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}

// ─── Local JSON Helpers ──────────────────────────────────────────────────────

async function readJson<T>(filename: string): Promise<T> {
  const filepath = path.join(DATA_DIR, filename)
  const raw = await fs.readFile(filepath, 'utf-8')
  return JSON.parse(raw) as T
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  const filepath = path.join(DATA_DIR, filename)
  await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8')
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type Book = {
  id: string
  slug: string
  title: string
  year: string
  cover: string
  shortDescription: string
  description: string[]
  publisher?: string
  isbn?: string
  pages?: string
  language?: string
  price?: string
  availability?: 'In Stock' | 'Limited Stock' | 'Pre-Order'
  published: boolean
  featured: boolean
  order: number
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  category: string
  date: string
  image: string
  excerpt: string
  readingTime: string
  content: string[]
  published: boolean
  featured: boolean
  order: number
}

export type Writing = {
  id: string
  slug: string
  title: string
  date: string
  excerpt: string
  image?: string
  content: string[]
  published: boolean
  order: number
}

export type PraiseQuote = {
  id: string
  quote: string
  publication: string
  published: boolean
  order: number
}

export type PressItem = {
  id: string
  slug: string
  publication: string
  headline: string
  date: string
  excerpt: string
  url?: string
  published: boolean
  order: number
}

export type SiteContent = {
  authorName: string
  role: string
  tagline: string
  email: string
  metaTitle: string
  metaDescription: string
  footerText: string
  social: { label: string; href: string }[]
  aboutShort: string
  aboutLong: string[]
  portraitHero: string
  portraitAbout: string
  nav: { label: string; href: string; enabled: boolean; order: number }[]
}

export type Order = {
  id: string
  createdAt: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  items: { bookSlug: string; bookTitle: string; qty: number; price: string }[]
  message?: string
  status: 'pending' | 'fulfilled' | 'cancelled'
}

export type Message = {
  id: string
  createdAt: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
}

// ─── Books ───────────────────────────────────────────────────────────────────

export async function getBooks(): Promise<Book[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('sort_order', { ascending: true })
    if (!error && data) {
      return data.map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        year: b.year,
        cover: b.cover,
        shortDescription: b.short_description,
        description: Array.isArray(b.description) ? b.description : [],
        publisher: b.publisher,
        isbn: b.isbn,
        pages: b.pages,
        language: b.language,
        price: b.price,
        availability: b.availability,
        published: b.published,
        featured: b.featured,
        order: b.sort_order ?? 0,
      }))
    }
  }

  const books = await readJson<Book[]>('books.json')
  return books.sort((a, b) => a.order - b.order)
}

export async function getPublishedBooks(): Promise<Book[]> {
  const books = await getBooks()
  return books.filter((b) => b.published)
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  const books = await getBooks()
  return books.find((b) => b.slug === slug)
}

export async function getFeaturedBook(): Promise<Book | undefined> {
  const books = await getPublishedBooks()
  return books.find((b) => b.featured) ?? books[0]
}

export async function getRelatedBooks(slug: string, count = 3): Promise<Book[]> {
  const books = await getPublishedBooks()
  return books.filter((b) => b.slug !== slug).slice(0, count)
}

export async function saveBooks(books: Book[]): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    for (const b of books) {
      await supabase.from('books').upsert({
        id: b.id,
        slug: b.slug,
        title: b.title,
        year: b.year,
        cover: b.cover,
        short_description: b.shortDescription,
        description: b.description,
        publisher: b.publisher,
        isbn: b.isbn,
        pages: b.pages,
        language: b.language,
        price: b.price,
        availability: b.availability,
        published: b.published,
        featured: b.featured,
        sort_order: b.order,
      })
    }
  }
  await writeJson('books.json', books)
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('sort_order', { ascending: true })
    if (!error && data) {
      return data.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        date: p.date,
        image: p.image,
        excerpt: p.excerpt,
        readingTime: p.reading_time,
        content: Array.isArray(p.content) ? p.content : [],
        published: p.published,
        featured: p.featured,
        order: p.sort_order ?? 0,
      }))
    }
  }

  const posts = await readJson<BlogPost[]>('blog.json')
  return posts.sort((a, b) => a.order - b.order)
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getBlogPosts()
  return posts.filter((p) => p.published)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts()
  return posts.find((p) => p.slug === slug)
}

export async function getFeaturedBlogPost(): Promise<BlogPost | undefined> {
  const posts = await getPublishedBlogPosts()
  return posts.find((p) => p.featured) ?? posts[0]
}

export async function getRelatedBlogPosts(slug: string, count = 3): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts()
  return posts.filter((p) => p.slug !== slug).slice(0, count)
}

export async function getBlogCategories(): Promise<string[]> {
  const posts = await getPublishedBlogPosts()
  return Array.from(new Set(posts.map((p) => p.category)))
}

export async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    for (const p of posts) {
      await supabase.from('blog_posts').upsert({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        date: p.date,
        image: p.image,
        excerpt: p.excerpt,
        reading_time: p.readingTime,
        content: p.content,
        published: p.published,
        featured: p.featured,
        sort_order: p.order,
      })
    }
  }
  await writeJson('blog.json', posts)
}

// ─── Writings ────────────────────────────────────────────────────────────────

export async function getWritings(): Promise<Writing[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('writings')
      .select('*')
      .order('sort_order', { ascending: true })
    if (!error && data) {
      return data.map((w) => ({
        id: w.id,
        slug: w.slug,
        title: w.title,
        date: w.date,
        excerpt: w.excerpt,
        image: w.image,
        content: Array.isArray(w.content) ? w.content : [],
        published: w.published,
        order: w.sort_order ?? 0,
      }))
    }
  }

  const writings = await readJson<Writing[]>('writings.json')
  return writings.sort((a, b) => a.order - b.order)
}

export async function getPublishedWritings(): Promise<Writing[]> {
  const writings = await getWritings()
  return writings.filter((w) => w.published)
}

export async function getWritingBySlug(slug: string): Promise<Writing | undefined> {
  const writings = await getWritings()
  return writings.find((w) => w.slug === slug)
}

export async function getRelatedWritings(slug: string, count = 3): Promise<Writing[]> {
  const writings = await getPublishedWritings()
  return writings.filter((w) => w.slug !== slug).slice(0, count)
}

export async function saveWritings(writings: Writing[]): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    for (const w of writings) {
      await supabase.from('writings').upsert({
        id: w.id,
        slug: w.slug,
        title: w.title,
        date: w.date,
        excerpt: w.excerpt,
        image: w.image,
        content: w.content,
        published: w.published,
        sort_order: w.order,
      })
    }
  }
  await writeJson('writings.json', writings)
}

// ─── Praise ──────────────────────────────────────────────────────────────────

export async function getPraiseQuotes(): Promise<PraiseQuote[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('praise_quotes')
      .select('*')
      .order('sort_order', { ascending: true })
    if (!error && data) {
      return data.map((q) => ({
        id: q.id,
        quote: q.quote,
        publication: q.publication,
        published: q.published,
        order: q.sort_order ?? 0,
      }))
    }
  }

  const quotes = await readJson<PraiseQuote[]>('praise.json')
  return quotes.sort((a, b) => a.order - b.order)
}

export async function getPublishedPraiseQuotes(): Promise<PraiseQuote[]> {
  const quotes = await getPraiseQuotes()
  return quotes.filter((q) => q.published)
}

export async function savePraiseQuotes(quotes: PraiseQuote[]): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    for (const q of quotes) {
      await supabase.from('praise_quotes').upsert({
        id: q.id,
        quote: q.quote,
        publication: q.publication,
        published: q.published,
        sort_order: q.order,
      })
    }
  }
  await writeJson('praise.json', quotes)
}

// ─── Press ───────────────────────────────────────────────────────────────────

export async function getPressItems(): Promise<PressItem[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('press_items')
      .select('*')
      .order('sort_order', { ascending: true })
    if (!error && data) {
      return data.map((p) => ({
        id: p.id,
        slug: p.slug,
        publication: p.publication,
        headline: p.headline,
        date: p.date,
        excerpt: p.excerpt,
        url: p.url,
        published: p.published,
        order: p.sort_order ?? 0,
      }))
    }
  }

  const items = await readJson<PressItem[]>('press.json')
  return items.sort((a, b) => a.order - b.order)
}

export async function getPublishedPressItems(): Promise<PressItem[]> {
  const items = await getPressItems()
  return items.filter((p) => p.published)
}

export async function getPressItemBySlug(slug: string): Promise<PressItem | undefined> {
  const items = await getPressItems()
  return items.find((p) => p.slug === slug)
}

export async function savePressItems(items: PressItem[]): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    for (const p of items) {
      await supabase.from('press_items').upsert({
        id: p.id,
        slug: p.slug,
        publication: p.publication,
        headline: p.headline,
        date: p.date,
        excerpt: p.excerpt,
        url: p.url,
        published: p.published,
        sort_order: p.order,
      })
    }
  }
  await writeJson('press.json', items)
}

// ─── Site Content ─────────────────────────────────────────────────────────────

export async function getSiteContent(): Promise<SiteContent> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    const { data, error } = await supabase.from('site_content').select('*').eq('id', 1).single()
    if (!error && data) {
      return {
        authorName: data.author_name,
        role: data.role,
        tagline: data.tagline,
        email: data.email,
        metaTitle: data.meta_title,
        metaDescription: data.meta_description,
        footerText: data.footer_text,
        social: Array.isArray(data.social) ? data.social : [],
        aboutShort: data.about_short,
        aboutLong: Array.isArray(data.about_long) ? data.about_long : [],
        portraitHero: data.portrait_hero,
        portraitAbout: data.portrait_about,
        nav: Array.isArray(data.nav) ? data.nav : [],
      }
    }
  }

  return readJson<SiteContent>('site.json')
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    await supabase.from('site_content').upsert({
      id: 1,
      author_name: content.authorName,
      role: content.role,
      tagline: content.tagline,
      email: content.email,
      meta_title: content.metaTitle,
      meta_description: content.metaDescription,
      footer_text: content.footerText,
      social: content.social,
      about_short: content.aboutShort,
      about_long: content.aboutLong,
      portrait_hero: content.portraitHero,
      portrait_about: content.portraitAbout,
      nav: content.nav,
    })
  }
  await writeJson('site.json', content)
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function getOrders(): Promise<Order[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) {
      return data.map((o) => ({
        id: o.id,
        createdAt: o.created_at,
        name: o.name,
        email: o.email,
        phone: o.phone,
        address: o.address,
        city: o.city,
        state: o.state,
        pincode: o.pincode,
        items: Array.isArray(o.items) ? o.items : [],
        message: o.message,
        status: o.status,
      }))
    }
  }

  const orders = await readJson<Order[]>('orders.json')
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function appendOrder(order: Order): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    await supabase.from('orders').insert({
      name: order.name,
      email: order.email,
      phone: order.phone,
      address: order.address,
      city: order.city,
      state: order.state,
      pincode: order.pincode,
      items: order.items,
      message: order.message,
      status: order.status,
    })
  }
  const orders = await readJson<Order[]>('orders.json')
  orders.unshift(order)
  await writeJson('orders.json', orders)
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    await supabase.from('orders').update({ status }).eq('id', id)
  }
  const orders = await readJson<Order[]>('orders.json')
  const idx = orders.findIndex((o) => o.id === id)
  if (idx !== -1) {
    orders[idx].status = status
    await writeJson('orders.json', orders)
  }
}

// ─── Messages ────────────────────────────────────────────────────────────────

export async function getMessages(): Promise<Message[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) {
      return data.map((m) => ({
        id: m.id,
        createdAt: m.created_at,
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        read: m.read,
      }))
    }
  }

  const messages = await readJson<Message[]>('messages.json')
  return messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function appendMessage(message: Message): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    await supabase.from('messages').insert({
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      read: message.read,
    })
  }
  const messages = await readJson<Message[]>('messages.json')
  messages.unshift(message)
  await writeJson('messages.json', messages)
}

export async function markMessageRead(id: string, read: boolean): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabase()
    await supabase.from('messages').update({ read }).eq('id', id)
  }
  const messages = await readJson<Message[]>('messages.json')
  const idx = messages.findIndex((m) => m.id === id)
  if (idx !== -1) {
    messages[idx].read = read
    await writeJson('messages.json', messages)
  }
}
