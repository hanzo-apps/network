import { useEffect, useRef, useState } from 'react'
import { FileCheck2, Cpu, ShieldCheck, Landmark } from 'lucide-react'
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import Card from '@/components/ui/card'
import Reveal from './Reveal'
import Section, { Disc, Eyebrow, H2 } from './Section'

const STEPS = [
  { name: 'Admit', term: 'A-Chain', Icon: FileCheck2, text: 'The job and its reward are fixed before it runs.' },
  { name: 'Execute', term: 'Provider', Icon: Cpu, text: 'A provider runs the job and commits the exact output.' },
  { name: 'Validate', term: 'CPU-verifiable', Icon: ShieldCheck, text: 'Ordinary CPUs check the work cheaply. TEEs are optional for private jobs.' },
  { name: 'Settle', term: 'Z-Chain and Lux', Icon: Landmark, text: 'The receipt is rolled up on Z-Chain and paid on any chain via Lux.' },
]

/** A step lights when the job dot enters its quarter of the track. */
const lit = (p: number) => STEPS.filter((_, i) => p >= i / STEPS.length + 0.02).length

export default function How() {
  const still = useReducedMotion()
  const list = useRef<HTMLOListElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(still ? STEPS.length : 0)
  const progress = useRef(0)
  const dx = useMotionValue(0)
  const dy = useMotionValue(0)
  const sx = useMotionValue(1)
  const sy = useMotionValue(1)
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 70%', 'end 45%'] })

  // The track runs across on desktop and down on a phone; place the dot and fill along whichever it is.
  const place = () => {
    const t = track.current
    if (!t || still) return
    const across = t.offsetWidth > t.offsetHeight
    const p = progress.current
    dx.set(across ? p * t.offsetWidth : 0)
    dy.set(across ? 0 : p * t.offsetHeight)
    sx.set(across ? p : 1)
    sy.set(across ? 1 : p)
  }
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progress.current = Math.min(1, Math.max(0, v))
    place()
    setActive(lit(progress.current))
  })
  useEffect(() => {
    const t = track.current
    if (!t || still) return
    place()
    const ro = new ResizeObserver(place)
    ro.observe(t)
    return () => ro.disconnect()
  })

  return (
    <Section id="how" glow>
      <Reveal>
        <Eyebrow>How it works</Eyebrow>
        <H2>Four steps from job to payout.</H2>
      </Reveal>
      <ol ref={list} className="relative mt-12 grid gap-4 pl-6 md:mt-16 md:grid-cols-4 md:gap-6 md:pl-0 md:pt-8">
        <div ref={track} aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-[var(--white-10)] md:bottom-auto md:right-0 md:h-px md:w-auto">
          <motion.div
            className="h-full w-full origin-top-left bg-[var(--white-60)]"
            style={still ? undefined : { scaleX: sx, scaleY: sy }}
          />
          {!still && (
            <motion.span
              className="absolute -left-[3.5px] -top-1 h-2 w-2 rounded-full bg-foreground will-change-transform md:-top-[3.5px] md:left-[-4px]"
              style={{ x: dx, y: dy, boxShadow: '0 0 24px var(--white-40)' }}
            />
          )}
        </div>
        {STEPS.map(({ name, term, Icon, text }, i) => {
          const on = i < active
          return (
            <li key={name}>
              <Card className={`h-full p-6 transition-colors duration-500 md:p-8 ${on ? 'border-[var(--white-22)]' : ''}`}>
                <Disc className={on ? 'border-transparent bg-foreground text-background' : 'bg-[var(--white-05)] text-muted-foreground'}>
                  <Icon size={18} />
                  {on && !still && <span className="step-ring pointer-events-none absolute inset-0 rounded-full border border-[var(--white-40)]" />}
                </Disc>
                <p className="mt-5 text-xs text-muted-foreground">{term}</p>
                <h3 className={`mt-1 text-2xl font-semibold transition-colors duration-500 ${on ? 'text-foreground' : 'text-muted-foreground'}`}>{name}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{text}</p>
              </Card>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
