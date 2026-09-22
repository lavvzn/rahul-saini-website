import Link from 'next/link'
import { navLinks, orderLink } from '@/lib/nav'
import { getSiteContent } from '@/lib/cms'
import { SocialLinks } from '@/components/social-links'

export async function Footer() {
  const siteContent = await getSiteContent()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div>
            <Link
              href="/"
              className="font-sans text-xl font-bold tracking-[0.18em] text-foreground uppercase"
            >
              {siteContent.authorName}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground font-normal">
              {siteContent.tagline}
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:gap-10">
            {[...navLinks, orderLink].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <SocialLinks />
          <p className="text-xs tracking-wide text-muted-foreground">
            © {year} {siteContent.authorName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
