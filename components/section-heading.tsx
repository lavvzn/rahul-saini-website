import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel,
  className,
}: {
  eyebrow?: string
  title: string
  href?: string
  linkLabel?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6',
        className,
      )}
    >
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] text-foreground">
          {title}
        </h2>
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-foreground uppercase"
        >
          {linkLabel}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  )
}
