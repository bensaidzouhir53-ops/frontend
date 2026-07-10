(function () {
  if (typeof window === 'undefined' || window.fbq) return

  var script = document.currentScript
  var pixelId =
    (script && script.getAttribute('data-pixel-id')) || '576636091443534'
  if (!/^\d+$/.test(pixelId)) return

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  window.fbq('init', pixelId)
  window.fbq('track', 'PageView')
  window.__nasamaPageViewTracked = true
  window.__nasamaMetaReady = true
  window.__nasamaInitializedPixelIds = [pixelId]
})()
