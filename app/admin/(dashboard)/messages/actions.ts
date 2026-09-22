'use server'

import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'
import { markMessageRead, appendMessage } from '@/lib/cms'
import type { Message } from '@/lib/cms'

export async function toggleMessageReadAction(id: string, read: boolean) {
  await markMessageRead(id, read)
  revalidatePath('/admin/messages')
  revalidatePath('/admin')
}

export async function submitContactPublicAction(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const messageText = formData.get('message') as string

  const message: Message = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    email,
    subject: subject || 'General Inquiry',
    message: messageText,
    read: false,
  }

  await appendMessage(message)
  revalidatePath('/admin/messages')
  revalidatePath('/admin')
  return { success: true }
}
