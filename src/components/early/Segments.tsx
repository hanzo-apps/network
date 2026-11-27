import type { ReactNode } from 'react'

export type Option<T extends string> = { value: T; label: string }

/**
 * A native radio group drawn as pills: the arrow keys, Tab and the form all work as the browser makes them.
 * The input lies invisibly over its label, so the whole pill is the 44px target; the pill beside it shows the choice, inverted, never tinted.
 */
export default function Segments<T extends string>({
  legend,
  hideLegend = false,
  name,
  options,
  value,
  onChange,
  describedBy,
  disabled = false,
  children,
}: {
  legend: string
  hideLegend?: boolean
  name: string
  options: Option<T>[]
  value: T | ''
  onChange: (v: T) => void
  describedBy?: string
  /** Every choice is off, as the native fieldset makes them, while something is being sent. */
  disabled?: boolean
  /** Under the pills, inside the group: a visible error. */
  children?: ReactNode
}) {
  return (
    <fieldset aria-describedby={describedBy} disabled={disabled} className="min-w-0">
      <legend className={hideLegend ? 'sr-only' : 'mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground'}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="relative inline-flex min-h-11 cursor-pointer">
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="peer absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0" />
            <span className="inline-flex min-h-11 items-center rounded-full border border-border-strong px-5 text-base font-medium text-foreground transition-colors duration-150 peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring peer-disabled:opacity-60">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {children}
    </fieldset>
  )
}
