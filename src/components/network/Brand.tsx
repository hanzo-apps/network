import React, { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

/**
 * Canonical 5-path geometric Hanzo block-H mark (`viewBox="0 0 67 67"`).
 * Uses `fill="currentColor"` so it themes strictly monochrome in light and dark mode.
 */
export function HanzoMark({
  size = 24,
  title = "Hanzo",
  className = "",
}: {
  size?: number;
  title?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 67 67"
      fill="currentColor"
      role="img"
      aria-label={title}
      className={className}
    >
      <path d="M22.21 67V44.6369H0V67H22.21Z" />
      <path d="M66.7038 22.3184H22.2534L0.0878906 44.6367H44.4634L66.7038 22.3184Z" />
      <path d="M22.21 0H0V22.3184H22.21V0Z" />
      <path d="M66.7198 0H44.5098V22.3184H66.7198V0Z" />
      <path d="M66.7198 67V44.6369H44.5098V67H66.7198Z" />
    </svg>
  );
}

/**
 * Lowercase wordmark for the top-left header corner (`hanzo network`).
 * Set in Zen 600 with tight optical tracking, zero icon clutter.
 */
export function HanzoWordmark({
  sub = "network",
  className = "",
}: {
  sub?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-baseline gap-1.5 select-none text-[var(--foreground)] ${className}`}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "1.125rem",
        fontWeight: 600,
        letterSpacing: "-0.03em",
        lineHeight: 1,
      }}
    >
      <span className="lowercase">hanzo</span>
      {sub ? (
        <span className="lowercase font-normal text-[var(--muted-foreground)]">
          {sub}
        </span>
      ) : null}
    </span>
  );
}

/**
 * Fixed bottom-right block-H mark launcher.
 * Hands questions directly to hanzo.app via a plain GET form (makes zero API calls).
 */
export function BottomRightLauncher() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div
          role="dialog"
          aria-label="Ask Hanzo"
          className="w-[320px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] p-4 shadow-2xl"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HanzoMark size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                Ask Hanzo
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close Ask Hanzo"
              className="rounded-full p-1 text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mb-3 text-xs leading-relaxed text-[var(--muted-foreground)]">
            Ask anything about Proof of AI, running a{" "}
            <code className="font-mono text-[var(--foreground)]">hanzod</code> node, or
            calling 550+ models. Hands off directly to{" "}
            <span className="text-[var(--foreground)]">hanzo.app</span> — no sign-in
            required.
          </p>

          <form
            action="https://hanzo.app/chat"
            method="get"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-2"
          >
            <label htmlFor="hanzo-ask-input" className="sr-only">
              Ask a question
            </label>
            <input
              id="hanzo-ask-input"
              name="q"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="How does CPU-verifiable PoAI work?"
              className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--foreground)] px-4 py-2 text-xs font-semibold text-[var(--background)] hover:opacity-85 transition-opacity"
            >
              Continue on hanzo.app
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </form>

          <div className="mt-3 flex flex-wrap gap-2 border-t border-[var(--border)] pt-3 text-[11px] text-[var(--muted-foreground)]">
            <a
              href="https://docs.hanzo.ai/mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] underline-offset-2 hover:underline"
            >
              Docs MCP
            </a>
            <span>·</span>
            <a
              href="https://papers.hanzo.ai/hanzo-ai-chain/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] underline-offset-2 hover:underline"
            >
              Whitepaper
            </a>
            <span>·</span>
            <a
              href="https://work.hanzo.network"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] underline-offset-2 hover:underline"
            >
              DAO Work Board
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Hanzo assistant" : "Open Hanzo assistant"}
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-[var(--foreground)] text-[var(--background)] shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-transform"
      >
        <HanzoMark size={20} title="Hanzo" />
      </button>
    </div>
  );
}
