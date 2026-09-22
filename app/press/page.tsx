import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/page-header'
import { PressCard } from '@/components/press-card'
import { getPublishedPressItems } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Press | Rahul Saini',
  description: 'Press coverage and mentions of Rahul Saini.',
}

export default async function PressPage() {
  const pressItems = await getPublishedPressItems()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Coverage"
          title="Press"
          description="A chronological archive of press mentions and coverage."
        />
        <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
          {pressItems.map((item) => (
            <PressCard key={item.slug} item={item} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
