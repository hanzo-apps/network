import { motion, useReducedMotion } from 'motion/react'
import { buttonClass } from '@/components/ui/button'
import { Link } from 'react-router'
import Glow from '@/components/ui/glow'
import { container, H1 } from '@/components/ui/section'
import HeroArt from './HeroArt'
import Telemetry from './Telemetry'
import { EARLY, INVITE_LABEL } from '@/lib/early'

export default function Hero() {
  const still = useReducedMotion()
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[12svh] md:pt-[13svh]">
      <Glow at="50% 85%" size="60% 50%" strength={8} reach="100%" className="inset-0" />
      <motion.div
        className={`${container} relative z-10 text-center`}
        initial={still ? false : { y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <H1 big className="mx-auto max-w-[18ch] text-balance">
          The blockchain for global intelligence.
        </H1>
        <p className="mx-auto mt-6 max-w-[60ch] text-balance text-xl leading-relaxed text-muted-foreground">
          Run real AI workloads through one API today. Proof of AI is designed to verify open-model work on ordinary CPUs and settle it with post-quantum finality.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to={EARLY} className={buttonClass('primary')}>
            {INVITE_LABEL}
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
