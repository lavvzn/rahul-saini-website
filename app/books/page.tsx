import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/page-header'
import { BookGrid } from '@/components/book-grid'
import { getPublishedBooks } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Books | Rahul Saini',
  description: 'A complete catalogue of books by Rahul Saini.',
}

export default async function BooksPage() {
  const books = await getPublishedBooks()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Bibliography"
          title="Books"
          description="A complete catalogue of novels and story collections by Rahul Saini."
        />
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24">
          <BookGrid
            books={books}
            showDescription
            className="sm:grid-cols-2 lg:grid-cols-3"
          />
        </section>
      </main>
      <Footer />
    </div>
  )
}
