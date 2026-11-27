import { Link } from 'react-router'
import Card from '@/components/ui/card'
import Reveal from '@/components/ui/reveal'
import Section, { Eyebrow, H2, Label } from '@/components/ui/section'
import Tag from '@/components/ui/tag'
import { buttonClass, textLink } from '@/components/ui/button'
import { count } from '@/lib/format'
import { TOKEN_SITE } from '@/lib/links'
import { NETWORKS } from '@/lib/networks'

const FACTS = [
  {
    label: 'Native coin',
    value: 'AI',
    detail: `Native gas and coordination coin of Hanzo Network (Chain ID ${count(NETWORKS[0].chainId)}).`,
  },
  {
    label: 'Lockup',
    value: '182 days',
    detail: 'Each confirmed genesis allocation carries an independent 182-day lockup tranche.',
  },
  {
    label: 'Status',
    value: 'Testnet preview',
    detail: 'Mainnet participation stays gated pending legal review, final limits and launch approval.',
  },
] as const

export default function GenesisSale() {
  return (
    <Section id="genesis-sale">
      <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal>
          <Eyebrow>
            AI Genesis
            <span className="ml-3 align-middle">
              <Tag is="In progress" />
            </span>
          </Eyebrow>
          <H2>Acquire native AI on token.hanzo.ai.</H2>
          <p className="mt-4 text-xl text-foreground">
            Genesis participation lives on its own dedicated portal so this site stays focused on the network and protocol.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Pre-launch testnet preview is open for review while mainnet deposits remain closed pending legal sign-off. Utility coin only, with no promise of appreciation, return or liquidity.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={TOKEN_SITE} className={buttonClass('secondary')}>
              Visit token.hanzo.ai
            </a>
            <Link to="/economics" className={textLink}>
              Read supply economics
            </Link>
          </div>
        </Reveal>

        <Reveal index={1}>
          <Card className="p-6 md:p-8">
            <dl className="grid gap-4 sm:grid-cols-3">
              {FACTS.map((item) => (
                <div key={item.label} className="min-w-0 rounded-xl border border-border p-4">
                  <Label as="dt">{item.label}</Label>
                  <dd className="mt-2 font-mono text-xl font-semibold text-foreground">
                    {item.value}
                  </dd>
                  <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
