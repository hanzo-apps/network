/** The one place numbers become text: en-US, grouped by thousands. */

const places = (max: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: max, useGrouping: true })
const whole = places(0)

const finite = (n: number) => {
  if (!Number.isFinite(n)) throw new RangeError(`not a number: ${n}`)
}

/** A count with thousands separators, to the nearest whole number: 1052729 is "1,052,729". */
export function count(n: number): string {
  finite(n)
  return whole.format(n)
}

/** A number with thousands separators and at most `max` decimal places, none of them trailing zeros. */
export function decimals(n: number, max: number): string {
  finite(n)
  return places(max).format(n)
}
