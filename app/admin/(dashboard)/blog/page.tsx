import Link from 'next/link'
import { getBlogPosts } from '@/lib/cms'
import { AdminBlogTable } from './table'

export default async function AdminBlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">Blog</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {posts.length} posts · {posts.filter((p) => p.published).length} published
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="rounded bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-80"
        >
          + Write Post
        </Link>
      </div>

      <AdminBlogTable posts={posts} />
    </div>
  )
}
