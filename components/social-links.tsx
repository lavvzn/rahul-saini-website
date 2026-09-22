import { cn } from '@/lib/utils'

export const defaultSocialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/rahulsainiofficial/' },
  { label: 'Twitter', href: 'https://twitter.com/rahulsaini' },
  { label: 'Facebook', href: 'https://www.facebook.com/rahulsainiofficial' },
  { label: 'Goodreads', href: 'https://www.goodreads.com/author/show/1502476.Rahul_Saini' },
]

export function SocialLinks({
  links = defaultSocialLinks,
  className,
}: {
  links?: { label: string; href: string }[]
  className?: string
}) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-6 gap-y-2', className)}>
      {links.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
