import Link from 'next/link'
import { getBooks } from '@/lib/cms'
import { AdminBooksTable } from './table'

export default async function AdminBooksPage() {
  const books = await getBooks()

  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">Books</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {books.length} books · {books.filter((b) => b.published).length} published
          </p>
        </div>
        <Link
          href="/admin/books/new"
          className="rounded bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-80"
        >
          + Add Book
        </Link>
      </div>

      <AdminBooksTable books={books} />
    </div>
  )
}
