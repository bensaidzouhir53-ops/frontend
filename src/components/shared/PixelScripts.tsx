/* eslint-disable @next/next/no-img-element -- Meta noscript pixel requires a raw 1x1 img */
import Script from 'next/script'
import { getMetaPixelIds, type ServerPixelConfig } from '@/lib/pixel-config.server'

interface PixelScriptsProps {
  config: ServerPixelConfig
}

/** Inject Meta / TikTok / Snap base pixels after page is idle. */
export default function PixelScripts({ config }: PixelScriptsProps) {
  if (!config.enabled) return null

  const metaIds = getMetaPixelIds(config)
  const { tiktok_pixel_id: tiktokId, snap_pixel_id: snapId } = config

  const metaIdsJson = JSON.stringify(metaIds)

  return (
    <>
      {metaIds.length > 0 ? (
        <>
          <Script id="meta-pixel-base" strategy="afterInteractive">
            {`
              (function(){
                var pixelIds = ${metaIdsJson};
                !function(f,b,e,v,n,t,s){
                  if(f.fbq)return;
                  n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s);
                }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                function initAllMetaPixels(){
                  if(!window.fbq){setTimeout(initAllMetaPixels,50);return;}
                  for(var i=0;i<pixelIds.length;i++){window.fbq('init',pixelIds[i]);}
                  window.fbq('track','PageView');
                  window.__nasamaMetaReady = true;
                  if(window.__nasamaSyncMetaReady){window.__nasamaSyncMetaReady();}
                }
                initAllMetaPixels();
              })();
            `}
          </Script>
          <noscript>
            {metaIds.map((metaId) => (
              <img
                key={metaId}
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${metaId}&ev=PageView&noscript=1`}
                alt=""
              />
            ))}
          </noscript>
        </>
      ) : null}

      {tiktokId ? (
        <Script id="tiktok-pixel-stub" strategy="lazyOnload">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;
              var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
              ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
              var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
              var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${tiktokId}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      ) : null}

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
