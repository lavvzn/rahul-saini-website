import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/page-header'
import { OrderSection } from '@/components/order-section'
import { getPublishedBooks } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Order Books | Rahul Saini',
  description: "Explore Rahul Saini's books and place an order.",
}

export default async function OrderPage() {
  const books = await getPublishedBooks()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Order"
          title="Order Books"
          description="Explore Rahul Saini's books and place an order."
        />
        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
          <Suspense fallback={null}>
            <OrderSection books={books} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  )
}
