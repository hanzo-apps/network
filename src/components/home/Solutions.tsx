import { Link } from 'react-router-dom'
import { textLink } from '@/components/ui/button'
import Card from '@/components/ui/card'
import Tag from '@/components/ui/tag'
import { useCounts } from '@/lib/catalog'
import { solutions } from '@/lib/solutions'
import Reveal from '@/components/ui/reveal'
import Section, { Eyebrow, H2 } from '@/components/ui/section'

export default function Solutions() {
  const counts = useCounts()
  const models = counts.status === 'live' ? String(counts.models) : 'hundreds of'
  return (
    <Section id="solutions" glow>
      <Reveal>
        <Eyebrow>Build a solution</Eyebrow>
        <H2>Five things you can do.</H2>
      </Reveal>
      <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-6">
        {solutions(models).map((c, i) => (
          <li key={c.title} className={`${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <Reveal index={i % 3} className="h-full">
              <Card className="flex h-full flex-col items-start p-6 md:p-8">
                <Tag is={c.tag} />
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.01em]">{c.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{c.text}</p>
                {c.to.startsWith('/') ? (
                  <Link to={c.to} className={`${textLink} mt-auto pt-4`}>{c.link}</Link>
                ) : (
                  <a href={c.to} className={`${textLink} mt-auto pt-4`}>{c.link}</a>
                )}
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
