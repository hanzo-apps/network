import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

const POSTER = '/hero/poster.webp'

/** The hero stage's picture: a still poster, and a short loop that fades in over it once it can play. */
export default function HeroArt() {
  const still = useReducedMotion()
  const [posterOk, setPosterOk] = useState(true)
  const [playing, setPlaying] = useState(false)
  const video = useRef<HTMLVideoElement>(null)
  const onScreen = useInView(video)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spring = { stiffness: 60, damping: 20 }
  const x = useSpring(mx, spring)
  const y = useSpring(my, spring)

  // Depth: the picture drifts up to 10px against the pointer. Mouse-like devices only, while on screen.
  useEffect(() => {
    if (still || !onScreen || !matchMedia('(pointer: fine)').matches) return
    const move = (e: PointerEvent) => {
      mx.set((e.clientX / innerWidth - 0.5) * -20)
      my.set((e.clientY / innerHeight - 0.5) * -20)
    }
    addEventListener('pointermove', move)
    return () => removeEventListener('pointermove', move)
  }, [still, onScreen, mx, my])

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (onScreen) v.play().catch(() => {})
    else v.pause()
  }, [onScreen])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div className="absolute inset-0" style={{ x, y, scale: 1.04 }}>
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
      </motion.div>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(closest-side at 50% 45%, color-mix(in srgb, var(--background) 75%, transparent), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
