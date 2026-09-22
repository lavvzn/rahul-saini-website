import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { EditorialImage } from '@/components/editorial-image'
import { SectionHeading } from '@/components/section-heading'
import { FeaturedBook } from '@/components/featured-book'
import { BookGrid } from '@/components/book-grid'
import { BlogGrid } from '@/components/blog-grid'
import { WritingCard } from '@/components/writing-card'
import { PressCard } from '@/components/press-card'
import { AuthorSection } from '@/components/author-section'
import { Button } from '@/components/ui/button'
import { PraiseSection } from '@/components/praise-section'
import {
  getSiteContent,
  getFeaturedBook,
  getPublishedBooks,
  getPublishedBlogPosts,
  getPublishedWritings,
  getPublishedPressItems,
} from '@/lib/cms'

export default async function HomePage() {
  const [siteContent, featuredBook, books, blogPosts, writings, pressItems] = await Promise.all([
    getSiteContent(),
    getFeaturedBook(),
    getPublishedBooks(),
    getPublishedBlogPosts(),
    getPublishedWritings(),
    getPublishedPressItems(),
  ])

  const featuredBooks = books.slice(0, 6)
  const latestPosts = blogPosts.slice(0, 3)
  const selectedWritings = writings.slice(0, 3)
  const selectedPress = pressItems.slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {siteContent.role}
              </p>
              <h1 className="mt-4 font-sans text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight text-foreground">
                {siteContent.authorName}
              </h1>
              <p className="mt-8 max-w-md text-lg sm:text-xl font-normal leading-relaxed text-muted-foreground">
                {siteContent.tagline}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" render={<Link href="/books" />} nativeButton={false}>
                  Explore Books
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  render={<Link href="/about" />}
                  nativeButton={false}
                >
                  About Rahul
                </Button>
              </div>
            </div>
            <EditorialImage
              src={siteContent.portraitHero}
              alt={`Portrait of ${siteContent.authorName}`}
              className="order-1 aspect-[4/5] w-full lg:order-2"
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
          </div>
        </section>

        {/* Featured Book */}
        {featuredBook && (
          <section className="border-t border-border bg-secondary/60 px-6 py-20 sm:px-10 sm:py-28">
            <div className="mx-auto max-w-7xl">
              <FeaturedBook book={featuredBook} />
            </div>
          </section>
        )}

        {/* Books */}
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
          <SectionHeading
            eyebrow="Bibliography"
            title="Books"
            href="/books"
            linkLabel="View All Books"
          />
          <BookGrid books={featuredBooks} className="mt-12" />
        </section>

        {/* Praise for Rahul Saini */}
        <PraiseSection />

        {/* Blog */}
        <section className="border-t border-border bg-secondary/60 px-6 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Journal"
              title="Blog"
              href="/blog"
              linkLabel="View All Blog Posts"
            />
            <BlogGrid posts={latestPosts} className="mt-12" />
          </div>
        </section>

        {/* Writings */}
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
          <SectionHeading
            eyebrow="Selected"
            title="Writings"
            href="/writings"
            linkLabel="View All Writings"
          />
          <div className="mt-4">
            {selectedWritings.map((writing) => (
              <WritingCard key={writing.slug} writing={writing} />
            ))}
          </div>
        </section>

        {/* About */}
        <section className="border-t border-border bg-secondary/60 px-6 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <AuthorSection />
          </div>
        </section>

        {/* Press */}
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
          <SectionHeading
            eyebrow="Coverage"
            title="Press"
            href="/press"
            linkLabel="View All Press"
          />
          <div className="mt-4">
            {selectedPress.map((item) => (
              <PressCard key={item.slug} item={item} />
            ))}
          </div>
        </section>

        {/* Order CTA */}
        <section className="border-t border-border px-6 py-24 text-center sm:px-10 sm:py-32">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
              Order Books
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Explore Rahul Saini&apos;s books and place an order.
            </p>
            <Button
              size="lg"
              className="mt-8"
              render={<Link href="/order" />}
              nativeButton={false}
            >
              Order Books
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
