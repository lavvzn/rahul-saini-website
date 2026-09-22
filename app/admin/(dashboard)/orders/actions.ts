'use server'

import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'
import { getOrders, updateOrderStatus, appendOrder } from '@/lib/cms'
import type { Order } from '@/lib/cms'

export async function changeOrderStatusAction(id: string, status: Order['status']) {
  await updateOrderStatus(id, status)
  revalidatePath('/admin/orders')
  revalidatePath('/admin')
}

export async function submitOrderPublicAction(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const address = formData.get('address') as string
  const city = formData.get('city') as string
  const state = formData.get('state') as string
  const pincode = formData.get('pincode') as string
  const message = formData.get('message') as string

  // Simple item extraction
  const bookTitle = formData.get('bookTitle') as string || 'Love to Hurt You'
  const bookSlug = formData.get('bookSlug') as string || 'love-to-hurt-you'
  const qty = parseInt(formData.get('quantity') as string || '1', 10)

  const order: Order = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    items: [
      {
        bookSlug,
        bookTitle,
        qty,
        price: '₹299',
      },
    ],
    message: message || undefined,
    status: 'pending',
  }

  await appendOrder(order)
  revalidatePath('/admin/orders')
  revalidatePath('/admin')
  return { success: true }
}
