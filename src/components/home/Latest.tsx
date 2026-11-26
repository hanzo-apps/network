import { ArrowUpRight } from 'lucide-react'
import { HIP_0901, POAI_BLOG, PROOFS, WHITEPAPER } from '@/lib/links'
import Reveal from './Reveal'
import Section, { Eyebrow, H2 } from './Section'

const ROWS = [
  { title: 'Hanzo AI Chain whitepaper', text: 'The design: Proof of AI, supply, activation gates.', meta: 'Working draft · 18 Aug 2026', href: WHITEPAPER },
  { title: 'Proof of AI explainer', text: 'The plain-words introduction on the Hanzo blog.', meta: '26 Jun 2026', href: POAI_BLOG },
  { title: 'HIP-0901', text: 'Proof of AI: native execution proofs. Draft proposal.', meta: 'Draft', href: HIP_0901 },
  { title: 'Formal proofs', text: "Machine-checked proofs for Hanzo's agent and ML systems.", meta: 'Lean and Coq', href: PROOFS },
]

export default function Latest() {
  return (
    <Section id="latest">
      <Reveal>
        <Eyebrow>Latest</Eyebrow>
        <H2>Read the sources.</H2>
      </Reveal>
      <ul className="mt-12 border-b border-border md:mt-16">
        {ROWS.map((r, i) => (
          <li key={r.title} className="border-t border-border">
            <Reveal index={i}>
              <a href={r.href} className="group flex min-h-11 flex-col gap-2 rounded-sm py-6 lg:flex-row lg:items-baseline lg:gap-8 lg:py-7">
                <span className="lg:w-[32%]">
                  <span className="block text-2xl font-semibold tracking-[-0.01em] group-hover:text-muted-foreground">{r.title}</span>
                </span>
                <span className="flex-1 text-base leading-relaxed text-muted-foreground">{r.text}</span>
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground lg:w-[28%] lg:justify-end">
                  {r.meta}
                  <ArrowUpRight aria-hidden size={14} className="shrink-0" />
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
