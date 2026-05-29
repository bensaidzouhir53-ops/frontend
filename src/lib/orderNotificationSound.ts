let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctx) return null
  if (!audioContext) audioContext = new Ctx()
  return audioContext
}

/** Call once after a user gesture (e.g. login) so browsers allow playback later. */
export function unlockOrderNotificationSound(): void {
  const ctx = getAudioContext()
  if (!ctx) return
  if (ctx.state === 'suspended') void ctx.resume()
}

/** Pleasant three-tone chime for a new store order. */
export function playOrderNotificationSound(): void {
  const ctx = getAudioContext()
  if (!ctx) return

  void ctx.resume().then(() => {
    const start = ctx.currentTime

    const playTone = (frequency: number, at: number, duration: number, volume = 0.28) => {
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency
      gain.gain.setValueAtTime(0.0001, start + at)
      gain.gain.exponentialRampToValueAtTime(volume, start + at + 0.025)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + at + duration)
      oscillator.connect(gain)
      gain.connect(ctx.destination)
      oscillator.start(start + at)
      oscillator.stop(start + at + duration + 0.05)
    }

    playTone(659.25, 0, 0.14)
    playTone(830.61, 0.16, 0.14)
    playTone(987.77, 0.32, 0.22, 0.32)
  })
}
