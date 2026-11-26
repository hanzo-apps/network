import { useEffect, useRef, useState } from 'react'
import { FileCheck2, Cpu, ShieldCheck, Landmark } from 'lucide-react'
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import Compare from '@/components/Compare'
import Card from '@/components/ui/card'
import { POAI_PDF, WHITEPAPER_PDF } from '@/lib/links'
import Reveal from './Reveal'
import Section, { Disc, Eyebrow, H2 } from './Section'
import { textLink } from '@/components/ui/button'

const math = 'whitespace-nowrap font-mono text-[0.9em] text-foreground'

const STEPS = [
  { name: 'Admit', term: 'A-Chain', Icon: FileCheck2, text: 'The job and its reward are fixed before it runs.' },
  { name: 'Execute', term: 'Provider', Icon: Cpu, text: 'A provider runs the job and commits the exact output.' },
  { name: 'Validate', term: 'CPU-verifiable', Icon: ShieldCheck, text: 'Ordinary CPUs check the work cheaply. Private jobs can add a secure enclave.' },
  { name: 'Settle', term: 'Z-Chain and Lux', Icon: Landmark, text: 'The receipt is rolled up on Z-Chain and paid out via Lux on the chain you choose.' },
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
    // place only reads refs and stable motion values; re-observe when reduced motion flips.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still])

  return (
    <Section id="how" glow>
      <Reveal>
        <Eyebrow>How it works</Eyebrow>
        <H2>How Proof of AI works.</H2>
        <p className="mt-4 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">How Proof of AI is designed to work. Rewards stay off until the launch gates pass.</p>
      </Reveal>
      <div className="relative mt-12 md:mt-16">
        <div ref={track} aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-foreground/10 md:bottom-auto md:right-0 md:h-px md:w-auto">
          <motion.div
            className="h-full w-full origin-top-left bg-foreground/60"
            style={still ? undefined : { scaleX: sx, scaleY: sy }}
          />
          {!still && (
            <motion.span
              className="absolute -left-[3.5px] -top-1 h-2 w-2 rounded-full bg-foreground will-change-transform md:-top-[3.5px] md:left-[-4px]"
              style={{ x: dx, y: dy, boxShadow: '0 0 24px color-mix(in oklab, var(--foreground) 40%, transparent)' }}
            />
          )}
        </div>
        <ol ref={list} className="grid gap-4 pl-6 md:grid-cols-4 md:gap-6 md:pl-0 md:pt-8">
        {STEPS.map(({ name, term, Icon, text }, i) => {
          const on = i < active
          return (
            <li key={name}>
              <Card className={`h-full p-6 transition-colors duration-500 md:p-8 ${on ? 'border-foreground/20' : ''}`}>
                <Disc className={on ? 'border-transparent bg-foreground text-background' : 'bg-foreground/5 text-muted-foreground'}>
                  <Icon size={18} />
                  {on && !still && <span className="step-ring pointer-events-none absolute inset-0 rounded-full border border-foreground/40" />}
                </Disc>
                <p className="mt-5"><span className="rounded-full border border-border px-2 py-0.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{term}</span></p>
                <h3 className={`mt-1 text-2xl font-semibold transition-colors duration-500 ${on ? 'text-foreground' : 'text-muted-foreground'}`}>{name}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{text}</p>
              </Card>
            </li>
          )
        })}
        </ol>
      </div>
      <Reveal className="mt-6 md:mt-8">
        <Card className="grid gap-10 p-6 md:p-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-3xl font-semibold tracking-[-0.01em]">Check the math, not the machine.</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              About 95% of a model's forward pass is matrix multiplication, <span className={math}>C = A·B</span>. Redoing it costs cubic work. Checking it does not. After the provider commits <span className={math}>C</span>, the chain
              draws a random vector <span className={math}>r</span>, and an ordinary CPU checks <span className={math}>A(Br) = Cr</span> in quadratic work. A wrong product slips through with probability at most{' '}
              <span className={math}>1/p</span> per vector, where <span className={math}>p = 2⁶¹ − 1</span>; two vectors bring that to at most <span className={math}>2⁻¹²²</span>. The committed trace frontier is about 768 bytes.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">This proves each opened product. It does not by itself prove a whole model; sampling covers the rest.</p>
            <p className="mt-2 flex flex-wrap gap-x-6">
              <a href={WHITEPAPER_PDF} className={textLink}>Whitepaper, sections 5.3 and 9.2</a>
              <a href={POAI_PDF} className={textLink}>Proof of AI paper</a>
            </p>
          </div>
          <Compare />
        </Card>
      </Reveal>
    </Section>
  )
}
