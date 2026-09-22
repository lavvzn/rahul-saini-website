import Link from 'next/link'
import { getWritings } from '@/lib/cms'
import { AdminWritingsTable } from './table'

export default async function AdminWritingsPage() {
  const writings = await getWritings()

  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">Writings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {writings.length} essays &amp; articles · {writings.filter((w) => w.published).length} published
          </p>
        </div>
        <Link
          href="/admin/writings/new"
          className="rounded bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-80"
        >
          + Add Writing
        </Link>
      </div>

      <AdminWritingsTable writings={writings} />
    </div>
  )
}
