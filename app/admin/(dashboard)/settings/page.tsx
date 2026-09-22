import { getSiteContent } from '@/lib/cms'
import { updateSiteSettingsAction } from './actions'

export default async function AdminSettingsPage() {
  const content = await getSiteContent()

  return (
    <div className="px-8 py-10">
      <div className="mb-8">
        <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">Site Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage general website settings, SEO metadata, contact info, and social media links.
        </p>
      </div>

      <form action={updateSiteSettingsAction} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
              Author Name
            </label>
            <input
              type="text"
              name="authorName"
              required
              defaultValue={content.authorName}
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
              Role / Subtitle
            </label>
            <input
              type="text"
              name="role"
              required
              defaultValue={content.role}
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
            Website Tagline
          </label>
          <input
            type="text"
            name="tagline"
            required
            defaultValue={content.tagline}
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
            Contact Email
          </label>
          <input
            type="email"
            name="email"
            required
            defaultValue={content.email}
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
          />
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <h2 className="font-sans text-lg font-bold text-foreground">SEO &amp; Metadata</h2>

          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
              Default Page Title
            </label>
            <input
              type="text"
              name="metaTitle"
              defaultValue={content.metaTitle}
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
              Default Meta Description
            </label>
            <textarea
              name="metaDescription"
              rows={3}
              defaultValue={content.metaDescription}
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
            />
          </div>
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <h2 className="font-sans text-lg font-bold text-foreground">Social Links</h2>
          {content.social.map((s, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="socialLabel"
                defaultValue={s.label}
                placeholder="Platform name (e.g. Instagram)"
                className="rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
              />
              <input
                type="text"
                name="socialHref"
                defaultValue={s.href}
                placeholder="https://..."
                className="rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6">
          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
              Footer Copyright Text
            </label>
            <input
              type="text"
              name="footerText"
              defaultValue={content.footerText}
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3 border-t border-border pt-6">
          <button
            type="submit"
            className="rounded bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Save Site Settings
          </button>
        </div>
      </form>
    </div>
  )
}
