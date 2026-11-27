import { afterEach, expect, test, vi } from 'vitest'
import {
  AUCTION_START_MS,
  fallbackAuction,
  formatCountdown,
  loadAuction,
  priceForWindowUsd,
} from './auction'

afterEach(() => {
  vi.restoreAllMocks()
})

test('priceForWindowUsd matches the 369-day simple non-compounding schedule', () => {
  expect(priceForWindowUsd(0)).toBe('0.01')
  expect(priceForWindowUsd(1)).toBe('0.0101')
  expect(priceForWindowUsd(100)).toBe('0.02')
  expect(priceForWindowUsd(368)).toBe('0.0468')
})

test('fallbackAuction computes pre_sale, active and ended windows deterministically', () => {
  const pre = fallbackAuction(AUCTION_START_MS - 3600_000)
  expect(pre.status).toBe('pre_sale')
  expect(pre.dayIndex).toBeNull()
  expect(pre.currentPriceUsd).toBe('0.01')
  expect(pre.countdownSeconds).toBe(3600)

  const day2 = fallbackAuction(AUCTION_START_MS + 2 * 86_400_000 + 60_000)
  expect(day2.status).toBe('active')
  expect(day2.dayIndex).toBe(2)
  expect(day2.currentPriceUsd).toBe('0.0102')
  expect(day2.nextDayPriceUsd).toBe('0.0103')
  expect(day2.lux.remainingUsd).toBe('25,000')
  expect(day2.zoo.remainingUsd).toBe('25,000')

  const ended = fallbackAuction(AUCTION_START_MS + 370 * 86_400_000)
  expect(ended.status).toBe('ended')
  expect(ended.nextDayPriceUsd).toBeNull()
})

test('loadAuction parses live /v1/auction JSON and falls back cleanly on 204 or failure', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response(null, { status: 204 }))
  const fromEmpty = await loadAuction(undefined, AUCTION_START_MS + 86_400_000)
  expect(fromEmpty.dayIndex).toBe(1)
  expect(fromEmpty.currentPriceUsd).toBe('0.0101')

  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
    new Response(
      JSON.stringify({
        window: {
          status: 'active',
          dayIndex: 10,
          countdownSeconds: 7200,
          currentPriceUsd: '0.011',
          nextDayPriceUsd: '0.0111',
          finalDayPriceUsd: '0.0468',
        },
        dailyCaps: {
          LUX: { remainingUsd: '60000', fillPercent: 40 },
          ZOO: { remainingUsd: '85000', fillPercent: 15 },
          combined: { remainingUsd: '145000', fillPercent: 27.5 },
        },
      }),
      { status: 200 },
    ),
  )
  const live = await loadAuction(undefined, AUCTION_START_MS + 10 * 86_400_000)
  expect(live.dayIndex).toBe(10)
  expect(live.lux.remainingUsd).toBe('60,000')
  expect(live.lux.fillPercent).toBe(40)
  expect(formatCountdown(live.countdownSeconds)).toBe('02:00:00')
})
