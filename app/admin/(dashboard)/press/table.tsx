'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Pencil, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react'
import type { PressItem } from '@/lib/cms'
import { deletePressItemAction, togglePressPublishedAction } from './actions'

export function AdminPressTable({ items: initialItems }: { items: PressItem[] }) {
  const [items, setItems] = useState(initialItems)

  const handleDelete = async (id: string, headline: string) => {
    if (!confirm(`Delete press item "${headline}"? This cannot be undone.`)) return
    await deletePressItemAction(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const handleToggle = async (id: string) => {
    await togglePressPublishedAction(id)
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, published: !i.published } : i)),
    )
  }

  return (
    <div className="overflow-hidden rounded border border-border">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-secondary/40">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Publication</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Headline</th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:table-cell">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Status</th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide text-muted-foreground uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/20">
              <td className="px-4 py-3 font-semibold text-foreground">{item.publication}</td>
              <td className="px-4 py-3">
                <p className="font-medium text-foreground">{item.headline}</p>
                <p className="text-xs text-muted-foreground truncate max-w-md">{item.excerpt}</p>
              </td>
              <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{item.date}</td>
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
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded border border-border px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="size-3" aria-hidden="true" />
                    </a>
                  )}
                  <Link
                    href={`/admin/press/${item.id}/edit`}
                    className="flex items-center gap-1 rounded border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary/60"
                  >
                    <Pencil className="size-3" aria-hidden="true" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id, item.headline)}
                    className="flex items-center gap-1 rounded border border-destructive/30 px-2.5 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <Trash2 className="size-3" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">
                No press items yet.{' '}
                <Link href="/admin/press/new" className="font-medium text-foreground hover:underline">
                  Add press coverage
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
