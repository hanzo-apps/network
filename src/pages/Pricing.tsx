import { useCallback, useEffect, useState } from 'react'
import { buttonClass } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { AllModels, FeaturedCard } from '@/components/pricing/Models'
import Glow from '@/components/pricing/Glow'
import Start from '@/components/pricing/Start'
import { container, Eyebrow, H2 } from '@/components/home/Section'
import { DOCS, NODE_GUIDE, PLANS, POAI_SPEC } from '@/lib/links'
import { FEATURED, countModels, featured, isZenFeatured, loadModels, freeModel, group, perToken, sortModels, type Model } from '@/lib/catalog'

const section = `${container} mt-24 md:mt-32`

type State = { models: Model[] } | { error: true } | null

const blank = '\u00a0'

/** One stat card. Without `big` it is a same-size placeholder: pulsing while loading, `still` when there is nothing to claim. */
const Stat = ({ big, small, still = false }: { big?: string; small?: string; still?: boolean }) => (
  <li aria-hidden={big ? undefined : true} className={still ? 'invisible' : undefined}>
    <Card className={`h-full px-5 py-4 ${big || still ? '' : 'animate-pulse'}`}>
      <p className="text-2xl font-semibold tabular-nums">{big ?? blank}</p>
      <p className="text-sm text-muted-foreground">{small ?? blank}</p>
    </Card>
  </li>
)

const Group = ({ label, models, count, cols }: { label: string; models?: Model[]; count: number; cols: string }) =>
  (!models || models.length > 0) && (
    <div className="mt-12">
      <Eyebrow>{label}</Eyebrow>
      <ul className={`grid gap-4 sm:grid-cols-2 ${cols}`}>
        {models ? models.map((m) => <FeaturedCard key={m.id} m={m} />) : Array.from({ length: count }, (_, i) => <FeaturedCard key={i} />)}
      </ul>
    </div>
  )

const ZEN = FEATURED.filter(isZenFeatured).length

export default function Pricing() {
  const [state, setState] = useState<State>(null)
  const [announce, setAnnounce] = useState('')
  useEffect(() => setAnnounce(state === null ? "Loading today's prices from api.hanzo.ai…" : ''), [state])
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let gone = false
    loadModels().then(
      (models) => gone || setState({ models }),
      () => gone || setState({ error: true }),
    )
    return () => {
      gone = true
    }
  }, [attempt])

  const retry = useCallback(() => {
    setState(null)
    setAttempt((n) => n + 1)
  }, [])

  const all = state && 'models' in state ? state.models : null
  const models = all ? perToken(all) : null
  const variable = all && models ? all.length - models.length : 0
  const top = models ? featured(models) : []
  const zen = top.filter((m) => isZenFeatured(m.id))
  const others = top.filter((m) => !isZenFeatured(m.id))
  const rows = models ? group(sortModels(models)) : null
  const free = models ? freeModel(models) : undefined

  return (
    <div className="pb-[72px] pt-[72px] md:pb-32 md:pt-32">
      <header className={container}>
        <Eyebrow>Pricing</Eyebrow>
        <h1 className="text-6xl font-[560] leading-[1.0] tracking-[-0.045em] md:text-7xl">Pay per token.</h1>
        <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">
          Pay only for the tokens you use. Every price comes live from api.hanzo.ai.
        </p>
        <ul className="mt-8 grid max-w-md grid-cols-2 gap-4">
          {all ? <Stat big={String(countModels(all).models)} small="models, live" /> : <Stat still={!!state} />}
          {free ? <Stat big="$0" small="to call Zen" /> : <Stat still={!!state} />}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Monthly plans, Pro $15 and Max $95, are on{' '}
          <a href={PLANS} className="text-foreground underline underline-offset-4">
            hanzo.ai/pricing
          </a>
        </p>
      </header>

      <section className={section} id="start">
        <Eyebrow>Get started</Eyebrow>
        <H2>Your first call.</H2>
        <Start />
      </section>

      {/* Outside the busy region and empty on first paint, so screen readers announce the change. */}
      <p role="status" className="sr-only">{announce}</p>
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

        {!(state && 'error' in state) && (
          <section className={`${section} relative`} id="models">
            <Glow />
            <H2>Featured models</H2>
            <Group label="Hanzo Zen6" models={models ? zen : undefined} count={ZEN} cols="lg:grid-cols-4" />
            <Group label="From other labs" models={models ? others : undefined} count={FEATURED.length - ZEN} cols="lg:grid-cols-3" />
          </section>
        )}

        {models && (
          <>
            <section className={section}>
              <H2>All models</H2>
              <p className="mb-8 mt-3 text-sm text-muted-foreground">
                Prices per 1M tokens. Batch-rate versions are also available through the API.
              </p>
              <AllModels models={rows!} />
              {variable > 0 && (
                <p className="mt-6 text-sm text-muted-foreground">
                  {variable} more models are priced per second, per image, or are not billed per token; see{' '}
                  <a href={DOCS} className="text-foreground underline underline-offset-4">
                    docs.hanzo.ai
                  </a>
                  .
                </p>
              )}
            </section>
          </>
        )}
      </div>

      <section className={`${section} relative`}>
        <Glow />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold">Need a plan for you or your team?</h2>
            <p className="mt-2 text-muted-foreground">Hanzo's monthly plans live on hanzo.ai.</p>
            <a href={PLANS} className={`${buttonClass('secondary')} mt-6`}>
              Compare plans
            </a>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold">Have GPUs or CPUs?</h2>
            <p className="mt-2 text-muted-foreground">
              Run a node today: offer tools and agents, and get paid per job. AI rewards follow once Proof of AI passes its audits.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={NODE_GUIDE} className={buttonClass('secondary')}>
                Run a node
              </a>
              <a
                href={POAI_SPEC}
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
