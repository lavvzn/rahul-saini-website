import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/page-header'
import { WritingCard } from '@/components/writing-card'
import { getPublishedWritings } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Writings | Rahul Saini',
  description: 'Essays, articles and literary pieces by Rahul Saini.',
}

export default async function WritingsPage() {
  const writings = await getPublishedWritings()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Archive"
          title="Writings"
          description="Essays, articles and other written work by Rahul Saini, separate from the journal."
        />
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
          {writings.map((writing) => (
            <WritingCard key={writing.slug} writing={writing} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
