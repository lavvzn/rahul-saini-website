import Link from 'next/link'
import { createPraiseQuoteAction } from '../actions'

export default function NewPraiseQuotePage() {
  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/praise" className="text-sm text-muted-foreground hover:text-foreground">
          ← Praise
        </Link>
        <span className="text-muted-foreground">/</span>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground">Add Praise Quote</h1>
      </div>

      <form action={createPraiseQuoteAction} className="max-w-2xl space-y-6">
        <PraiseFormFields />
        <div className="flex gap-3 border-t border-border pt-6">
          <button
            type="submit"
            className="rounded bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Save Praise Quote
          </button>
          <Link
            href="/admin/praise"
            className="rounded border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export function PraiseFormFields({ quote }: { quote?: Record<string, unknown> }) {
  const q = quote as Record<string, string | boolean> | undefined
  return (
    <>
      <Field label="Publication Name" name="publication" required defaultValue={q?.publication as string} placeholder="The Tribune" />
      <Field label="Quote Text" name="quote" textarea rows={4} required defaultValue={q?.quote as string} placeholder="Author Rahul Saini has caught the pulse..." />
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
          <input type="checkbox" name="published" defaultChecked={q?.published !== false} className="size-4" />
          Published on Homepage
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
