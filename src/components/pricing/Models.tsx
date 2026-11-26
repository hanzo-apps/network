import { useState } from 'react'
import { context, price, type Model } from '@/lib/catalog'

const card = 'rounded-lg border border-border bg-card p-6 transition-colors duration-150 hover:border-border-strong'

export function FeaturedCard({ m }: { m: Model }) {
  return (
    <li className={card}>
      <h3 className="text-xl font-semibold">{m.name}</h3>
      <p className="text-sm text-muted-foreground">{m.lab}</p>
      <p className="mt-6 text-4xl font-semibold tabular-nums md:text-5xl">{price(m.input)}</p>
      <p className="text-sm text-muted-foreground">input / 1M tokens</p>
      <dl className="mt-6 flex gap-8 text-sm">
        <div>
          <dt className="text-muted-foreground">Output / 1M</dt>
          <dd className="font-medium tabular-nums">{price(m.output)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Context</dt>
          <dd className="font-medium tabular-nums">{context(m.context)}</dd>
        </div>
      </dl>
    </li>
  )
}

const LIMIT = 30

export function AllModels({ models }: { models: Model[] }) {
  const [q, setQ] = useState('')
  const [all, setAll] = useState(false)
  const needle = q.trim().toLowerCase()
  const hits = models.filter((m) => `${m.name} ${m.id} ${m.lab}`.toLowerCase().includes(needle))
  const shown = all ? hits : hits.slice(0, LIMIT)

  return (
    <div>
      <label htmlFor="model-search" className="block text-sm text-muted-foreground">
        Search models
      </label>
      <input
        id="model-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="mt-2 h-11 w-full max-w-md rounded-lg border border-border-strong bg-card px-4 text-base text-foreground"
      />
      <div
        aria-hidden="true"
        className="mt-8 hidden grid-cols-[1fr_7rem_7rem_7rem] gap-4 border-b border-border pb-3 text-xs uppercase tracking-[0.14em] text-muted-foreground md:grid"
      >
        <span>Model</span>
        <span>Input / 1M</span>
        <span>Output / 1M</span>
        <span>Context</span>
      </div>
      <ul className="mt-4 md:mt-0">
        {shown.map((m) => (
          <li
            key={m.id}
            className="grid grid-cols-3 gap-x-4 gap-y-1 border-b border-border py-4 md:grid-cols-[1fr_7rem_7rem_7rem]"
          >
            <div className="col-span-3 min-w-0 md:col-span-1">
              <p className="break-words font-medium">{m.name}</p>
              <p className="text-sm text-muted-foreground">{m.lab}</p>
            </div>
            <Cell label="Input / 1M" value={price(m.input)} />
            <Cell label="Output / 1M" value={price(m.output)} />
            <Cell label="Context" value={context(m.context)} />
          </li>
        ))}
      </ul>
      {hits.length === 0 && <p className="mt-6 text-muted-foreground">No models match.</p>}
      {!all && hits.length > LIMIT && (
        <button
          type="button"
          onClick={() => setAll(true)}
          className="mt-6 inline-flex h-11 items-center rounded-full border border-border-strong px-6 text-base font-medium text-foreground hover:bg-white/5"
        >
          Show all {hits.length}
        </button>
      )}
    </div>
  )
}

const Cell = ({ label, value }: { label: string; value: string }) => (
  <p className="tabular-nums">
    <span className="block text-xs text-muted-foreground md:hidden">{label}</span>
    {value}
  </p>
)
