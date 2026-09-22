import Link from 'next/link'
import { createPressItemAction } from '../actions'

export default function NewPressItemPage() {
  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/press" className="text-sm text-muted-foreground hover:text-foreground">
          ← Press
        </Link>
        <span className="text-muted-foreground">/</span>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground">Add Press Feature</h1>
      </div>

      <form action={createPressItemAction} className="max-w-2xl space-y-6">
        <PressFormFields />
        <div className="flex gap-3 border-t border-border pt-6">
          <button
            type="submit"
            className="rounded bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Save Press Feature
          </button>
          <Link
            href="/admin/press"
            className="rounded border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export function PressFormFields({ item }: { item?: Record<string, unknown> }) {
  const p = item as Record<string, string | boolean> | undefined
  return (
    <>
      <Field label="Publication Name" name="publication" required defaultValue={p?.publication as string} placeholder="The Tribune" />
      <Field label="Headline / Title" name="headline" required defaultValue={p?.headline as string} />
      <Field label="Slug (URL)" name="slug" placeholder="auto-generated from headline if empty" defaultValue={p?.slug as string} />
      <Field label="Date / Coverage Type" name="date" defaultValue={(p?.date as string) || 'Feature Review'} placeholder="Review Coverage" />
      <Field label="Excerpt / Snippet" name="excerpt" textarea rows={3} required defaultValue={p?.excerpt as string} />
      <Field label="External URL (optional)" name="url" placeholder="https://..." defaultValue={p?.url as string} />
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
          <input type="checkbox" name="published" defaultChecked={p?.published !== false} className="size-4" />
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
