import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { EditorialImage } from '@/components/editorial-image'
import { BlogGrid } from '@/components/blog-grid'
import { ShareButtons } from '@/components/share-buttons'
import { getSiteContent, getPublishedBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/cms'

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Rahul Saini`,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, siteContent, relatedPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteContent(),
    getRelatedBlogPosts(slug, 3),
  ])
  if (!post) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Blog
          </Link>

          <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            {post.category}
          </p>
          <h1 className="mt-4 font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-foreground">
            {post.title}
          </h1>
          <p className="mt-5 text-base sm:text-lg font-normal leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-6 text-xs sm:text-sm font-medium tracking-wide text-muted-foreground">
            <span>{siteContent.authorName}</span>
            <span aria-hidden="true">·</span>
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>

          <EditorialImage
            src={post.image}
            alt={post.title}
            className="mt-10 aspect-[16/10] w-full"
            imgClassName="group-hover:scale-100"
            priority
          />

          <div className="mt-12 flex flex-col gap-6 text-base sm:text-lg font-normal leading-relaxed text-foreground/90">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
              Share this article
            </p>
            <ShareButtons title={post.title} />
          </div>
        </article>

        <section className="border-t border-border bg-secondary/60 px-6 py-20 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="mb-10 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Related Posts
            </p>
            <BlogGrid posts={relatedPosts} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
