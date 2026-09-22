import type { Book } from '@/lib/data'
import { BookCard } from '@/components/book-card'
import { cn } from '@/lib/utils'

export function BookGrid({
  books,
  showDescription = false,
  className,
}: {
  books: Book[]
  showDescription?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4',
        className,
      )}
    >
      {books.map((book) => (
        <BookCard key={book.slug} book={book} showDescription={showDescription} />
      ))}
    </div>
  )
}
