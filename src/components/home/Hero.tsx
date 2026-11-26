import { motion, useReducedMotion } from 'motion/react'
import { buttonClass } from '@/components/ui/button'
import { useBlockHeight } from '@/lib/chain'
import { container } from './Section'
import HeroArt from './HeroArt'

function Heartbeat() {
  const height = useBlockHeight()
  const still = useReducedMotion()
  if (height === null) {
    return <p className="text-sm text-muted-foreground">Network status unavailable</p>
  }
  const dot = 'block h-2 w-2 rounded-full bg-foreground'
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm tabular-nums">
      {still ? (
        <span className={dot} />
      ) : (
        <motion.span
          key={height}
          className={dot}
          initial={{ scale: 1.8, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <span className="font-medium">Live</span>
      <span className="text-muted-foreground">Block {height.toLocaleString('en-US')}</span>
    </p>
  )
}

export default function Hero() {
  const still = useReducedMotion()
  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden py-[72px] md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 50% at 50% 85%, var(--white-08), transparent)' }}
      />
      <HeroArt />
      <motion.div
        className={`${container} relative text-center`}
        initial={still ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Proof of AI</p>
        <h1 className="mx-auto max-w-[18ch] text-balance text-6xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-8xl">
          AI compute, proved and paid.
        </h1>
        <p className="mx-auto mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">
          Developers run AI on Hanzo Network. Providers earn for doing the work. Every job is proved before anyone is paid.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="https://platform.hanzo.ai/api-keys" className={buttonClass('primary')}>
            Get an API key
          </a>
          <a href="#provide" className={buttonClass('secondary')}>
            Provide compute
          </a>
        </div>
        <div className="mt-10 flex min-h-10 justify-center">
          <Heartbeat />
        </div>
      </motion.div>
    </section>
  )
}
