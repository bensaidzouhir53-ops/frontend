import Script from 'next/script'
import { DEFAULT_META_PIXEL_ID } from '@/lib/meta-pixel'

interface MetaPixelHeadScriptsProps {
  pixelId?: string | null
}

/** Meta pixel — always loads via static /meta-pixel.js (before React/hydration). */
export default function MetaPixelHeadScripts({
  pixelId = DEFAULT_META_PIXEL_ID,
}: MetaPixelHeadScriptsProps) {
  const id = (pixelId ?? DEFAULT_META_PIXEL_ID).trim()
  if (!/^\d+$/.test(id)) return null

  return (
    <>
      <Script
        id="nasama-meta-pixel"
        src="/meta-pixel.js"
        strategy="beforeInteractive"
        data-pixel-id={id}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
