import { ArrowUpRight, Brain, FlaskConical, Layers, Link2 } from 'lucide-react'
import Card from '@/components/ui/card'
import Reveal from './Reveal'
import Section, { Disc, Eyebrow, H2 } from './Section'

const PARTS = [
  { name: 'Hanzo AI', Icon: Layers, role: 'Platform', text: 'The API, models and tools developers build with.', href: 'https://hanzo.ai' },
  { name: 'Zen models', Icon: Brain, role: 'Models', text: 'Hanzo’s own open-weight models.', href: 'https://hanzo.ai/zen' },
  { name: 'Lux Network', Icon: Link2, role: 'Settlement', text: 'The chain that carries each proved receipt to the chain you want paid on.', href: 'https://lux.network' },
  { name: 'Zoo Labs', Icon: FlaskConical, role: 'Research', text: 'Open research in decentralized AI and science, run on the network.', href: 'https://zoo.ngo' },
]

export default function Stack() {
  return (
    <Section glow>
      <Reveal>
        <Eyebrow>The stack</Eyebrow>
        <H2>Four parts, one network.</H2>
      </Reveal>
      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
        {PARTS.map((p, i) => (
          <Reveal key={p.name} index={i} className="h-full">
            <Card className="h-full">
              <a
                href={p.href}
                className="group block h-full rounded-lg p-6 outline-offset-[-3px] md:p-8"
              >
                <div className="flex items-start justify-between">
                  <Disc className="bg-[var(--white-05)] text-foreground"><p.Icon size={18} /></Disc>
                  <ArrowUpRight aria-hidden size={20} className="text-muted-foreground transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <p className="mt-6 text-sm text-muted-foreground">{p.role}</p>
                <h3 className="mt-1 text-2xl font-semibold">{p.name}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.text}</p>
              </a>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
