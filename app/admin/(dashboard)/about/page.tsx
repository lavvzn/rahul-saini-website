import { getSiteContent } from '@/lib/cms'
import { updateAboutContentAction } from './actions'

export default async function AdminAboutPage() {
  const content = await getSiteContent()

  return (
    <div className="px-8 py-10">
      <div className="mb-8">
        <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">About Page CMS</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage Rahul Saini&apos;s bio, full biography paragraphs, and author portraits.
        </p>
      </div>

      <form action={updateAboutContentAction} encType="multipart/form-data" className="max-w-2xl space-y-6">
        <div>
          <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
            Short Bio (Homepage excerpt)
          </label>
          <textarea
            name="aboutShort"
            rows={3}
            required
            defaultValue={content.aboutShort}
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
            Full Biography (One paragraph per line)
          </label>
          <textarea
            name="aboutLong"
            rows={10}
            required
            defaultValue={content.aboutLong.join('\n')}
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
          />
        </div>

        <div className="border-t border-border pt-6">
          <h2 className="mb-4 font-sans text-lg font-bold text-foreground">Author Portraits</h2>
          
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
                Homepage Hero Portrait
              </label>
              <input type="file" name="portraitHeroFile" accept="image/*" className="block text-sm text-muted-foreground" />
              <input
                type="text"
                name="portraitHeroUrl"
                defaultValue={content.portraitHero}
                placeholder="/images/author-portrait-hero.png"
                className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
                About Page Portrait
              </label>
              <input type="file" name="portraitAboutFile" accept="image/*" className="block text-sm text-muted-foreground" />
              <input
                type="text"
                name="portraitAboutUrl"
                defaultValue={content.portraitAbout}
                placeholder="/images/author-portrait-about.png"
                className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t border-border pt-6">
          <button
            type="submit"
            className="rounded bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Save About Page
          </button>
        </div>
      </form>
    </div>
  )
}
