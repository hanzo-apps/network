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
      {/* The picture keeps its own 16:9 shape and its horizon (60% down) sits 28px under the words above, at every screen size. */}
      <div
        className="hero-art absolute aspect-video w-[var(--w)] [--w:220vw] md:[--w:100vw]"
        style={{ left: 'calc(50% - var(--w) / 2)', top: 'calc(28px - 0.3375 * var(--w))' }}
      >
      {posterOk && (
        <img
          src={POSTER}
          alt=""
          {...{ fetchpriority: 'high' }} // React 18 only passes the lowercase attribute
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
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
