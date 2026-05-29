let audioContext: AudioContext | null = null

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
  if (!ctx) return
  if (ctx.state === 'suspended') void ctx.resume()
}

/** Cash register "ka-ching" with coin jingle for a new store order. */
export function playOrderNotificationSound(): void {
  const ctx = getAudioContext()
  if (!ctx) return

  void ctx.resume().then(() => {
    const t0 = ctx.currentTime
    const master = ctx.createGain()
    master.gain.value = 0.9
    master.connect(ctx.destination)

    const coinPing = (frequency: number, at: number, duration: number, volume: number) => {
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = frequency * 1.6
      filter.Q.value = 10
      filter.connect(master)

      const gain = ctx.createGain()
      gain.connect(filter)
      gain.gain.setValueAtTime(0.0001, t0 + at)
      gain.gain.exponentialRampToValueAtTime(volume, t0 + at + 0.006)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + at + duration)

      for (const detune of [0, 7, -5]) {
        const osc = ctx.createOscillator()
        osc.type = 'triangle'
        osc.frequency.value = frequency
        osc.detune.value = detune
        osc.connect(gain)
        osc.start(t0 + at)
        osc.stop(t0 + at + duration + 0.04)
      }
    }

    const registerRing = (frequency: number, at: number, duration: number, volume: number) => {
      const filter = ctx.createBiquadFilter()
      filter.type = 'highpass'
      filter.frequency.value = 900
      filter.connect(master)

      const gain = ctx.createGain()
      gain.connect(filter)
      gain.gain.setValueAtTime(0.0001, t0 + at)
      gain.gain.exponentialRampToValueAtTime(volume, t0 + at + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + at + duration)

      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(frequency * 0.98, t0 + at)
      osc.frequency.exponentialRampToValueAtTime(frequency, t0 + at + 0.04)
      osc.connect(gain)
      osc.start(t0 + at)
      osc.stop(t0 + at + duration + 0.05)

      const harmonic = ctx.createOscillator()
      harmonic.type = 'sine'
      harmonic.frequency.value = frequency * 2.01
      const harmGain = ctx.createGain()
      harmGain.connect(filter)
      harmGain.gain.setValueAtTime(0.0001, t0 + at)
      harmGain.gain.exponentialRampToValueAtTime(volume * 0.35, t0 + at + 0.01)
      harmGain.gain.exponentialRampToValueAtTime(0.0001, t0 + at + duration * 0.7)
      harmonic.connect(harmGain)
      harmonic.start(t0 + at)
      harmonic.stop(t0 + at + duration + 0.05)
    }

    const registerThud = (at: number) => {
      const gain = ctx.createGain()
      gain.connect(master)
      gain.gain.setValueAtTime(0.0001, t0 + at)
      gain.gain.exponentialRampToValueAtTime(0.45, t0 + at + 0.008)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + at + 0.09)

      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(280, t0 + at)
      osc.frequency.exponentialRampToValueAtTime(120, t0 + at + 0.07)
      osc.connect(gain)
      osc.start(t0 + at)
      osc.stop(t0 + at + 0.12)

      const bufferSize = Math.floor(ctx.sampleRate * 0.04)
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i += 1) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
      }
      const noise = ctx.createBufferSource()
      noise.buffer = noiseBuffer
      const noiseGain = ctx.createGain()
      noiseGain.connect(master)
      noiseGain.gain.setValueAtTime(0.18, t0 + at)
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t0 + at + 0.04)
      noise.connect(noiseGain)
      noise.start(t0 + at)
      noise.stop(t0 + at + 0.05)
    }

    // "Ka" — register drawer hit
    registerThud(0)

    // "Ching" — bright cash register bell
    registerRing(1568, 0.05, 0.42, 0.38)
    registerRing(2093, 0.05, 0.32, 0.22)

    // Coins dropping into the tray
    coinPing(3136, 0.22, 0.11, 0.3)
    coinPing(2794, 0.3, 0.1, 0.26)
    coinPing(3520, 0.36, 0.12, 0.28)
    coinPing(3322, 0.44, 0.09, 0.22)
  })
}
