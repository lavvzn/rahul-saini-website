import Image from 'next/image'
import { cn } from '@/lib/utils'

export function EditorialImage({
  src,
  alt,
  className,
  imgClassName,
  priority,
  sizes,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  priority?: boolean
  sizes?: string
}) {
  return (
    <div className={cn('group relative overflow-hidden bg-muted', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? '(min-width: 1024px) 50vw, 100vw'}
        className={cn(
          'object-cover transition-transform duration-700 ease-out group-hover:scale-105',
          imgClassName,
        )}
      />
    </div>
  )
}
