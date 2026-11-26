import { useMemo, useState } from 'react'
import { buttonClass, inlineLink } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { context, price, topLabs, type Model, type Row } from '@/lib/catalog'

/** A model's price card. Without `m` it is the same card with blank text: the loading placeholder, identical in size. */
export function FeaturedCard({ m }: { m?: Model }) {
  const blank = '\u00a0'
  return (
    <li aria-hidden={m ? undefined : true}>
      <Card className={`h-full p-6 ${m ? '' : 'animate-pulse'}`}>
        <h3 className="text-xl font-semibold">{m ? m.name : blank}</h3>
        <p className="text-sm text-muted-foreground">{m ? m.lab : blank}</p>
        <p className="mt-6 text-4xl font-semibold tabular-nums md:text-5xl">{m ? price(m.input, m.free) : blank}</p>
        <p className="text-sm text-muted-foreground">per 1M input tokens</p>
        <dl className="mt-6 flex gap-8 border-t border-border pt-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Output</dt>
            <dd className="font-medium tabular-nums">{m ? price(m.output, m.free) : blank}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Context</dt>
            <dd className="font-medium tabular-nums">{m ? context(m.context) : blank}</dd>
          </div>
        </dl>
      </Card>
    </li>
  )
}

const LIMIT = 12
const cols = 'md:grid-cols-[minmax(0,1fr)_7rem_6rem_6rem_5rem]'
export function AllModels({ models }: { models: Row[] }) {
  const [q, setQ] = useState('')
  const [lab, setLab] = useState('All')
  const [all, setAll] = useState(false)
  const labs = useMemo(() => topLabs(models, 6), [models])
  const needle = q.trim().toLowerCase()
  const hits = models.filter(
    (m) => (lab === 'All' || m.lab === lab) && `${m.name} ${m.ids.join(' ')} ${m.lab}`.toLowerCase().includes(needle),
  )
  const shown = all ? hits : hits.slice(0, LIMIT)

  return (
    <div>
      <label htmlFor="model-search" className="block text-sm text-muted-foreground">
        Search models
      </label>
      <input
        id="model-search"
        type="search"
        placeholder="Search by name, id or lab"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="mt-2 h-11 w-full max-w-md rounded-lg border border-border-strong bg-background px-4 text-base text-foreground placeholder:text-muted-foreground"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {['All', ...labs].map((l) => (
          <button key={l} type="button" aria-pressed={lab === l} onClick={() => setLab(l)} className={buttonClass('chip')}>
            {l}
          </button>
        ))}
      </div>
      <Card className="mt-6 px-4 py-2 md:px-6">
        <div
          aria-hidden="true"
          className={`hidden gap-4 border-b border-border py-3 text-xs uppercase tracking-[0.14em] text-muted-foreground md:grid ${cols}`}
        >
          <span>Model</span>
          <span>Lab</span>
          <span>Input</span>
          <span>Output</span>
          <span>Context</span>
        </div>
        <ul>
          {shown.map((m) => (
            <li
              key={m.ids[0]}
              className={`grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-border py-3 last:border-b-0 ${cols}`}
            >
              <div className="min-w-0">
                <p className="break-words font-medium">{m.name}</p>
                <p className="truncate font-mono text-xs text-muted-foreground" title={m.ids.join(', ')}>{m.ids.join(', ')}</p>
              </div>
              <p className="text-sm text-muted-foreground">{m.lab}</p>
              <p className="col-span-2 text-sm tabular-nums md:hidden">
                {price(m.input, m.free)} in · {price(m.output, m.free)} out · {context(m.context)}
              </p>
              <p className="hidden tabular-nums md:block">{price(m.input, m.free)}</p>
              <p className="hidden tabular-nums md:block">{price(m.output, m.free)}</p>
              <p className="hidden tabular-nums md:block">{context(m.context)}</p>
            </li>
          ))}
        </ul>
        {hits.length === 0 && (
          <div className="py-6">
            <p className="text-muted-foreground">No models match "{q.trim() || lab}".</p>
            <button
              type="button"
              onClick={() => {
                setQ('')
                setLab('All')
              }}
              className={`${inlineLink} mt-3`}
            >
              Clear
            </button>
          </div>
        )}
      </Card>
      {!all && hits.length > LIMIT && (
        <button
          type="button"
          onClick={() => setAll(true)}
          className={`${buttonClass('secondary')} mt-6`}
        >
          Show all {hits.length}
        </button>
      )}
    </div>
  )
}
