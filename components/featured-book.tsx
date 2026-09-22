import Link from 'next/link'
import type { Book } from '@/lib/data'
import { EditorialImage } from '@/components/editorial-image'
import { Button } from '@/components/ui/button'

export function FeaturedBook({ book }: { book: Book }) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Link
        href={`/books/${book.slug}`}
        className="order-1 mx-auto block aspect-[2/3] w-full max-w-sm lg:order-none lg:max-w-none"
      >
        <EditorialImage
          src={book.cover}
          alt={`Cover of ${book.title}`}
          className="h-full w-full"
          priority
          sizes="(min-width: 1024px) 40vw, 80vw"
        />
      </Link>

      <div>
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
          Featured Book
        </p>
        <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.12] text-foreground">
          {book.title}
        </h2>
        <p className="mt-5 max-w-md text-base font-normal leading-relaxed text-muted-foreground">
          {book.shortDescription}
        </p>
        <p className="mt-6 text-xs sm:text-sm font-medium tracking-wide text-muted-foreground">
          {book.publisher ? `${book.publisher} · ` : ''}
          {book.year}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            variant="outline"
            size="lg"
            render={<Link href={`/books/${book.slug}`} />}
            nativeButton={false}
          >
            Read More
          </Button>
          <Button size="lg" render={<Link href="/order" />} nativeButton={false}>
            Order Book
          </Button>
        </div>
      </div>
    </div>
  )
}
