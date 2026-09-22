import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPosts } from '@/lib/cms'
import { updateBlogPostAction } from '../../actions'
import { BlogFormFields } from '../../new/page'

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const posts = await getBlogPosts()
  const post = posts.find((p) => p.id === id || p.slug === id)

  if (!post) {
    notFound()
  }

  const updateWithId = updateBlogPostAction.bind(null, post.id)

  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/blog" className="text-sm text-muted-foreground hover:text-foreground">
          ← Blog
        </Link>
        <span className="text-muted-foreground">/</span>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground">
          Edit Post: {post.title}
        </h1>
      </div>

      <form action={updateWithId} encType="multipart/form-data" className="max-w-2xl space-y-6">
        <BlogFormFields post={post as unknown as Record<string, unknown>} />
        <div className="flex gap-3 border-t border-border pt-6">
          <button
            type="submit"
            className="rounded bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Save Changes
          </button>
          <Link
            href="/admin/blog"
            className="rounded border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
