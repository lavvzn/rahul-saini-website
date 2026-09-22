import Link from 'next/link'
import { createBookAction } from '../actions'

export default function NewBookPage() {
  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/books" className="text-sm text-muted-foreground hover:text-foreground">
          ← Books
        </Link>
        <span className="text-muted-foreground">/</span>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground">Add New Book</h1>
      </div>

      <form action={createBookAction} encType="multipart/form-data" className="max-w-2xl space-y-6">
        <BookFormFields />
        <div className="flex gap-3 border-t border-border pt-6">
          <button
            type="submit"
            className="rounded bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Create Book
          </button>
          <Link
            href="/admin/books"
            className="rounded border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

function BookFormFields({ book }: { book?: Record<string, unknown> }) {
  const b = book as Record<string, string | boolean | string[]> | undefined
  return (
    <>
      <Field label="Title" name="title" required defaultValue={b?.title as string} />
      <Field label="Slug (URL)" name="slug" placeholder="auto-generated from title if empty" defaultValue={b?.slug as string} />
      <Field label="Year" name="year" required defaultValue={b?.year as string} placeholder="2024" />
      <div>
        <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
          Cover Image
        </label>
        <input type="file" name="cover" accept="image/*" className="block text-sm text-muted-foreground" />
        <p className="mt-1 text-xs text-muted-foreground">Or enter an image URL:</p>
        <input
          type="text"
          name="coverUrl"
          defaultValue={b?.cover as string}
          placeholder="/images/books/book-01.png"
          className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
        />
      </div>
      <Field label="Short Description" name="shortDescription" textarea rows={2} defaultValue={b?.shortDescription as string} />
      <Field
        label="Full Description (one paragraph per line)"
        name="description"
        textarea
        rows={6}
        defaultValue={Array.isArray(b?.description) ? (b?.description as string[]).join('\n') : (b?.description as string)}
      />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Publisher" name="publisher" defaultValue={b?.publisher as string} />
        <Field label="ISBN" name="isbn" defaultValue={b?.isbn as string} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Field label="Pages" name="pages" defaultValue={b?.pages as string} />
        <Field label="Language" name="language" defaultValue={(b?.language as string) || 'English'} />
        <Field label="Price" name="price" defaultValue={b?.price as string} placeholder="₹299" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
          Availability
        </label>
        <select
          name="availability"
          defaultValue={(b?.availability as string) || 'In Stock'}
          className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
        >
          <option value="In Stock">In Stock</option>
          <option value="Limited Stock">Limited Stock</option>
          <option value="Pre-Order">Pre-Order</option>
        </select>
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
          <input type="checkbox" name="published" defaultChecked={b?.published !== false} className="size-4" />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
          <input type="checkbox" name="featured" defaultChecked={b?.featured === true} className="size-4" />
          Featured (shown in hero section)
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
