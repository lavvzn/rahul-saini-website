import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPraiseQuotes } from '@/lib/cms'
import { updatePraiseQuoteAction } from '../../actions'
import { PraiseFormFields } from '../../new/page'

export default async function EditPraiseQuotePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const quotes = await getPraiseQuotes()
  const quote = quotes.find((q) => q.id === id)

  if (!quote) {
    notFound()
  }

  const updateWithId = updatePraiseQuoteAction.bind(null, quote.id)

  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/praise" className="text-sm text-muted-foreground hover:text-foreground">
          ← Praise
        </Link>
        <span className="text-muted-foreground">/</span>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground">
          Edit Praise Quote: {quote.publication}
        </h1>
      </div>

      <form action={updateWithId} className="max-w-2xl space-y-6">
        <PraiseFormFields quote={quote as unknown as Record<string, unknown>} />
        <div className="flex gap-3 border-t border-border pt-6">
          <button
            type="submit"
            className="rounded bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Save Changes
          </button>
          <Link
            href="/admin/praise"
            className="rounded border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
