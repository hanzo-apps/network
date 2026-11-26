import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

const POSTER = '/hero/poster.webp'

/** The hero stage's picture: a still poster, and a short loop that fades in over it once it can play. */
export default function HeroArt() {
  const still = useReducedMotion()
  const [posterOk, setPosterOk] = useState(true)
  const [playing, setPlaying] = useState(false)
  const video = useRef<HTMLVideoElement>(null)
  const onScreen = useInView(video)

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (onScreen) v.play().catch(() => {})
    else v.pause()
  }, [onScreen])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {posterOk && (
        <img
          src={POSTER}
          alt=""
          fetchPriority="high"
          onError={() => setPosterOk(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {posterOk && !still && (
        <video
          ref={video}
          src="/hero/loop.mp4"
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setPlaying(true)}
          onError={() => setPlaying(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ${playing ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(closest-side at 50% 45%, color-mix(in srgb, var(--background) 75%, transparent), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
