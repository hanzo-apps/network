import { useId, useState } from 'react'
import Card from '@/components/ui/card'
import Tag, { type Status } from '@/components/ui/tag'
import { H2 } from '@/components/home/Section'
import { ERA_YEARS, POOL, allowance, eraCap, netChange, position, signed, whole } from '@/lib/supply'

// tsgo reads a bare JSX string as 'needs several children' for a union prop; a typed constant is the one way round it.
const designed: Status = 'Designed'

/** A whole number in a range, held two ways: the slider's value, and the text being typed (which may be wrong for a moment). */
function useWhole(min: number, max: number) {
  const [value, setValue] = useState(min)
  const [draft, setDraft] = useState(String(min))
  const read = (text: string) => {
    if (!/^\d+$/.test(text)) return null
    const n = Number(text)
    return n >= min && n <= max ? n : null
  }
  return {
    value,
    draft,
    invalid: read(draft) === null,
    type(text: string) {
      setDraft(text)
      const n = read(text)
      if (n !== null) setValue(n)
    },
    slide(n: number) {
      setValue(n)
      setDraft(String(n))
    },
    settle: () => setDraft(String(value)),
  }
}

type Whole = ReturnType<typeof useWhole>

const box = 'h-11 w-24 rounded-lg border border-border-strong bg-transparent px-3 text-right text-base tabular-nums text-foreground aria-[invalid=true]:border-foreground aria-[invalid=true]:bg-foreground/10'

function Control({ label, hint, unit, min, max, field, spoken }: { label: string; hint: string; unit: string; min: number; max: number; field: Whole; spoken: (n: number) => string }) {
  const id = useId()
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <label id={`${id}-label`} htmlFor={`${id}-number`} className="text-base font-medium">
          {label}
        </label>
        <span className="flex items-center gap-2">
          <input
            id={`${id}-number`}
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={1}
            value={field.draft}
            aria-invalid={field.invalid}
            aria-describedby={`${id}-hint`}
            onChange={(e) => field.type(e.target.value)}
            onBlur={field.settle}
            className={box}
          />
          <span aria-hidden className="w-16 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {unit}
          </span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={field.value}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-hint`}
        aria-valuetext={spoken(field.value)}
        onChange={(e) => field.slide(Number(e.target.value))}
        className="mt-2 block h-11 w-full cursor-pointer accent-foreground"
      />
      <p id={`${id}-hint`} className="text-sm text-muted-foreground">
        {hint}
      </p>
    </div>
  )
}

function Output({ label, children }: { label: string; children: string }) {
  return (
    <div aria-live="polite" aria-atomic="true" className="rounded-xl border border-border p-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words text-2xl font-semibold tabular-nums">{children}</dd>
    </div>
  )
}

/** The whitepaper's formulas with the visitor's own inputs. Designed, not active: every figure is an upper bound. */
export default function Calculator() {
  const years = useWhole(0, 32)
  const burn = useWhole(0, 100)
  const fees = useWhole(0, 500)

  const { k, f } = position(years.value)
  const cap = eraCap(k)
  const mined = allowance(k, f)
  const year = cap / ERA_YEARS
  const change = netChange(year, burn.value / 100, fees.value * 1e9)
  const ai = (n: number) => `${whole(n)} AI`

  return (
    <>
      <H2>Try the numbers.</H2>
      <div className="mt-4">
        <Tag>{designed}</Tag>
      </div>
      <Card className="mt-8 p-4 md:p-8">
        <p data-notice className="rounded-xl border border-border-strong p-4 text-base text-foreground">
          Illustrative until activation. These are upper bounds from the whitepaper's formulas with your own inputs. Real issuance depends on proved work.
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-12">
          <div className="space-y-8">
            <Control label="Years since activation" hint="assumes the nominal four-year era" unit="years" min={0} max={32} field={years} spoken={(n) => `${n} years`} />
            <Control label="Share of fees burned (β)" hint="From 0 to 100 percent." unit="%" min={0} max={100} field={burn} spoken={(n) => `${n} percent`} />
            <Control label="Fees settled that year (AI)" hint="From 0 to 500 billion AI." unit="billion" min={0} max={500} field={fees} spoken={(n) => `${n} billion AI`} />
          </div>
          <dl className="grid content-start gap-3 sm:grid-cols-2">
            <Output label="Era">{String(k + 1)}</Output>
            <Output label="Era cap">{ai(cap)}</Output>
            <Output label="Most that could have been mined by then">{ai(mined)}</Output>
            <Output label="Left in the pool">{ai(POOL - mined)}</Output>
            <Output label="Most that could be issued that year">{ai(year)}</Output>
            <Output label="Net supply change that year, at most">{`${signed(change)} AI`}</Output>
          </dl>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">Node earnings cannot be estimated yet: reward weights are not set (whitepaper, section 3.3).</p>
      </Card>
    </>
  )
}
