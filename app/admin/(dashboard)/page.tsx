import Link from 'next/link'
import { BookOpen, FileText, PenLine, Newspaper, Quote, ShoppingBag, MessageSquare } from 'lucide-react'
import {
  getBooks,
  getBlogPosts,
  getWritings,
  getPressItems,
  getPraiseQuotes,
  getOrders,
  getMessages,
} from '@/lib/cms'

export default async function AdminDashboardPage() {
  const [books, blogPosts, writings, pressItems, praiseQuotes, orders, messages] = await Promise.all([
    getBooks(),
    getBlogPosts(),
    getWritings(),
    getPressItems(),
    getPraiseQuotes(),
    getOrders(),
    getMessages(),
  ])

  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const unreadMessages = messages.filter((m) => !m.read).length

  const stats = [
    { label: 'Books', value: books.length, published: books.filter((b) => b.published).length, href: '/admin/books', icon: BookOpen },
    { label: 'Blog Posts', value: blogPosts.length, published: blogPosts.filter((b) => b.published).length, href: '/admin/blog', icon: FileText },
    { label: 'Writings', value: writings.length, published: writings.filter((w) => w.published).length, href: '/admin/writings', icon: PenLine },
    { label: 'Press Items', value: pressItems.length, published: pressItems.filter((p) => p.published).length, href: '/admin/press', icon: Newspaper },
    { label: 'Praise Quotes', value: praiseQuotes.length, published: praiseQuotes.filter((q) => q.published).length, href: '/admin/praise', icon: Quote },
    { label: 'Orders', value: orders.length, published: pendingOrders, href: '/admin/orders', icon: ShoppingBag, badge: pendingOrders > 0 ? `${pendingOrders} pending` : undefined },
    { label: 'Messages', value: messages.length, published: unreadMessages, href: '/admin/messages', icon: MessageSquare, badge: unreadMessages > 0 ? `${unreadMessages} unread` : undefined },
  ]

  const quickLinks = [
    { label: 'Add a Book', href: '/admin/books/new' },
    { label: 'Write a Blog Post', href: '/admin/blog/new' },
    { label: 'Add a Writing', href: '/admin/writings/new' },
    { label: 'Add Press Coverage', href: '/admin/press/new' },
    { label: 'Add Praise Quote', href: '/admin/praise/new' },
    { label: 'Edit Site Settings', href: '/admin/settings' },
    { label: 'Edit About Page', href: '/admin/about' },
  ]

  return (
    <div className="px-8 py-10">
      <div className="mb-10">
        <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back. Here&apos;s a summary of your website content.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group relative flex flex-col gap-3 rounded border border-border bg-secondary/30 p-5 transition-colors hover:bg-secondary/60"
            >
              <div className="flex items-center justify-between">
                <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
                {stat.badge && (
                  <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">
                    {stat.badge}
                  </span>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.published} published
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick links */}
      <div className="mt-12">
        <h2 className="mb-4 text-sm font-bold tracking-[0.12em] text-foreground uppercase">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      {orders.length > 0 && (
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-[0.12em] text-foreground uppercase">
              Recent Orders
            </h2>
            <Link href="/admin/orders" className="text-xs text-muted-foreground hover:text-foreground">
              View all →
            </Link>
          </div>
          <div className="overflow-hidden rounded border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/40">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{order.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${
                        order.status === 'pending' ? 'bg-accent/20 text-accent' :
                        order.status === 'fulfilled' ? 'bg-green-100 text-green-700' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent messages */}
      {messages.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-[0.12em] text-foreground uppercase">
              Recent Messages
            </h2>
            <Link href="/admin/messages" className="text-xs text-muted-foreground hover:text-foreground">
              View all →
            </Link>
          </div>
          <div className="overflow-hidden rounded border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/40">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.slice(0, 5).map((msg) => (
                  <tr key={msg.id} className={`border-b border-border/50 last:border-0 ${!msg.read ? 'bg-accent/5' : ''}`}>
                    <td className="px-4 py-3 font-medium text-foreground">{msg.name}</td>
                    <td className="px-4 py-3 text-muted-foreground truncate max-w-xs">{msg.subject}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
