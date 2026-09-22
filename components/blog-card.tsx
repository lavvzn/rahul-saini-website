import Link from 'next/link'
import type { BlogPost } from '@/lib/data'
import { EditorialImage } from '@/components/editorial-image'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="mb-5 block aspect-[4/3] overflow-hidden"
      >
        <EditorialImage
          src={post.image}
          alt={post.title}
          className="h-full w-full"
        />
      </Link>
      <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
        {post.category}
      </p>
      <h3 className="mt-3 font-sans text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mt-2 text-xs sm:text-sm font-medium tracking-wide text-muted-foreground">
        {post.date}
      </p>
      <p className="mt-3 text-sm font-normal leading-relaxed text-muted-foreground">
        {post.excerpt}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-flex w-fit items-center border-b border-foreground/30 pb-0.5 text-xs font-semibold tracking-[0.12em] text-foreground uppercase transition-colors hover:border-foreground"
      >
        Read Article
      </Link>
    </article>
  )
}
