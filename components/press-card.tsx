import type { PressItem } from '@/lib/data'

export function PressCard({ item }: { item: PressItem }) {
  return (
    <article className="flex flex-col gap-2 border-b border-border py-8 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
          {item.publication}
        </p>
        <h3 className="mt-2 font-sans text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          {item.headline}
        </h3>
        <p className="mt-2 max-w-2xl text-sm font-normal leading-relaxed text-muted-foreground">
          {item.excerpt}
        </p>
        <span className="mt-4 inline-flex w-fit items-center border-b border-foreground/30 pb-0.5 text-xs font-semibold tracking-[0.12em] text-foreground uppercase">
          Read Article
        </span>
      </div>
      <p className="shrink-0 text-xs sm:text-sm font-medium tracking-wide text-muted-foreground">
        {item.date}
      </p>
    </article>
  )
}
