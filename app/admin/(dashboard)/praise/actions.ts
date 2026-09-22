'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { randomUUID } from 'crypto'
import { getPraiseQuotes, savePraiseQuotes } from '@/lib/cms'
import type { PraiseQuote } from '@/lib/cms'

export async function createPraiseQuoteAction(formData: FormData) {
  const quotes = await getPraiseQuotes()

  const quote: PraiseQuote = {
    id: randomUUID(),
    publication: formData.get('publication') as string,
    quote: formData.get('quote') as string,
    published: formData.get('published') === 'on',
    order: quotes.length,
  }

  quotes.push(quote)
  await savePraiseQuotes(quotes)
  revalidatePath('/')
  redirect('/admin/praise')
}

export async function updatePraiseQuoteAction(id: string, formData: FormData) {
  const quotes = await getPraiseQuotes()
  const idx = quotes.findIndex((q) => q.id === id)
  if (idx === -1) return { error: 'Quote not found.' }

  quotes[idx] = {
    ...quotes[idx],
    publication: formData.get('publication') as string,
    quote: formData.get('quote') as string,
    published: formData.get('published') === 'on',
  }

  await savePraiseQuotes(quotes)
  revalidatePath('/')
  redirect('/admin/praise')
}

export async function deletePraiseQuoteAction(id: string) {
  const quotes = await getPraiseQuotes()
  const filtered = quotes.filter((q) => q.id !== id)
  await savePraiseQuotes(filtered)
  revalidatePath('/')
}

export async function togglePraisePublishedAction(id: string) {
  const quotes = await getPraiseQuotes()
  const idx = quotes.findIndex((q) => q.id === id)
  if (idx !== -1) {
    quotes[idx].published = !quotes[idx].published
    await savePraiseQuotes(quotes)
    revalidatePath('/')
  }
}
