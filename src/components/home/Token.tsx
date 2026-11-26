import { motion, useReducedMotion } from 'motion/react'
import Card from '@/components/ui/card'
import Reveal from './Reveal'
import Section, { Eyebrow, H2 } from './Section'

const FIGURES = [
  { value: '2T AI', label: 'Maximum supply' },
  { value: '1T AI', label: 'Held by the Hanzo DAO' },
  { value: '1T AI', label: 'For miners and validators' },
]

function Figure({ value, index }: { value: string; index: number }) {
  const still = useReducedMotion()
  const cls = 'text-5xl font-semibold tabular-nums text-foreground'
  if (still) return <p className={cls}>{value}</p>
  return (
    <motion.p
      className={cls}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
    >
      {value}
    </motion.p>
  )
}

export default function Token() {
  return (
    <Section glow>
      <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal>
          <Eyebrow>The AI token · Proposed</Eyebrow>
          <H2>Compute once. Earn twice.</H2>
          <p className="mt-4 text-xl text-foreground">Providers keep the customer fee and, once Proof of AI is live, also earn AI.</p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Proposed in the Proof of AI design: a 2 trillion cap, half for the Hanzo DAO and half for miners and validators, paid in halving eras.{' '}
            <a href="https://github.com/hanzoai/hanzo.network/blob/main/docs/proof-of-ai.md" className="rounded-sm underline underline-offset-4 hover:text-foreground">Read the spec</a>
          </p>
        </Reveal>
        <div className="grid content-start gap-4 sm:grid-cols-3">
          {FIGURES.map((f, i) => (
            <Reveal key={f.label} index={i + 1} className="h-full">
              <Card className="h-full p-6 md:p-8">
                <Figure value={f.value} index={i} />
                <p className="mt-2 text-sm text-muted-foreground">{f.label}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
