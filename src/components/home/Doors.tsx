import { Code2, Server } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClass } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { NODE_GUIDE } from '@/lib/links'
import Reveal from './Reveal'
import Section, { Disc, Eyebrow, H2 } from './Section'

const card = 'h-full p-6 md:p-8'
const list = 'mt-6 space-y-2 text-base leading-relaxed text-muted-foreground'
const text = 'rounded-sm text-base font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground'

export default function Doors() {
  return (
    <Section glow>
      <Reveal>
        <Eyebrow>Two ways in</Eyebrow>
        <H2>Use the network. Or power it.</H2>
      </Reveal>
      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
        <Reveal className="h-full">
          <Card className={card}>
          <Disc className="mb-6 bg-foreground/5 text-foreground"><Code2 size={18} /></Disc>
          <p className="text-sm text-muted-foreground">For developers</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.01em]">Run AI on it</h3>
          <ul className={list}>
            <li>OpenAI-compatible API at api.hanzo.ai.</li>
            <li>Hanzo's own Zen models and leading models from other labs.</li>
            <li>Live today.</li>
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="https://platform.hanzo.ai/api-keys" className={buttonClass('secondary')}>
              Get an API key
            </a>
            <Link to="/pricing" className={text}>
              See pricing
            </Link>
          </div>
          </Card>
        </Reveal>
        <Reveal index={1} id="provide" className="h-full">
          <Card className={card}>
          <Disc className="mb-6 bg-foreground/5 text-foreground"><Server size={18} /></Disc>
          <p className="text-sm text-muted-foreground">For providers</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.01em]">Earn from it</h3>
          <ul className={list}>
            <li>Run a node today: offer tools and agents, and get paid per job.</li>
            <li>AI rewards follow once Proof of AI passes its audits.</li>
            <li>Designed so any CPU can check the work.</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            <a href="https://github.com/hanzoai/hanzo.network/blob/main/docs/proof-of-ai.md" className="rounded-sm underline underline-offset-4 hover:text-foreground">Read the spec</a>
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={NODE_GUIDE} className={buttonClass('secondary')}>
              Run a node
            </a>
            <a href="https://hanzo.ai/contact" className={text}>
              Running a GPU fleet? Talk to us
            </a>
          </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
