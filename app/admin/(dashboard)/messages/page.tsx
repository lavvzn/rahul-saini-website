import { getMessages } from '@/lib/cms'
import { AdminMessagesTable } from './table'

export default async function AdminMessagesPage() {
  const messages = await getMessages()

  return (
    <div className="px-8 py-10">
      <div className="mb-8">
        <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">Contact Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {messages.length} total messages · {messages.filter((m) => !m.read).length} unread
        </p>
      </div>

      <AdminMessagesTable messages={messages} />
    </div>
  )
}
