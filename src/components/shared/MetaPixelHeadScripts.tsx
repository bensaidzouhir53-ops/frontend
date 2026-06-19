/* eslint-disable @next/next/no-img-element */
import Script from 'next/script'

interface MetaPixelHeadScriptsProps {
  enabled: boolean
  pixelIds: string[]
}

/** Meta base pixel — beforeInteractive in <head> (official Meta pattern). */
export default function MetaPixelHeadScripts({
  enabled,
  pixelIds,
}: MetaPixelHeadScriptsProps) {
  if (!enabled || pixelIds.length === 0) return null

  const idsJson = JSON.stringify(pixelIds)

  return (
    <>
      <Script id="meta-pixel-base" strategy="beforeInteractive">
        {`
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;
            n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s);
          }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          (function(){
            var pixelIds = ${idsJson};
            window.__nasamaInitializedPixelIds = window.__nasamaInitializedPixelIds || [];
            function bootMeta(){
              if(!window.fbq){setTimeout(bootMeta,30);return;}
              for(var i=0;i<pixelIds.length;i++){
                if(window.__nasamaInitializedPixelIds.indexOf(pixelIds[i])<0){
                  window.fbq('init', pixelIds[i]);
                  window.__nasamaInitializedPixelIds.push(pixelIds[i]);
                }
              }
              if(!window.__nasamaPageViewTracked){
                window.fbq('track','PageView');
                window.__nasamaPageViewTracked = true;
              }
              window.__nasamaMetaReady = true;
              if(window.__nasamaSyncMetaReady){window.__nasamaSyncMetaReady();}
            }
            bootMeta();
          })();
        `}
      </Script>
      <noscript>
        {pixelIds.map((id) => (
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
