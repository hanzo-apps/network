import Reveal from './Reveal'
import Section, { Eyebrow, H2 } from './Section'

const FIGURES = [
  { value: '2T AI', label: 'Hard maximum supply' },
  { value: '1T AI', label: 'Permanent DAO allocation' },
  { value: '1T AI', label: 'PoAI mining + validators' },
  { value: 'Any chain', label: 'Receipt-bound payout' },
]

export default function Token() {
  return (
    <Section>
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
            <Reveal key={f.label} index={i + 1} className="rounded-lg border border-border bg-card p-6 transition-colors duration-150 hover:border-border-strong md:p-8">
              <p className="text-5xl font-semibold tabular-nums text-foreground">{f.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{f.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
