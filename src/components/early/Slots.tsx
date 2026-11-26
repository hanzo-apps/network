import { Fragment } from 'react'

/**
 * The look of an invite code, as a readout: a fixed `HNZ-`, then two groups of five boxes with a hairline between them.
 * It only draws. The real input lies over it, so typing, paste and the screen reader all meet one ordinary text field.
 * `active` marks the box the next character lands in; `selected` inverts them all.
 */
export default function Slots({ value, active = -1, selected = false }: { value: string; active?: number; selected?: boolean }) {
  return (
    <span aria-hidden="true" className="grid w-full grid-cols-[auto_repeat(5,minmax(0,1fr))_auto_repeat(5,minmax(0,1fr))] items-center gap-1 font-mono">
      <span data-prefix className="pr-2 text-xl text-muted-foreground md:text-2xl">
        HNZ-
      </span>
      {Array.from({ length: 10 }, (_, i) => (
        <Fragment key={i}>
          {i === 5 && <span className="mx-0.5 h-px w-2 bg-border-strong md:w-3" />}
          <span
            data-slot
            data-active={active === i}
            className={`flex h-12 min-w-0 items-center justify-center rounded-md border text-xl tabular-nums md:h-14 md:text-2xl ${
              selected ? 'border-foreground bg-foreground text-background' : active === i ? 'border-foreground' : 'border-border-strong'
            }`}
          >
            {value[i] ?? ''}
          </span>
        </Fragment>
      ))}
    </span>
  )
}
