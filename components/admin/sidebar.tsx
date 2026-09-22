'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  PenLine,
  Newspaper,
  Quote,
  User,
  ShoppingBag,
  MessageSquare,
  Settings,
  ArrowLeft,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { logoutAction } from '@/app/admin/login/actions'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Books', href: '/admin/books', icon: BookOpen },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Writings', href: '/admin/writings', icon: PenLine },
  { label: 'Press', href: '/admin/press', icon: Newspaper },
  { label: 'Praise / Reviews', href: '/admin/praise', icon: Quote },
  { label: 'About Page', href: '/admin/about', icon: User },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-shrink-0 flex-col border-r border-border bg-secondary/40">
      {/* Brand */}
      <div className="border-b border-border px-6 py-5">
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Rahul Saini
        </p>
        <p className="mt-0.5 text-sm font-bold tracking-wide text-foreground">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:bg-border/40 hover:text-foreground',
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer actions */}
      <div className="border-t border-border px-3 py-4 space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-border/40 hover:text-foreground"
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
          Back to Website
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-4 shrink-0" aria-hidden="true" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
