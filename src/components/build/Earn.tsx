import { Link } from 'react-router-dom'
import Section, { Eyebrow, H2 } from '@/components/home/Section'
import Reveal from '@/components/home/Reveal'
import Card from '@/components/ui/card'
import Tag, { type Status } from '@/components/ui/tag'
import { DOCS_OSS_PAYOUTS, DOCS_REFERRALS, HIP_1000 } from '@/lib/links'

// Each sentence was checked against the page it links to on 26 Nov 2026.
const CARDS: { tag: Status; title: string; text: string; href: string; link: string }[] = [
  {
    tag: 'In progress',
    title: 'Open-source payouts',
    text: 'A quarter of attributable cloud revenue is pooled for the open-source developers it runs on. Paid in credits today.',
    href: DOCS_OSS_PAYOUTS,
    link: 'Read the docs',
  },
  {
    tag: 'In progress',
    title: 'Author royalty',
    text: 'Prove you control a repository and earn a royalty when others deploy projects built from it.',
    href: HIP_1000,
    link: 'Read HIP-1000',
  },
  {
    tag: 'Live',
    title: 'Referrals',
    text: 'Earn a 15% recurring share of what builders you refer spend on cloud, for their first 12 months.',
    href: DOCS_REFERRALS,
    link: 'Read the docs',
  },
]

export default function Earn() {
  return (
    <Section id="earn">
      <Reveal>
        <Eyebrow>For builders</Eyebrow>
        <H2>What builders earn today.</H2>
      </Reveal>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <li key={c.title}>
            <Reveal index={i} className="h-full">
              <Card className="flex h-full flex-col items-start p-6">
                <Tag is={c.tag} />
                <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-muted-foreground">{c.text}</p>
                <a href={c.href} className="mt-6 inline-flex min-h-11 items-center text-foreground underline underline-offset-4">
                  {c.link}
                </a>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
      <p className="mt-10 max-w-[60ch] text-muted-foreground">
        Rewards in AI for builders are not designed yet. Mining rewards are for proved compute.{' '}
        <Link to="/#phases" className="text-foreground underline underline-offset-4">
          Activation phases
        </Link>
      </p>
    </Section>
  )
}
