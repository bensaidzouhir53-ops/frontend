'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import {
  BarChart3,
  Bell,
  BellOff,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  Eye,
  LogOut,
  Lock,
  MessageCircle,
  Package,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Truck,
  Users,
  Volume2,
  X,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  playOrderNotificationSound,
  unlockOrderNotificationSound,
} from '@/lib/orderNotificationSound'

type MetricSummary = {
  revenue: number
  realised_revenue: number
  orders: number
  delivered: number
  confirmed: number
  cancelled: number
  clicks: number
  ad_clicks: number
  view_content: number
  add_to_cart: number
  checkout: number
  conversion_rate: number
  checkout_conversion_rate: number
  delivery_rate: number
  cancel_rate: number
  average_order_value: number
  upsell_rate: number
}

type DailyMetric = {
  date: string
  clicks: number
  ad_clicks: number
  view_content: number
  add_to_cart: number
  checkout: number
  orders: number
  revenue: number
}

type HourlyMetric = {
  hour: number
  clicks: number
  orders: number
  revenue: number
}

type SourceMetric = { source: string; orders: number; revenue: number; clicks: number }
type CampaignMetric = { campaign: string; orders: number; revenue: number; clicks: number }
type ProductMetric = {
  product_slug: string
  quantity: number
  orders: number
  revenue: number
}

type OrderSummary = {
  id: string
  order_number: string
  customer_name: string
  phone: string
  phone_e164: string
  status: string
  subtotal: number
  upsell_total: number
  total: number
  currency: string
  payment_method: string
  items_count: number
  has_upsell: boolean
  has_notes: boolean
  landing_page?: string
  utm: Record<string, string>
  click_ids: Record<string, string>
  created_at: string
}

type OrderDetail = OrderSummary & {
  items: { product_slug: string; quantity: number; price?: number }[]
  upsell_item?: { product_slug: string; quantity: number; price: number } | null
  cookies: Record<string, string>
  event_id?: string
  client_ip?: string
  user_agent?: string
  sheet_sent_at?: string | null
  sheet_response?: unknown
  admin_notes: string
  cancel_reason: string
  confirmed_at?: string | null
  shipped_at?: string | null
  delivered_at?: string | null
  updated_at: string
}

type MetricsResponse = {
  range: { from: string; to: string }
  summary: MetricSummary
  funnel: { name: string; value: number }[]
  daily: DailyMetric[]
  hourly: HourlyMetric[]
  sources: SourceMetric[]
  campaigns: CampaignMetric[]
  top_products: ProductMetric[]
  status_counts: Record<string, number>
  recent_orders: OrderSummary[]
}

type OrdersResponse = {
  orders: OrderSummary[]
  has_more: boolean
  total: number
  limit: number
  offset: number
}

const statusOptions = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned']
const statusIcons: Record<string, LucideIcon> = {
  pending: Clock,
  confirmed: CheckCircle2,
  shipped: Truck,
  delivered: ShieldCheck,
  cancelled: XCircle,
  returned: XCircle,
}

function formatSar(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SAR',
    maximumFractionDigits: 0,
  }).format(value || 0)
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value || 0)
}

function formatPercent(value: number): string {
  return `${(value || 0).toFixed(1)}%`
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function daysAgoIso(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString().slice(0, 10)
}

function apiBase(): string {
  return (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '')
}

function authHeader(username: string, password: string): string {
  return `Basic ${btoa(`${username}:${password}`)}`
}

function whatsappLink(phoneE164: string, orderNumber: string): string {
  const cleaned = phoneE164.replace(/[^\d]/g, '')
  const text = encodeURIComponent(
    `مرحبا، نتواصل معك من نسمة بخصوص طلبك رقم ${orderNumber}. هل تأكيد الطلب والعنوان؟`,
  )
  return `https://wa.me/${cleaned}?text=${text}`
}

export default function AdminDashboardPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [credentials, setCredentials] = useState<{ username: string; password: string } | null>(
    null,
  )
  const [fromDate, setFromDate] = useState(daysAgoIso(29))
  const [toDate, setToDate] = useState(todayIso())
  const [activeTab, setActiveTab] = useState<'overview' | 'orders'>('overview')
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null)
  const [orders, setOrders] = useState<OrderSummary[]>([])
  const [ordersTotal, setOrdersTotal] = useState(0)
  const [ordersHasMore, setOrdersHasMore] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [newOrderAlert, setNewOrderAlert] = useState<OrderSummary | null>(null)
  const [lastOrderCheck, setLastOrderCheck] = useState<Date | null>(null)
  const knownOrderIdsRef = useRef(new Set<string>())
  const orderPollingReadyRef = useRef(false)

  const auth = useMemo(() => {
    if (!credentials) return null
    return authHeader(credentials.username, credentials.password)
  }, [credentials])

  const adminFetch = useCallback(
    async <T,>(path: string, init?: RequestInit): Promise<T> => {
      if (!auth) throw new Error('Missing admin login')
      const response = await fetch(`${apiBase()}${path}`, {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
          ...(init?.headers || {}),
        },
        cache: 'no-store',
      })
      const body = await response.json().catch(() => ({}))
      if (!response.ok) {
        const message =
          typeof body?.detail?.message === 'string'
            ? body.detail.message
            : 'Admin request failed'
        throw new Error(message)
      }
      return body as T
    },
    [auth],
  )

  const loadDashboard = useCallback(
    async (nextOffset = 0) => {
      if (!auth) return
      setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams({ from: fromDate, to: toDate })
        const orderParams = new URLSearchParams({
          from: fromDate,
          to: toDate,
          limit: '50',
          offset: String(nextOffset),
        })
        if (statusFilter) orderParams.set('status', statusFilter)
        if (search.trim()) orderParams.set('search', search.trim())

        const [metricsData, ordersData] = await Promise.all([
          adminFetch<MetricsResponse>(`/api/admin/metrics?${params.toString()}`),
          adminFetch<OrdersResponse>(`/api/admin/orders?${orderParams.toString()}`),
        ])
        setMetrics(metricsData)
        setOrdersTotal(ordersData.total)
        setOrders((current) =>
          nextOffset === 0 ? ordersData.orders : [...current, ...ordersData.orders],
        )
        setOrdersHasMore(ordersData.has_more)

        if (nextOffset === 0) {
          for (const order of ordersData.orders) knownOrderIdsRef.current.add(order.id)
          for (const order of metricsData.recent_orders) knownOrderIdsRef.current.add(order.id)
          orderPollingReadyRef.current = true
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load dashboard')
      } finally {
        setLoading(false)
      }
    },
    [adminFetch, auth, fromDate, toDate, statusFilter, search],
  )

  async function loadOrder(orderId: string) {
    setError(null)
    try {
      setSelectedOrder(await adminFetch<OrderDetail>(`/api/admin/orders/${orderId}`))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load order')
    }
  }

  async function patchOrder(orderId: string, body: Record<string, unknown>) {
    try {
      const updated = await adminFetch<OrderDetail>(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
      })
      setSelectedOrder(updated)
      setOrders((current) =>
        current.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: updated.status,
                has_notes: Boolean(updated.admin_notes),
              }
            : order,
        ),
      )
      void loadDashboard(0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update order')
    }
  }

  function exportCsv() {
    if (!credentials) return
    const params = new URLSearchParams({ from: fromDate, to: toDate })
    if (statusFilter) params.set('status', statusFilter)
    if (search.trim()) params.set('search', search.trim())
    const url = `${apiBase()}/api/admin/orders.csv?${params.toString()}`
    fetch(url, { headers: { Authorization: authHeader(credentials.username, credentials.password) } })
      .then(async (res) => {
        if (!res.ok) throw new Error('Export failed')
        const blob = await res.blob()
        const link = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        link.href = objectUrl
        link.download = `nasama-orders-${todayIso()}.csv`
        link.click()
        URL.revokeObjectURL(objectUrl)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Export failed'))
  }

  function logout() {
    window.sessionStorage.removeItem('nasama_admin_auth')
    setCredentials(null)
    setMetrics(null)
    setOrders([])
    setSelectedOrder(null)
    setNewOrderAlert(null)
    knownOrderIdsRef.current.clear()
    orderPollingReadyRef.current = false
  }

  const handleNewOrders = useCallback(
    (incoming: OrderSummary[]) => {
      if (incoming.length === 0) return

      const latest = incoming[0]
      setNewOrderAlert(latest)
      setToast(
        incoming.length === 1
          ? `New order: ${latest.order_number} — ${formatSar(latest.total)}`
          : `${incoming.length} new orders — latest ${latest.order_number}`,
      )
      setTimeout(() => setToast(null), 6000)

      if (soundEnabled) playOrderNotificationSound()
      void loadDashboard(0)
    },
    [loadDashboard, soundEnabled],
  )

  function testOrderSound() {
    unlockOrderNotificationSound()
    playOrderNotificationSound()
    setToast('Test sound played — Shopify cha-ching!')
    setTimeout(() => setToast(null), 2500)
  }

  function toggleSound() {
    setSoundEnabled((current) => {
      const next = !current
      window.localStorage.setItem('nasama_admin_sound', next ? '1' : '0')
      if (next) {
        unlockOrderNotificationSound()
        playOrderNotificationSound()
      }
      return next
    })
  }

  function copyToClipboard(value: string, label: string) {
    if (!navigator.clipboard) return
    void navigator.clipboard.writeText(value).then(() => {
      setToast(`${label} copied`)
      setTimeout(() => setToast(null), 1500)
    })
  }

  useEffect(() => {
    const saved = window.sessionStorage.getItem('nasama_admin_auth')
    if (!saved) return
    try {
      const parsed = JSON.parse(saved) as { username: string; password: string }
      setCredentials(parsed)
    } catch {
      window.sessionStorage.removeItem('nasama_admin_auth')
    }
    setSoundEnabled(window.localStorage.getItem('nasama_admin_sound') !== '0')
  }, [])

  useEffect(() => {
    if (auth) void loadDashboard(0)
  }, [auth, loadDashboard])

  useEffect(() => {
    if (!auth) return

    let cancelled = false

    const pollForNewOrders = async () => {
      if (!orderPollingReadyRef.current) return
      try {
        const params = new URLSearchParams({
          from: todayIso(),
          to: todayIso(),
          limit: '30',
          offset: '0',
        })
        const data = await adminFetch<OrdersResponse>(`/api/admin/orders?${params.toString()}`)
        if (cancelled) return
        setLastOrderCheck(new Date())

        const fresh = data.orders.filter((order) => !knownOrderIdsRef.current.has(order.id))
        for (const order of data.orders) knownOrderIdsRef.current.add(order.id)

        if (fresh.length > 0) handleNewOrders(fresh)
      } catch {
        // Silent background poll — ignore transient network errors.
      }
    }

    const intervalId = window.setInterval(() => {
      void pollForNewOrders()
    }, 10000)

    void pollForNewOrders()

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [auth, adminFetch, handleNewOrders])

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    unlockOrderNotificationSound()
    const nextCredentials = { username, password }
    window.sessionStorage.setItem('nasama_admin_auth', JSON.stringify(nextCredentials))
    setCredentials(nextCredentials)
  }

  const summary = metrics?.summary
  const maxDailyRevenue = Math.max(...(metrics?.daily.map((item) => item.revenue) || [1]), 1)
  const maxFunnel = Math.max(...(metrics?.funnel.map((item) => item.value) || [1]), 1)
  const maxHourlyClicks = Math.max(...(metrics?.hourly.map((item) => item.clicks) || [1]), 1)
  const maxHourlyOrders = Math.max(...(metrics?.hourly.map((item) => item.orders) || [1]), 1)

  if (!credentials) {
    return (
      <section className="min-h-screen bg-charcoal px-4 py-16 text-white" dir="ltr">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-teal shadow-lg shadow-teal/30">
            <Lock className="h-8 w-8" />
          </div>
          <form
            onSubmit={handleLogin}
            className="w-full rounded-[2rem] border border-white/10 bg-white p-8 text-charcoal shadow-2xl"
          >
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-teal">
              Nasama Admin
            </p>
            <h1 className="mb-6 text-3xl font-extrabold">Dashboard login</h1>
            <label className="mb-4 block">
              <span className="mb-2 block text-sm font-bold">Username</span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-2xl border border-sage/40 px-4 py-3 outline-none focus:border-teal"
                autoComplete="username"
                required
              />
            </label>
            <label className="mb-6 block">
              <span className="mb-2 block text-sm font-bold">Password</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-sage/40 px-4 py-3 outline-none focus:border-teal"
                type="password"
                autoComplete="current-password"
                required
              />
            </label>
            <button className="w-full rounded-2xl bg-teal px-5 py-4 font-extrabold text-white shadow-lg shadow-teal/20 hover:bg-teal-dark">
              Open dashboard
            </button>
            <p className="mt-4 text-center text-xs font-bold text-charcoal/40">
              Configure ADMIN_USERNAME & ADMIN_PASSWORD on the API backend.
            </p>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-[#f4f7f5] px-4 py-8 text-charcoal" dir="ltr">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 rounded-[2rem] bg-charcoal p-6 text-white shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-sage">
              Nasama command center
            </p>
            <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Admin dashboard</h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
              <ShieldCheck className="h-4 w-4 text-sage" />
              Metrics count only valid KSA traffic (MaxMind + secondary VPN check).
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="text-sm font-bold">
              From
              <input
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
                className="mt-1 block rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white [color-scheme:dark]"
              />
            </label>
            <label className="text-sm font-bold">
              To
              <input
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
                className="mt-1 block rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white [color-scheme:dark]"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ['Today', 0],
                  ['7d', 6],
                  ['30d', 29],
                  ['90d', 89],
                ] as const
              ).map(([label, days]) => (
                <button
                  key={label}
                  onClick={() => {
                    setFromDate(daysAgoIso(days))
                    setToDate(todayIso())
                  }}
                  className="rounded-xl bg-white/10 px-3 py-2 text-xs font-bold hover:bg-white/20"
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => void loadDashboard(0)}
              className="flex items-center gap-2 rounded-xl bg-teal px-4 py-2.5 font-bold hover:bg-teal-dark disabled:opacity-50"
              disabled={loading}
            >
              <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
              Refresh
            </button>
            <button
              onClick={toggleSound}
              className={cn(
                'flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold',
                soundEnabled
                  ? 'bg-gold/20 text-gold hover:bg-gold/30'
                  : 'bg-white/10 text-white/60 hover:bg-white/20',
              )}
              title={soundEnabled ? 'Order sound on — click to mute' : 'Order sound off — click to enable'}
            >
              {soundEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
              {soundEnabled ? 'Sound on' : 'Sound off'}
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-bold hover:bg-white/20"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-[1.5rem] border-2 border-teal/30 bg-white p-5 shadow-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="relative mt-1 flex h-4 w-4 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-teal" />
              </span>
              <div>
                <p className="text-lg font-extrabold text-charcoal">Order notifications</p>
                <p className="mt-1 text-sm font-bold text-charcoal/60">
                  {soundEnabled
                    ? 'Active — Shopify-style cha-ching when a new order arrives.'
                    : 'Muted — turn sound on to hear new orders.'}
                </p>
                <p className="mt-1 text-xs font-bold text-charcoal/40">
                  {lastOrderCheck
                    ? `Last checked ${lastOrderCheck.toLocaleTimeString('en-GB')}`
                    : 'Checking for new orders…'}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={testOrderSound}
                className="flex items-center gap-2 rounded-xl bg-teal px-4 py-2.5 text-sm font-extrabold text-white hover:bg-teal-dark"
              >
                <Volume2 className="h-4 w-4" />
                Test sound
              </button>
              <button
                onClick={toggleSound}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold',
                  soundEnabled
                    ? 'bg-gold/15 text-gold-dark hover:bg-gold/25'
                    : 'bg-mist text-charcoal/70 hover:bg-sage/20',
                )}
              >
                {soundEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                {soundEnabled ? 'Sound on' : 'Sound off'}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-700">
            <span>{error}</span>
            <button onClick={() => setError(null)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {newOrderAlert && (
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-gold/40 bg-gradient-to-r from-gold/15 to-teal/10 px-5 py-4 shadow-lg sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold/20 text-gold-dark">
                <Volume2 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-gold-dark">
                  New order received
                </p>
                <p className="mt-1 text-lg font-extrabold text-charcoal">
                  {newOrderAlert.order_number} · {newOrderAlert.customer_name}
                </p>
                <p className="text-sm font-bold text-charcoal/60">
                  {formatSar(newOrderAlert.total)} · {newOrderAlert.phone}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => void loadOrder(newOrderAlert.id)}
                className="rounded-xl bg-teal px-4 py-2.5 text-sm font-extrabold text-white hover:bg-teal-dark"
              >
                View order
              </button>
              <button
                onClick={() => setNewOrderAlert(null)}
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-extrabold text-charcoal hover:bg-mist"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="mb-6 flex gap-2">
          {(['overview', 'orders'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'rounded-2xl px-5 py-3 font-extrabold capitalize',
                activeTab === tab
                  ? 'bg-teal text-white shadow-lg shadow-teal/20'
                  : 'bg-white text-charcoal/70',
              )}
            >
              {tab}
              {tab === 'orders' && ordersTotal > 0 && (
                <span className="ms-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                  {formatNumber(ordersTotal)}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && summary && metrics && (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <KpiCard
                icon={TrendingUp}
                label="Revenue (all)"
                value={formatSar(summary.revenue)}
                hint={`Delivered: ${formatSar(summary.realised_revenue)}`}
              />
              <KpiCard
                icon={ShoppingBag}
                label="Orders"
                value={formatNumber(summary.orders)}
                hint={`Delivered ${summary.delivered} / Cancelled ${summary.cancelled}`}
              />
              <KpiCard
                icon={Users}
                label="Valid clicks (KSA)"
                value={formatNumber(summary.clicks)}
                hint={`Ad clicks: ${formatNumber(summary.ad_clicks)}`}
              />
              <KpiCard
                icon={BarChart3}
                label="Conversion rate"
                value={formatPercent(summary.conversion_rate)}
                hint={`Checkout CVR: ${formatPercent(summary.checkout_conversion_rate)}`}
              />
              <KpiCard
                icon={Package}
                label="AOV"
                value={formatSar(summary.average_order_value)}
              />
              <KpiCard
                icon={ShieldCheck}
                label="Delivery rate"
                value={formatPercent(summary.delivery_rate)}
                tone="positive"
              />
              <KpiCard
                icon={XCircle}
                label="Cancel / return rate"
                value={formatPercent(summary.cancel_rate)}
                tone="negative"
              />
              <KpiCard
                icon={Sparkles}
                label="Upsell take rate"
                value={formatPercent(summary.upsell_rate)}
              />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <Panel title="Revenue by day">
                <div className="space-y-3">
                  {metrics.daily.length === 0 && <EmptyState />}
                  {metrics.daily.map((item) => (
                    <div key={item.date}>
                      <div className="mb-1 flex justify-between text-sm font-bold">
                        <span>{item.date}</span>
                        <span>
                          {formatSar(item.revenue)} · {item.orders} orders · {item.clicks} clicks
                        </span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-mist">
                        <div
                          className="h-full rounded-full bg-teal"
                          style={{
                            width: `${Math.max((item.revenue / maxDailyRevenue) * 100, 4)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Funnel">
                <div className="space-y-4">
                  {metrics.funnel.map((item, index) => {
                    const previous = index > 0 ? metrics.funnel[index - 1].value : item.value
                    const drop =
                      previous > 0 ? Math.round((1 - item.value / previous) * 100) : 0
                    return (
                      <div key={item.name}>
                        <div className="mb-1 flex justify-between text-sm font-bold">
                          <span>{item.name}</span>
                          <span>
                            {formatNumber(item.value)}
                            {index > 0 && drop > 0 && (
                              <span className="ms-2 text-xs font-bold text-charcoal/40">
                                -{drop}%
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="h-4 overflow-hidden rounded-full bg-mist">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-teal to-gold"
                            style={{
                              width: `${Math.max((item.value / maxFunnel) * 100, 3)}%`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Panel>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
              <Panel title="Hourly activity (UTC)">
                <div className="flex h-48 items-end gap-1">
                  {metrics.hourly.map((item) => (
                    <div key={item.hour} className="flex flex-1 flex-col items-center gap-1">
                      <div className="flex h-40 w-full items-end justify-center gap-0.5">
                        <div
                          className="w-2 rounded-t bg-teal"
                          style={{
                            height: `${(item.clicks / maxHourlyClicks) * 100}%`,
                          }}
                          title={`${item.clicks} clicks`}
                        />
                        <div
                          className="w-2 rounded-t bg-gold"
                          style={{
                            height: `${(item.orders / maxHourlyOrders) * 100}%`,
                          }}
                          title={`${item.orders} orders`}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-charcoal/40">
                        {item.hour.toString().padStart(2, '0')}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-4 text-xs font-bold">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded bg-teal" /> Clicks
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded bg-gold" /> Orders
                  </span>
                </div>
              </Panel>

              <Panel title="Order statuses">
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(metrics.status_counts).map(([statusName, count]) => {
                    const Icon = statusIcons[statusName] || Clock
                    return (
                      <div
                        key={statusName}
                        className="flex items-center justify-between gap-3 rounded-2xl bg-mist/70 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-teal">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="font-extrabold capitalize">{statusName}</span>
                        </div>
                        <span className="text-xl font-extrabold">{count}</span>
                      </div>
                    )
                  })}
                  {Object.keys(metrics.status_counts).length === 0 && <EmptyState />}
                </div>
              </Panel>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <Panel title="Traffic sources">
                <MetricList
                  items={metrics.sources}
                  render={(item) => (
                    <>
                      <span className="font-extrabold">{item.source}</span>
                      <span className="text-right text-xs font-bold text-charcoal/70">
                        {formatSar(item.revenue)} · {item.orders} ord · {item.clicks} clicks
                      </span>
                    </>
                  )}
                />
              </Panel>
              <Panel title="Campaigns">
                <MetricList
                  items={metrics.campaigns}
                  render={(item) => (
                    <>
                      <span className="font-extrabold">{item.campaign}</span>
                      <span className="text-right text-xs font-bold text-charcoal/70">
                        {formatSar(item.revenue)} · {item.orders} ord
                      </span>
                    </>
                  )}
                />
              </Panel>
              <Panel title="Top products">
                <MetricList
                  items={metrics.top_products}
                  render={(item) => (
                    <>
                      <span className="font-extrabold">{item.product_slug}</span>
                      <span className="text-right text-xs font-bold text-charcoal/70">
                        {item.quantity} units · {item.orders} ord
                      </span>
                    </>
                  )}
                />
              </Panel>
            </div>

            {metrics.recent_orders.length > 0 && (
              <div className="mt-6">
                <Panel title="Recent orders">
                  <div className="space-y-2">
                    {metrics.recent_orders.map((order) => (
                      <button
                        key={order.id}
                        onClick={() => void loadOrder(order.id)}
                        className="flex w-full items-center justify-between gap-3 rounded-2xl bg-mist/60 px-4 py-3 text-left hover:bg-mist"
                      >
                        <div>
                          <p className="font-extrabold">{order.order_number}</p>
                          <p className="text-xs text-charcoal/60">
                            {order.customer_name} · {order.phone}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusPill status={order.status} />
                          <span className="font-extrabold">{formatSar(order.total)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </Panel>
              </div>
            )}
          </>
        )}

        {activeTab === 'orders' && (
          <Panel title="Orders">
            <div className="mb-5 flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') void loadDashboard(0)
                  }}
                  placeholder="Search order #, customer, or phone"
                  className="w-full rounded-2xl border border-sage/30 py-3 pl-10 pr-4 outline-none focus:border-teal"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-2xl border border-sage/30 px-4 py-3 outline-none focus:border-teal"
              >
                <option value="">All statuses</option>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                onClick={() => void loadDashboard(0)}
                className="rounded-2xl bg-charcoal px-5 py-3 font-extrabold text-white"
              >
                Apply
              </button>
              <button
                onClick={exportCsv}
                className="flex items-center gap-2 rounded-2xl border border-teal bg-white px-5 py-3 font-extrabold text-teal hover:bg-teal/5"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-sage/20">
              <div className="min-w-[860px]">
                <div className="grid grid-cols-[1.1fr_1.2fr_0.9fr_0.8fr_0.9fr_0.6fr] bg-mist px-4 py-3 text-sm font-extrabold text-charcoal/70">
                  <span>Order</span>
                  <span>Customer</span>
                  <span>Status</span>
                  <span>Total</span>
                  <span>Date</span>
                  <span></span>
                </div>
                {orders.length === 0 && (
                  <p className="px-4 py-8 text-center font-bold text-charcoal/40">
                    No orders match this filter.
                  </p>
                )}
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-[1.1fr_1.2fr_0.9fr_0.8fr_0.9fr_0.6fr] items-center border-t border-sage/20 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-extrabold">{order.order_number}</p>
                      <p className="text-xs text-charcoal/50">
                        {order.items_count} items
                        {order.has_upsell && (
                          <span className="ms-2 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-extrabold text-gold-dark">
                            UPSELL
                          </span>
                        )}
                        {order.has_notes && (
                          <span className="ms-1 rounded-full bg-teal/15 px-2 py-0.5 text-[10px] font-extrabold text-teal">
                            NOTE
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">{order.customer_name}</p>
                      <p className="text-xs text-charcoal/50">{order.phone}</p>
                    </div>
                    <StatusPill status={order.status} />
                    <span className="font-extrabold">{formatSar(order.total)}</span>
                    <span className="text-xs text-charcoal/60">
                      {new Date(order.created_at).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <button
                      onClick={() => void loadOrder(order.id)}
                      className="flex w-fit items-center gap-1 rounded-xl bg-teal/10 px-3 py-2 font-bold text-teal hover:bg-teal hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {ordersHasMore && (
              <button
                onClick={() => void loadDashboard(orders.length)}
                className="mt-5 rounded-2xl bg-mist px-5 py-3 font-extrabold text-charcoal"
              >
                Load more
              </button>
            )}
            <p className="mt-3 text-xs font-bold text-charcoal/40">
              Showing {orders.length} of {formatNumber(ordersTotal)} orders in range.
            </p>
          </Panel>
        )}
      </div>

      {selectedOrder && (
        <OrderPreview
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onPatch={(body) => patchOrder(selectedOrder.id, body)}
          onCopy={copyToClipboard}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-2xl bg-charcoal px-5 py-3 text-sm font-bold text-white shadow-2xl">
          {toast}
        </div>
      )}
    </section>
  )
}

function KpiCard({
  icon: Icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: LucideIcon
  label: string
  value: string
  hint?: string
  tone?: 'positive' | 'negative'
}) {
  const toneClasses =
    tone === 'positive'
      ? 'bg-green-100 text-green-700'
      : tone === 'negative'
        ? 'bg-red-100 text-red-700'
        : 'bg-teal/10 text-teal'
  return (
    <div className="rounded-[1.5rem] border border-sage/20 bg-white p-5 shadow-card">
      <div className={cn('mb-4 flex h-11 w-11 items-center justify-center rounded-2xl', toneClasses)}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-bold text-charcoal/50">{label}</p>
      <p className="mt-1 text-3xl font-extrabold">{value}</p>
      {hint && <p className="mt-1 text-xs font-bold text-charcoal/40">{hint}</p>}
    </div>
  )
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-sage/20 bg-white p-5 shadow-card">
      <h2 className="mb-4 text-xl font-extrabold">{title}</h2>
      {children}
    </div>
  )
}

function EmptyState() {
  return <p className="rounded-2xl bg-mist p-4 text-sm font-bold text-charcoal/50">No data yet.</p>
}

function MetricList<T>({ items, render }: { items: T[]; render: (item: T) => ReactNode }) {
  if (items.length === 0) return <EmptyState />
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 rounded-2xl bg-mist/60 px-4 py-3 text-sm"
        >
          {render(item)}
        </div>
      ))}
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  const Icon = statusIcons[status] || Clock
  const color =
    status === 'delivered'
      ? 'bg-green-100 text-green-700'
      : status === 'cancelled' || status === 'returned'
        ? 'bg-red-100 text-red-700'
        : status === 'shipped'
          ? 'bg-blue-100 text-blue-700'
          : status === 'confirmed'
            ? 'bg-teal/15 text-teal'
            : 'bg-gold/15 text-gold-dark'
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold capitalize',
        color,
      )}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  )
}

function OrderPreview({
  order,
  onClose,
  onPatch,
  onCopy,
}: {
  order: OrderDetail
  onClose: () => void
  onPatch: (body: Record<string, unknown>) => void
  onCopy: (value: string, label: string) => void
}) {
  const [notes, setNotes] = useState(order.admin_notes)
  const [cancelReason, setCancelReason] = useState(order.cancel_reason)

  useEffect(() => {
    setNotes(order.admin_notes)
    setCancelReason(order.cancel_reason)
  }, [order.id, order.admin_notes, order.cancel_reason])

  const itemsTotal = order.items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 p-4 backdrop-blur-sm" dir="ltr">
      <div className="mx-auto max-h-[95vh] max-w-5xl overflow-y-auto rounded-[2rem] bg-[#f6faf8] shadow-2xl">
        <div className="sticky top-0 z-10 flex flex-col gap-3 border-b border-sage/20 bg-white p-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal">
              Order preview
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-extrabold">{order.order_number}</h2>
              <StatusPill status={order.status} />
              {order.has_upsell && (
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-extrabold text-gold-dark">
                  UPSELL ACCEPTED
                </span>
              )}
            </div>
            <p className="mt-1 text-xs font-bold text-charcoal/50">
              Created {new Date(order.created_at).toLocaleString('en-GB')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`tel:${order.phone_e164}`}
              className="flex items-center gap-2 rounded-2xl bg-teal px-4 py-2.5 font-extrabold text-white shadow-lg shadow-teal/20 hover:bg-teal-dark"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              href={whatsappLink(order.phone_e164, order.order_number)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-2xl bg-[#25D366] px-4 py-2.5 font-extrabold text-white hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-mist text-charcoal hover:bg-sage/30"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid gap-5 p-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="space-y-5">
            <Panel title="Customer">
              <div className="grid gap-3 text-sm md:grid-cols-2">
                <Info label="Name" value={order.customer_name} />
                <CopyInfo
                  label="Phone (KSA)"
                  value={order.phone}
                  onCopy={() => onCopy(order.phone, 'Phone')}
                />
                <CopyInfo
                  label="Phone E.164"
                  value={order.phone_e164}
                  onCopy={() => onCopy(order.phone_e164, 'Phone E.164')}
                />
                <Info label="Payment" value={order.payment_method} />
                <Info label="Client IP" value={order.client_ip || '-'} />
                <Info label="Updated" value={new Date(order.updated_at).toLocaleString('en-GB')} />
              </div>
            </Panel>

            <Panel title="Items">
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.product_slug}-${index}`}
                    className="flex items-center justify-between rounded-2xl bg-mist px-4 py-3"
                  >
                    <div>
                      <p className="font-extrabold">{item.product_slug}</p>
                      <p className="text-xs text-charcoal/60">Qty {item.quantity}</p>
                    </div>
                    {item.price !== undefined && (
                      <span className="font-extrabold">
                        {formatSar(item.price * item.quantity)}
                      </span>
                    )}
                  </div>
                ))}
                {order.upsell_item && (
                  <div className="flex items-center justify-between rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3">
                    <div>
                      <p className="flex items-center gap-2 font-extrabold text-gold-dark">
                        <Sparkles className="h-4 w-4" />
                        {order.upsell_item.product_slug}
                      </p>
                      <p className="text-xs text-gold-dark/80">
                        Upsell qty {order.upsell_item.quantity}
                      </p>
                    </div>
                    <span className="font-extrabold text-gold-dark">
                      {formatSar(order.upsell_item.price * order.upsell_item.quantity)}
                    </span>
                  </div>
                )}
                {itemsTotal > 0 && (
                  <div className="flex justify-between border-t border-sage/30 pt-3 text-sm font-bold text-charcoal/60">
                    <span>Items subtotal</span>
                    <span>{formatSar(itemsTotal)}</span>
                  </div>
                )}
              </div>
            </Panel>

            <Panel title="Attribution & traffic">
              <div className="grid gap-3 text-sm md:grid-cols-2">
                <Info label="Source" value={order.utm?.source || 'direct'} />
                <Info label="Medium" value={order.utm?.medium || '-'} />
                <Info label="Campaign" value={order.utm?.campaign || '-'} />
                <Info label="Content" value={order.utm?.content || '-'} />
                <Info label="fbclid" value={order.click_ids?.fbclid || '-'} />
                <Info label="ttclid" value={order.click_ids?.ttclid || '-'} />
                <Info
                  label="Landing page"
                  value={order.landing_page || '-'}
                  fullWidth
                />
                <Info label="Event ID" value={order.event_id || '-'} fullWidth />
              </div>
            </Panel>

            <Panel title="Internal notes (visible to admins only)">
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                placeholder="Call notes, address details, delivery instructions..."
                className="w-full rounded-2xl border border-sage/30 px-4 py-3 text-sm outline-none focus:border-teal"
              />
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => onPatch({ admin_notes: notes })}
                  className="rounded-2xl bg-teal px-5 py-2.5 font-extrabold text-white hover:bg-teal-dark"
                >
                  Save note
                </button>
              </div>
            </Panel>
          </div>

          <div className="space-y-5">
            <Panel title="Order status">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {statusOptions.map((option) => {
                    const Icon = statusIcons[option] || Clock
                    const active = order.status === option
                    return (
                      <button
                        key={option}
                        onClick={() => onPatch({ status: option })}
                        className={cn(
                          'flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-extrabold capitalize',
                          active
                            ? 'bg-teal text-white shadow-lg shadow-teal/20'
                            : 'bg-mist text-charcoal/70 hover:bg-mist',
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {option}
                      </button>
                    )
                  })}
                </div>
                {(order.status === 'cancelled' || order.status === 'returned') && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50">
                      Cancel / return reason
                    </label>
                    <input
                      value={cancelReason}
                      onChange={(event) => setCancelReason(event.target.value)}
                      onBlur={() => onPatch({ cancel_reason: cancelReason })}
                      placeholder="Wrong number, refused, no answer..."
                      className="mt-1 w-full rounded-2xl border border-sage/30 px-4 py-2.5 text-sm outline-none focus:border-teal"
                    />
                  </div>
                )}
                <div className="grid gap-2 text-xs font-bold text-charcoal/60">
                  {order.confirmed_at && (
                    <span>Confirmed: {new Date(order.confirmed_at).toLocaleString('en-GB')}</span>
                  )}
                  {order.shipped_at && (
                    <span>Shipped: {new Date(order.shipped_at).toLocaleString('en-GB')}</span>
                  )}
                  {order.delivered_at && (
                    <span>Delivered: {new Date(order.delivered_at).toLocaleString('en-GB')}</span>
                  )}
                </div>
              </div>
            </Panel>

            <Panel title="Payment summary">
              <div className="space-y-2 text-sm">
                <SummaryRow label="Subtotal" value={formatSar(order.subtotal)} />
                {order.upsell_total > 0 && (
                  <SummaryRow label="Upsell" value={formatSar(order.upsell_total)} />
                )}
                <SummaryRow label="Shipping" value="Free" muted />
                <div className="my-2 h-px bg-sage/30" />
                <div className="rounded-2xl bg-charcoal p-4 text-white">
                  <p className="text-sm font-bold text-white/60">Total to collect</p>
                  <p className="text-3xl font-extrabold">{formatSar(order.total)}</p>
                </div>
              </div>
            </Panel>

            <Panel title="Fulfilment">
              <div className="space-y-3 text-sm">
                <Info label="Sheet sent" value={order.sheet_sent_at ? 'Yes' : 'No'} />
                <Info
                  label="Sheet at"
                  value={
                    order.sheet_sent_at
                      ? new Date(order.sheet_sent_at).toLocaleString('en-GB')
                      : '-'
                  }
                />
                <Info label="User agent" value={order.user_agent || '-'} />
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  )
}

function Info({
  label,
  value,
  fullWidth = false,
}: {
  label: string
  value: string
  fullWidth?: boolean
}) {
  return (
    <div className={cn('rounded-2xl bg-white p-3 shadow-sm', fullWidth && 'md:col-span-2')}>
      <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-charcoal/40">
        {label}
      </p>
      <p className="mt-1 break-words font-bold text-charcoal">{value}</p>
    </div>
  )
}

function CopyInfo({
  label,
  value,
  onCopy,
}: {
  label: string
  value: string
  onCopy: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white p-3 shadow-sm">
      <div>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-charcoal/40">
          {label}
        </p>
        <p className="mt-1 break-words font-bold text-charcoal">{value}</p>
      </div>
      <button
        onClick={onCopy}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal/10 text-teal hover:bg-teal hover:text-white"
        title="Copy"
      >
        <Copy className="h-4 w-4" />
      </button>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  muted,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="flex justify-between">
      <span className={cn('font-bold', muted ? 'text-charcoal/40' : 'text-charcoal/70')}>
        {label}
      </span>
      <span className="font-extrabold">{value}</span>
    </div>
  )
}
