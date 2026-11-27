import Card from '@/components/ui/card'
import Reveal from '@/components/ui/reveal'
import Section, { Eyebrow, H2, Label } from '@/components/ui/section'
import Tag from '@/components/ui/tag'
import { buttonClass, textLink } from '@/components/ui/button'
import {
  AUCTION_FINAL_DAY,
  AUCTION_LOCKUP_DAYS,
  AUCTION_WINDOWS,
  formatCountdown,
  useAuction,
} from '@/lib/auction'
import { count, decimals } from '@/lib/format'
import { LUX_BRIDGE, TOKEN_PURCHASE } from '@/lib/links'
import { NETWORKS } from '@/lib/networks'

const RAILS = [
  { symbol: 'BTC', bridged: 'LBTC', source: 'Bitcoin', cap: 'Uncapped' },
  { symbol: 'SOL', bridged: 'LSOL', source: 'Solana', cap: 'Uncapped' },
  { symbol: 'ETH', bridged: 'LETH', source: 'Ethereum', cap: 'Uncapped' },
  { symbol: 'TON', bridged: 'LTON', source: 'TON', cap: 'Uncapped' },
  { symbol: 'USDC', bridged: 'LUSDC', source: 'Multi-network', cap: 'Uncapped' },
  { symbol: 'USDT', bridged: 'LUSDT', source: 'Multi-network', cap: 'Uncapped' },
  { symbol: 'LUX', bridged: 'wLUX', source: `Lux ${count(96369)}`, cap: '10% daily cap' },
  { symbol: 'ZOO', bridged: 'wZOO', source: `Zoo ${count(200200)}`, cap: '10% daily cap' },
] as const

export default function GenesisSale() {
  const auction = useAuction()
  const mainnetId = NETWORKS[0].chainId

  const windowHeading =
    auction.status === 'active' && auction.dayIndex !== null
      ? `Window ${count(auction.dayIndex)} of ${count(AUCTION_FINAL_DAY)}`
      : auction.status === 'pre_sale'
        ? 'Pre-launch schedule'
        : `All ${count(AUCTION_WINDOWS)} windows ended`

  return (
    <Section id="genesis-sale">
      <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal>
          <Eyebrow>
            Native AI Genesis Sale
            <span className="ml-3 align-middle">
              <Tag is="In progress" />
            </span>
          </Eyebrow>
          <H2>{count(AUCTION_WINDOWS)} daily windows for native AI.</H2>
          <p className="mt-4 text-xl text-foreground">
            Native L1 coin of Hanzo Network (Chain ID {count(mainnetId)}), settled deposit-only into contract via bridge.lux.network.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Pre-launch testnet qualification is active while mainnet deposits remain gated on legal sign-off. Each confirmed tranche locks for {count(AUCTION_LOCKUP_DAYS)} days with permissionless native AI release via <span className="font-mono text-base text-foreground">releaseFor(investor)</span>. Utility coin only, with no promise of appreciation or return.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={TOKEN_PURCHASE} className={buttonClass('secondary')}>
              Open token.hanzo.ai
            </a>
            <a href={LUX_BRIDGE} className={textLink}>
              bridge.lux.network
            </a>
          </div>
        </Reveal>

        <Reveal index={1}>
          <Card className="p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-5">
              <div>
                <Label>Active schedule</Label>
                <p className="mt-1 font-mono text-lg font-medium text-foreground">{windowHeading}</p>
              </div>
              <div className="text-left sm:text-right">
                <Label>{auction.status === 'pre_sale' ? 'Starts in' : 'Next daily step'}</Label>
                <p className="mt-1 font-mono text-lg font-medium tabular-nums text-foreground">
                  {formatCountdown(auction.countdownSeconds)}
                </p>
              </div>
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="min-w-0 rounded-xl border border-border p-4">
                <Label as="dt">Window reference</Label>
                <dd className="mt-2 font-mono text-2xl font-semibold tabular-nums text-foreground">
                  ${auction.currentPriceUsd}
                </dd>
              </div>
              <div className="min-w-0 rounded-xl border border-border p-4">
                <Label as="dt">Next window</Label>
                <dd className="mt-2 font-mono text-2xl font-semibold tabular-nums text-foreground">
                  {auction.nextDayPriceUsd ? `$${auction.nextDayPriceUsd}` : 'Final'}
                </dd>
              </div>
              <div className="min-w-0 rounded-xl border border-border p-4">
                <Label as="dt">Day {count(AUCTION_FINAL_DAY)} final</Label>
                <dd className="mt-2 font-mono text-2xl font-semibold tabular-nums text-foreground">
                  ${auction.finalDayPriceUsd}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Label>Deposit-only bridge rails</Label>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {RAILS.map((r) => (
                  <li key={r.symbol} className="min-w-0 rounded-xl border border-border px-3 py-2.5">
                    <p className="font-mono text-xs font-medium text-foreground">
                      {r.symbol} · {r.bridged}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{r.cap}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Label>LUX and ZOO daily caps (10% single · 20% combined)</Label>
                <p className="font-mono text-xs tabular-nums text-muted-foreground">
                  Combined left: ${auction.combinedRemainingUsd} ({decimals(auction.combinedFillPercent, 1)}%)
                </p>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[auction.lux, auction.zoo].map((cap) => (
                  <div key={cap.symbol} className="space-y-2">
                    <div className="flex items-center justify-between gap-2 font-mono text-xs">
                      <span className="text-foreground">
                        {cap.symbol} ({cap.bridgedSymbol})
                      </span>
                      <span className="tabular-nums text-muted-foreground">
                        ${cap.remainingUsd} left · {decimals(cap.fillPercent, 1)}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-foreground/10">
                      <div
                        className="h-full bg-foreground"
                        style={{ width: `${Math.min(100, Math.max(0, cap.fillPercent))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                BTC, SOL, ETH, TON, USDC and USDT have uncapped daily share. Cross-network LUX and ZOO overflow rolls into subsequent daily pricing windows without reverting.
              </p>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
