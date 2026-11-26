import { useCallback, useEffect, useState } from 'react'
import { buttonClass } from '@/components/ui/button'
import { AllModels, FeaturedCard } from '@/components/pricing/Models'
import { FEATURED, fetchModels, type Model } from '@/lib/catalog'

const wrap = 'mx-auto w-full max-w-[1200px] px-4 md:px-8'
const section = `${wrap} py-[72px] md:py-32`
const eyebrow = 'text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground'
const h2 = 'text-4xl font-semibold tracking-[-0.02em] md:text-5xl'

type State = { models: Model[] } | { error: true } | null

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

  const models = state && 'models' in state ? state.models : null
  const featured = models
    ? FEATURED.map((id) => models.find((m) => m.id === id)).filter((m): m is Model => !!m)
    : []

  return (
    <>
      <header className={`${wrap} pb-0 pt-[72px] md:pt-32`}>
        <p className={eyebrow}>Pricing</p>
        <h1 className="mt-4 text-6xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-7xl">Pay per token.</h1>
        <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">
          Every price below comes live from api.hanzo.ai, so it is always today's. Prices are per million tokens.
        </p>
      </header>

      <div aria-busy={state === null}>
        {state && 'error' in state && (
          <section className={section}>
            <div role="alert" className="rounded-lg border border-border bg-card p-6">
              <p className="text-xl font-semibold">Couldn't load today's prices from api.hanzo.ai.</p>
              <button type="button" onClick={retry} className={`${buttonClass('primary')} mt-6`}>
                Retry
              </button>
            </div>
          </section>
        )}

        {state === null && (
          <section className={section} aria-label="Loading prices">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="h-56 animate-pulse rounded-lg border border-border bg-card" />
              ))}
            </div>
          </section>
        )}

        {models && (
          <>
            <section className={section}>
              <h2 className={h2}>Featured models</h2>
              <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {featured.map((m) => (
                  <FeaturedCard key={m.id} m={m} />
                ))}
              </ul>
            </section>
            <section className={`${section} pt-0 md:pt-0`}>
              <h2 className={h2}>All models</h2>
              <p className="mb-8 mt-3 text-sm text-muted-foreground">
                Batch-rate versions of these models are also available through the API.
              </p>
              <AllModels models={models} />
            </section>
          </>
        )}
      </div>

      <section className={section} id="providers">
        <p className={eyebrow}>For providers</p>
        <p className="mt-4 max-w-[60ch] text-xl leading-relaxed">
          Providers keep the customer fee and earn AI rewards when their work is proved.
        </p>
        <a href="/#provide" className={`${buttonClass('secondary')} mt-6`}>
          How providers earn
        </a>
      </section>

      <p className={`${wrap} pb-[72px] text-muted-foreground md:pb-32`}>
        Looking for Hanzo plans for people and teams?{' '}
        <a href="https://hanzo.ai/pricing" className="text-foreground underline underline-offset-4">
          See hanzo.ai/pricing
        </a>
      </p>
    </>
  )
}
