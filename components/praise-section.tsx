import { getPublishedPraiseQuotes } from '@/lib/cms'

export async function PraiseSection() {
  const praiseQuotes = await getPublishedPraiseQuotes()

  return (
    <section className="border-t border-border bg-secondary/40 px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Acclaim &amp; Reviews
          </p>
          <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            PRAISE FOR RAHUL SAINI
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          {praiseQuotes.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between border-b border-border/60 pb-8 md:border-b-0"
            >
              <blockquote className="text-lg font-normal leading-relaxed text-foreground/90 sm:text-xl">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <p className="mt-6 text-xs font-bold tracking-[0.18em] text-foreground uppercase">
                {item.publication}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
