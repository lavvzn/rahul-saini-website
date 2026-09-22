'use client'

import { useState, useTransition } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { submitContactPublicAction } from '@/app/admin/(dashboard)/messages/actions'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 border border-border bg-secondary/60 px-8 py-16 text-center">
        <CheckCircle2 className="size-10 text-accent" aria-hidden="true" />
        <h3 className="font-sans text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          Message Sent
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thank you for reaching out. Your message has been received and stored in our system. Rahul will get back to you shortly.
        </p>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await submitContactPublicAction(formData)
      setSubmitted(true)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="contact-name">Name</FieldLabel>
            <Input id="contact-name" name="name" required placeholder="Your full name" />
          </Field>
          <Field>
            <FieldLabel htmlFor="contact-email">Email</FieldLabel>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="contact-subject">Subject</FieldLabel>
          <Input id="contact-subject" name="subject" required placeholder="What is this about?" />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            placeholder="Write your message here..."
          />
        </Field>

        <Button type="submit" size="lg" className="w-fit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Send Message'}
        </Button>
      </FieldGroup>
    </form>
  )
}
