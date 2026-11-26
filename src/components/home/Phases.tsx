import Card from '@/components/ui/card'
import Tag from '@/components/ui/tag'
import type { Status } from '@/lib/status'
import { GO_VERIFIER, WHITEPAPER_PDF } from '@/lib/links'
import Reveal from '@/components/ui/reveal'
import Section, { Eyebrow, H2, Label } from '@/components/ui/section'
import { textLink } from '@/components/ui/button'

const PHASES: { tag: Status; title: string; text: string; link?: { name: string; href: string } }[] = [
  { tag: 'In progress', title: 'Arithmetic and wire freeze', text: 'Freeze the field, formats and challenge rules. A Go verifier for the matrix checks is published, with 22 tests.', link: { name: 'Go verifier', href: GO_VERIFIER } },
  { tag: 'Designed', title: 'Exact replay and shadow proofs', text: 'Small jobs are replayed exactly. Shadow evidence has no mint authority.' },
  { tag: 'Designed', title: 'Optimistic Proof of AI', text: 'Activates only after seven gates, including CPU and GPU byte agreement and caught fabrications.' },
  { tag: 'Designed', title: 'Cloud-provider pilot', text: 'One existing cloud scheduler and one independent provider run the same job adapter.' },
  { tag: 'Designed', title: 'Succinct-proof settlement', text: 'P3Q replaces the optimistic path on Z-Chain only after audits complete.' },
]

export default function Phases() {
  return (
    <Section id="phases" glow>
      <Reveal>
        <Eyebrow>Activation</Eyebrow>
        <H2>Mining is gated in phases.</H2>
        <p className="mt-4 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">Mining stays disabled until these gates pass. No dates are promised.</p>
      </Reveal>
      <ol className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-5">
        {PHASES.map((p, i) => (
          <li key={p.title}>
            <Reveal index={i} className="h-full">
              <Card className="flex h-full flex-col items-start p-6 lg:p-5 xl:p-6">
                <div className="flex w-full flex-wrap items-center justify-between gap-2">
                  <Label>Phase {i}</Label>
                  <Tag is={p.tag} />
                </div>
                <h3 className="mt-5 text-balance text-xl font-semibold tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.text}</p>
                {p.link && <a href={p.link.href} className={`${textLink} mt-2`}>{p.link.name}</a>}
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
      <Reveal className="mt-10 md:mt-12">
        <p className="max-w-[70ch] text-balance text-lg leading-relaxed text-muted-foreground">Then governance fixes the supply parameters: activation height, halving interval and fee-burn fraction.</p>
        <a href={WHITEPAPER_PDF} className={`${textLink} mt-2`}>Whitepaper, section 10</a>
      </Reveal>
    </Section>
  )
}
