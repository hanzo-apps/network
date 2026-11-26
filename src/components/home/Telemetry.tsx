import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import Tag, { type Status } from '@/components/ui/tag'
import { useChain } from '@/lib/chain'
import { useCounts } from '@/lib/catalog'
import { STATUS } from '@/lib/links'

// A typed const: a JSX text child is a plain string, which Tag's one-status-word type refuses (TS2745).
const designed: Status = 'Designed'
const link = 'inline-flex min-h-11 flex-wrap items-center gap-x-2 rounded-sm underline-offset-4 hover:underline'

/** One label and one value. The value box is always 44px tall, so an empty one (still loading) is the same size as a full one. */
const Cell = ({ label, children }: { label: string; children?: ReactNode }) => (
  <div className="min-w-0 border-border px-4 py-3 text-left [&:nth-child(n+3)]:border-t max-md:[&:nth-child(even)]:border-l md:[&:nth-child(n+3)]:border-t-0 md:[&:not(:first-child)]:border-l">
    <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
    <dd className="flex min-h-11 items-center gap-2 break-words text-sm tabular-nums">{children}</dd>
  </div>
)

function ChainCell() {
  const chain = useChain()
  const still = useReducedMotion()
  const dot = 'block h-2 w-2 shrink-0 rounded-full bg-foreground'
  return (
    <Cell label="Chain 36963">
      {chain.status === 'down' && 'unavailable'}
      {chain.status === 'live' && (
        <>
          {still ? (
            <span aria-hidden className={dot} />
          ) : (
            <motion.span
              aria-hidden
              key={chain.height}
              className={dot}
              initial={{ scale: 1.8, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          <span>block {chain.height.toLocaleString('en-US')}</span>
        </>
      )}
    </Cell>
  )
}

function ModelsCell() {
  const counts = useCounts()
  return (
    <Cell label="Models">
      {counts.status === 'down' && 'unavailable'}
      {counts.status === 'live' && `${counts.models.toLocaleString('en-US')} · ${counts.zen.toLocaleString('en-US')} Zen`}
    </Cell>
  )
}

/** Four facts under the hero. Chain and Models are read live; Supply cap is a design, tagged so; Status links out because that page cannot be read from a browser. */
export default function Telemetry() {
  return (
    <div role="group" aria-label="Network telemetry" className="mx-auto w-full max-w-[920px] overflow-hidden rounded-2xl border border-border">
      <dl className="m-0 grid grid-cols-2 md:grid-cols-4">
        <ChainCell />
        <ModelsCell />
        <Cell label="Supply cap">
          <Link to="/economics" className={link}>
            2T AI · 500B era 1
            <Tag>{designed}</Tag>
          </Link>
        </Cell>
        <Cell label="Status">
          <a href={STATUS} className={link}>
            status.hanzo.network
          </a>
        </Cell>
      </dl>
    </div>
  )
}
