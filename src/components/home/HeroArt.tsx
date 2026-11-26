import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

const POSTER = '/hero/poster.webp'

/** The hero stage's picture: a still poster, and a short loop that fades in over it once the poster is in and it can play. */
export default function HeroArt() {
  const still = useReducedMotion()
  const [posterOk, setPosterOk] = useState(true)
  const [posterLoaded, setPosterLoaded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const stage = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const onScreen = useInView(stage)
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (onScreen) v.play().catch(() => {})
    else v.pause()
  }, [onScreen, posterLoaded])

  return (
    <div ref={stage} aria-hidden className="pointer-events-none absolute inset-0">
      <div className="hero-art absolute inset-x-0 top-[24%] h-full md:top-[22%]">
      {posterOk && (
        <img
          src={POSTER}
          alt=""
          fetchPriority="high"
          onLoad={() => setPosterLoaded(true)}
          onError={() => setPosterOk(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {posterOk && posterLoaded && !still && (
        <video
          ref={video}
          src="/hero/loop.mp4"
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setPlaying(true)}
          onError={() => setPlaying(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ${playing ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      </div>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(closest-side at 50% 45%, color-mix(in srgb, var(--background) 75%, transparent), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
