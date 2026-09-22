import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPressItems } from '@/lib/cms'
import { updatePressItemAction } from '../../actions'
import { PressFormFields } from '../../new/page'

export default async function EditPressItemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const items = await getPressItems()
  const item = items.find((i) => i.id === id || i.slug === id)

  if (!item) {
    notFound()
  }

  const updateWithId = updatePressItemAction.bind(null, item.id)

  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/press" className="text-sm text-muted-foreground hover:text-foreground">
          ← Press
        </Link>
        <span className="text-muted-foreground">/</span>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground">
          Edit Press Feature: {item.headline}
        </h1>
      </div>

      <form action={updateWithId} className="max-w-2xl space-y-6">
        <PressFormFields item={item as unknown as Record<string, unknown>} />
        <div className="flex gap-3 border-t border-border pt-6">
          <button
            type="submit"
            className="rounded bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Save Changes
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
