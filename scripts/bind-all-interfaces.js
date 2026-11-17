const fs = require('fs')
const path = require('path')

const root = path.join(process.cwd(), '.next', 'standalone')
const needle = "const hostname = process.env.HOSTNAME || '0.0.0.0'"
const replacement = "const hostname = '0.0.0.0'"
const proxyMarker = '/* nafaas-extra-ports */'
const proxyCode = `
${proxyMarker}
const net = require('net')
const primaryPort = currentPort
for (const extraPort of [3000, 8000]) {
  if (extraPort === primaryPort) continue
  const proxy = net.createServer((socket) => {
    const upstream = net.connect(primaryPort, '127.0.0.1')
    const stop = () => {
      socket.destroy()
      upstream.destroy()
    }
    upstream.on('error', stop)
    socket.on('error', stop)
    socket.pipe(upstream)
    upstream.pipe(socket)
  })
  proxy.on('error', (err) => {
    console.error('Extra port ' + extraPort + ' failed:', err && err.message)
  })
  proxy.listen(extraPort, '0.0.0.0', () => {
    console.log('Also listening on 0.0.0.0:' + extraPort)
  })
}
`

function findServerFiles(dir, found) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) findServerFiles(full, found)
    else if (entry.name === 'server.js') found.push(full)
  }
}

const files = []
findServerFiles(root, files)

let patched = 0
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8')
  if (!source.includes(needle)) continue
  let next = source.replace(needle, replacement)
  if (!next.includes(proxyMarker)) next += proxyCode
  fs.writeFileSync(file, next)
  patched += 1
  console.log('Bound Next server to 0.0.0.0 and ports 3000/8000 in', path.relative(process.cwd(), file))
}

if (patched === 0) {
  console.error('Standalone server.js still binds to HOSTNAME. Refusing to ship that image.')
  process.exit(1)
}
