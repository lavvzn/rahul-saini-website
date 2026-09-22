'use client'

import type { Book } from '@/lib/data'
import { EditorialImage } from '@/components/editorial-image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function OrderBookCard({
  book,
  selected,
  onOrder,
}: {
  book: Book
  selected: boolean
  onOrder: (slug: string) => void
}) {
  return (
    <div
      className={cn(
        'flex flex-col border border-transparent p-4 transition-colors',
        selected && 'border-accent bg-secondary/60',
      )}
    >
      <div className="mb-4 aspect-[2/3] overflow-hidden">
        <EditorialImage src={book.cover} alt={`Cover of ${book.title}`} className="h-full w-full" />
      </div>
      <h3 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-foreground">
        {book.title}
      </h3>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-sm tracking-wide text-muted-foreground">
          {book.price}
        </span>
        <Badge variant={book.availability === 'In Stock' ? 'secondary' : 'outline'}>
          {book.availability}
        </Badge>
      </div>
      <Button
        size="sm"
        variant={selected ? 'default' : 'outline'}
        className="mt-4"
        onClick={() => onOrder(book.slug)}
      >
        {selected ? 'Selected' : 'Order'}
      </Button>
    </div>
  )
}
