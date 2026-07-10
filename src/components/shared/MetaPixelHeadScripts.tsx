import Script from 'next/script'

const FB_LOADER = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');`

interface MetaPixelHeadScriptsProps {
  enabled: boolean
  pixelIds: string[]
}

function buildMetaBootstrap(pixelIds: string[]): string {
  const safeIds = pixelIds.filter((id) => /^\d+$/.test(id))
  if (!safeIds.length) return ''

  const init = safeIds.map((id) => `fbq('init','${id}');`).join('')
  const pageView = safeIds.map((id) => `fbq('trackSingle','${id}','PageView');`).join('')
  return `${FB_LOADER}${init}${pageView}`
}

/** Standard Meta pixel in <head> — Meta Pixel Helper detects this immediately. */
export default function MetaPixelHeadScripts({
  enabled,
  pixelIds,
}: MetaPixelHeadScriptsProps) {
  if (!enabled || pixelIds.length === 0) return null

  const bootstrap = buildMetaBootstrap(pixelIds)
  if (!bootstrap) return null

  const safeIds = pixelIds.filter((id) => /^\d+$/.test(id))

  return (
    <>
      <Script id="nasama-meta-fbevents" strategy="afterInteractive">
        {bootstrap}
      </Script>
      <noscript>
        {safeIds.map((id) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={id}
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
            alt=""
          />
        ))}
      </noscript>
    </>
  )
}
