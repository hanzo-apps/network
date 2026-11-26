import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import Card from '@/components/ui/card'
import Tag from '@/components/ui/tag'
import { WHITEPAPER_PDF } from '@/lib/links'
import Reveal from './Reveal'
import Section, { Eyebrow, H2 } from './Section'
import { textLink } from '@/components/ui/button'


const FIGURES = [
  { value: '2T AI', label: 'Maximum supply' },
  { value: '1T AI', label: 'Reserved for the Hanzo DAO' },
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
          <Eyebrow>The AI token<span className="ml-3 align-middle"><Tag is="Designed" /></span></Eyebrow>
          <H2>Compute once. Earn twice.</H2>
          <p className="mt-4 text-xl text-foreground">Providers keep the customer fee and, if mining activates, may also earn AI.</p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Designed in the whitepaper: a 2 trillion cap, half fixed with the Hanzo DAO and half earned by proved work in halving eras. Not active yet.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8">
            <Link to="/economics" className={textLink}>See the economics</Link>
            <a href={WHITEPAPER_PDF} className={textLink}>Whitepaper, section 3</a>
          </div>
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
