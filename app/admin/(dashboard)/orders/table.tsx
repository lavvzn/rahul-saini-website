'use client'

import { useState } from 'react'
import type { Order } from '@/lib/cms'
import { changeOrderStatusAction } from './actions'

export function AdminOrdersTable({ orders: initialOrders }: { orders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders)

  const handleStatus = async (id: string, status: Order['status']) => {
    await changeOrderStatusAction(id, status)
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o)),
    )
  }

  return (
    <div className="overflow-hidden rounded border border-border">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-secondary/40">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Contact</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Address</th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase md:table-cell">Items</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Status</th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide text-muted-foreground uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/20">
              <td className="px-4 py-3">
                <p className="font-semibold text-foreground">{order.name}</p>
                <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
              </td>
              <td className="px-4 py-3">
                <p className="text-foreground">{order.email}</p>
                <p className="text-xs text-muted-foreground">{order.phone}</p>
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">
                {order.address}, {order.city}, {order.state} - {order.pincode}
              </td>
              <td className="hidden px-4 py-3 text-xs text-foreground md:table-cell">
                {order.items.map((item, i) => (
                  <div key={i}>
                    {item.bookTitle} (x{item.qty})
                  </div>
                ))}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                    order.status === 'pending'
                      ? 'bg-accent/20 text-accent'
                      : order.status === 'fulfilled'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <select
                  value={order.status}
                  onChange={(e) => handleStatus(order.id, e.target.value as Order['status'])}
                  className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="fulfilled">Fulfilled</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-sm text-muted-foreground">
                No orders received yet. Submissions from the public /order page will appear here.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
