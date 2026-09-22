'use client'

import { useState } from 'react'
import { Mail, MailOpen } from 'lucide-react'
import type { Message } from '@/lib/cms'
import { toggleMessageReadAction } from './actions'

export function AdminMessagesTable({ messages: initialMessages }: { messages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages)

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    await toggleMessageReadAction(id, !currentRead)
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: !currentRead } : m)),
    )
  }

  return (
    <div className="overflow-hidden rounded border border-border">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-secondary/40">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Sender</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Subject</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Message</th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:table-cell">Date</th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide text-muted-foreground uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr
              key={msg.id}
              className={`border-b border-border/50 last:border-0 hover:bg-secondary/20 ${
                !msg.read ? 'bg-accent/5 font-medium' : ''
              }`}
            >
              <td className="px-4 py-3">
                <p className="font-semibold text-foreground">{msg.name}</p>
                <p className="text-xs text-muted-foreground">{msg.email}</p>
              </td>
              <td className="px-4 py-3 text-foreground font-medium">{msg.subject}</td>
              <td className="px-4 py-3 text-muted-foreground max-w-md">
                <p className="line-clamp-2 text-xs">{msg.message}</p>
              </td>
              <td className="hidden px-4 py-3 text-xs text-muted-foreground sm:table-cell">
                {new Date(msg.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => handleToggleRead(msg.id, msg.read)}
                  className="inline-flex items-center gap-1 rounded border border-border px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary/60"
                >
                  {msg.read ? (
                    <><Mail className="size-3" /> Mark Unread</>
                  ) : (
                    <><MailOpen className="size-3" /> Mark Read</>
                  )}
                </button>
              </td>
            </tr>
          ))}
          {messages.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">
                No contact messages received yet. Submissions from the public /contact page will appear here.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
