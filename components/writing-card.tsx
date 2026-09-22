import Link from 'next/link'
import type { Writing } from '@/lib/data'

export function WritingCard({ writing }: { writing: Writing }) {
  return (
    <article className="border-b border-border py-8 first:pt-0">
      <p className="text-xs sm:text-sm font-medium tracking-wide text-muted-foreground">
        {writing.date}
      </p>
      <h3 className="mt-2 font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
        <Link href={`/writings/${writing.slug}`}>{writing.title}</Link>
      </h3>
      <p className="mt-3 max-w-2xl text-sm font-normal leading-relaxed text-muted-foreground">
        {writing.excerpt}
      </p>
      <Link
        href={`/writings/${writing.slug}`}
        className="mt-4 inline-flex w-fit items-center border-b border-foreground/30 pb-0.5 text-xs font-semibold tracking-[0.12em] text-foreground uppercase transition-colors hover:border-foreground"
      >
        Read
      </Link>
    </article>
  )
}
