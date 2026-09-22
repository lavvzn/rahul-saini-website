import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import { AdminSidebar } from '@/components/admin/sidebar'

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
