/**
 * Deferred pixel tracking for Meta, TikTok, and Snapchat.
 * Pixels are loaded after initial render using requestIdleCallback (or setTimeout fallback).
 * Track functions are safe to call before pixels have loaded — events are queued and flushed on init.
 */

export interface AttributionData {
  fbclid?: string
  ttclid?: string
  sc_click_id?: string
  _fbp?: string
  _fbc?: string
  _ttp?: string
  _scid?: string
  landing_page?: string
  utm?: {
    source: string
    medium: string
    campaign: string
    content: string
    term: string
  }
}

export interface TrackingProps {
  value?: number
  currency?: string
  content_ids?: string[]
  content_type?: string
  event_id?: string
  order_id?: string
}

// ---------------------------------------------------------------------------
// Window type augmentation — type-safe access to pixel globals
// ---------------------------------------------------------------------------
declare global {
  interface Window {
    fbq?: {
      (...args: unknown[]): void
      callMethod?: (...args: unknown[]) => void
      queue?: unknown[]
      loaded?: boolean
      version?: string
      push?: (...args: unknown[]) => void
    }
    _fbq?: Window['fbq']
    ttq?: {
      load?: (id: string) => void
      page?: () => void
      track?: (event: string, params?: Record<string, unknown>) => void
      push?: (...args: unknown[]) => void
      [key: string]: unknown
    }
    snaptr?: (
      action: string,
      event?: string,
      params?: Record<string, unknown>,
    ) => void
    TiktokAnalyticsObject?: string
    __nasamaMetaReady?: boolean
    __nasamaSyncMetaReady?: () => void
    __nasamaInitializedPixelIds?: string[]
    __nasamaPageViewTracked?: boolean
  }
}

// ---------------------------------------------------------------------------
// Internal event queues (flushed when each pixel is initialised)
// ---------------------------------------------------------------------------
type FbqEntry = [string, string, Record<string, unknown>?]
type TtqEntry = [string, Record<string, unknown>?]
type SnapEntry = [string, string?, Record<string, unknown>?]

const _metaQueue: FbqEntry[] = []
const _ttqQueue: TtqEntry[] = []
const _snapQueue: SnapEntry[] = []

let _metaReady = false
let _metaPageViewTracked = false
const _metaInitializedIds = new Set<string>()
let _ttqReady = false
let _snapReady = false

function getMetaPixelRegistry(): string[] {
  if (typeof window === 'undefined') return []
  if (!window.__nasamaInitializedPixelIds) {
    window.__nasamaInitializedPixelIds = []
  }
  return window.__nasamaInitializedPixelIds
}

/** Called by MetaPixel after init — enables trackSingle routing for all pixels. */
export function registerMetaPixelIds(ids: string[]): void {
  const registry = getMetaPixelRegistry()
  for (const id of ids) {
    if (!registry.includes(id)) registry.push(id)
    _metaInitializedIds.add(id)
  }
  _metaReady = true
  flushMetaQueue()
}

function fireFbqTrack(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !window.fbq) return
  const ids = getMetaPixelRegistry()
  if (ids.length === 0) {
    window.fbq('track', event, params)
    return
  }
  for (const id of ids) {
    window.fbq('trackSingle', id, event, params)
  }
}

function initMetaPixelId(id: string): void {
  const registry = getMetaPixelRegistry()
  if (registry.includes(id) || _metaInitializedIds.has(id)) return
  window.fbq?.('init', id)
  registry.push(id)
  _metaInitializedIds.add(id)
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

export function generateEventId(): string {
  return crypto.randomUUID()
}

const FIRST_LANDING_KEY = 'nasama_first_landing_url'

/** Persist the first page URL (with query params) for the visitor's lifetime. */
export function saveFirstLandingUrl(): void {
  if (typeof window === 'undefined') return
  const path = window.location.pathname
  if (
    path.startsWith('/admin') ||
    path.startsWith('/redirectmonster') ||
    path.startsWith('/ads/')
  ) {
    return
  }

  try {
    if (!localStorage.getItem(FIRST_LANDING_KEY)) {
      localStorage.setItem(FIRST_LANDING_KEY, window.location.href)
    }
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
}

function getFirstLandingUrl(): string | undefined {
  if (typeof window === 'undefined') return undefined

  try {
    return localStorage.getItem(FIRST_LANDING_KEY) ?? undefined
  } catch {
    return undefined
  }
}

function utmFromUrl(url: string): NonNullable<AttributionData['utm']> {
  const empty = { source: '', medium: '', campaign: '', content: '', term: '' }
  try {
    const params = new URL(url).searchParams
    return {
      source: params.get('utm_source') ?? '',
      medium: params.get('utm_medium') ?? '',
      campaign: params.get('utm_campaign') ?? '',
      content: params.get('utm_content') ?? '',
      term: params.get('utm_term') ?? '',
    }
  } catch {
    return empty
  }
}

/** Meta click ID cookie format — required for CAPI match quality. */
export function buildFbcFromFbclid(fbclid: string): string {
  const id = fbclid.trim()
  if (id.startsWith('fb.')) return id
  return `fb.1.${Date.now()}.${id}`
}

function clickIdsFromUrl(url: string): Pick<
  AttributionData,
  'fbclid' | 'ttclid' | 'sc_click_id'
> {
  try {
    const params = new URL(url).searchParams
    return {
      fbclid: params.get('fbclid') ?? undefined,
      ttclid: params.get('ttclid') ?? undefined,
      sc_click_id: params.get('sc_click_id') ?? undefined,
    }
  } catch {
    return {}
  }
}

export function captureAttribution(): AttributionData {
  if (typeof window === 'undefined') return {}

  saveFirstLandingUrl()

  const firstLanding = getFirstLandingUrl()
  const attributionUrl = firstLanding ?? window.location.href
  const params = new URL(firstLanding ?? window.location.href).searchParams

  const getCookie = (name: string): string | undefined => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
    return match ? decodeURIComponent(match[2]) : undefined
  }

  const clickIds = firstLanding
    ? clickIdsFromUrl(firstLanding)
    : {
        fbclid: params.get('fbclid') ?? undefined,
        ttclid: params.get('ttclid') ?? undefined,
        sc_click_id: params.get('sc_click_id') ?? undefined,
      }

  let fbc = getCookie('_fbc')
  if (!fbc && clickIds.fbclid) {
    fbc = buildFbcFromFbclid(clickIds.fbclid)
    try {
      document.cookie = `_fbc=${encodeURIComponent(fbc)}; path=/; max-age=7776000; SameSite=Lax`
    } catch {
      // ignore cookie write failures
    }
  }

  return {
    ...clickIds,
    _fbp: getCookie('_fbp'),
    _fbc: fbc,
    _ttp: getCookie('_ttp'),
    _scid: getCookie('_scid'),
    landing_page: attributionUrl,
    utm: firstLanding
      ? utmFromUrl(firstLanding)
      : {
          source: params.get('utm_source') ?? '',
          medium: params.get('utm_medium') ?? '',
          campaign: params.get('utm_campaign') ?? '',
          content: params.get('utm_content') ?? '',
          term: params.get('utm_term') ?? '',
        },
  }
}

// ---------------------------------------------------------------------------
// Pixel loaders
// ---------------------------------------------------------------------------

function isValidPixelId(value: string | null | undefined): value is string {
  if (!value) return false
  const id = value.trim()
  if (!id) return false
  const lower = id.toLowerCase()
  if (lower === 'your_id' || lower === 'your_token' || lower.startsWith('your_')) {
    return false
  }
  return /^[A-Za-z0-9_-]+$/.test(id)
}

function flushMetaQueue(): void {
  _metaQueue.forEach(([action, event, params]) => {
    if (action === 'track') {
      fireFbqTrack(event, params)
    } else {
      window.fbq?.(action, event, params)
    }
  })
  _metaQueue.length = 0
}

/** Sync with PixelScripts when it inits fbq before tracking.ts sets _metaReady. */
export function syncMetaReadyState(): void {
  if (typeof window === 'undefined' || !window.fbq) return
  if (!window.__nasamaMetaReady && !_metaReady) return
  if (!_metaReady) {
    _metaReady = true
    if (window.__nasamaMetaReady) _metaPageViewTracked = true
    flushMetaQueue()
  }
}

if (typeof window !== 'undefined') {
  window.__nasamaSyncMetaReady = syncMetaReadyState
}

function ensureMetaPixelScript(onReady: () => void): void {
  if (typeof window === 'undefined') return

  if (window.fbq) {
    onReady()
    return
  }

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args)
    } else {
      fbq.queue!.push(args)
    }
  } as NonNullable<Window['fbq']>

  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  window.fbq = fbq
  window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  script.onload = onReady
  document.head.appendChild(script)
}

function loadMetaPixels(pixelIds: string[]): void {
  const ids = pixelIds.filter((id) => isValidPixelId(id))
  if (!ids.length || typeof window === 'undefined') return

  const initAll = () => {
    for (const id of ids) {
      initMetaPixelId(id)
    }
    if (!_metaPageViewTracked && !window.__nasamaMetaReady && !window.__nasamaPageViewTracked) {
      window.fbq?.('track', 'PageView')
      _metaPageViewTracked = true
    } else if (window.__nasamaMetaReady || window.__nasamaPageViewTracked) {
      _metaPageViewTracked = true
    }
    _metaReady = true
    flushMetaQueue()
  }

  if (window.fbq) {
    initAll()
    return
  }

  ensureMetaPixelScript(initAll)
}

function loadMetaPixel(pixelId: string): void {
  loadMetaPixels([pixelId])
}

function loadTikTokPixel(pixelId: string): void {
  if (_ttqReady || !pixelId || typeof window === 'undefined') return
  _ttqReady = true

  window.TiktokAnalyticsObject = 'ttq'

  if (!window.ttq) {
    const queue: unknown[][] = []
    const ttq: NonNullable<Window['ttq']> = {
      push: (...args: unknown[]) => queue.push(args),
    }

    const methods = [
      'page',
      'track',
      'identify',
      'instances',
      'debug',
      'on',
      'off',
      'once',
      'ready',
      'alias',
      'group',
      'enableCookie',
      'disableCookie',
    ]

    methods.forEach((method) => {
      ttq[method] = (...args: unknown[]) => queue.push([method, ...args])
    })

    window.ttq = ttq
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${pixelId}&lib=ttq`
  document.head.appendChild(script)

  window.ttq.load?.(pixelId)
  window.ttq.page?.()

  _ttqQueue.forEach(([event, params]) => {
    window.ttq?.track?.(event, params)
  })
  _ttqQueue.length = 0
}

function loadSnapPixel(pixelId: string): void {
  if (_snapReady || !pixelId || typeof window === 'undefined') return
  _snapReady = true

  if (!window.snaptr) {
    const snapQueue: unknown[][] = []

    window.snaptr = function (
      action: string,
      event?: string,
      params?: Record<string, unknown>,
    ) {
      snapQueue.push([action, event, params])
    }

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://sc-static.net/scevent.min.js'
    document.head.appendChild(script)
  }

  window.snaptr('init', pixelId)
  window.snaptr('track', 'PAGE_VIEW')

  _snapQueue.forEach(([action, event, params]) => {
    window.snaptr?.(action, event, params)
  })
  _snapQueue.length = 0
}

// ---------------------------------------------------------------------------
// Pixel config — backend env (Easypanel) with optional NEXT_PUBLIC fallback
// ---------------------------------------------------------------------------

interface PixelConfig {
  enabled: boolean
  meta_pixel_id: string
  meta_pixel_ids: string[]
  tiktok_pixel_id: string
  snap_pixel_id: string
}

function collectMetaIdsFromEnv(): string[] {
  const ids: string[] = []
  const add = (value: string | undefined) => {
    if (isValidPixelId(value)) {
      const trimmed = value.trim()
      if (!ids.includes(trimmed)) ids.push(trimmed)
    }
  }
  add(process.env.NEXT_PUBLIC_META_PIXEL_ID)
  add(process.env.NEXT_PUBLIC_META_PIXEL_ID_2)
  add(process.env.NEXT_PUBLIC_META_PIXEL_ID_3)
  add(process.env.NEXT_PUBLIC_META_PIXEL_ID_4)
  return ids
}

function configFromEnv(): PixelConfig | null {
  if (process.env.NEXT_PUBLIC_ENABLE_PIXELS !== 'true') return null

  const metaIds = collectMetaIdsFromEnv()
  const tiktok = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID?.trim() ?? ''
  const snap = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID?.trim() ?? ''
  if (!metaIds.length && !tiktok && !snap) return null

  return {
    enabled: true,
    meta_pixel_id: metaIds[0] ?? '',
    meta_pixel_ids: metaIds,
    tiktok_pixel_id: tiktok,
    snap_pixel_id: snap,
  }
}

function parsePixelConfigResponse(data: {
  enabled?: boolean
  meta_pixel_id?: string | null
  meta_pixel_ids?: string[] | null
  tiktok_pixel_id?: string | null
  snap_pixel_id?: string | null
}): PixelConfig | null {
  if (!data.enabled) return null

  const metaIds: string[] = []
  const addMeta = (value: string | null | undefined) => {
    if (isValidPixelId(value)) {
      const trimmed = value.trim()
      if (!metaIds.includes(trimmed)) metaIds.push(trimmed)
    }
  }
  addMeta(data.meta_pixel_id)
  for (const id of data.meta_pixel_ids ?? []) addMeta(id)

  const tiktok = isValidPixelId(data.tiktok_pixel_id) ? data.tiktok_pixel_id!.trim() : ''
  const snap = isValidPixelId(data.snap_pixel_id) ? data.snap_pixel_id!.trim() : ''
  if (!metaIds.length && !tiktok && !snap) return null

  return {
    enabled: true,
    meta_pixel_id: metaIds[0] ?? '',
    meta_pixel_ids: metaIds,
    tiktok_pixel_id: tiktok,
    snap_pixel_id: snap,
  }
}

async function fetchFromUrl(url: string): Promise<PixelConfig | null> {
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return null
  return parsePixelConfigResponse(
    (await res.json()) as Parameters<typeof parsePixelConfigResponse>[0],
  )
}

async function fetchPixelConfig(): Promise<PixelConfig | null> {
  const urls = ['/api/tracking/config']
  const apiBase = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, '')
  if (apiBase) {
    urls.push(`${apiBase}/api/tracking/config`)
  }

  for (const url of urls) {
    try {
      const config = await fetchFromUrl(url)
      if (config) return config
    } catch {
      // try next source
    }
  }
  return null
}

function applyPixelConfig(config: PixelConfig): void {
  const tiktok = config.tiktok_pixel_id?.trim()
  const snap = config.snap_pixel_id?.trim()
  if (tiktok) loadTikTokPixel(tiktok)
  if (snap) loadSnapPixel(snap)
  syncMetaReadyState()
}

export interface ServerPixelConfigInput {
  enabled: boolean
  meta_pixel_id: string | null
  meta_pixel_ids?: string[]
  tiktok_pixel_id: string | null
  snap_pixel_id: string | null
}

/** Called from layout — pixels may already be injected via PixelScripts. */
export function initPixelsFromServerConfig(config: ServerPixelConfigInput): void {
  if (typeof window === 'undefined' || !config.enabled) return

  const metaIds =
    config.meta_pixel_ids && config.meta_pixel_ids.length > 0
      ? config.meta_pixel_ids.filter((id) => isValidPixelId(id))
      : isValidPixelId(config.meta_pixel_id)
        ? [config.meta_pixel_id.trim()]
        : []
  const tiktok = isValidPixelId(config.tiktok_pixel_id)
    ? config.tiktok_pixel_id.trim()
    : null
  const snap = isValidPixelId(config.snap_pixel_id) ? config.snap_pixel_id.trim() : null

  applyPixelConfig({
    enabled: true,
    meta_pixel_id: metaIds[0] ?? '',
    meta_pixel_ids: metaIds,
    tiktok_pixel_id: tiktok ?? '',
    snap_pixel_id: snap ?? '',
  })
}

// ---------------------------------------------------------------------------
// Public API: initialise all enabled pixels (deferred)
// ---------------------------------------------------------------------------

export async function initPixels(): Promise<void> {
  if (typeof window === 'undefined') return

  const load = async () => {
    const config = (await fetchPixelConfig()) ?? configFromEnv()
    if (!config?.enabled) return
    applyPixelConfig(config)
  }

  const schedule =
    typeof window !== 'undefined' && 'requestIdleCallback' in window
      ? (fn: () => void) => window.requestIdleCallback(fn, { timeout: 3000 })
      : (fn: () => void) => setTimeout(fn, 1000)

  schedule(() => {
    void load()
  })
}

// ---------------------------------------------------------------------------
// Safe track helpers — queue events if pixel not yet loaded
// ---------------------------------------------------------------------------

function safeFbq(action: string, event: string, params?: Record<string, unknown>): void {
  syncMetaReadyState()
  if (typeof window !== 'undefined' && window.fbq) {
    if (action === 'track') {
      fireFbqTrack(event, params)
    } else {
      window.fbq(action, event, params)
    }
    return
  }
  _metaQueue.push([action, event, params])
}

function safeTtq(event: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.ttq?.track && _ttqReady) {
    window.ttq.track(event, params)
  } else {
    _ttqQueue.push([event, params])
  }
}

function safeSnaptr(
  action: string,
  event?: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window !== 'undefined' && window.snaptr && _snapReady) {
    window.snaptr(action, event, params)
  } else {
    _snapQueue.push([action, event, params])
  }
}

function randomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function getStoredId(storage: Storage, key: string): string {
  const existing = storage.getItem(key)
  if (existing) return existing
  const value = randomId()
  storage.setItem(key, value)
  return value
}

function trackFirstParty(eventName: string, props: TrackingProps = {}): void {
  if (typeof window === 'undefined') return
  const path = window.location.pathname
  if (
    path.startsWith('/admin') ||
    path.startsWith('/redirectmonster') ||
    path.startsWith('/ads/')
  ) {
    return
  }

  try {
    const attribution = captureAttribution()
    const payload = {
      event_name: eventName,
      event_id: props.event_id,
      visitor_id: getStoredId(window.localStorage, 'nasama_visitor_id'),
      session_id: getStoredId(window.sessionStorage, 'nasama_session_id'),
      page_url: window.location.href,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      value: props.value,
      currency: props.currency ?? 'SAR',
      content_ids: props.content_ids ?? [],
      metadata: {
        content_type: props.content_type ?? 'product',
        order_id: props.order_id,
      },
      utm: attribution.utm ?? {},
      click_ids: {
        fbclid: attribution.fbclid ?? '',
        ttclid: attribution.ttclid ?? '',
        sc_click_id: attribution.sc_click_id ?? '',
      },
      cookies: {
        _fbp: attribution._fbp ?? '',
        _fbc: attribution._fbc ?? '',
        _ttp: attribution._ttp ?? '',
        _scid: attribution._scid ?? '',
      },
    }
    const body = JSON.stringify(payload)

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' })
      navigator.sendBeacon('/api/tracking/events', blob)
      return
    }

    void fetch('/api/tracking/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    })
  } catch (error) {
    console.warn('[tracking] First-party event failed:', error)
  }
}

// ---------------------------------------------------------------------------
// Public track events
// ---------------------------------------------------------------------------

export function trackFirstPartyPageView(): void {
  trackFirstParty('PageView')
}

export function trackPageView(): void {
  trackFirstParty('PageView')
  safeFbq('track', 'PageView')
  safeTtq('ViewContent')
  safeSnaptr('track', 'PAGE_VIEW')
}

export function trackViewContent(props: TrackingProps): void {
  const {
    value,
    currency = 'SAR',
    content_ids = [],
    content_type = 'product',
    event_id,
  } = props

  safeFbq('track', 'ViewContent', {
    value,
    currency,
    content_ids,
    content_type,
    eventID: event_id,
  })
  safeTtq('ViewContent', {
    value,
    currency,
    content_id: content_ids[0],
    content_type,
  })
  safeSnaptr('track', 'VIEW_CONTENT', { price: value, currency })
  trackFirstParty('ViewContent', props)
}

export function trackAddToCart(props: TrackingProps): void {
  const {
    value,
    currency = 'SAR',
    content_ids = [],
    content_type = 'product',
    event_id,
  } = props

  safeFbq('track', 'AddToCart', {
    value,
    currency,
    content_ids,
    content_type,
    eventID: event_id,
  })
  safeTtq('AddToCart', {
    value,
    currency,
    content_id: content_ids[0],
    content_type,
  })
  safeSnaptr('track', 'ADD_CART', { price: value, currency })
  trackFirstParty('AddToCart', props)
}

export function trackInitiateCheckout(props: TrackingProps): void {
  const { value, currency = 'SAR', content_ids = [], event_id } = props

  safeFbq('track', 'InitiateCheckout', {
    value,
    currency,
    content_ids,
    eventID: event_id,
  })
  safeTtq('InitiateCheckout', { value, currency, content_id: content_ids[0] })
  safeSnaptr('track', 'START_CHECKOUT', { price: value, currency })
  trackFirstParty('InitiateCheckout', props)
}

export function trackPurchase(props: TrackingProps): void {
  const {
    value,
    currency = 'SAR',
    content_ids = [],
    content_type = 'product',
    event_id,
    order_id,
  } = props

  safeFbq('track', 'Purchase', {
    value,
    currency,
    content_ids,
    content_type,
    eventID: event_id,
    order_id,
  })
  safeTtq('PlaceAnOrder', {
    value,
    currency,
    content_id: content_ids[0],
    content_type,
    order_id,
  })
  safeSnaptr('track', 'PURCHASE', {
    price: value,
    currency,
    transaction_id: order_id,
  })
  trackFirstParty('Purchase', props)
}
