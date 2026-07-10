(function () {
  if (typeof window === 'undefined') return
  if (window.__nasamaMetaReady && window.fbq) return

  var script = document.currentScript
  var fromQuery = ''
  try {
    if (script && script.src) {
      fromQuery = new URL(script.src, window.location.href).searchParams.get('id') || ''
    }
  } catch (e) {}

  var pixelId =
    fromQuery ||
    (script && script.getAttribute('data-pixel-id')) ||
    '576636091443534'
  if (!/^\d+$/.test(pixelId)) return

  if (!window.fbq) {
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
  }

  var inited = window.__nasamaInitializedPixelIds || []
  if (inited.indexOf(pixelId) === -1) {
    window.fbq('init', pixelId)
    inited.push(pixelId)
    window.__nasamaInitializedPixelIds = inited
  }

  if (!window.__nasamaPageViewTracked) {
    window.fbq('track', 'PageView')
    window.__nasamaPageViewTracked = true
  }
  window.__nasamaMetaReady = true
})()
