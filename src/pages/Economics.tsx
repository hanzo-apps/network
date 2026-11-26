import { Link } from 'react-router-dom'
import Compare from '@/components/Compare'
import Calculator from '@/components/economics/Calculator'
import Chart from '@/components/economics/Chart'
import Reveal from '@/components/home/Reveal'
import Section, { container, Disc, Eyebrow, H2 } from '@/components/home/Section'
import { buttonClass, textLink } from '@/components/ui/button'
import Card from '@/components/ui/card'
import Tag from '@/components/ui/tag'
import { MARKET_PAPER, WHITEPAPER, WHITEPAPER_PDF } from '@/lib/links'

// tsgo reads a bare JSX string as 'needs several children' for a union prop; a typed constant is the one way round it.

const SUPPLY = [
  ['2T AI', 'Maximum supply'],
  ['1T AI', 'Hanzo DAO, fixed at genesis. It can never be mined.'],
  ['1T AI', 'Earned by proved work, nothing else.'],
  ['0 AI', 'Inflation on destination chains.'],
] as const

const RULES = [
  'Linked requester and provider must be declared, and can be capped or excluded.',
  'Fees and service budgets are bounded and cannot be recycled.',
  'Metering is committed and can be challenged.',
  'Copying an output without its transcript fails the challenge.',
  'Every finalized receipt uses up one global nullifier.',
  "Total payouts never exceed the era's allowance.",
] as const

const formula = 'font-mono text-base text-foreground md:text-lg'

export default function Economics() {
  return (
    <div>
      <header className={`${container} pb-[72px] pt-[72px] md:pb-32 md:pt-32`}>
        <Eyebrow>Economics</Eyebrow>
        <h1 className="text-6xl font-[560] leading-[1.0] tracking-[-0.045em] md:text-7xl">A hard cap of two trillion AI.</h1>
        <div data-notice className="mt-8 flex flex-col gap-3 rounded-xl border border-border-strong p-4 sm:flex-row sm:items-center sm:gap-4 md:p-5">
          <span className="shrink-0">
            <Tag is="Designed" />
          </span>
          <p className="text-base text-foreground">AI is already the native coin of chain 36963. The supply cap and mining policy on this page are designed and not active: mining stays disabled until governance fixes the parameters and the launch gates pass.</p>
          <a href={WHITEPAPER_PDF} className={`${textLink} shrink-0 sm:ml-auto`}>
            Whitepaper, sections 3 and 10
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={WHITEPAPER} className={buttonClass('primary')}>
            Read the whitepaper
          </a>
          <Link to="/build" className={buttonClass('secondary')}>
            Start building
          </Link>
        </div>
      </header>

      <Section id="supply">
        <Eyebrow>Supply</Eyebrow>
        <H2>Where the two trillion sits.</H2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUPPLY.map(([big, line], i) => (
            <li key={line}>
              <Reveal index={i} className="h-full">
                <Card className="h-full p-6">
                  <p className="text-5xl font-semibold tabular-nums tracking-[-0.03em] text-foreground">{big}</p>
                  <p className="mt-3 text-muted-foreground">{line}</p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="halving">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div>
            <Eyebrow>Halving</Eyebrow>
            <H2>Each era pays half the last.</H2>
            <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">
              The first era may emit at most 500 billion AI, the second 250 billion, the third 125 billion. An era is a fixed number of chain blocks set by governance, nominally four years.
            </p>
            <div className="mt-8 rounded-xl border border-border p-4">
              <p data-formula aria-hidden className={formula}>
                A(h) = M(1 − 2^−k) + f·M·2^−(k+1)
              </p>
              <p className="sr-only">A of h equals M times one minus two to the power of minus k, plus f times M times two to the power of minus k plus one.</p>
              <p className="mt-3 text-sm text-muted-foreground">
                A(h) is the most that could have been mined by height h. M is the earned pool, 1 trillion AI. k counts eras from 0. f is how far through the era we are, from 0 up to but not including 1.
              </p>
            </div>
          </div>
          <Reveal>
            <Card className="p-4 md:p-8">
              <Chart />
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section id="burn">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div>
            <Eyebrow>Burn</Eyebrow>
            <H2>Fees are burned.</H2>
            <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">
              A governed share β of settled protocol fees is burned: ΔS = issuance − β × fees. β is not set yet. As issuance halves, a steady burn can make supply fall.
            </p>
          </div>
          <Reveal>
            <Card className="flex h-full flex-col justify-center p-6 md:p-8">
              <p data-formula className="font-mono text-lg text-foreground sm:text-3xl lg:text-4xl">ΔS = issuance − β × fees</p>
              <p className="mt-4 text-sm text-muted-foreground">β is set by governance. It is not set yet.</p>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section id="market">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div>
            <Eyebrow>Market</Eyebrow>
            <H2>A market that prices compute.</H2>
            <p className="mt-6">
              <Tag is="Designed" />
            </p>
            <p className="mt-4 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">
              Compute pricing is designed around a market maker that conserves one quantity as supply and demand move. It is a design; no market contract is deployed.
            </p>
          </div>
          <Reveal>
            <Card className="flex h-full flex-col justify-center p-6 md:p-8">
              <p data-formula className="font-mono text-lg text-foreground sm:text-3xl lg:text-4xl">H(Ψ,Θ) = Ψ·Θ = κ</p>
              <p className="mt-4 text-sm text-muted-foreground">Ψ and Θ are the two sides of the pool; κ stays constant.</p>
              <a href={MARKET_PAPER} className={`${textLink} mt-2 self-start`}>Hamiltonian market maker, Hanzo papers</a>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section id="rules">
        <Eyebrow>Rules</Eyebrow>
        <H2>Proof earns. Hardware does not.</H2>
        <p className="mt-6 text-xl text-muted-foreground">A raw GPU-hour earns nothing.</p>
        <ol role="list" className="mt-10 grid gap-3 md:grid-cols-2">
          {RULES.map((rule, i) => (
            <li key={rule} className="flex items-start gap-4 rounded-xl border border-border p-4">
              <Disc>
                <span className="font-mono text-sm tabular-nums">{i + 1}</span>
              </Disc>
              <p className="pt-1.5 text-base text-foreground">{rule}</p>
            </li>
          ))}
        </ol>
        <a href={WHITEPAPER_PDF} className={`${textLink} mt-6`}>
          Whitepaper, section 5.8
        </a>
      </Section>

      <Section id="calculator">
        <Eyebrow>Calculator</Eyebrow>
        <Calculator />
      </Section>

      <Section id="compare">
        <h2 className="sr-only">How Proof of AI compares</h2>
        <Card className="p-6 md:p-8">
          <Compare />
        </Card>
      </Section>
    </div>
  )
}
