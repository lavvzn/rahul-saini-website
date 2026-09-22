import { getOrders } from '@/lib/cms'
import { AdminOrdersTable } from './table'

export default async function AdminOrdersPage() {
  const orders = await getOrders()

  return (
    <div className="px-8 py-10">
      <div className="mb-8">
        <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">Book Orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {orders.length} total orders · {orders.filter((o) => o.status === 'pending').length} pending
        </p>
      </div>

      <AdminOrdersTable orders={orders} />
    </div>
  )
}
