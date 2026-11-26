import { useCallback, useEffect, useState } from 'react'
import { buttonClass } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { AllModels, FeaturedCard } from '@/components/pricing/Models'
import Glow from '@/components/pricing/Glow'
import Start from '@/components/pricing/Start'
import { container, Eyebrow, H2 } from '@/components/home/Section'
import { featured, fetchModels, freeModel, perToken, sortModels, type Model } from '@/lib/catalog'

const section = `${container} mt-24 md:mt-32`

type State = { models: Model[] } | { error: true } | null

const Stat = ({ big, small }: { big: string; small: string }) => (
  <li>
    <Card className="h-full px-5 py-4">
      <p className="text-2xl font-semibold tabular-nums">{big}</p>
      <p className="text-sm text-muted-foreground">{small}</p>
    </Card>
  </li>
)

const Group = ({ label, models, cols }: { label: string; models: Model[]; cols: string }) =>
  models.length > 0 && (
    <div className="mt-12">
      <Eyebrow>{label}</Eyebrow>
      <ul className={`grid gap-4 sm:grid-cols-2 ${cols}`}>
        {models.map((m) => (
          <FeaturedCard key={m.id} m={m} />
        ))}
      </ul>
    </div>
  )

export default function Pricing() {
  const [state, setState] = useState<State>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const ctl = new AbortController()
    fetchModels(ctl.signal)
      .then((models) => setState({ models }))
      .catch(() => ctl.signal.aborted || setState({ error: true }))
    return () => ctl.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setState(null)
    setAttempt((n) => n + 1)
  }, [])

  const all = state && 'models' in state ? state.models : null
  const models = all ? perToken(all) : null
  const variable = all && models ? all.length - models.length : 0
  const top = models ? featured(models) : []
  const zen = top.filter((m) => m.lab === 'Hanzo')
  const others = top.filter((m) => m.lab !== 'Hanzo')
  const free = models ? freeModel(models) : undefined

  return (
    <div className="pb-[72px] pt-[72px] md:pb-32 md:pt-32">
      <header className={container}>
        <Eyebrow>Pricing</Eyebrow>
        <h1 className=" text-6xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-7xl">
          {free ? 'Start free. Pay per token.' : 'Pay per token.'}
        </h1>
        <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">
          {free ? "Call Hanzo's Zen model for free, then pay" : 'Pay'} only for the tokens you use on any
          {models ? ` of ${models.length} models` : ' model'}, at today's prices from api.hanzo.ai.
        </p>
        <ul className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
          {models && <Stat big={String(models.length)} small="models, live" />}
          {free && <Stat big="$0" small="to call Zen" />}
          <Stat big="Per token" small="billed by use" />
        </ul>
      </header>

      <section className={section} id="start">
        <Eyebrow>Get started</Eyebrow>
        <H2>Your first call in a minute.</H2>
        <Start />
      </section>

      <div aria-busy={state === null}>
        {state && 'error' in state && (
          <section className={section}>
            <Card role="alert" className="p-6">
              <p className="text-xl font-semibold">Couldn't load today's prices from api.hanzo.ai.</p>
              <button type="button" onClick={retry} className={`${buttonClass('primary')} mt-6`}>
                Retry
              </button>
            </Card>
          </section>
        )}

        {state === null && (
          <section className={section} aria-label="Loading prices">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <Card key={i} aria-hidden="true" className="h-56 animate-pulse" />
              ))}
            </div>
          </section>
        )}

        {models && (
          <>
            <section className={`${section} relative`} id="models">
              <Glow />
              <H2>Featured models</H2>
              <Group label="Hanzo Zen6" models={zen} cols="lg:grid-cols-4" />
              <Group label="From other labs" models={others} cols="lg:grid-cols-3" />
            </section>
            <section className={section}>
              <H2>All models</H2>
              <p className="mb-8 mt-3 text-sm text-muted-foreground">
                Prices per 1M tokens. Batch-rate versions are also available through the API.
              </p>
              <AllModels models={sortModels(models)} />
              {variable > 0 && (
                <p className="mt-6 text-sm text-muted-foreground">
                  {variable} image, audio and video models are priced per second or per image; see{' '}
                  <a href="https://docs.hanzo.ai" className="text-foreground underline underline-offset-4">
                    docs.hanzo.ai
                  </a>
                  .
                </p>
              )}
            </section>
          </>
        )}
      </div>

      <section className={`${section} relative`} id="providers">
        <Glow />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold">Need a plan for you or your team?</h2>
            <p className="mt-2 text-muted-foreground">Hanzo's monthly plans live on hanzo.ai.</p>
            <a href="https://hanzo.ai/pricing" className={`${buttonClass('secondary')} mt-6`}>
              Compare plans
            </a>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold">Have GPUs or CPUs?</h2>
            <p className="mt-2 text-muted-foreground">
              Providers keep the customer fee and, once Proof of AI switches on, earn AI rewards for verified work.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="/#provide" className={buttonClass('secondary')}>
                How providers earn
              </a>
              <a
                href="https://github.com/hanzoai/hanzo.network/blob/main/docs/proof-of-ai.md"
                className="text-foreground underline underline-offset-4"
              >
                Read the spec
              </a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
