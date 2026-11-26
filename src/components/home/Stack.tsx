import Reveal from './Reveal'
import Section, { Eyebrow, H2 } from './Section'

const PARTS = [
  { name: 'Hanzo AI', role: 'Platform', text: 'The API, models and tools developers build with.', href: 'https://hanzo.ai' },
  { name: 'Zen models', role: 'Models', text: 'Hanzo’s own open-weight models.', href: 'https://hanzo.ai/zen' },
  { name: 'Lux Network', role: 'Settlement', text: 'The chain that carries each proved receipt to the chain you want paid on.', href: 'https://lux.network' },
  { name: 'Zoo Labs', role: 'Research', text: 'Open research in decentralized AI and science, run on the network.', href: 'https://zoo.ngo' },
]

export default function Stack() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>The stack</Eyebrow>
        <H2>Four parts, one network.</H2>
      </Reveal>
      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
        {PARTS.map((p, i) => (
          <Reveal key={p.name} index={i}>
            <a
              href={p.href}
              className="block h-full rounded-lg border border-border bg-card p-6 transition-colors duration-150 hover:border-border-strong md:p-8"
            >
              <p className="text-sm text-muted-foreground">{p.role}</p>
              <h3 className="mt-1 text-2xl font-semibold">{p.name}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.text}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
