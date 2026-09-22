import Link from 'next/link'
import { getPressItems } from '@/lib/cms'
import { AdminPressTable } from './table'

export default async function AdminPressPage() {
  const items = await getPressItems()

  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">Press Coverage</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} press features · {items.filter((i) => i.published).length} published
          </p>
        </div>
        <Link
          href="/admin/press/new"
          className="rounded bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-80"
        >
          + Add Press Feature
        </Link>
      </div>

      <AdminPressTable items={items} />
    </div>
  )
}
