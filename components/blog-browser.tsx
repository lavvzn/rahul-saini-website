'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import type { BlogPost } from '@/lib/data'
import { BlogGrid } from '@/components/blog-grid'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function BlogBrowser({
  posts,
  categories,
}: {
  posts: BlogPost[]
  categories: string[]
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category ? post.category === category : true
      const matchesQuery = query
        ? post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase())
        : true
      return matchesCategory && matchesQuery
    })
  }, [posts, query, category])

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={category === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategory(null)}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <InputGroup className="w-full sm:w-64">
          <InputGroupInput
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search blog posts"
          />
          <InputGroupAddon>
            <Search aria-hidden="true" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="mt-12">
        {filtered.length > 0 ? (
          <BlogGrid posts={filtered} />
        ) : (
          <p className={cn('py-16 text-center text-sm text-muted-foreground')}>
            No articles match your search.
          </p>
        )}
      </div>
    </div>
  )
}
