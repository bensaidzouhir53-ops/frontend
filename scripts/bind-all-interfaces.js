const fs = require('fs')
const path = require('path')

const root = path.join(process.cwd(), '.next', 'standalone')
const needle = "const hostname = process.env.HOSTNAME || '0.0.0.0'"
const replacement = "const hostname = '0.0.0.0'"

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
  fs.writeFileSync(file, source.replace(needle, replacement))
  patched += 1
  console.log('Bound Next server to 0.0.0.0 in', path.relative(process.cwd(), file))
}

if (patched === 0) {
  console.error('Standalone server.js still binds to HOSTNAME. Refusing to ship that image.')
  process.exit(1)
}
