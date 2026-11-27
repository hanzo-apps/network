import { useEffect, useState } from 'react'
import { count, decimals } from './format'
import { TOKEN_AUCTION_URL } from './links'
import { request } from './request'

export const AUCTION_START_MS = Date.UTC(2026, 10, 16)
export const AUCTION_WINDOWS = 369
export const AUCTION_FINAL_DAY = 368
export const AUCTION_LOCKUP_DAYS = 182
const MS_PER_DAY = 86_400_000

export interface EcosystemCapState {
  symbol: 'LUX' | 'ZOO'
  bridgedSymbol: 'wLUX' | 'wZOO'
  sourceChainId: number
  maxSharePercent: number
  remainingUsd: string
  fillPercent: number
}

export interface AuctionState {
  status: 'pre_sale' | 'active' | 'ended'
  dayIndex: number | null
  countdownSeconds: number
  currentPriceUsd: string
  nextDayPriceUsd: string | null
  finalDayPriceUsd: string
  lux: EcosystemCapState
  zoo: EcosystemCapState
  combinedRemainingUsd: string
  combinedFillPercent: number
}

export function priceForWindowUsd(day: number): string {
  const bps = 100 + day
  const whole = Math.floor(bps / 10_000)
  const frac = String(bps % 10_000).padStart(4, '0').replace(/0+$/, '') || '0'
  return `${whole}.${frac}`
}

export function formatCountdown(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds))
  const d = Math.floor(safe / 86_400)
  const h = Math.floor((safe % 86_400) / 3_600)
  const m = Math.floor((safe % 3_600) / 60)
  const s = safe % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return d > 0 ? `${count(d)}d ${pad(h)}h ${pad(m)}m ${pad(s)}s` : `${pad(h)}:${pad(m)}:${pad(s)}`
}

function formatUsdWhole(raw: unknown, fallback: number): string {
  const n = typeof raw === 'string' || typeof raw === 'number' ? Number(raw) : NaN
  return count(Number.isFinite(n) && n >= 0 ? Math.round(n) : fallback)
}

export function fallbackAuction(nowMs: number = Date.now()): AuctionState {
  const endMs = AUCTION_START_MS + AUCTION_WINDOWS * MS_PER_DAY
  let status: AuctionState['status'] = 'active'
  let dayIndex: number | null = 0
  let countdownSeconds = 0
  let currentPriceUsd = '0.01'
  let nextDayPriceUsd: string | null = '0.0101'

  if (nowMs < AUCTION_START_MS) {
    status = 'pre_sale'
    dayIndex = null
    countdownSeconds = Math.max(0, Math.ceil((AUCTION_START_MS - nowMs) / 1000))
    currentPriceUsd = '0.01'
    nextDayPriceUsd = '0.0101'
  } else if (nowMs >= endMs) {
    status = 'ended'
    dayIndex = null
    countdownSeconds = 0
    currentPriceUsd = '0.0468'
    nextDayPriceUsd = null
  } else {
    status = 'active'
    dayIndex = Math.floor((nowMs - AUCTION_START_MS) / MS_PER_DAY)
    const windowEnd = AUCTION_START_MS + (dayIndex + 1) * MS_PER_DAY
    countdownSeconds = Math.max(0, Math.ceil((windowEnd - nowMs) / 1000))
    currentPriceUsd = priceForWindowUsd(dayIndex)
    nextDayPriceUsd = dayIndex < AUCTION_FINAL_DAY ? priceForWindowUsd(dayIndex + 1) : null
  }

  return {
    status,
    dayIndex,
    countdownSeconds,
    currentPriceUsd,
    nextDayPriceUsd,
    finalDayPriceUsd: '0.0468',
    lux: {
      symbol: 'LUX',
      bridgedSymbol: 'wLUX',
      sourceChainId: 96369,
      maxSharePercent: 10,
      remainingUsd: count(25_000),
      fillPercent: 0,
    },
    zoo: {
      symbol: 'ZOO',
      bridgedSymbol: 'wZOO',
      sourceChainId: 200200,
      maxSharePercent: 10,
      remainingUsd: count(25_000),
      fillPercent: 0,
    },
    combinedRemainingUsd: count(50_000),
    combinedFillPercent: 0,
  }
}

interface RawAuctionResponse {
  window?: {
    status?: 'pre_sale' | 'active' | 'ended'
    dayIndex?: number | null
    countdownSeconds?: number
    currentPriceUsd?: string
    nextDayPriceUsd?: string | null
    finalDayPriceUsd?: string
  }
  dailyCaps?: {
    LUX?: { remainingUsd?: string; fillPercent?: number; maxSharePercent?: number }
    ZOO?: { remainingUsd?: string; fillPercent?: number; maxSharePercent?: number }
    combined?: { remainingUsd?: string; fillPercent?: number }
  }
}

export async function loadAuction(signal?: AbortSignal, nowMs: number = Date.now()): Promise<AuctionState> {
  const base = fallbackAuction(nowMs)
  try {
    const res = await request(TOKEN_AUCTION_URL, { signal }, 4_000)
    const text = await res.text()
    if (!text.trim()) return base
    const parsed = JSON.parse(text) as RawAuctionResponse
    if (!parsed || typeof parsed !== 'object' || !parsed.window || !parsed.dailyCaps) return base

    const clampPct = (v: unknown) => {
      const n = typeof v === 'number' ? v : Number(v)
      return Number.isFinite(n) ? Math.min(100, Math.max(0, Number(decimals(n, 1).replace(/,/g, '')))) : 0
    }

    return {
      status: parsed.window.status ?? base.status,
      dayIndex: typeof parsed.window.dayIndex === 'number' ? parsed.window.dayIndex : base.dayIndex,
      countdownSeconds:
        typeof parsed.window.countdownSeconds === 'number'
          ? Math.max(0, Math.floor(parsed.window.countdownSeconds))
          : base.countdownSeconds,
      currentPriceUsd:
        typeof parsed.window.currentPriceUsd === 'string'
          ? parsed.window.currentPriceUsd
          : base.currentPriceUsd,
      nextDayPriceUsd:
        parsed.window.nextDayPriceUsd === null || typeof parsed.window.nextDayPriceUsd === 'string'
          ? parsed.window.nextDayPriceUsd
          : base.nextDayPriceUsd,
      finalDayPriceUsd:
        typeof parsed.window.finalDayPriceUsd === 'string'
          ? parsed.window.finalDayPriceUsd
          : base.finalDayPriceUsd,
      lux: {
        ...base.lux,
        remainingUsd: formatUsdWhole(parsed.dailyCaps.LUX?.remainingUsd, 25_000),
        fillPercent: clampPct(parsed.dailyCaps.LUX?.fillPercent),
      },
      zoo: {
        ...base.zoo,
        remainingUsd: formatUsdWhole(parsed.dailyCaps.ZOO?.remainingUsd, 25_000),
        fillPercent: clampPct(parsed.dailyCaps.ZOO?.fillPercent),
      },
      combinedRemainingUsd: formatUsdWhole(parsed.dailyCaps.combined?.remainingUsd, 50_000),
      combinedFillPercent: clampPct(parsed.dailyCaps.combined?.fillPercent),
    }
  } catch {
    return base
  }
}

export function useAuction(): AuctionState {
  const [state, setState] = useState<AuctionState>(() => fallbackAuction())

  useEffect(() => {
    const ctrl = new AbortController()
    void loadAuction(ctrl.signal).then((next) => {
      if (!ctrl.signal.aborted) setState(next)
    })

    const tick = setInterval(() => {
      setState((prev) =>
        prev.countdownSeconds > 1
          ? { ...prev, countdownSeconds: prev.countdownSeconds - 1 }
          : fallbackAuction(),
      )
    }, 1_000)

    return () => {
      ctrl.abort()
      clearInterval(tick)
    }
  }, [])

  return state
}
