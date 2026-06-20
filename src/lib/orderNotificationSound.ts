const CHA_CHING_SRC = '/sounds/cha-ching.mp3'

let unlockedAudio: HTMLAudioElement | null = null

function createChaChingAudio(): HTMLAudioElement {
  const audio = new Audio(CHA_CHING_SRC)
  audio.preload = 'auto'
  audio.volume = 1
  return audio
}

/** Call once after a user gesture (e.g. login) so browsers allow playback later. */
export function unlockOrderNotificationSound(): void {
  if (unlockedAudio) return

  const audio = createChaChingAudio()
  audio.muted = true
  const attempt = audio.play()
  if (!attempt) {
    unlockedAudio = audio
    audio.pause()
    audio.currentTime = 0
    audio.muted = false
    return
  }

  void attempt
    .then(() => {
      audio.pause()
      audio.currentTime = 0
      audio.muted = false
      unlockedAudio = audio
    })
    .catch(() => {
      audio.muted = false
    })
}

/** Shopify-style cash register cha-ching when a new order arrives. */
export function playOrderNotificationSound(): void {
  const audio = createChaChingAudio()
  audio.muted = false
  audio.currentTime = 0

  const play = () => {
    void audio.play().catch(() => {
      // Browser blocked autoplay — user must interact once (login / test button).
    })
  }

  if (audio.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
    play()
    return
  }

  audio.addEventListener('canplaythrough', play, { once: true })
  audio.load()
}
