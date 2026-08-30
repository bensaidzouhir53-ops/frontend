import { DEFAULT_META_PIXEL_ID } from '@/lib/meta-pixel'

interface MetaPixelHeadScriptsProps {
  pixelId?: string | null
}

/**
 * Official Meta Pixel bootstrap as a raw inline <script> in <head>.
 * Marks ready only after fbevents.js loads so funnel events are not lost.
 */
export default function MetaPixelHeadScripts({
  pixelId = DEFAULT_META_PIXEL_ID,
}: MetaPixelHeadScriptsProps) {
  const id = (pixelId ?? DEFAULT_META_PIXEL_ID).trim()
  if (!/^\d+$/.test(id)) return null

  const bootstrap = `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;t.onload=function(){window.__nasamaMetaReady=true;window.__nasamaSyncMetaReady?.();};
s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${id}');
fbq('track','PageView');
window.__nasamaPageViewTracked=true;
window.__nasamaInitializedPixelIds=['${id}'];
`.trim()

  return (
    <>
      <script id="nasama-meta-pixel" dangerouslySetInnerHTML={{ __html: bootstrap }} />
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
