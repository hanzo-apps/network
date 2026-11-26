import Tag, { type Status } from '@/components/ui/tag'
import { DOCS_AGENTS, EXPLORER, HIP_0901, HIP_1334, NODE_GUIDE, WORK } from '@/lib/links'
import Reveal from './Reveal'
import Section, { Disc, Eyebrow, H2 } from './Section'
import { textLink } from '@/components/ui/button'

const PILLARS: { tag: Status; title: string; text: string; link: string; href: string }[] = [
  { tag: 'Live', title: 'Nodes that do paid work', text: 'A node enrolls, advertises tools and agents, runs requests and is paid per job in stablecoins.', link: 'Node operator guide', href: NODE_GUIDE },
  { tag: 'Designed', title: 'Many models, one verdict', text: 'Bonded operator models vote on policy and their median sets parameters. A vote alone can never mint.', link: 'HIP-0901', href: HIP_0901 },
  { tag: 'Live', title: 'A sovereign chain on Lux', text: 'Hanzo runs as its own chain on Lux, ID 36963. Post-quantum finality is designed and waits on activation.', link: 'Explorer', href: EXPLORER },
  { tag: 'In progress', title: 'Agents that pay their way', text: 'Agents sign up with a wallet, hold a budgeted key and pay per call today. Fee burn and on-chain spend caps are designed.', link: 'Agent docs', href: DOCS_AGENTS },
  { tag: 'In progress', title: 'Research with a record', text: 'One research runtime for datasets, runs, evaluations and claims. The spec is a draft and partly built.', link: 'HIP-1334', href: HIP_1334 },
  { tag: 'Designed', title: 'People and agents on one work board', text: "A DAO work board for goals and bounties. Bounties open once Hanzo's contracts deploy.", link: 'Work board', href: WORK },
]

// Six nodes on a ring, numbered clockwise from the top. Arrows run along the ring between neighbours.
const C = 160
const R = 112
const NODE = 18
const point = (i: number, r = R) => {
  const a = (i / 6) * 2 * Math.PI - Math.PI / 2
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const
}
// Leave room for the node circle (and the arrowhead) at each end of an arc.
const GAP = NODE / R + 0.09
const arc = (i: number) => {
  const a0 = (i / 6) * 2 * Math.PI - Math.PI / 2 + GAP
  const a1 = ((i + 1) / 6) * 2 * Math.PI - Math.PI / 2 - GAP
  const p = (a: number) => `${(C + R * Math.cos(a)).toFixed(2)} ${(C + R * Math.sin(a)).toFixed(2)}`
  return `M ${p(a0)} A ${R} ${R} 0 0 1 ${p(a1)}`
}

// Motion only for visitors who have not asked for less: the dot is not even animated otherwise.
const ORBIT = `
@media (prefers-reduced-motion: no-preference) {
  .flywheel-dot { transform-box: view-box; transform-origin: ${C}px ${C}px; animation: flywheel-orbit 12s linear infinite; }
}
@keyframes flywheel-orbit { to { transform: rotate(360deg); } }
`

/** The loop: six numbered parts and the order they feed each other. Decoration; the list beside it says everything. */
function Flywheel() {
  return (
    <svg aria-hidden focusable="false" viewBox="0 0 320 320" className="mx-auto h-auto w-full max-w-[460px] text-foreground">
      <style>{ORBIT}</style>
      <defs>
        <marker id="flywheel-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1.5 1.5 L8 5 L1.5 8.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <circle cx={C} cy={C} r={R} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} data-arrow={`${i + 1}-${((i + 1) % 6) + 1}`} d={arc(i)} fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.25" markerEnd="url(#flywheel-head)" />
      ))}
      <g className="flywheel-dot">
        <circle cx={C} cy={C - R} r="4" fill="currentColor" />
      </g>
      {Array.from({ length: 6 }, (_, i) => {
        const [x, y] = point(i)
        return (
          <g key={i} data-node>
            <circle cx={x} cy={y} r={NODE} fill="var(--background)" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.25" />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="currentColor" fontSize="14" className="font-mono tabular-nums">{i + 1}</text>
          </g>
        )
      })}
    </svg>
  )
}

export default function Pillars() {
  return (
    <Section id="network">
      <Reveal>
        <Eyebrow>The network</Eyebrow>
        <H2>Six parts, one loop.</H2>
      </Reveal>
      <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Flywheel />
        </Reveal>
        <ol className="border-b border-border">
          {PILLARS.map((p, i) => (
            <li key={p.title} className="border-t border-border">
              <Reveal index={i % 3} className="flex gap-4 py-5 md:gap-6 md:py-6">
                <Disc className="mt-0.5 font-mono text-sm tabular-nums text-muted-foreground">{i + 1}</Disc>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <h3 className="text-xl font-semibold tracking-[-0.01em]">{p.title}</h3>
                    <Tag is={p.tag} />
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.text}</p>
                  <a href={p.href} className={`${textLink} text-sm`}>{p.link}</a>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
