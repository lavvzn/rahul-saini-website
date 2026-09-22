'use client'

import { useMemo, useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Minus, Plus } from 'lucide-react'
import type { Book } from '@/lib/data'
import { OrderBookCard } from '@/components/order-book-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { submitOrderPublicAction } from '@/app/admin/(dashboard)/orders/actions'

export function OrderSection({ books }: { books: Book[] }) {
  const searchParams = useSearchParams()
  const requestedSlug = searchParams.get('book')
  const initialSlug = books.some((b) => b.slug === requestedSlug)
    ? (requestedSlug as string)
    : books[0]?.slug ?? ''

  const [selectedSlug, setSelectedSlug] = useState(initialSlug)
  const [quantity, setQuantity] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLDivElement>(null)

  const selectedBook = useMemo(
    () => books.find((b) => b.slug === selectedSlug) ?? books[0],
    [books, selectedSlug],
  )

  const unitPrice = useMemo(() => {
    if (!selectedBook) return 0
    const numeric = Number(selectedBook.price?.replace(/[^0-9.]/g, '') ?? 0)
    return Number.isFinite(numeric) ? numeric : 0
  }, [selectedBook])

  const total = unitPrice * quantity

  const handleOrder = (slug: string) => {
    setSelectedSlug(slug)
    setQuantity(1)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('bookTitle', selectedBook.title)
    formData.append('bookSlug', selectedBook.slug)
    formData.append('quantity', quantity.toString())

    startTransition(async () => {
      await submitOrderPublicAction(formData)
      setSubmitted(true)
    })
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 border border-border bg-secondary/60 px-8 py-20 text-center">
        <CheckCircle2 className="size-12 text-accent" aria-hidden="true" />
        <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Order Request Received
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Your order request has been received and saved. We will contact you at your email or phone number regarding payment and delivery.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            setSubmitted(false)
            setQuantity(1)
          }}
        >
          Place Another Order
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <OrderBookCard
            key={book.slug}
            book={book}
            selected={book.slug === selectedSlug}
            onOrder={handleOrder}
          />
        ))}
      </div>

      <Separator className="my-16" />

      <div ref={formRef} className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,320px)]">
        <form onSubmit={handleSubmit}>
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Order Details
          </h2>
          <FieldGroup className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="order-name">Name</FieldLabel>
                <Input id="order-name" name="name" required placeholder="Your full name" />
              </Field>
              <Field>
                <FieldLabel htmlFor="order-email">Email</FieldLabel>
                <Input id="order-email" name="email" type="email" required placeholder="you@example.com" />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="order-phone">Phone</FieldLabel>
              <Input id="order-phone" name="phone" type="tel" required placeholder="+91 00000 00000" />
            </Field>

            <Field>
              <FieldLabel htmlFor="order-address">Address</FieldLabel>
              <Textarea id="order-address" name="address" required rows={3} placeholder="Street address" />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="order-city">City</FieldLabel>
                <Input id="order-city" name="city" required placeholder="City" />
              </Field>
              <Field>
                <FieldLabel htmlFor="order-state">State</FieldLabel>
                <Input id="order-state" name="state" required placeholder="State" />
              </Field>
              <Field>
                <FieldLabel htmlFor="order-pin">PIN Code</FieldLabel>
                <Input id="order-pin" name="pincode" required placeholder="000000" />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="order-country">Country</FieldLabel>
              <Input id="order-country" name="country" required defaultValue="India" />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="order-book">Book</FieldLabel>
                <Select value={selectedSlug} onValueChange={setSelectedSlug}>
                  <SelectTrigger id="order-book" className="w-full">
                    <SelectValue placeholder="Select a book" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {books.map((book) => (
                        <SelectItem key={book.slug} value={book.slug}>
                          {book.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="order-quantity">Quantity</FieldLabel>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus aria-hidden="true" />
                  </Button>
                  <Input
                    id="order-quantity"
                    readOnly
                    value={quantity}
                    className="w-16 text-center"
                    aria-label="Quantity"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  >
                    <Plus aria-hidden="true" />
                  </Button>
                </div>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="order-message">Message (optional)</FieldLabel>
              <Textarea
                id="order-message"
                name="message"
                rows={4}
                placeholder="Any special instructions..."
              />
            </Field>

            <Button type="submit" size="lg" className="w-fit" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Submit Order Request'}
            </Button>
          </FieldGroup>
        </form>

        {selectedBook && (
          <aside className="border border-border bg-secondary/60 p-6 lg:sticky lg:top-24 lg:self-start">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Order Summary
            </h3>
            <div className="mt-5 flex gap-4">
              <div className="relative h-24 w-16 shrink-0 overflow-hidden bg-muted">
                <Image
                  src={selectedBook.cover || '/placeholder.svg'}
                  alt={`Cover of ${selectedBook.title}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-sans text-base sm:text-lg font-semibold tracking-tight text-foreground">
                  {selectedBook.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Qty: {quantity}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedBook.price} each
                </p>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-base font-medium text-foreground">
              <span>Total</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Your order will be recorded in our CMS for processing.
            </p>
          </aside>
        )}
      </div>
    </div>
  )
}
