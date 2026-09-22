import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/page-header'
import { EditorialImage } from '@/components/editorial-image'
import { BlogBrowser } from '@/components/blog-browser'
import { getPublishedBlogPosts, getBlogCategories, getFeaturedBlogPost } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Blog | Rahul Saini',
  description: 'Journal entries, essays and notes from Rahul Saini.',
}

export default async function BlogPage() {
  const allPosts = await getPublishedBlogPosts()
  const featuredPost = await getFeaturedBlogPost()
  const blogCategories = await getBlogCategories()
  const otherPosts = featuredPost
    ? allPosts.filter((post) => post.slug !== featuredPost.slug)
    : allPosts

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Journal"
          title="Blog"
          description="Notes on craft, reading and the writing life, published regularly."
        />

        {featuredPost && (
          <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
            <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Featured Post
            </p>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <EditorialImage
                src={featuredPost.image}
                alt={featuredPost.title}
                className="aspect-[4/3] w-full"
                priority
              />
              <div className="flex flex-col justify-center">
                <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                  {featuredPost.category}
                </p>
                <h2 className="mt-4 font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.12] text-foreground">
                  {featuredPost.title}
                </h2>
                <p className="mt-2 text-xs sm:text-sm font-medium tracking-wide text-muted-foreground">
                  {featuredPost.date} · {featuredPost.readingTime}
                </p>
                <p className="mt-4 max-w-lg text-base font-normal leading-relaxed text-muted-foreground">
                  {featuredPost.excerpt}
                </p>
                <span className="mt-6 inline-flex w-fit items-center border-b border-foreground/30 pb-0.5 text-xs font-semibold tracking-[0.12em] text-foreground uppercase transition-colors group-hover:border-foreground">
                  Read Article
                </span>
              </div>
            </Link>
          </section>
        )}

        <section className="border-t border-border bg-secondary/60 px-6 py-20 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="mb-10 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Latest Posts
            </p>
            <BlogBrowser posts={otherPosts} categories={blogCategories} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
