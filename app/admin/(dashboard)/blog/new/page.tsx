import Link from 'next/link'
import { createBlogPostAction } from '../actions'

export default function NewBlogPostPage() {
  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/blog" className="text-sm text-muted-foreground hover:text-foreground">
          ← Blog
        </Link>
        <span className="text-muted-foreground">/</span>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground">Write Blog Post</h1>
      </div>

      <form action={createBlogPostAction} encType="multipart/form-data" className="max-w-2xl space-y-6">
        <BlogFormFields />
        <div className="flex gap-3 border-t border-border pt-6">
          <button
            type="submit"
            className="rounded bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Publish Post
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

export function BlogFormFields({ post }: { post?: Record<string, unknown> }) {
  const p = post as Record<string, string | boolean | string[]> | undefined
  return (
    <>
      <Field label="Title" name="title" required defaultValue={p?.title as string} />
      <Field label="Slug (URL)" name="slug" placeholder="auto-generated from title if empty" defaultValue={p?.slug as string} />
      <div className="grid grid-cols-3 gap-4">
        <Field label="Category" name="category" defaultValue={(p?.category as string) || 'Journal'} />
        <Field label="Date" name="date" defaultValue={(p?.date as string) || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} />
        <Field label="Reading Time" name="readingTime" defaultValue={(p?.readingTime as string) || '5 min read'} />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
          Cover Image
        </label>
        <input type="file" name="image" accept="image/*" className="block text-sm text-muted-foreground" />
        <p className="mt-1 text-xs text-muted-foreground">Or enter an image URL:</p>
        <input
          type="text"
          name="imageUrl"
          defaultValue={p?.image as string}
          placeholder="/images/blog/blog-01.png"
          className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
        />
      </div>
      <Field label="Excerpt" name="excerpt" textarea rows={2} required defaultValue={p?.excerpt as string} />
      <Field
        label="Content (one paragraph per line)"
        name="content"
        textarea
        rows={8}
        required
        defaultValue={Array.isArray(p?.content) ? (p?.content as string[]).join('\n') : (p?.content as string)}
      />
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
          <input type="checkbox" name="published" defaultChecked={p?.published !== false} className="size-4" />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
          <input type="checkbox" name="featured" defaultChecked={p?.featured === true} className="size-4" />
          Featured Post
        </label>
      </div>
    </>
  )
}

function Field({
  label,
  name,
  required,
  placeholder,
  defaultValue,
  textarea,
  rows = 3,
}: {
  label: string
  name: string
  required?: boolean
  placeholder?: string
  defaultValue?: string
  textarea?: boolean
  rows?: number
}) {
  const baseClass =
    'w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none'

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={rows}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={baseClass}
        />
      ) : (
        <input
          type="text"
          name={name}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={baseClass}
        />
      )}
    </div>
  )
}
