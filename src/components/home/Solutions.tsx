import { Link } from 'react-router-dom'
import Card from '@/components/ui/card'
import Tag, { type Status } from '@/components/ui/tag'
import { useCounts } from '@/lib/catalog'
import { DOCS_AGENTS, HIP_0901, NODE_GUIDE, WHITEPAPER } from '@/lib/links'
import Reveal from './Reveal'
import Section, { Eyebrow, H2 } from './Section'

export const textLink = 'inline-flex min-h-11 items-center rounded-sm text-base font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground'

type Item = { tag: Status; title: string; text: string; link: string; to: string }

const items = (models: string): Item[] => [
  {
    tag: 'In progress',
    title: 'Verifiable inference',
    text: `Call ${models} models through one OpenAI-compatible API today. Proof of AI receipts for each call are designed and not yet switched on.`,
    link: 'Start building',
    to: '/build',
  },
  {
    tag: 'Designed',
    title: 'Mine AI with useful compute',
    text: 'Compute once, earn twice: keep the customer fee and, once mining activates, earn a declining AI reward. Mining stays disabled until the launch gates pass. Today a node runs tools and agents and is paid per job in stablecoins.',
    link: 'Node operator guide',
    to: NODE_GUIDE,
  },
  {
    tag: 'Live',
    title: 'Agents and metered compute',
    text: 'Give an agent its own API key with a monthly budget; calls stop when it is spent. On-chain agent wallets with spend caps are designed.',
    link: 'Agent docs',
    to: DOCS_AGENTS,
  },
  {
    tag: 'Designed',
    title: 'Models, training and contributions',
    text: 'Zen open-weight models are served today. Proofs for training and rewards for private contributions are specified in a draft proposal.',
    link: 'Read HIP-0901',
    to: HIP_0901,
  },
  {
    tag: 'Designed',
    title: 'Private post-quantum AI',
    text: 'Prompt sealing with X-Wing (X25519 + ML-KEM-768) and optional secure enclaves are specified. Succinct settlement on Z-Chain is audit-gated.',
    link: 'Read the whitepaper',
    to: WHITEPAPER,
  },
]

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
        {items(models).map((c, i) => (
          <li key={c.title} className={`${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <Reveal index={i % 3} className="h-full">
              <Card className="flex h-full flex-col items-start p-6 md:p-8">
                <Tag>{c.tag}</Tag>
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
