interface TikTokHeadScriptsProps {
  pixelId: string
  /** When true, Purchase is sent server-side only — browser must not duplicate PlaceAnOrder. */
  tiktokCapiEnabled?: boolean
}

/**
 * Single TikTok Pixel bootstrap in <head>. Marks ready only after events.js loads
 * so tracking.ts never double-inits (which counted every event twice in Ads Manager).
 */
export default function TikTokHeadScripts({
  pixelId,
  tiktokCapiEnabled = false,
}: TikTokHeadScriptsProps) {
  const id = pixelId.trim()
  if (!/^[A-Za-z0-9_-]+$/.test(id)) return null

  const bootstrap = `
!function (w, d, t) {
  if (w.__nasamaTtqInitStarted) return;
  w.__nasamaTtqInitStarted = true;
  w.TiktokAnalyticsObject = t;
  var ttq = w[t] = w[t] || [];
  ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
  ttq.setAndDefer = function(t, e) {
    t[e] = function() { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); };
  };
  for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
  ttq.instance = function(t) {
    for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
    return e;
  };
  ttq.load = function(e, n) {
    var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = ttq._i || {};
    ttq._i[e] = [];
    ttq._i[e]._u = i;
    ttq._t = ttq._t || {};
    ttq._t[e] = +new Date;
    ttq._o = ttq._o || {};
    ttq._o[e] = n || {};
    var o = d.createElement("script");
    o.type = "text/javascript";
    o.async = true;
    o.src = i + "?sdkid=" + e + "&lib=" + t;
    o.onload = function() {
      w.__nasamaTtqReady = true;
      w.__nasamaSyncTtqReady?.();
    };
    var a = d.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(o, a);
  };
  ttq.load('${id}');
  ttq.page();
}(window, document, 'ttq');
`.trim()

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: 'window.__nasamaTikTokCapiEnabled=true;',
        }}
      />
      <script id="nasama-tiktok-pixel" dangerouslySetInnerHTML={{ __html: bootstrap }} />
    </>
  )
}
