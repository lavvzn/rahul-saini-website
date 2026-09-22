'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import type { Book } from '@/lib/cms'
import { deleteBookAction, toggleBookPublishedAction } from './actions'

export function AdminBooksTable({ books: initialBooks }: { books: Book[] }) {
  const [books, setBooks] = useState(initialBooks)

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    await deleteBookAction(id)
    setBooks((prev) => prev.filter((b) => b.id !== id))
  }

  const handleToggle = async (id: string) => {
    await toggleBookPublishedAction(id)
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, published: !b.published } : b)),
    )
  }

  return (
    <div className="overflow-hidden rounded border border-border">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-secondary/40">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Cover</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Title</th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase md:table-cell">Year</th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase lg:table-cell">Publisher</th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:table-cell">Price</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Status</th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide text-muted-foreground uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/20">
              <td className="px-4 py-3">
                <div className="relative h-14 w-10 overflow-hidden rounded border border-border">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              </td>
              <td className="px-4 py-3">
                <p className="font-semibold text-foreground">{book.title}</p>
                {book.featured && (
                  <span className="mt-0.5 inline-block rounded bg-accent/20 px-1.5 py-0.5 text-xs font-semibold text-accent">
                    Featured
                  </span>
                )}
              </td>
              <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{book.year}</td>
              <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">{book.publisher}</td>
              <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{book.price}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleToggle(book.id)}
                  className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold transition-colors ${
                    book.published
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-muted text-muted-foreground hover:bg-border'
                  }`}
                >
                  {book.published ? (
                    <><Eye className="size-3" /> Published</>
                  ) : (
                    <><EyeOff className="size-3" /> Draft</>
                  )}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/books/${book.id}/edit`}
                    className="flex items-center gap-1 rounded border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary/60"
                  >
                    <Pencil className="size-3" aria-hidden="true" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book.id, book.title)}
                    className="flex items-center gap-1 rounded border border-destructive/30 px-2.5 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <Trash2 className="size-3" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-sm text-muted-foreground">
                No books yet.{' '}
                <Link href="/admin/books/new" className="font-medium text-foreground hover:underline">
                  Add your first book
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
