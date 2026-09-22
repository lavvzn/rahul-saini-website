'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import { navLinks, orderLink } from '@/lib/nav'
import { SocialLinks } from '@/components/social-links'
import { cn } from '@/lib/utils'

const AUTHOR_NAME = 'RAHUL SAINI'

export function MobileMenu({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col bg-background transition-opacity duration-300 lg:hidden',
        open
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0',
      )}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          onClick={() => onOpenChange(false)}
          className="font-sans text-lg font-bold tracking-[0.18em] text-foreground uppercase"
        >
          {AUTHOR_NAME}
        </Link>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="text-foreground"
          aria-label="Close menu"
        >
          <X className="size-6" aria-hidden="true" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => onOpenChange(false)}
            className={cn(
              'border-b border-border py-4 font-sans text-3xl font-bold tracking-tight text-foreground transition-transform duration-300',
              open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
            )}
            style={{ transitionDelay: open ? `${index * 40}ms` : '0ms' }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={orderLink.href}
          onClick={() => onOpenChange(false)}
          className="mt-6 inline-flex w-fit items-center bg-primary px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground"
        >
          {orderLink.label}
        </Link>
      </nav>

      <div className="border-t border-border px-6 py-6">
        <SocialLinks />
      </div>
    </div>
  )
}
