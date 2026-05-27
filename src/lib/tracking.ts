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
let _ttqReady = false
let _snapReady = false

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

export function generateEventId(): string {
  return crypto.randomUUID()
}

export function captureAttribution(): AttributionData {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)

  const getCookie = (name: string): string | undefined => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
    return match ? decodeURIComponent(match[2]) : undefined
  }

  return {
    fbclid: params.get('fbclid') ?? undefined,
    ttclid: params.get('ttclid') ?? undefined,
    sc_click_id: params.get('sc_click_id') ?? undefined,
    _fbp: getCookie('_fbp'),
    _fbc: getCookie('_fbc'),
    _ttp: getCookie('_ttp'),
    _scid: getCookie('_scid'),
    landing_page: window.location.href,
    utm: {
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

function loadMetaPixel(pixelId: string): void {
  if (_metaReady || !pixelId || typeof window === 'undefined') return
  _metaReady = true

  if (!window.fbq) {
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
    document.head.appendChild(script)
  }

  window.fbq('init', pixelId)
  window.fbq('track', 'PageView')

  _metaQueue.forEach(([action, event, params]) => {
    window.fbq?.(action, event, params)
  })
  _metaQueue.length = 0
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
// Public API: initialise all enabled pixels (deferred)
// ---------------------------------------------------------------------------

export function initPixels(): void {
  if (typeof window === 'undefined') return

  const load = () => {
    if (process.env.NEXT_PUBLIC_ENABLE_PIXELS !== 'true') return

    const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''
    const tiktokId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? ''
    const snapId = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID ?? ''

    if (metaId) loadMetaPixel(metaId)
    if (tiktokId) loadTikTokPixel(tiktokId)
    if (snapId) loadSnapPixel(snapId)
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(load, { timeout: 3000 })
  } else {
    setTimeout(load, 1000)
  }
}

// ---------------------------------------------------------------------------
// Safe track helpers — queue events if pixel not yet loaded
// ---------------------------------------------------------------------------

function safeFbq(action: string, event: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.fbq && _metaReady) {
    window.fbq(action, event, params)
  } else {
    _metaQueue.push([action, event, params])
  }
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
  if (window.location.pathname.startsWith('/admin')) return

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
