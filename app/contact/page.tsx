import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/page-header'
import { SocialLinks } from '@/components/social-links'
import { ContactForm } from '@/components/contact-form'
import { getSiteContent } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Contact | Rahul Saini',
  description: 'Get in touch with Rahul Saini.',
}

export default async function ContactPage() {
  const siteContent = await getSiteContent()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Get in Touch"
          title="Contact"
          description="For inquiries, events or general correspondence, reach out using the form below."
        />

        <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,280px)_1fr]">
            <div>
              <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                Email
              </p>
              <a
                href={`mailto:${siteContent.email}`}
                className="mt-2 flex items-center gap-2 text-base text-foreground transition-colors hover:text-accent"
              >
                <Mail className="size-4" aria-hidden="true" />
                {siteContent.email}
              </a>

              <p className="mt-10 text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                Follow
              </p>
              <SocialLinks links={siteContent.social} className="mt-3 flex-col items-start gap-3" />
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
