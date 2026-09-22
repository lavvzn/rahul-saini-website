import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { EditorialImage } from '@/components/editorial-image'
import { BookGrid } from '@/components/book-grid'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getPublishedBooks, getBookBySlug, getRelatedBooks } from '@/lib/cms'

export async function generateStaticParams() {
  const books = await getPublishedBooks()
  return books.map((book) => ({ slug: book.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const book = await getBookBySlug(slug)
  if (!book) return {}
  return {
    title: `${book.title} | Rahul Saini`,
    description: book.shortDescription,
  }
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = await getBookBySlug(slug)
  if (!book) notFound()

  const relatedBooks = await getRelatedBooks(book.slug, 3)

  const bookMeta: { label: string; value: string }[] = [
    { label: 'Publisher', value: book.publisher ?? '' },
    { label: 'Year', value: book.year },
    { label: 'ISBN', value: book.isbn ?? '' },
    { label: 'Pages', value: book.pages ?? '' },
    { label: 'Language', value: book.language ?? '' },
  ].filter((item) => item.value)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
            <EditorialImage
              src={book.cover}
              alt={`Cover of ${book.title}`}
              className="aspect-[2/3] w-full max-w-sm mx-auto lg:mx-0"
              priority
              sizes="(min-width: 1024px) 30vw, 80vw"
            />

            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {book.year}
              </p>
              <h1 className="mt-3 font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-foreground">
                {book.title}
              </h1>
              <p className="mt-2 text-base font-medium tracking-wide text-muted-foreground">
                Rahul Saini
              </p>

              <div className="mt-8 flex flex-col gap-4 text-base sm:text-lg font-normal leading-relaxed text-muted-foreground">
                {book.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {bookMeta.length > 0 && (
                <>
                  <Separator className="my-8" />
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                    {bookMeta.map((item) => (
                      <div key={item.label}>
                        <dt className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                          {item.label}
                        </dt>
                        <dd className="mt-1 text-sm text-foreground">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}

              <Separator className="my-8" />

              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Order This Book
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    render={<Link href={`/order?book=${book.slug}`} />}
                    nativeButton={false}
                  >
                    Order Book
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    render={<Link href={`/order?book=${book.slug}`} />}
                    nativeButton={false}
                  >
                    Purchase Online
                    <ExternalLink data-icon="inline-end" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-secondary/60 px-6 py-20 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title="More Books by Rahul Saini" />
            <BookGrid
              books={relatedBooks}
              className="mt-12 sm:grid-cols-3 lg:grid-cols-3"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
