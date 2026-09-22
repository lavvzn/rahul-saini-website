import Link from 'next/link'
import { createWritingAction } from '../actions'

export default function NewWritingPage() {
  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/writings" className="text-sm text-muted-foreground hover:text-foreground">
          ← Writings
        </Link>
        <span className="text-muted-foreground">/</span>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground">Add New Writing</h1>
      </div>

      <form action={createWritingAction} encType="multipart/form-data" className="max-w-2xl space-y-6">
        <WritingFormFields />
        <div className="flex gap-3 border-t border-border pt-6">
          <button
            type="submit"
            className="rounded bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Save Writing
          </button>
          <Link
            href="/admin/writings"
            className="rounded border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export function WritingFormFields({ writing }: { writing?: Record<string, unknown> }) {
  const w = writing as Record<string, string | boolean | string[]> | undefined
  return (
    <>
      <Field label="Title" name="title" required defaultValue={w?.title as string} />
      <Field label="Slug (URL)" name="slug" placeholder="auto-generated from title if empty" defaultValue={w?.slug as string} />
      <Field label="Date" name="date" defaultValue={(w?.date as string) || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} />
      <Field label="Excerpt" name="excerpt" textarea rows={2} required defaultValue={w?.excerpt as string} />
      <Field
        label="Content (one paragraph per line)"
        name="content"
        textarea
        rows={8}
        required
        defaultValue={Array.isArray(w?.content) ? (w?.content as string[]).join('\n') : (w?.content as string)}
      />
      <div>
        <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
          Optional Image
        </label>
        <input type="file" name="image" accept="image/*" className="block text-sm text-muted-foreground" />
        <input
          type="text"
          name="imageUrl"
          defaultValue={w?.image as string}
          placeholder="/images/writings/sample.png"
          className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
        />
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
          <input type="checkbox" name="published" defaultChecked={w?.published !== false} className="size-4" />
          Published
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
