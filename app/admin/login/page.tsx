'use client'

import { useActionState } from 'react'
import { loginAction } from './actions'

type FormState = { error?: string } | null

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prev: FormState, formData: FormData) => {
      try {
        return await loginAction(formData)
      } catch {
        return null
      }
    },
    null,
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Rahul Saini
          </p>
          <h1 className="mt-3 font-sans text-3xl font-bold tracking-tight text-foreground">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your website content.
          </p>
        </div>

        <form action={formAction} className="space-y-5">
          {state?.error && (
            <div className="rounded border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
              placeholder="admin@rahulsaini.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-foreground uppercase"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded bg-foreground px-4 py-2.5 text-sm font-semibold tracking-wide text-background transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {isPending ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Default password:{' '}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">password</code>
          {' '}— change in{' '}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.env.local</code>
        </p>
      </div>
    </div>
  )
}
