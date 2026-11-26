// The AI supply policy, as designed in the Hanzo AI Chain whitepaper (section 3).
// Designed, not active. Every figure is in whole AI. Pure functions, no dependencies.
//
// Exactness: the pool is 5^12 * 2^12, so every era cap and every era-boundary
// allowance is an exact float for the eras the page shows (k <= 25).

import { count } from './format'

/** Earned by proved work, nothing else. */
export const POOL = 1e12
/** The Hanzo DAO share, fixed at genesis. It can never be mined. */
export const DAO = 1e12
/** The hard cap. */
export const CAP = DAO + POOL
/** The nominal era length. Governance fixes the real one in blocks. */
export const ERA_YEARS = 4

const era = (k: number) => {
  if (!Number.isInteger(k) || k < 0) throw new RangeError(`era must be a whole number, 0 or more: ${k}`)
}
const nonNegative = (n: number, name: string) => {
  if (!Number.isFinite(n) || n < 0) throw new RangeError(`${name} must be a finite number, 0 or more: ${n}`)
}

/** The most one era (k = 0 is the first) may emit: POOL * 2^-(k+1). */
export function eraCap(k: number): number {
  era(k)
  return POOL * 2 ** -(k + 1)
}

/** Whitepaper eq. 2: the most that could have been mined in all, k whole eras in and share f of the next. */
export function allowance(k: number, f: number): number {
  era(k)
  if (!(f >= 0 && f < 1)) throw new RangeError(`f must be in [0, 1): ${f}`)
  return POOL * (1 - 2 ** -k) + f * POOL * 2 ** -(k + 1)
}

/** Whitepaper eq. 3: change in net supply when a governed share beta of settled fees is burned. */
export function netChange(issuance: number, beta: number, fees: number): number {
  nonNegative(issuance, 'issuance')
  nonNegative(fees, 'fees')
  if (!(beta >= 0 && beta <= 1)) throw new RangeError(`beta must be in [0, 1]: ${beta}`)
  return issuance - beta * fees
}

/** Whole years since activation, on the nominal era: the era index and the share of it already passed. */
export function position(years: number): { k: number; f: number } {
  if (!Number.isInteger(years) || years < 0) throw new RangeError(`years must be a whole number, 0 or more: ${years}`)
  return { k: Math.floor(years / ERA_YEARS), f: (years % ERA_YEARS) / ERA_YEARS }
}

/** A whole number of AI with thousands separators. Rounds only the float noise away: every figure here is a whole number. */
export function whole(n: number): string {
  if (!Number.isFinite(n)) throw new RangeError(`not a number: ${n}`)
  const r = Math.round(n)
  return count(r === 0 ? 0 : r)
}

/** As `whole`, always with a sign: + or a true minus. */
export function signed(n: number): string {
  const text = whole(n)
  return text.startsWith('-') ? `−${text.slice(1)}` : `+${text}`
}

/** A round supply figure in short form: 2e12 is "2T", 500e9 is "500B", 62.5e9 is "62.5B". Below a billion it is the whole number. */
export function short(n: number): string {
  if (!Number.isFinite(n) || n < 0) throw new RangeError(`not a supply figure: ${n}`)
  if (n >= 1e12) return `${+(n / 1e12).toFixed(5)}T`
  if (n >= 1e9) return `${+(n / 1e9).toFixed(5)}B`
  return whole(n)
}

/** As `short`, with the unit: 2e12 is "2T AI". */
export const shortAI = (n: number): string => `${short(n)} AI`
