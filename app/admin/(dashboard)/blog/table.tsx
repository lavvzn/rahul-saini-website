'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import type { BlogPost } from '@/lib/cms'
import { deleteBlogPostAction, toggleBlogPublishedAction } from './actions'

export function AdminBlogTable({ posts: initialPosts }: { posts: BlogPost[] }) {
  const [posts, setPosts] = useState(initialPosts)

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    await deleteBlogPostAction(id)
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  const handleToggle = async (id: string) => {
    await toggleBlogPublishedAction(id)
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p)),
    )
  }

  return (
    <div className="overflow-hidden rounded border border-border">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-secondary/40">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Image</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Title</th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase md:table-cell">Category</th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:table-cell">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">Status</th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide text-muted-foreground uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/20">
              <td className="px-4 py-3">
                <div className="relative h-10 w-16 overflow-hidden rounded border border-border">
                  {post.image ? (
                    <Image src={post.image} alt={post.title} fill className="object-cover" sizes="64px" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-[10px]">No img</div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <p className="font-semibold text-foreground">{post.title}</p>
                {post.featured && (
                  <span className="mt-0.5 inline-block rounded bg-accent/20 px-1.5 py-0.5 text-xs font-semibold text-accent">
                    Featured
                  </span>
                )}
              </td>
              <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{post.category}</td>
              <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{post.date}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleToggle(post.id)}
                  className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold transition-colors ${
                    post.published
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-muted text-muted-foreground hover:bg-border'
                  }`}
                >
                  {post.published ? (
                    <><Eye className="size-3" /> Published</>
                  ) : (
                    <><EyeOff className="size-3" /> Draft</>
                  )}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="flex items-center gap-1 rounded border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary/60"
                  >
                    <Pencil className="size-3" aria-hidden="true" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="flex items-center gap-1 rounded border border-destructive/30 px-2.5 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <Trash2 className="size-3" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-sm text-muted-foreground">
                No blog posts yet.{' '}
                <Link href="/admin/blog/new" className="font-medium text-foreground hover:underline">
                  Write your first post
                </Link>
                .
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
