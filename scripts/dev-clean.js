const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const nextDir = path.join(__dirname, '..', '.next')

try {
  fs.rmSync(nextDir, { recursive: true, force: true })
  console.log('Removed .next cache')
} catch {
  console.log('No .next cache to remove')
}

if (process.platform === 'win32') {
  for (const port of [3000, 3001]) {
    try {
      const out = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' })
      const pids = new Set()

      out.split('\n').forEach((line) => {
        if (line.includes('LISTENING')) {
          const parts = line.trim().split(/\s+/)
          const pid = parts[parts.length - 1]
          if (pid && pid !== '0') pids.add(pid)
        }
      })

      pids.forEach((pid) => {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' })
          console.log(`Stopped process ${pid} on port ${port}`)
        } catch {
          // ignore
        }
      })
    } catch {
      // no process on port
    }
  }
}

console.log('Ready — starting dev server...')
