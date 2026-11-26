import { motion, useReducedMotion } from 'motion/react'
import { buttonClass } from '@/components/ui/button'
import { useChain } from '@/lib/chain'
import { container } from './Section'
import HeroArt from './HeroArt'

function Heartbeat() {
  const chain = useChain()
  const still = useReducedMotion()
  if (chain.status === 'down') {
    return <p className="text-sm text-muted-foreground">Network status unavailable</p>
  }
  // An empty box the chip's size while loading, so nothing jumps and nothing claims "Live" yet.
  if (chain.status === 'loading') return <p aria-hidden className="h-10 w-[260px]" />
  const dot = 'block h-2 w-2 rounded-full bg-foreground'
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm tabular-nums">
      {still ? (
        <span className={dot} />
      ) : (
        <motion.span
          key={chain.height}
          className={dot}
          initial={{ scale: 1.8, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <span className="font-medium">Live</span>
      <span className="text-muted-foreground">· Hanzo chain · block {chain.height.toLocaleString('en-US')}</span>
    </p>
  )
}

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
          Provable AI compute.
        </h1>
        <p className="mx-auto mt-6 max-w-[60ch] text-balance text-xl leading-relaxed text-muted-foreground">
          Run Zen and leading models through one API today. Proof of AI is designed to reward providers only for work that is proved.
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
      <div className="relative min-h-[32svh] flex-1">
        <HeroArt />
      </div>
    </section>
  )
}
