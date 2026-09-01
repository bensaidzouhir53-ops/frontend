/* eslint-disable @next/next/no-img-element -- Snap noscript may use raw img */
import Script from 'next/script'
import type { ServerPixelConfig } from '@/lib/pixel-config.server'

interface PixelScriptsProps {
  config: ServerPixelConfig
}

/** Snap base pixel (Meta + TikTok load from head scripts in layout). */
export default function PixelScripts({ config }: PixelScriptsProps) {
  if (!config.enabled) return null

  const { snap_pixel_id: snapId } = config

  return (
    <>
      {snapId ? (
        <Script id="snap-pixel-base" strategy="lazyOnload">
          {`
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
            {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;
            r.src=n;var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);})(window,document,
            'https://sc-static.net/scevent.min.js');
            snaptr('init', '${snapId}');
            snaptr('track', 'PAGE_VIEW');
          `}
        </Script>
      ) : null}
    </>
  )
}
