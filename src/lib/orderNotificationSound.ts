let audioContext: AudioContext | null = null
let audioUnlocked = false

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctx =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctx) return null
  if (!audioContext) audioContext = new Ctx()
  return audioContext
}

/** Call once after a user gesture (e.g. login) so browsers allow playback later. */
export function unlockOrderNotificationSound(): void {
  const ctx = getAudioContext()
  if (ctx?.state === 'suspended') void ctx.resume()
  audioUnlocked = true
}

/** Shopify-style cash register cha-ching for a new store order. */
export function playOrderNotificationSound(): void {
  if (!audioUnlocked) {
    unlockOrderNotificationSound()
  }
  playSyntheticChaChing()
}

function playSyntheticChaChing(): void {
  const ctx = getAudioContext()
  if (!ctx) return

  void ctx.resume().then(() => {
    const t0 = ctx.currentTime
    const master = ctx.createGain()
    master.gain.value = 0.85
    master.connect(ctx.destination)

    const ring = (frequency: number, at: number, duration: number, volume: number) => {
      const gain = ctx.createGain()
      gain.connect(master)
      gain.gain.setValueAtTime(0.0001, t0 + at)
      gain.gain.exponentialRampToValueAtTime(volume, t0 + at + 0.012)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + at + duration)

      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = frequency
      osc.connect(gain)
      osc.start(t0 + at)
      osc.stop(t0 + at + duration + 0.05)
    }

    ring(880, 0, 0.08, 0.42)
    ring(1318, 0.07, 0.28, 0.48)
  })
}
