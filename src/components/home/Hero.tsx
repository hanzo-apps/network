import { motion, useReducedMotion } from 'motion/react'
import { buttonClass } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { container } from './Section'
import HeroArt from './HeroArt'
import Telemetry from './Telemetry'

export default function Hero() {
  const still = useReducedMotion()
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[12svh] md:pt-[13svh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 50% at 50% 85%, color-mix(in oklab, var(--foreground) 8%, transparent), transparent)' }}
      />
      <motion.div
        className={`${container} relative z-10 text-center`}
        initial={still ? false : { y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="mx-auto max-w-[18ch] text-balance text-6xl font-[560] leading-[1.0] tracking-[-0.045em] md:text-8xl">
          The blockchain for global intelligence.
        </h1>
        <p className="mx-auto mt-6 max-w-[60ch] text-balance text-xl leading-relaxed text-muted-foreground">
          Run real AI workloads through one API today. Proof of AI is designed to verify open-model work on ordinary CPUs and settle it with post-quantum finality.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/early" className={buttonClass('primary')}>
            Early access
          </Link>
          <Link to="/build" className={buttonClass('secondary')}>
            Start building
          </Link>
        </div>
        <div className="mt-10">
          <Telemetry />
        </div>
      </motion.div>
      <div className="relative min-h-[32svh] flex-1">
        <HeroArt />
      </div>
    </section>
  )
}
