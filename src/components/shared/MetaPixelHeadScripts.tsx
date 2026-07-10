import Script from 'next/script'
import { DEFAULT_META_PIXEL_ID } from '@/lib/meta-pixel'

interface MetaPixelHeadScriptsProps {
  pixelId?: string | null
}

/**
 * Official Meta Pixel bootstrap inlined in <head> via beforeInteractive.
 * Avoids /meta-pixel.js + document.currentScript (unreliable with Next Script loader).
 */
export default function MetaPixelHeadScripts({
  pixelId = DEFAULT_META_PIXEL_ID,
}: MetaPixelHeadScriptsProps) {
  const id = (pixelId ?? DEFAULT_META_PIXEL_ID).trim()
  if (!/^\d+$/.test(id)) return null

  return (
    <>
      <Script id="nasama-meta-pixel" strategy="beforeInteractive">{`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${id}');
fbq('track','PageView');
window.__nasamaPageViewTracked=true;
window.__nasamaMetaReady=true;
window.__nasamaInitializedPixelIds=['${id}'];
      `}</Script>
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
