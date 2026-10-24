import {
  DEFAULT_META_PIXEL_ID,
  EXTRA_META_PIXEL_ID,
  filterMetaPixelIds,
  getDefaultMetaPixelIds,
} from '@/lib/meta-pixel'

interface MetaPixelHeadScriptsProps {
  pixelId?: string | null
  pixelIds?: string[] | null
}

/**
 * Official Meta Pixel bootstrap as a raw inline <script> in <head>.
 * Primary pixel keeps fbq('track'). Extra pixel is inited and fired with trackSingle.
 */
export default function MetaPixelHeadScripts({
  pixelId,
  pixelIds,
}: MetaPixelHeadScriptsProps) {
  const resolved = filterMetaPixelIds(
    pixelIds?.length ? pixelIds : [pixelId ?? DEFAULT_META_PIXEL_ID, EXTRA_META_PIXEL_ID],
  )
  const ids = resolved.length > 0 ? resolved : getDefaultMetaPixelIds()
  if (ids.length === 0) return null

  const primary = ids[0]
  const extras = ids.slice(1)
  const extraInit = extras
    .map(
      (id) =>
        `fbq('init','${id}');\nfbq('trackSingle','${id}','PageView');`,
    )
    .join('\n')
  const registry = ids.map((id) => `'${id}'`).join(',')

  const bootstrap = `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;t.onload=function(){window.__nasamaMetaReady=true;window.__nasamaSyncMetaReady?.();};
s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${primary}');
fbq('track','PageView');
${extraInit}
window.__nasamaPageViewTracked=true;
window.__nasamaInitializedPixelIds=[${registry}];
`.trim()

  return (
    <>
      <script id="nasama-meta-pixel" dangerouslySetInnerHTML={{ __html: bootstrap }} />
      <noscript>
        {ids.map((id) => (
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
