import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WritingCard } from '@/components/writing-card'
import { getPublishedWritings, getWritingBySlug, getRelatedWritings } from '@/lib/cms'

export async function generateStaticParams() {
  const writings = await getPublishedWritings()
  return writings.map((writing) => ({ slug: writing.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const writing = await getWritingBySlug(slug)
  if (!writing) return {}
  return {
    title: `${writing.title} | Rahul Saini`,
    description: writing.excerpt,
  }
}

export default async function WritingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const writing = await getWritingBySlug(slug)
  if (!writing) notFound()

  const relatedWritings = await getRelatedWritings(writing.slug, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-6 py-16 sm:px-10 sm:py-24">
          <Link
            href="/writings"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Writings
          </Link>

          <p className="mt-8 text-xs sm:text-sm font-medium tracking-wide text-muted-foreground">
            {writing.date}
          </p>
          <h1 className="mt-3 font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-foreground">
            {writing.title}
          </h1>

          <div className="mt-10 flex flex-col gap-6 text-base sm:text-lg font-normal leading-relaxed text-foreground/90">
            {writing.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        <section className="border-t border-border bg-secondary/60 px-6 py-20 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Related Writings
            </p>
            {relatedWritings.map((relatedWriting) => (
              <WritingCard key={relatedWriting.slug} writing={relatedWriting} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
