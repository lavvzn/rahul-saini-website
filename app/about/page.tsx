import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { EditorialImage } from '@/components/editorial-image'
import { SectionHeading } from '@/components/section-heading'
import { SocialLinks } from '@/components/social-links'
import { BookGrid } from '@/components/book-grid'
import { PressCard } from '@/components/press-card'
import { getSiteContent, getPublishedBooks, getPublishedPressItems } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'About | Rahul Saini',
  description: 'About Rahul Saini, author.',
}

export default async function AboutPage() {
  const [siteContent, books, pressItems] = await Promise.all([
    getSiteContent(),
    getPublishedBooks(),
    getPublishedPressItems(),
  ])
  const selectedBooks = books.slice(0, 4)
  const selectedPress = pressItems.slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
            <EditorialImage
              src={siteContent.portraitAbout}
              alt={`Portrait of ${siteContent.authorName}`}
              className="aspect-[4/5] w-full max-w-sm mx-auto lg:mx-0"
              priority
            />

            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                About
              </p>
              <h1 className="mt-3 font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-foreground">
                About Rahul Saini
              </h1>

              <div className="mt-6 flex flex-col gap-5 text-base sm:text-lg font-normal leading-relaxed text-muted-foreground">
                {siteContent.aboutLong.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10">
                <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                  Connect
                </p>
                <SocialLinks />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-secondary/60 px-6 py-20 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Bibliography"
              title="Selected Books"
              href="/books"
              linkLabel="View All Books"
            />
            <BookGrid books={selectedBooks} className="mt-12" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24">
          <SectionHeading
            eyebrow="Coverage"
            title="Selected Press"
            href="/press"
            linkLabel="View All Press"
          />
          <div className="mt-4">
            {selectedPress.map((item) => (
              <PressCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
