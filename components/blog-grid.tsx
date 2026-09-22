import type { BlogPost } from '@/lib/data'
import { BlogCard } from '@/components/blog-card'
import { cn } from '@/lib/utils'

export function BlogGrid({
  posts,
  className,
}: {
  posts: BlogPost[]
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
