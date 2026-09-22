'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import type { PraiseQuote } from '@/lib/cms'
import { deletePraiseQuoteAction, togglePraisePublishedAction } from './actions'

export function AdminPraiseTable({ quotes: initialQuotes }: { quotes: PraiseQuote[] }) {
  const [quotes, setQuotes] = useState(initialQuotes)

  const handleDelete = async (id: string, pub: string) => {
    if (!confirm(`Delete quote from "${pub}"? This cannot be undone.`)) return
    await deletePraiseQuoteAction(id)
    setQuotes((prev) => prev.filter((q) => q.id !== id))
  }

  const handleToggle = async (id: string) => {
    await togglePraisePublishedAction(id)
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, published: !q.published } : q)),
    )
  }

  return (
    <div className="overflow-hidden rounded border border-border">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-secondary/40">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Publication</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Quote</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Status</th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide text-muted-foreground uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((item) => (
            <tr key={item.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/20">
              <td className="px-4 py-3 font-semibold text-foreground">{item.publication}</td>
              <td className="px-4 py-3 text-foreground font-normal italic">&ldquo;{item.quote}&rdquo;</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold transition-colors ${
                    item.published
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-muted text-muted-foreground hover:bg-border'
                  }`}
                >
                  {item.published ? (
                    <><Eye className="size-3" /> Published</>
                  ) : (
                    <><EyeOff className="size-3" /> Draft</>
                  )}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/praise/${item.id}/edit`}
                    className="flex items-center gap-1 rounded border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary/60"
                  >
                    <Pencil className="size-3" aria-hidden="true" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id, item.publication)}
                    className="flex items-center gap-1 rounded border border-destructive/30 px-2.5 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <Trash2 className="size-3" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {quotes.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-12 text-center text-sm text-muted-foreground">
                No praise quotes yet.{' '}
                <Link href="/admin/praise/new" className="font-medium text-foreground hover:underline">
                  Add praise quote
                </Link>
                .
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
