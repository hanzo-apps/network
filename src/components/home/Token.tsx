import { motion, useReducedMotion } from 'motion/react'
import Card from '@/components/ui/card'
import Reveal from './Reveal'
import Section, { Eyebrow, H2 } from './Section'

const FIGURES = [
  { value: '2T AI', label: 'Hard maximum supply' },
  { value: '1T AI', label: 'Permanent DAO allocation' },
  { value: '1T AI', label: 'PoAI mining + validators' },
  { value: 'Any chain', label: 'Receipt-bound payout' },
]

function Figure({ value, index }: { value: string; index: number }) {
  const still = useReducedMotion()
  const cls = 'text-5xl font-semibold tabular-nums text-foreground'
  if (still) return <p className={cls}>{value}</p>
  return (
    <motion.p
      className={cls}
      initial={{ opacity: 0, y: 6, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
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
          <Eyebrow>The AI token</Eyebrow>
          <H2>Compute once. Earn twice.</H2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Providers keep their normal workload revenue. They may also earn declining AI rewards by proving that a pre-admitted, useful workload was actually completed.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            The proof-earned pool follows Bitcoin-style halving eras: up to 500B AI, then 250B, 125B, and so on. Raw GPU-hours, self-generated jobs, copied outputs, and signatures without execution evidence cannot mint AI.
          </p>
        </Reveal>
        <div className="grid content-start gap-4 sm:grid-cols-2">
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
