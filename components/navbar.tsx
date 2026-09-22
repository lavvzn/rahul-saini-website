'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { navLinks, orderLink } from '@/lib/nav'
import { Button } from '@/components/ui/button'
import { MobileMenu } from '@/components/mobile-menu'

// Author name used in navbar brand — must be a static import for client component
const AUTHOR_NAME = 'RAHUL SAINI'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
          <Link
            href="/"
            className="font-sans text-base sm:text-lg font-bold tracking-[0.18em] text-foreground uppercase"
          >
            {AUTHOR_NAME}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button render={<Link href={orderLink.href} />} nativeButton={false}>
              {orderLink.label}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" aria-hidden="true" />
            Menu
          </button>
        </div>
      </header>

      <MobileMenu open={open} onOpenChange={setOpen} />
    </>
  )
}
