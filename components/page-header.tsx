import { cn } from '@/lib/utils'

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'border-b border-border bg-secondary/60 px-6 py-20 sm:px-10 sm:py-28',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-foreground">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base sm:text-lg font-normal leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
