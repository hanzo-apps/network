import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  KeyRound,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { NetworkShell } from "@/components/network/NetworkShell";
import { MODELS_API, useLiveModels, type CatalogModel } from "@/lib/networkData";
import { useLogin } from "@/components/Try";

type FilterMode = "all" | "zen" | "other";

const INITIAL_VISIBLE_ROWS = 60;

function formatContextLength(ctx: number | null): string {
  if (ctx === null || ctx <= 0) return "—";
  if (ctx >= 1_000_000) {
    const m = ctx / 1_000_000;
    return `${Number.isInteger(m) ? m : m.toFixed(1)}M`;
  }
  if (ctx >= 1_000) {
    const k = Math.round(ctx / 1_000);
    return `${k}K`;
  }
  return ctx.toLocaleString();
}

/**
 * Formats USD per 1M tokens directly from the live `/v1/models` response.
 * Shows "$0.00" ONLY when the live catalog explicitly returns `0`.
 * Shows "Live catalog" when pricing fields are omitted (`null`).
 */
function formatPricePerMillion(value: number | null): string {
  if (value === null) return "Live catalog";
  if (value === 0) return "$0.00";
  if (value < 0.01) return `$${value.toFixed(4)}`;
  if (value < 1) return `$${value.toFixed(3).replace(/0$/, "")}`;
  return `$${value.toFixed(2)}`;
}

function buildCurlCommand(modelId: string): string {
  return `curl https://api.hanzo.ai/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $HANZO_API_KEY" \\
  -d '{
    "model": "${modelId}",
    "messages": [
      { "role": "user", "content": "Hello from Hanzo Network." }
    ]
  }'`;
}

export function NetworkPricing() {
  const { status, models, totalCount, zenCount, retry } = useLiveModels();
  const loginHref = useLogin();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [showAll, setShowAll] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState("zen4");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCurl, setCopiedCurl] = useState(false);

  useEffect(() => {
    document.title = "Pricing & Live Models — Hanzo Network";
  }, []);

  // Keep default curl model aligned with an actual live Zen model when loaded
  useEffect(() => {
    if (status === "live" && models.length > 0) {
      const hasCurrent = models.some((m) => m.id === selectedModelId);
      if (!hasCurrent) {
        const firstZen = models.find((m) => m.isZen);
        setSelectedModelId(firstZen ? firstZen.id : models[0].id);
      }
    }
  }, [status, models, selectedModelId]);

  const otherCount = Math.max(0, totalCount - zenCount);

  const filteredModels = useMemo(() => {
    const q = query.trim().toLowerCase();
    return models.filter((m: CatalogModel) => {
      if (filter === "zen" && !m.isZen) return false;
      if (filter === "other" && m.isZen) return false;
      if (!q) return true;
      return m.id.toLowerCase().includes(q) || m.ownedBy.toLowerCase().includes(q);
    });
  }, [models, filter, query]);

  const visibleModels =
    showAll || query.trim() !== ""
      ? filteredModels
      : filteredModels.slice(0, INITIAL_VISIBLE_ROWS);

  const curlSnippet = buildCurlCommand(selectedModelId);

  const copyModelId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 1600);
    } catch {
      // Clipboard unavailable
    }
  };

  const copyCurl = async () => {
    try {
      await navigator.clipboard.writeText(curlSnippet);
      setCopiedCurl(true);
      window.setTimeout(() => setCopiedCurl(false), 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <NetworkShell>
      {/* Hero & Live Catalog Telemetry */}
      <section className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
              <span
                className={`h-1.5 w-1.5 rounded-full bg-[var(--foreground)] ${
                  status === "live" ? "opacity-100" : "opacity-40"
                }`}
              />
              <span>
                {status === "live"
                  ? "Live Gateway Catalog"
                  : status === "loading"
                    ? "Fetching /v1/models…"
                    : "Catalog Unavailable"}
              </span>
            </span>
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] text-[var(--muted-foreground)]">
              GET {MODELS_API}
            </span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.06] text-[var(--foreground)]">
              Live model catalog & transparent API pricing.
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)]">
              Every model below is fetched live from{" "}
              <code className="font-mono text-sm text-[var(--foreground)]">
                api.hanzo.ai/v1/models
              </code>
              . Route across open-weight Zen models and third-party frontier providers with one
              OpenAI-compatible endpoint and API key.
            </p>
          </div>

          {/* Live Counts Strip */}
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Total Live Models
              </div>
              <div className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] tabular-nums">
                {status === "loading" ? (
                  <span className="inline-block h-8 w-20 animate-pulse rounded-md bg-[var(--surface-elevated)]" />
                ) : status === "live" ? (
                  totalCount.toLocaleString()
                ) : (
                  "—"
                )}
              </div>
              <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                Direct from /v1/models
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Zen Models
              </div>
              <div className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] tabular-nums">
                {status === "loading" ? (
                  <span className="inline-block h-8 w-16 animate-pulse rounded-md bg-[var(--surface-elevated)]" />
                ) : status === "live" ? (
                  zenCount.toLocaleString()
                ) : (
                  "—"
                )}
              </div>
              <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                Hanzo open-weight family
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Other Providers
              </div>
              <div className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] tabular-nums">
                {status === "loading" ? (
                  <span className="inline-block h-8 w-16 animate-pulse rounded-md bg-[var(--surface-elevated)]" />
                ) : status === "live" ? (
                  otherCount.toLocaleString()
                ) : (
                  "—"
                )}
              </div>
              <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                Unified router catalog
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Hosted Plans
              </div>
              <div className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] tabular-nums">
                $15 / $95
              </div>
              <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                Pro & Max on{" "}
                <a
                  href="https://hanzo.ai/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)] underline underline-offset-2"
                >
                  hanzo.ai/pricing
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Filter & Live Model Table */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          {/* Controls Bar */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter model providers">
              {(
                [
                  { id: "all", label: "All", count: totalCount },
                  { id: "zen", label: "Zen", count: zenCount },
                  { id: "other", label: "Other Providers", count: otherCount },
                ] as const
              ).map((pill) => {
                const active = filter === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => {
                      setFilter(pill.id);
                      setShowAll(false);
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                      active
                        ? "bg-[var(--foreground)] text-[var(--background)]"
                        : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <span>{pill.label}</span>
                    {status === "live" ? (
                      <span
                        className={`font-mono text-[11px] tabular-nums ${
                          active ? "opacity-80" : "text-[var(--muted-foreground)]"
                        }`}
                      >
                        {pill.count}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-80">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <label htmlFor="model-search-input" className="sr-only">
                  Search models by ID or provider
                </label>
                <input
                  id="model-search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search model ID or provider…"
                  className="w-full rounded-full border border-[var(--border-strong)] bg-[var(--background)] py-2 pl-10 pr-9 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>

              <button
                type="button"
                onClick={retry}
                aria-label="Refresh live model catalog"
                title="Refresh live model catalog"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)] transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${status === "loading" ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Error State */}
          {status === "error" ? (
            <div
              role="alert"
              className="rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] p-8 text-center"
            >
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)]">
                <AlertCircle className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Unable to reach live model catalog
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--muted-foreground)]">
                The browser could not fetch{" "}
                <code className="font-mono text-xs text-[var(--foreground)]">{MODELS_API}</code>.
                Check your connection or network status and retry.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={retry}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] hover:opacity-85 transition-opacity"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Retry Live Fetch</span>
                </button>
                <a
                  href="https://status.hanzo.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-colors"
                >
                  <span>Check Status</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--background)]">
                <table className="w-full min-w-[700px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--surface-elevated)] font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      <th className="px-5 py-3.5 font-medium">Model ID</th>
                      <th className="px-5 py-3.5 font-medium">Owner / Provider</th>
                      <th className="px-5 py-3.5 font-medium text-right">Context</th>
                      <th className="px-5 py-3.5 font-medium text-right">Input / 1M</th>
                      <th className="px-5 py-3.5 font-medium text-right">Output / 1M</th>
                      <th className="px-5 py-3.5 font-medium text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[var(--border)]">
                    {/* Honest Loading Skeleton */}
                    {status === "loading"
                      ? Array.from({ length: 10 }).map((_, idx) => (
                          <tr key={idx}>
                            <td className="px-5 py-4">
                              <div className="h-4 w-48 animate-pulse rounded bg-[var(--surface-elevated)]" />
                            </td>
                            <td className="px-5 py-4">
                              <div className="h-4 w-24 animate-pulse rounded bg-[var(--surface-elevated)]" />
                            </td>
                            <td className="px-5 py-4 text-right">
                              <div className="ml-auto h-4 w-12 animate-pulse rounded bg-[var(--surface-elevated)]" />
                            </td>
                            <td className="px-5 py-4 text-right">
                              <div className="ml-auto h-4 w-16 animate-pulse rounded bg-[var(--surface-elevated)]" />
                            </td>
                            <td className="px-5 py-4 text-right">
                              <div className="ml-auto h-4 w-16 animate-pulse rounded bg-[var(--surface-elevated)]" />
                            </td>
                            <td className="px-5 py-4 text-right">
                              <div className="ml-auto h-6 w-14 animate-pulse rounded-full bg-[var(--surface-elevated)]" />
                            </td>
                          </tr>
                        ))
                      : null}

                    {/* Empty Search Result */}
                    {status === "live" && visibleModels.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-12 text-center">
                          <p className="text-sm text-[var(--muted-foreground)]">
                            No live models match{" "}
                            <span className="font-mono text-[var(--foreground)]">
                              &ldquo;{query}&rdquo;
                            </span>{" "}
                            in this filter.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setQuery("");
                              setFilter("all");
                            }}
                            className="mt-3 rounded-full border border-[var(--border-strong)] px-4 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-colors"
                          >
                            Reset filters
                          </button>
                        </td>
                      </tr>
                    ) : null}

                    {/* Live Model Rows */}
                    {status === "live"
                      ? visibleModels.map((model) => {
                          const inputLabel = formatPricePerMillion(model.inputPerMillion);
                          const outputLabel = formatPricePerMillion(model.outputPerMillion);
                          const isSelected = selectedModelId === model.id;

                          return (
                            <tr
                              key={model.id}
                              className="hover:bg-[var(--surface)] transition-colors"
                            >
                              <td className="px-5 py-3.5 align-middle">
                                <div className="flex items-center gap-2">
                                  <code className="font-mono text-xs sm:text-[13px] font-medium text-[var(--foreground)]">
                                    {model.id}
                                  </code>
                                  {model.isZen ? (
                                    <span className="rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--foreground)]">
                                      Zen
                                    </span>
                                  ) : null}
                                </div>
                              </td>
                              <td className="px-5 py-3.5 align-middle font-mono text-xs text-[var(--muted-foreground)]">
                                {model.ownedBy}
                              </td>
                              <td className="px-5 py-3.5 align-middle text-right font-mono text-xs tabular-nums text-[var(--foreground)]">
                                {formatContextLength(model.contextLength)}
                              </td>
                              <td
                                className={`px-5 py-3.5 align-middle text-right font-mono text-xs tabular-nums ${
                                  model.inputPerMillion === null
                                    ? "text-[var(--muted-foreground)]"
                                    : "text-[var(--foreground)]"
                                }`}
                              >
                                {inputLabel}
                              </td>
                              <td
                                className={`px-5 py-3.5 align-middle text-right font-mono text-xs tabular-nums ${
                                  model.outputPerMillion === null
                                    ? "text-[var(--muted-foreground)]"
                                    : "text-[var(--foreground)]"
                                }`}
                              >
                                {outputLabel}
                              </td>
                              <td className="px-5 py-3.5 align-middle text-right">
                                <div className="inline-flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => copyModelId(model.id)}
                                    aria-label={`Copy model ID ${model.id}`}
                                    className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--foreground)] hover:border-[var(--border-strong)] transition-colors"
                                  >
                                    {copiedId === model.id ? (
                                      <Check className="h-3 w-3" />
                                    ) : (
                                      <Copy className="h-3 w-3" />
                                    )}
                                    <span>{copiedId === model.id ? "Copied" : "ID"}</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedModelId(model.id)}
                                    className={`rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors ${
                                      isSelected
                                        ? "bg-[var(--foreground)] text-[var(--background)]"
                                        : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                                    }`}
                                  >
                                    {isSelected ? "In curl" : "Use"}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>

              {/* Table Footer / Show All Toggle */}
              {status === "live" ? (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted-foreground)]">
                  <span className="tabular-nums">
                    Showing {visibleModels.length.toLocaleString()} of{" "}
                    {filteredModels.length.toLocaleString()} matching models
                    {query.trim() === "" && filter === "all"
                      ? ` (${totalCount.toLocaleString()} total live)`
                      : ""}
                    . Pricing cells show{" "}
                    <span className="font-mono text-[var(--foreground)]">Live catalog</span> when
                    omitted by <code className="font-mono">/v1/models</code>.
                  </span>

                  {!showAll && query.trim() === "" && filteredModels.length > INITIAL_VISIBLE_ROWS ? (
                    <button
                      type="button"
                      onClick={() => setShowAll(true)}
                      className="rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-4 py-1.5 font-medium text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-colors tabular-nums"
                    >
                      Show all {filteredModels.length.toLocaleString()} models
                    </button>
                  ) : null}
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      {/* Bottom Grid: 3-Step Curl Quickstart + Subscription Handoff Card */}
      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* 3-Step Copyable curl Quickstart Card */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted-foreground)]">
                      API Quickstart
                    </div>
                    <h2 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                      3-step copyable <code className="font-mono">curl</code>
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={copyCurl}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-3.5 py-1.5 font-mono text-xs text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-colors"
                  >
                    {copiedCurl ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedCurl ? "Copied" : "Copy curl"}</span>
                  </button>
                </div>

                <ol className="mb-5 grid gap-3 sm:grid-cols-3 text-xs">
                  <li className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      Step 01
                    </div>
                    <div className="mt-1 font-semibold text-[var(--foreground)]">
                      Create API Key
                    </div>
                    <a
                      href={loginHref}
                      className="mt-1 inline-flex items-center gap-1 text-[var(--muted-foreground)] underline underline-offset-2 hover:text-[var(--foreground)]"
                    >
                      <span>Sign in on hanzo.ai</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </li>
                  <li className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      Step 02
                    </div>
                    <div className="mt-1 font-semibold text-[var(--foreground)]">
                      Pick a Model ID
                    </div>
                    <div className="mt-1 truncate font-mono text-[11px] text-[var(--muted-foreground)]">
                      {selectedModelId}
                    </div>
                  </li>
                  <li className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      Step 03
                    </div>
                    <div className="mt-1 font-semibold text-[var(--foreground)]">
                      Connect MCP
                    </div>
                    <Link
                      to="/build"
                      className="mt-1 inline-flex items-center gap-1 text-[var(--muted-foreground)] underline underline-offset-2 hover:text-[var(--foreground)]"
                    >
                      <span>Open /build guide</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </li>
                </ol>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2 font-mono text-[11px] text-[var(--muted-foreground)]">
                    <span className="inline-flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5" />
                      <span>terminal</span>
                    </span>
                    <span>model: {selectedModelId}</span>
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-[var(--foreground)]">
                    <code>{curlSnippet}</code>
                  </pre>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--background)] px-6 py-4 text-xs text-[var(--muted-foreground)]">
                <span>Click &ldquo;Use&rdquo; on any row above to swap the model in this snippet.</span>
                <a
                  href={loginHref}
                  className="inline-flex items-center gap-1.5 font-medium text-[var(--foreground)] hover:opacity-75 transition-opacity"
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  <span>Provision API Key</span>
                </a>
              </div>
            </div>

            {/* Subscription Plans Handoff Card */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted-foreground)]">
                    Subscription Plans
                  </span>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--background)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    Managed on hanzo.ai
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                  Hosted plans & bundled credits
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  Prefer predictable monthly seats alongside pay-as-you-go API metering? Billing and
                  subscription checkout live on{" "}
                  <span className="font-mono text-xs text-[var(--foreground)]">
                    hanzo.ai/pricing
                  </span>
                  .
                </p>

                <div className="mt-6 space-y-3">
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-semibold text-[var(--foreground)]">Pro</h3>
                      <div className="font-mono text-lg font-semibold text-[var(--foreground)] tabular-nums">
                        $15<span className="text-xs font-normal text-[var(--muted-foreground)]">/mo</span>
                      </div>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                      Individual developers and daily agent workflows with hosted Zen access, CLI
                      tooling, and API starter quota.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--background)] p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-semibold text-[var(--foreground)]">Max</h3>
                      <div className="font-mono text-lg font-semibold text-[var(--foreground)] tabular-nums">
                        $95<span className="text-xs font-normal text-[var(--muted-foreground)]">/mo</span>
                      </div>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                      High-throughput builders and multi-agent engineering with expanded frontier
                      quotas and priority routing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3 border-t border-[var(--border)] pt-5">
                <a
                  href="https://hanzo.ai/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] hover:opacity-85 transition-opacity"
                >
                  <span>Compare Plans on hanzo.ai/pricing</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <p className="text-center text-[11px] text-[var(--muted-foreground)]">
                  Checkout and account billing are owned exclusively by hanzo.ai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </NetworkShell>
  );
}

export default NetworkPricing;
