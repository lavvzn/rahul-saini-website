import Link from 'next/link'
import type { Book } from '@/lib/data'
import { EditorialImage } from '@/components/editorial-image'

export function BookCard({
  book,
  showDescription = false,
}: {
  book: Book
  showDescription?: boolean
}) {
  return (
    <div className="flex flex-col">
      <Link
        href={`/books/${book.slug}`}
        className="mb-5 block aspect-[2/3] overflow-hidden"
      >
        <EditorialImage
          src={book.cover}
          alt={`Cover of ${book.title}`}
          className="h-full w-full"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 80vw"
        />
      </Link>
      <h3 className="font-sans text-lg sm:text-xl font-semibold tracking-tight text-foreground">
        <Link href={`/books/${book.slug}`}>{book.title}</Link>
      </h3>
      <p className="mt-1 text-xs sm:text-sm font-medium tracking-wide text-muted-foreground">
        {book.year}
      </p>
      {showDescription && (
        <p className="mt-3 text-sm font-normal leading-relaxed text-muted-foreground">
          {book.shortDescription}
        </p>
      )}
      <Link
        href={`/books/${book.slug}`}
        className="mt-4 inline-flex w-fit items-center border-b border-foreground/30 pb-0.5 text-xs font-semibold tracking-[0.12em] text-foreground uppercase transition-colors hover:border-foreground"
      >
        View Book
      </Link>
    </div>
  )
}
