import Link from 'next/link'
import { getSiteContent } from '@/lib/cms'
import { EditorialImage } from '@/components/editorial-image'
import { Button } from '@/components/ui/button'

export async function AuthorSection() {
  const siteContent = await getSiteContent()

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <EditorialImage
        src={siteContent.portraitAbout}
        alt={`Portrait of ${siteContent.authorName}`}
        className="aspect-[4/5] w-full max-w-md mx-auto lg:mx-0"
      />

      <div>
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          About
        </p>
        <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] text-foreground">
          About Rahul
        </h2>
        <p className="mt-6 max-w-md text-base font-normal leading-relaxed text-muted-foreground">
          {siteContent.aboutShort}
        </p>
        <Button
          variant="outline"
          size="lg"
          className="mt-8"
          render={<Link href="/about" />}
          nativeButton={false}
        >
          Read More
        </Button>
      </div>
    </div>
  )
}
