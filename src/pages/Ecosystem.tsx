import Card from '@/components/ui/card'
import { textLink } from '@/components/ui/button'
import Reveal from '@/components/ui/reveal'
import Section, { container, Eyebrow, H1, H2 } from '@/components/ui/section'
import Tag from '@/components/ui/tag'
import { GROUPS } from '@/lib/ecosystem'

/** What exists around the network, from lib/ecosystem.ts: every entry loaded and read, tagged by what the page showed. */
export default function Ecosystem() {
  return (
    <div>
      <header className={`${container} pb-[72px] pt-[72px] md:pb-32 md:pt-32`}>
        <Eyebrow>Ecosystem</Eyebrow>
        <H1>The ecosystem.</H1>
        <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">What exists today, and what is designed.</p>
      </header>
      {GROUPS.map((g) => (
        <Section key={g.title}>
          <H2>{g.title}</H2>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {g.entries.map((e, i) => (
              <li key={e.name}>
                <Reveal index={i % 3} className="h-full">
                  <Card className="flex h-full flex-col items-start p-6">
                    <Tag is={e.tag} />
                    <h3 className="mt-4 text-xl font-semibold">{e.name}</h3>
                    <p className="mt-2 text-muted-foreground">{e.text}</p>
                    <a href={e.href} className={`${textLink} mt-auto pt-4`}>{e.host}</a>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </div>
  )
}
