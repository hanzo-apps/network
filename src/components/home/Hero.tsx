import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { buttonClass } from '@/components/ui/button'
import { useChain } from '@/lib/chain'
import { Eyebrow, container } from './Section'
import HeroArt from './HeroArt'

const STRIP = ['OpenAI-compatible API', 'Zen and leading models', 'Live chain', 'Open-source node']
const KEY = 'hero-paused'

function Heartbeat() {
  const chain = useChain()
  const still = useReducedMotion()
  if (chain.status === 'down') {
    return <p className="text-sm text-muted-foreground">Network status unavailable</p>
  }
  const dot = 'block h-2 w-2 rounded-full bg-foreground'
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm tabular-nums">
      {still || chain.status === 'loading' ? (
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
      {/* Same width while loading, so the chip does not jump when the height arrives. */}
      <span className="text-muted-foreground" aria-hidden={chain.status === 'loading'}>
        {chain.status === 'live' ? `Block ${chain.height.toLocaleString('en-US')}` : <span className="invisible">Block 0,000,000</span>}
      </span>
    </p>
  )
}

function usePaused() {
  const [paused, set] = useState(() => {
    try {
      return localStorage.getItem(KEY) === '1'
    } catch {
      return false
    }
  })
  const toggle = () => {
    set(!paused)
    try {
      localStorage.setItem(KEY, paused ? '0' : '1')
    } catch {
      /* the choice just does not persist */
    }
  }
  return [paused, toggle] as const
}

export default function Hero() {
  const still = useReducedMotion()
  const [paused, toggle] = usePaused()
  const Icon = paused ? Play : Pause
  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden py-[72px] md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 50% at 50% 85%, var(--white-08), transparent)' }}
      />
      <HeroArt paused={paused} />
      <motion.div
        className={`${container} relative text-center`}
        initial={still ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Eyebrow>Proof of AI</Eyebrow>
        <h1 className="mx-auto max-w-[18ch] text-balance text-6xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-8xl">
          Provable AI compute.
        </h1>
        <p className="mx-auto mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">
          Run AI through one API today. Proof of AI is built so providers are paid only for work that is verified.
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
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          {STRIP.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden>·</span>}
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
      {!still && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? 'Play background video' : 'Pause background video'}
          className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--white-10)] bg-[var(--white-05)] text-muted-foreground backdrop-blur transition-colors hover:text-foreground md:bottom-6 md:right-6"
        >
          <Icon size={16} aria-hidden />
        </button>
      )}
    </section>
  )
}
