'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowUpRight,
  Copy,
  Link2,
  Lock,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  Zap,
} from 'lucide-react'
import { REDIRECT_TARGET_OPTIONS } from '@/lib/redirects.constants'
import { getPublicSiteUrl } from '@/lib/site-url'

type RedirectRecord = {
  id: string
  slug: string
  target_path: string
  created_at: string
  updated_at: string
}

type Credentials = {
  username: string
  password: string
}

const AUTH_KEY = 'nasama_redirect_monster_auth'
const API_BASE = '/api/redirectmonster'
const SITE_URL = getPublicSiteUrl()

function authHeader(credentials: Credentials): string {
  return `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function RedirectMonsterPage() {
  const [credentials, setCredentials] = useState<Credentials | null>(null)
  const [username, setUsername] = useState('monster')
  const [password, setPassword] = useState('')
  const [redirects, setRedirects] = useState<RedirectRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const [slug, setSlug] = useState('')
  const [targetPath, setTargetPath] = useState<string>(REDIRECT_TARGET_OPTIONS[2].path)
  const [customPath, setCustomPath] = useState('')
  const [useCustomPath, setUseCustomPath] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const resolvedTargetPath = useMemo(
    () => (useCustomPath ? customPath.trim() : targetPath),
    [customPath, targetPath, useCustomPath],
  )

  const showToast = useCallback((message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 1800)
  }, [])

  const loadRedirects = useCallback(async (auth: Credentials) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/redirects`, {
        headers: { Authorization: authHeader(auth) },
      })
      if (res.status === 401) {
        window.sessionStorage.removeItem(AUTH_KEY)
        setCredentials(null)
        setError('Invalid password. Try again.')
        return
      }
      if (!res.ok) {
        throw new Error('Failed to load redirects')
      }
      setRedirects((await res.json()) as RedirectRecord[])
    } catch {
      setError('Could not reach the API. Check backend env and URL.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const stored = window.sessionStorage.getItem(AUTH_KEY)
    if (!stored) return
    try {
      const parsed = JSON.parse(stored) as Credentials
      setCredentials(parsed)
    } catch {
      window.sessionStorage.removeItem(AUTH_KEY)
    }
  }, [])

  useEffect(() => {
    if (credentials) void loadRedirects(credentials)
  }, [credentials, loadRedirects])

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextCredentials = { username, password }
    window.sessionStorage.setItem(AUTH_KEY, JSON.stringify(nextCredentials))
    setCredentials(nextCredentials)
  }

  function resetForm() {
    setSlug('')
    setTargetPath(REDIRECT_TARGET_OPTIONS[2].path)
    setCustomPath('')
    setUseCustomPath(false)
    setEditingId(null)
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!credentials) return

    const payload = {
      slug: slug.trim().toLowerCase(),
      target_path: resolvedTargetPath,
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        editingId ? `${API_BASE}/redirects/${editingId}` : `${API_BASE}/redirects`,
        {
          method: editingId ? 'PATCH' : 'POST',
          headers: {
            Authorization: authHeader(credentials),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      )

      const body = (await res.json().catch(() => null)) as { detail?: { message?: string } | string } | null

      if (!res.ok) {
        const message =
          typeof body?.detail === 'string'
            ? body.detail
            : body?.detail?.message || 'Could not save redirect'
        throw new Error(message)
      }

      showToast(editingId ? 'Redirect updated' : 'Redirect created')
      resetForm()
      await loadRedirects(credentials)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save redirect')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!credentials) return
    if (!window.confirm('Delete this redirect?')) return

    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/redirects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: authHeader(credentials) },
      })
      if (!res.ok) throw new Error('Could not delete redirect')
      showToast('Redirect deleted')
      if (editingId === id) resetForm()
      await loadRedirects(credentials)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete redirect')
    } finally {
      setLoading(false)
    }
  }

  function startEdit(record: RedirectRecord) {
    setEditingId(record.id)
    setSlug(record.slug)
    const known = REDIRECT_TARGET_OPTIONS.some((option) => option.path === record.target_path)
    if (known) {
      setUseCustomPath(false)
      setTargetPath(record.target_path)
      setCustomPath('')
    } else {
      setUseCustomPath(true)
      setCustomPath(record.target_path)
    }
  }

  async function copyLink(link: string) {
    try {
      await navigator.clipboard.writeText(link)
      showToast('Copied')
    } catch {
      setError('Could not copy link')
    }
  }

  if (!credentials) {
    return (
      <section className="min-h-screen bg-[#120f1f] px-4 py-16 text-white" dir="ltr">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-500 shadow-lg shadow-violet-500/30">
            <Lock className="h-8 w-8" />
          </div>
          <form
            onSubmit={handleLogin}
            className="w-full rounded-[2rem] border border-white/10 bg-white p-8 text-charcoal shadow-2xl"
          >
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
              Redirect Monster
            </p>
            <h1 className="mb-2 text-3xl font-extrabold">Ad redirect login</h1>
            <p className="mb-6 text-sm text-charcoal/60">
              Manage short ad links at <span className="font-bold">/ads/your-slug</span>
            </p>
            <label className="mb-4 block">
              <span className="mb-2 block text-sm font-bold">Username</span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-2xl border border-sage/40 px-4 py-3 outline-none focus:border-violet-500"
                autoComplete="username"
                required
              />
            </label>
            <label className="mb-6 block">
              <span className="mb-2 block text-sm font-bold">Password</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-sage/40 px-4 py-3 outline-none focus:border-violet-500"
                type="password"
                autoComplete="current-password"
                required
              />
            </label>
            <button className="w-full rounded-2xl bg-violet-600 px-5 py-4 font-extrabold text-white shadow-lg shadow-violet-500/20 hover:bg-violet-700">
              Enter Redirect Monster
            </button>
            <p className="mt-4 text-center text-xs font-bold text-charcoal/40">
              Set REDIRECT_MONSTER_USERNAME & REDIRECT_MONSTER_PASSWORD on the backend.
            </p>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-[#f6f4fb] px-4 py-8 text-charcoal" dir="ltr">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 rounded-[2rem] bg-[#120f1f] p-6 text-white shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">
              Redirect Monster
            </p>
            <h1 className="mt-2 flex items-center gap-3 text-3xl font-extrabold md:text-4xl">
              <Zap className="h-8 w-8 text-violet-400" />
              Ad slug redirects
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/65">
              Create links like <span className="font-bold text-white">{SITE_URL}/ads/monster?utm=1</span>
              {' '}that redirect to any page while keeping all URL parameters.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => credentials && loadRedirects(credentials)}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={() => {
                window.sessionStorage.removeItem(AUTH_KEY)
                setCredentials(null)
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
          <form
            onSubmit={handleSave}
            className="rounded-[2rem] border border-violet-100 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-2">
              {editingId ? <Pencil className="h-5 w-5 text-violet-600" /> : <Plus className="h-5 w-5 text-violet-600" />}
              <h2 className="text-xl font-extrabold">
                {editingId ? 'Edit redirect' : 'New redirect'}
              </h2>
            </div>

            <label className="mb-4 block">
              <span className="mb-2 block text-sm font-bold">Slug</span>
              <div className="flex overflow-hidden rounded-2xl border border-sage/40 focus-within:border-violet-500">
                <span className="bg-mist/60 px-3 py-3 text-sm font-bold text-charcoal/50">/ads/</span>
                <input
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  className="w-full px-3 py-3 outline-none"
                  placeholder="monster"
                  pattern="[A-Za-z0-9-]+"
                  required
                />
              </div>
            </label>

            <div className="mb-4">
              <span className="mb-2 block text-sm font-bold">Destination page</span>
              <div className="space-y-2">
                {REDIRECT_TARGET_OPTIONS.map((option) => (
                  <label
                    key={option.path}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                      !useCustomPath && targetPath === option.path
                        ? 'border-violet-500 bg-violet-50 text-violet-700'
                        : 'border-sage/30 hover:border-violet-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="target"
                      checked={!useCustomPath && targetPath === option.path}
                      onChange={() => {
                        setUseCustomPath(false)
                        setTargetPath(option.path)
                      }}
                      className="accent-violet-600"
                    />
                    <span>{option.label}</span>
                    <span className="mr-auto text-xs text-charcoal/45 ltr">{option.path}</span>
                  </label>
                ))}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                    useCustomPath
                      ? 'border-violet-500 bg-violet-50 text-violet-700'
                      : 'border-sage/30 hover:border-violet-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="target"
                    checked={useCustomPath}
                    onChange={() => setUseCustomPath(true)}
                    className="accent-violet-600"
                  />
                  Custom path
                </label>
                {useCustomPath && (
                  <input
                    value={customPath}
                    onChange={(event) => setCustomPath(event.target.value)}
                    className="w-full rounded-2xl border border-sage/40 px-4 py-3 outline-none focus:border-violet-500 ltr"
                    placeholder="/your-page"
                    required
                  />
                )}
              </div>
            </div>

            {slug.trim() && (
              <div className="mb-5 rounded-2xl bg-mist/50 p-4 text-sm">
                <p className="mb-1 font-bold text-charcoal/70">Preview ad link</p>
                <p className="break-all font-mono text-xs text-violet-700 ltr">
                  {SITE_URL}/ads/{slug.trim().toLowerCase()}?utm_source=facebook
                </p>
                <p className="mt-2 font-bold text-charcoal/70">Redirects to</p>
                <p className="break-all font-mono text-xs text-teal-700 ltr">
                  {SITE_URL}{resolvedTargetPath}?utm_source=facebook
                </p>
              </div>
            )}

            {error && (
              <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-2xl bg-violet-600 px-5 py-3 font-extrabold text-white hover:bg-violet-700 disabled:opacity-60"
              >
                {editingId ? 'Save changes' : 'Create redirect'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-sage/40 px-4 py-3 font-bold hover:bg-mist/60"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="rounded-[2rem] border border-violet-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-extrabold">Active redirects</h2>
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                {redirects.length}
              </span>
            </div>

            {redirects.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-sage/40 bg-mist/30 px-6 py-16 text-center">
                <Link2 className="mx-auto mb-4 h-10 w-10 text-charcoal/30" />
                <p className="font-bold text-charcoal/60">No redirects yet</p>
                <p className="mt-2 text-sm text-charcoal/45">
                  Create your first slug on the left to start sending ad traffic.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {redirects.map((record) => {
                  const adLink = `${SITE_URL}/ads/${record.slug}`
                  return (
                    <div
                      key={record.id}
                      className="rounded-3xl border border-sage/30 p-5 transition-shadow hover:shadow-md"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.15em] text-violet-700">
                              {record.slug}
                            </span>
                            <span className="text-xs font-semibold text-charcoal/45">
                              Updated {formatDate(record.updated_at)}
                            </span>
                          </div>
                          <p className="mb-1 break-all font-mono text-sm text-charcoal ltr">{adLink}</p>
                          <div className="flex items-center gap-2 text-sm text-charcoal/65">
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-teal" />
                            <span className="break-all font-mono ltr">{record.target_path}</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button
                            onClick={() => copyLink(adLink)}
                            className="inline-flex items-center gap-2 rounded-xl border border-sage/40 px-3 py-2 text-sm font-bold hover:bg-mist/60"
                          >
                            <Copy className="h-4 w-4" />
                            Copy
                          </button>
                          <button
                            onClick={() => startEdit(record)}
                            className="inline-flex items-center gap-2 rounded-xl border border-sage/40 px-3 py-2 text-sm font-bold hover:bg-mist/60"
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-charcoal px-5 py-3 text-sm font-bold text-white shadow-xl">
          {toast}
        </div>
      )}
    </section>
  )
}
