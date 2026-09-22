'use client'

import { Link2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export function ShareButtons({ title }: { title: string }) {
  const share = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    if (typeof window === 'undefined') return
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(title)
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    }
    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer')
  }

  const copyLink = async () => {
    if (typeof window === 'undefined') return
    await navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard')
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => share('twitter')}>
        X
      </Button>
      <Button variant="outline" size="sm" onClick={() => share('facebook')}>
        Facebook
      </Button>
      <Button variant="outline" size="sm" onClick={() => share('linkedin')}>
        LinkedIn
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="Copy link"
        onClick={copyLink}
      >
        <Link2 aria-hidden="true" />
      </Button>
    </div>
  )
}
