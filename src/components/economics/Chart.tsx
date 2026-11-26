import { Label } from '@/components/ui/section'
import { decimals, significant } from '@/lib/format'
import { eraCap } from '@/lib/supply'

const ERAS = 8
const W = 400
const H = 260
const TOP = 28
const BOTTOM = 32
const SLOT = W / ERAS
const BAR = 34
const PLOT = H - TOP - BOTTOM
const MOST = eraCap(0)
/** The seventh bar's label sits one line higher, so the three longest decimals never touch. */
const LIFT = 15

/** An era's cap in billions of AI, exact: halving a 500 never needs more than five decimals in eight eras. */
const inBillions = (k: number) => decimals(eraCap(k) / 1e9, 5)

/** The phone list rounds to three significant digits (7.8125 reads 7.81); the table and the chart's label keep every digit. */
const eras = Array.from({ length: ERAS }, (_, k) => ({
  k,
  label: `Era ${k + 1}`,
  value: inBillions(k),
  rounded: significant(eraCap(k) / 1e9, 3),
  share: eraCap(k) / MOST,
  height: (eraCap(k) / MOST) * PLOT,
}))

const NAME = `Bar chart. The most each era may emit, in billions of AI: ${inBillions(0)} in era 1, halving every era to ${inBillions(ERAS - 1)} in era ${ERAS}. The same figures are in the table below.`

/** The most each of the first eight eras may emit. Plain bars, ink from the theme, values on the bars, the same numbers in a table for screen readers. */
export default function Chart() {
  return (
    <figure>
      <Label as="figcaption" className="mb-4">Most each era may emit, billions of AI</Label>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={NAME}
        className="hidden h-auto w-full max-w-[640px] text-foreground sm:block"
      >
        <line x1="0" x2={W} y1={H - BOTTOM} y2={H - BOTTOM} className="stroke-border-strong" strokeWidth="1" />
        {eras.map(({ k, label, value, height }) => {
          const x = k * SLOT + (SLOT - BAR) / 2
          const y = H - BOTTOM - height
          return (
            <g key={k}>
              <rect data-bar x={x} y={y.toFixed(3)} width={BAR} height={height.toFixed(3)} className="fill-foreground" />
              <text x={k === ERAS - 1 ? W : k * SLOT + SLOT / 2} y={(y - 7 - (k === 6 ? LIFT : 0)).toFixed(3)} textAnchor={k === ERAS - 1 ? 'end' : 'middle'} fontSize="13" className="fill-foreground font-mono tabular-nums">
                {value}
              </text>
              <text x={k * SLOT + SLOT / 2} y={H - 11} textAnchor="middle" fontSize="12.5" className="fill-muted-foreground font-mono">
                {label}
              </text>
            </g>
          )
        })}
      </svg>
      {/* Under 640px the eight bars would crowd their labels, so the same data is a list: one row per era. */}
      <div role="img" aria-label={NAME} className="sm:hidden">
        <ol className="space-y-3">
          {eras.map(({ k, label, rounded, share }) => (
            <li key={k} className="grid grid-cols-[3.5rem_minmax(0,1fr)_3.5rem] items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground">{label}</span>
              <span className="block h-3 w-full">
                <span data-row-bar className="block h-full min-w-px bg-foreground" style={{ width: `${(share * 100).toFixed(3)}%` }} />
              </span>
              <span data-value className="text-right font-mono text-sm tabular-nums text-foreground">{rounded}</span>
            </li>
          ))}
        </ol>
      </div>
      <table className="sr-only">
        <caption>Most each era may emit, in billions of AI</caption>
        <thead>
          <tr>
            <th scope="col">Era</th>
            <th scope="col">Most it may emit, billions of AI</th>
          </tr>
        </thead>
        <tbody>
          {eras.map(({ k, label, value }) => (
            <tr key={k}>
              <th scope="row">{label}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
