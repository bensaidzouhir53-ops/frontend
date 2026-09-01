/**
 * Deferred pixel tracking for Meta, TikTok, and Snapchat.
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
      track?: (
        event: string,
        params?: Record<string, unknown>,
        options?: { event_id?: string },
      ) => void
      push?: (...args: unknown[]) => void
      [key: string]: unknown
    }
    snaptr?: (
      action: string,
      event?: string,
      params?: Record<string, unknown>,
    ) => void
    TiktokAnalyticsObject?: string
    /** Set by PixelScripts' inline bootstrap once it has loaded/init'd ttq — tracking.ts
     *  must not load/init it again or TikTok counts every browser event twice. */
    __nasamaTtqReady?: boolean
    __nasamaTtqInitStarted?: boolean
    __nasamaSyncTtqReady?: () => void
    __nasamaMetaReady?: boolean
    __nasamaSyncMetaReady?: () => void
    __nasamaInitializedPixelIds?: string[]
    __nasamaPageViewTracked?: boolean
    /** Set from layout when backend CAPI handles Meta Purchase — skip browser duplicate. */
    __nasamaCapiEnabled?: boolean
    /** Set from layout when backend TikTok CAPI handles Purchase — skip browser PlaceAnOrder. */
    __nasamaTikTokCapiEnabled?: boolean
  }
}

// ---------------------------------------------------------------------------
// Internal event queues (flushed when each pixel is initialised)
// ---------------------------------------------------------------------------
type FbqEntry = [string, string, Record<string, unknown>?, string?]
type TtqEntry = [string, Record<string, unknown>?, string?, string?]
type SnapEntry = [string, string?, Record<string, unknown>?]

const _metaQueue: FbqEntry[] = []
const _metaSentKeys = new Set<string>()
const _ttqQueue: TtqEntry[] = []
const _ttqSentKeys = new Set<string>()
const _snapQueue: SnapEntry[] = []
let _metaReady = false
let _metaPageViewTracked = false
const _metaInitializedIds = new Set<string>()
let _ttqReady = false
let _snapReady = false
let _capiEnabled = false
let _tiktokCapiEnabled = false

export function setCapiEnabled(enabled: boolean): void {
  _capiEnabled = enabled
  if (typeof window !== 'undefined') {
    window.__nasamaCapiEnabled = enabled
  }
}

export function setTikTokCapiEnabled(enabled: boolean): void {
  _tiktokCapiEnabled = enabled
  if (typeof window !== 'undefined') {
    window.__nasamaTikTokCapiEnabled = enabled
  }
}

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

function metaTrackKey(event: string, eventId?: string): string | null {
  if (event !== 'Purchase' || !eventId) return null
  return `Purchase:${eventId}`
}

function fireFbqTrack(
  event: string,
  params?: Record<string, unknown>,
  eventId?: string,
): boolean {
  if (typeof window === 'undefined' || !window.fbq) return false

  const dedupeKey = metaTrackKey(event, eventId)
  if (dedupeKey) {
    if (_metaSentKeys.has(dedupeKey)) return true
    _metaSentKeys.add(dedupeKey)
  }

  const options = eventId ? { eventID: eventId } : undefined

  // Standard `track` — same as PageView bootstrap; most reliable in Ads Manager.
  if (options) {
    window.fbq('track', event, params, options)
  } else {
    window.fbq('track', event, params)
  }
  return true
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
  _metaQueue.forEach(([action, event, params, eventId]) => {
    if (action === 'track') {
      fireFbqTrack(event, params, eventId)
    } else {
      window.fbq?.(action, event, params)
    }
  })
  _metaQueue.length = 0
}

/** Sync with PixelScripts when it inits fbq before tracking.ts sets _metaReady. */
export function syncMetaReadyState(): void {
  if (typeof window === 'undefined' || !window.fbq) return
  if (!window.fbq.callMethod) return
    if (!_metaReady) {
    _metaReady = true
    window.__nasamaMetaReady = true
    if (window.__nasamaPageViewTracked) _metaPageViewTracked = true
    registerMetaPixelIds(getMetaPixelRegistry())
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

function loadTikTokPixel(_pixelId: string): void {
  // TikTokHeadScripts in layout <head> owns a single ttq.load()/events.js — never init here.
  syncTtqReadyState()
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
  capi_enabled: boolean
  tiktok_capi_enabled: boolean
}

function collectMetaIdsFromEnv(): string[] {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID
  return isValidPixelId(id) ? [id.trim()] : []
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
    capi_enabled: false,
    tiktok_capi_enabled: false,
  }
}

function parsePixelConfigResponse(data: {
  enabled?: boolean
  meta_pixel_id?: string | null
  meta_pixel_ids?: string[] | null
  tiktok_pixel_id?: string | null
  snap_pixel_id?: string | null
  capi_enabled?: boolean
  tiktok_capi_enabled?: boolean
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
    capi_enabled: Boolean(data.capi_enabled),
    tiktok_capi_enabled: Boolean(data.tiktok_capi_enabled),
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
  setCapiEnabled(Boolean(config.capi_enabled))
  setTikTokCapiEnabled(Boolean(config.tiktok_capi_enabled))

  const metaIds =
    config.meta_pixel_ids.length > 0
      ? config.meta_pixel_ids.filter((id) => isValidPixelId(id))
      : isValidPixelId(config.meta_pixel_id)
        ? [config.meta_pixel_id.trim()]
        : []
  if (metaIds.length > 0 && !window.__nasamaPageViewTracked) {
    loadMetaPixels(metaIds)
  } else if (metaIds.length > 0) {
    registerMetaPixelIds(metaIds)
    syncMetaReadyState()
  }

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
  capi_enabled?: boolean
  tiktok_capi_enabled?: boolean
}

/** Called from layout — pixels may already be injected via PixelScripts. */
export function initPixelsFromServerConfig(config: ServerPixelConfigInput): void {
  if (typeof window === 'undefined') return

  setCapiEnabled(Boolean(config.capi_enabled))
  setTikTokCapiEnabled(Boolean(config.tiktok_capi_enabled))

  const metaIds =
    config.meta_pixel_ids && config.meta_pixel_ids.length > 0
      ? config.meta_pixel_ids.filter((id) => isValidPixelId(id))
      : isValidPixelId(config.meta_pixel_id)
        ? [config.meta_pixel_id.trim()]
        : []

  if (!config.enabled && metaIds.length === 0) return
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
    capi_enabled: Boolean(config.capi_enabled),
    tiktok_capi_enabled: Boolean(config.tiktok_capi_enabled),
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

function metaEventParams(props: TrackingProps): Record<string, unknown> {
  const contentIds = props.content_ids ?? []
  return {
    value: props.value,
    currency: props.currency ?? 'SAR',
    content_ids: contentIds,
    content_type: props.content_type ?? 'product',
    contents: contentIds.map((id) => ({ id, quantity: 1 })),
    order_id: props.order_id,
  }
}

function isMetaPixelReady(): boolean {
  if (typeof window === 'undefined' || !window.fbq) return false
  // Require fbevents.js — stub-only fbq can drop trackSingle/track before the library loads.
  return Boolean(window.fbq.callMethod)
}

function safeFbq(
  action: string,
  event: string,
  params?: Record<string, unknown>,
  eventId?: string,
): void {
  syncMetaReadyState()
  const dispatch = (): boolean => {
    if (!isMetaPixelReady()) return false
    if (action === 'track') {
      return fireFbqTrack(event, params, eventId)
    }
    window.fbq!(action, event, params)
    return true
  }

  if (dispatch()) return

  _metaQueue.push([action, event, params, eventId])
  // Retry after pixel script loads (head bootstrap + fbevents.js).
  if (typeof window !== 'undefined') {
    let attempts = 0
    const retry = window.setInterval(() => {
      attempts += 1
      syncMetaReadyState()
      if (dispatch()) {
        const idx = _metaQueue.findIndex(
          ([a, e, , id]) => a === action && e === event && id === eventId,
        )
        if (idx >= 0) _metaQueue.splice(idx, 1)
        window.clearInterval(retry)
      } else if (attempts >= 100) {
        window.clearInterval(retry)
      }
    }, 200)
  }
}

function ttqTrackKey(
  event: string,
  eventId?: string,
  orderId?: string,
): string | null {
  if (event === 'PlaceAnOrder' && orderId) {
    return `PlaceAnOrder:order:${orderId}`
  }
  if (eventId) return `${event}:${eventId}`
  return null
}

function hasTikTokDedupeKey(dedupeKey: string): boolean {
  if (_ttqSentKeys.has(dedupeKey)) return true
  if (typeof window === 'undefined') return false
  try {
    return Boolean(sessionStorage.getItem(`nasama_tiktok_${dedupeKey}`))
  } catch {
    return false
  }
}

function markTikTokDedupeKey(dedupeKey: string): void {
  _ttqSentKeys.add(dedupeKey)
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(`nasama_tiktok_${dedupeKey}`, '1')
  } catch {
    // ignore storage failures
  }
}

function fireTtqTrack(
  event: string,
  params?: Record<string, unknown>,
  eventId?: string,
  orderId?: string,
): void {
  const dedupeKey = ttqTrackKey(event, eventId, orderId)
  if (dedupeKey) {
    if (hasTikTokDedupeKey(dedupeKey)) return
    markTikTokDedupeKey(dedupeKey)
  }

  if (eventId) {
    window.ttq?.track?.(event, params, { event_id: eventId })
  } else {
    window.ttq?.track?.(event, params)
  }
}

/** Sync with TikTokHeadScripts once events.js has loaded. */
export function syncTtqReadyState(): void {
  if (typeof window === 'undefined') return
  if (_ttqReady) return
  if (!window.__nasamaTtqReady) return

  _ttqReady = true
  flushTtqQueue()
}

function flushTtqQueue(): void {
  if (_ttqQueue.length === 0) return
  const pending = _ttqQueue.splice(0, _ttqQueue.length)
  pending.forEach(([event, params, eventId, orderId]) => {
    fireTtqTrack(event, params, eventId, orderId)
  })
}

let _ttqRetryTimer: number | null = null

function scheduleTtqRetry(): void {
  if (typeof window === 'undefined' || _ttqRetryTimer !== null) return
  let attempts = 0
  _ttqRetryTimer = window.setInterval(() => {
    attempts += 1
    syncTtqReadyState()
    if (isTikTokPixelReady()) {
      flushTtqQueue()
    }
    if (_ttqQueue.length === 0 || attempts >= 100) {
      if (_ttqRetryTimer !== null) {
        window.clearInterval(_ttqRetryTimer)
        _ttqRetryTimer = null
      }
    }
  }, 200)
}

if (typeof window !== 'undefined') {
  window.__nasamaSyncTtqReady = syncTtqReadyState
}

function isTikTokPixelReady(): boolean {
  return typeof window !== 'undefined' && Boolean(window.__nasamaTtqReady && window.ttq?.track)
}

function safeTtq(
  event: string,
  params?: Record<string, unknown>,
  eventId?: string,
  orderId?: string,
): void {
  const dedupeKey = ttqTrackKey(event, eventId, orderId)
  if (dedupeKey && hasTikTokDedupeKey(dedupeKey)) return

  syncTtqReadyState()

  if (isTikTokPixelReady()) {
    fireTtqTrack(event, params, eventId, orderId)
    return
  }

  if (
    dedupeKey &&
    _ttqQueue.some(([queuedEvent, , queuedEventId, queuedOrderId]) => {
      return ttqTrackKey(queuedEvent, queuedEventId, queuedOrderId) === dedupeKey
    })
  ) {
    return
  }

  _ttqQueue.push([event, params, eventId, orderId])
  scheduleTtqRetry()
}

/** TikTok funnel events — each action counts exactly once in Ads Manager. */
function trackTikTokFunnel(
  event: 'AddToCart' | 'InitiateCheckout',
  params: Record<string, unknown>,
  dedupeId: string,
): void {
  if (!dedupeId) return
  safeTtq(event, params, dedupeId)
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
  // Head bootstrap already sent Meta PageView — avoid duplicate on hydration.
  if (
    typeof window === 'undefined' ||
    (!window.__nasamaPageViewTracked && !_metaPageViewTracked)
  ) {
    safeFbq('track', 'PageView')
    _metaPageViewTracked = true
    if (typeof window !== 'undefined') window.__nasamaPageViewTracked = true
  } else {
    _metaPageViewTracked = true
    syncMetaReadyState()
  }
  // ttq.page() in TikTokHeadScripts already sent the page view — skip duplicate ViewContent.
  safeSnaptr('track', 'PAGE_VIEW')
}

export function trackViewContent(props: TrackingProps): void {
  const {
    value,
    currency = 'SAR',
    content_ids = [],
    content_type = 'product',
  } = props

  safeFbq('track', 'ViewContent', metaEventParams(props))
  safeTtq('ViewContent', {
    value,
    currency,
    content_id: content_ids[0],
    content_type,
  })
  safeSnaptr('track', 'VIEW_CONTENT', { price: value, currency })
  trackFirstParty('ViewContent', props)
}

export const CHECKOUT_IC_FIRED_SUFFIX = '_tiktok_ic_fired'

export function checkoutInitiateCheckoutFiredKey(sessionKey: string): string {
  return `${sessionKey}${CHECKOUT_IC_FIRED_SUFFIX}`
}

export function trackAddToCart(props: TrackingProps): void {
  const {
    value,
    currency = 'SAR',
    content_ids = [],
    content_type = 'product',
  } = props
  const event_id = props.event_id ?? generateEventId()

  // Same event_id is sent to the backend below, which forwards to Meta CAPI —
  // sharing it here lets Meta dedupe the browser + server events into one.
  safeFbq('track', 'AddToCart', metaEventParams({ ...props, event_id }), event_id)
  trackTikTokFunnel(
    'AddToCart',
    {
      value,
      currency,
      content_id: content_ids[0],
      content_type,
    },
    event_id,
  )
  safeSnaptr('track', 'ADD_CART', { price: value, currency })
  trackFirstParty('AddToCart', { ...props, event_id })
}

/** Fire InitiateCheckout once per checkout session (modal open). */
export function trackInitiateCheckoutOnce(
  props: TrackingProps & { session_key?: string },
): boolean {
  if (typeof window === 'undefined') return false

  const event_id = props.event_id ?? generateEventId()
  const sessionKey =
    props.session_key ??
    `nasama_checkout_${(props.content_ids ?? []).join('-')}`
  const firedKey = checkoutInitiateCheckoutFiredKey(sessionKey)

  try {
    if (sessionStorage.getItem(firedKey)) return false
    sessionStorage.setItem(firedKey, '1')
  } catch {
    return false
  }

  trackInitiateCheckout({ ...props, event_id })
  return true
}

export function trackInitiateCheckout(props: TrackingProps): void {
  const { value, currency = 'SAR', content_ids = [], event_id } = props
  const dedupeId = event_id ?? generateEventId()

  // Same event_id is sent to the backend below, which forwards to Meta CAPI —
  // sharing it here lets Meta dedupe the browser + server events into one.
  safeFbq(
    'track',
    'InitiateCheckout',
    metaEventParams({ ...props, event_id: dedupeId }),
    dedupeId,
  )
  trackTikTokFunnel(
    'InitiateCheckout',
    { value, currency, content_id: content_ids[0] },
    dedupeId,
  )
  safeSnaptr('track', 'START_CHECKOUT', { price: value, currency })
  trackFirstParty('InitiateCheckout', { ...props, event_id: dedupeId })
}

export function trackPurchase(props: TrackingProps): void {
  const { event_id } = props

  // Always fire browser Purchase — CAPI dedupes via shared event_id when present.
  safeFbq('track', 'Purchase', metaEventParams(props), event_id)

  trackPurchaseSideEffects(props)
}

/** TikTok, Snap, and first-party order analytics (no Meta fbq Purchase). */
export function trackPurchaseSideEffects(props: TrackingProps): void {
  const { value, currency = 'SAR', order_id } = props

  // TikTok Purchase is server-only (backend CAPI PlaceAnOrder on order create).
  safeSnaptr('track', 'PURCHASE', {
    price: value,
    currency,
    transaction_id: order_id,
  })
  trackFirstParty('OrderCompleted', props)
}

/** Fire Purchase once per order (prevents duplicate pixel events on retries/upsell). */
export function trackPurchaseOnce(
  props: TrackingProps & { order_id: string },
): boolean {
  if (typeof window === 'undefined') return false
  const key = `nasama_purchase_fired_${props.order_id}`
  try {
    if (sessionStorage.getItem(key) || localStorage.getItem(key)) return false
    sessionStorage.setItem(key, props.event_id ?? '1')
    localStorage.setItem(key, props.event_id ?? '1')
  } catch {
    return false
  }
  trackPurchase(props)
  return true
}
