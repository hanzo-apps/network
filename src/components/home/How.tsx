import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import Reveal from './Reveal'
import Section, { Eyebrow, H2 } from './Section'

const STEPS = [
  { name: 'Admit', term: 'A-Chain', text: 'The job and its reward are fixed before it runs.' },
  { name: 'Execute', term: 'Provider', text: 'A provider runs the job and commits the exact output.' },
  { name: 'Validate', term: 'CPU-verifiable', text: 'Ordinary CPUs check the work cheaply. TEEs are optional for private jobs.' },
  { name: 'Settle', term: 'Z-Chain and Lux', text: 'The receipt is rolled up on Z-Chain and paid on any chain via Lux.' },
]

const line = 'absolute left-[5px] top-3 -bottom-8 w-px origin-top-left bg-border-strong md:left-3 md:right-[-2rem] md:bottom-auto md:top-[5px] md:h-px md:w-auto'

/** The connector from one step's marker to the next: draws down on a phone, across on desktop. */
function Connector({ index, seen }: { index: number; seen: boolean }) {
  const still = useReducedMotion()
  if (still) return <span aria-hidden className={line} />
  return (
    <motion.span
      aria-hidden
      className={line}
      initial={false}
      animate={{ scaleX: seen ? 1 : 0, scaleY: seen ? 1 : 0 }}
      transition={{ duration: 0.2, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

function Step({ step, index, last }: { step: (typeof STEPS)[number]; index: number; last: boolean }) {
  const li = useRef<HTMLLIElement>(null)
  const seen = useInView(li, { once: true, margin: '-80px' })
  return (
    <li ref={li} className="relative pl-8 md:pl-0 md:pt-9">
      <span aria-hidden className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-border-strong bg-foreground md:top-0" />
      {!last && <Connector index={index} seen={seen} />}
      <Reveal index={index}>
        <p className="text-xs text-muted-foreground">{step.term}</p>
        <h3 className="mt-1 text-2xl font-semibold">{step.name}</h3>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">{step.text}</p>
      </Reveal>
    </li>
  )
}

export default function How() {
  return (
    <Section id="how">
      <Reveal>
        <Eyebrow>How it works</Eyebrow>
        <H2>Four steps from job to payout.</H2>
      </Reveal>
      <ol className="mt-12 grid gap-8 md:mt-16 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <Step key={s.name} step={s} index={i} last={i === STEPS.length - 1} />
        ))}
      </ol>
    </Section>
  )
}
