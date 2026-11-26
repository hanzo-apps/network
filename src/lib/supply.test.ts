import { describe, expect, test } from 'vitest'
import { CAP, DAO, ERA_YEARS, POOL, allowance, eraCap, netChange, position, short, shortAI, signed, whole } from './supply'

describe('constants', () => {
  test('two trillion in all: half the DAO, half the pool', () => {
    expect(POOL).toBe(1e12)
    expect(DAO).toBe(1e12)
    expect(CAP).toBe(2e12)
    expect(DAO + POOL).toBe(CAP)
  })
})

describe('eraCap', () => {
  test('hand-computed: 500B, 250B, 125B', () => {
    expect(eraCap(0)).toBe(500e9)
    expect(eraCap(1)).toBe(250e9)
    expect(eraCap(2)).toBe(125e9)
  })
  test('the eight eras the chart shows, in billions', () => {
    expect([0, 1, 2, 3, 4, 5, 6, 7].map((k) => eraCap(k) / 1e9)).toEqual([500, 250, 125, 62.5, 31.25, 15.625, 7.8125, 3.90625])
  })
  test('each era is exactly half the last, however far', () => {
    for (let k = 0; k < 60; k++) expect(eraCap(k + 1) * 2).toBe(eraCap(k))
  })
  test('large k is tiny and positive, never zero or negative', () => {
    expect(eraCap(100)).toBeGreaterThan(0)
    expect(eraCap(100)).toBeLessThan(1e-18)
  })
  test('rejects negative, fractional and non-numeric eras', () => {
    for (const k of [-1, 0.5, NaN, Infinity, -Infinity]) expect(() => eraCap(k)).toThrow(RangeError)
  })
})

describe('allowance', () => {
  test('nothing is minable at activation', () => {
    expect(allowance(0, 0)).toBe(0)
  })
  test('hand-computed at era boundaries', () => {
    expect(allowance(1, 0)).toBe(500e9)
    expect(allowance(2, 0)).toBe(750e9)
    expect(allowance(3, 0)).toBe(875e9)
  })
  test('hand-computed inside an era', () => {
    expect(allowance(0, 0.5)).toBe(250e9)
    expect(allowance(1, 0.5)).toBe(625e9)
    expect(allowance(2, 0.25)).toBe(781.25e9)
  })
  test('is the sum of the era caps before it, plus the share of this one', () => {
    for (let k = 0; k <= 25; k++) {
      let sum = 0
      for (let j = 0; j < k; j++) sum += eraCap(j)
      expect(allowance(k, 0)).toBe(sum)
      expect(allowance(k, 0.5)).toBe(sum + eraCap(k) / 2)
    }
  })
  test('the sum of the eras converges to the pool and never reaches it', () => {
    for (let n = 1; n <= 30; n++) expect(allowance(n, 0)).toBe(POOL - eraCap(n - 1))
    for (let n = 1; n <= 30; n++) expect(allowance(n, 0)).toBeLessThan(POOL)
    // Beyond k = 25 a float cannot hold the allowance to the unit; the page never goes past k = 8.
    expect(POOL - allowance(40, 0)).toBeCloseTo(POOL * 2 ** -40, 3)
  })
  test('the limit of every era, f just below 1, stays under one trillion', () => {
    const almost = 1 - 2 ** -53
    for (let k = 0; k <= 30; k++) expect(allowance(k, almost)).toBeLessThan(1e12)
  })
  test('never exceeds the pool, even where floats run out of room', () => {
    for (const k of [31, 52, 53, 64, 100, 1000]) {
      for (const f of [0, 0.5, 1 - 2 ** -53]) expect(allowance(k, f)).toBeLessThanOrEqual(1e12)
    }
  })
  test('never falls as time passes', () => {
    let last = -1
    for (let k = 0; k < 12; k++) {
      for (const f of [0, 0.25, 0.5, 0.75]) {
        const a = allowance(k, f)
        expect(a).toBeGreaterThan(last)
        last = a
      }
    }
  })
  test('rejects a bad era or a share outside [0, 1)', () => {
    for (const k of [-1, 1.5, NaN, Infinity]) expect(() => allowance(k, 0)).toThrow(RangeError)
    for (const f of [-0.1, 1, 1.5, NaN, Infinity]) expect(() => allowance(0, f)).toThrow(RangeError)
  })
})

describe('netChange', () => {
  test('hand-computed: issuance minus beta times fees', () => {
    expect(netChange(100, 0.5, 80)).toBe(60)
    expect(netChange(100, 0, 80)).toBe(100)
    expect(netChange(100, 1, 80)).toBe(20)
    expect(netChange(31.25e9, 1, 50e9)).toBe(-18.75e9)
  })
  test('burn can outrun issuance, so supply can fall', () => {
    expect(netChange(eraCap(7) / ERA_YEARS, 0.5, 100e9)).toBeLessThan(0)
  })
  test('rejects beta outside [0, 1], negative issuance or fees, and NaN', () => {
    for (const b of [-0.1, 1.1, NaN]) expect(() => netChange(1, b, 1)).toThrow(RangeError)
    expect(() => netChange(-1, 0.5, 1)).toThrow(RangeError)
    expect(() => netChange(1, 0.5, -1)).toThrow(RangeError)
    expect(() => netChange(NaN, 0.5, 1)).toThrow(RangeError)
    expect(() => netChange(1, 0.5, NaN)).toThrow(RangeError)
  })
})

describe('position', () => {
  test('years since activation become an era and a share of it, on the nominal four-year era', () => {
    expect(ERA_YEARS).toBe(4)
    expect(position(0)).toEqual({ k: 0, f: 0 })
    expect(position(3)).toEqual({ k: 0, f: 0.75 })
    expect(position(4)).toEqual({ k: 1, f: 0 })
    expect(position(5)).toEqual({ k: 1, f: 0.25 })
    expect(position(32)).toEqual({ k: 8, f: 0 })
  })
  test('rejects negative, fractional and non-numeric years', () => {
    for (const y of [-1, 0.5, NaN, Infinity]) expect(() => position(y)).toThrow(RangeError)
  })
  test('feeds allowance without ever leaving its domain', () => {
    for (let y = 0; y <= 32; y++) {
      const { k, f } = position(y)
      expect(() => allowance(k, f)).not.toThrow()
    }
  })
})

describe('display', () => {
  test('whole rounds float noise away and groups by thousands', () => {
    expect(whole(500e9)).toBe('500,000,000,000')
    expect(whole(0)).toBe('0')
    expect(whole(20999999999.999996)).toBe('21,000,000,000')
    expect(whole(976562500)).toBe('976,562,500')
  })
  test('signed always shows a sign, with a true minus', () => {
    expect(signed(5)).toBe('+5')
    expect(signed(0)).toBe('+0')
    expect(signed(-0.2)).toBe('+0')
    expect(signed(-1234)).toBe('−1,234')
    expect(signed(1.25e9)).toBe('+1,250,000,000')
  })
  test('rejects non-finite values', () => {
    expect(() => whole(NaN)).toThrow(RangeError)
    expect(() => signed(Infinity)).toThrow(RangeError)
  })
})

describe('short and shortAI', () => {
  test('the figures the pages print, exactly', () => {
    expect(shortAI(CAP)).toBe('2T AI')
    expect(shortAI(DAO)).toBe('1T AI')
    expect(shortAI(POOL)).toBe('1T AI')
    expect(short(eraCap(0))).toBe('500B')
    expect(short(eraCap(1))).toBe('250B')
    expect(short(eraCap(2))).toBe('125B')
  })
  test('fractions and small figures', () => {
    expect(short(eraCap(3))).toBe('62.5B')
    expect(short(eraCap(7))).toBe('3.90625B')
    expect(short(0)).toBe('0')
    expect(shortAI(0)).toBe('0 AI')
    expect(short(1234567)).toBe('1,234,567')
  })
  test('rejects what is not a supply figure', () => {
    for (const n of [-1, NaN, Infinity]) expect(() => short(n)).toThrow(RangeError)
  })
})
