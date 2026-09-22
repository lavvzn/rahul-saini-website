'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import type { Writing } from '@/lib/cms'
import { deleteWritingAction, toggleWritingPublishedAction } from './actions'

export function AdminWritingsTable({ writings: initialWritings }: { writings: Writing[] }) {
  const [writings, setWritings] = useState(initialWritings)

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    await deleteWritingAction(id)
    setWritings((prev) => prev.filter((w) => w.id !== id))
  }

  const handleToggle = async (id: string) => {
    await toggleWritingPublishedAction(id)
    setWritings((prev) =>
      prev.map((w) => (w.id === id ? { ...w, published: !w.published } : w)),
    )
  }

  return (
    <div className="overflow-hidden rounded border border-border">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-secondary/40">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Title</th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:table-cell">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Status</th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide text-muted-foreground uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {writings.map((writing) => (
            <tr key={writing.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/20">
              <td className="px-4 py-3">
                <p className="font-semibold text-foreground">{writing.title}</p>
                <p className="text-xs text-muted-foreground truncate max-w-md">{writing.excerpt}</p>
              </td>
              <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{writing.date}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleToggle(writing.id)}
                  className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold transition-colors ${
                    writing.published
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-muted text-muted-foreground hover:bg-border'
                  }`}
                >
                  {writing.published ? (
                    <><Eye className="size-3" /> Published</>
                  ) : (
                    <><EyeOff className="size-3" /> Draft</>
                  )}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/writings/${writing.id}/edit`}
                    className="flex items-center gap-1 rounded border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary/60"
                  >
                    <Pencil className="size-3" aria-hidden="true" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(writing.id, writing.title)}
                    className="flex items-center gap-1 rounded border border-destructive/30 px-2.5 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <Trash2 className="size-3" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {writings.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-12 text-center text-sm text-muted-foreground">
                No writings yet.{' '}
                <Link href="/admin/writings/new" className="font-medium text-foreground hover:underline">
                  Add your first essay/writing
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
