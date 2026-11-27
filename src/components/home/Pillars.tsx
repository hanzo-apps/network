import Tag from '@/components/ui/tag'
import { PILLARS } from '@/lib/pillars'
import Reveal from '@/components/ui/reveal'
import Section, { Disc, Eyebrow, H2 } from '@/components/ui/section'
import { textLink } from '@/components/ui/button'

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

/** The loop: six numbered parts and the order they feed each other. Decoration; the list beside it says everything. */
function Flywheel() {
  return (
    <svg aria-hidden focusable="false" viewBox="0 0 320 320" className="mx-auto h-auto w-full max-w-[420px] text-foreground">
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
