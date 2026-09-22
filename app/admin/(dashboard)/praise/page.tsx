import Link from 'next/link'
import { getPraiseQuotes } from '@/lib/cms'
import { AdminPraiseTable } from './table'

export default async function AdminPraisePage() {
  const quotes = await getPraiseQuotes()

  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">Praise &amp; Reviews</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {quotes.length} quotes · {quotes.filter((q) => q.published).length} published on homepage
          </p>
        </div>
        <Link
          href="/admin/praise/new"
          className="rounded bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-80"
        >
          + Add Praise Quote
        </Link>
      </div>

      <AdminPraiseTable quotes={quotes} />
    </div>
  )
}
