import React, { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Monitor, Moon, Sun, X, ArrowUpRight, Lock } from "lucide-react";
import { HanzoMark, HanzoWordmark, BottomRightLauncher } from "./Brand";
import { PrivacyChoicesIcon } from "@/components/Consent";
import { useTheme } from "@/contexts/ThemeContext";
import { useLogin } from "@/components/Try";

const NAV_LINKS = [
  { label: "Build", to: "/build" },
  { label: "Economics", to: "/economics" },
  { label: "Pricing", to: "/pricing" },
  { label: "Ecosystem", to: "/ecosystem" },
  { label: "Docs", href: "https://docs.hanzo.ai/docs/network", external: true },
] as const;

const FOOTER_COLUMNS = [
  {
    title: "Protocol",
    links: [
      { label: "Home", to: "/" },
      { label: "Economics & 2T Policy", to: "/economics" },
      { label: "Proof of AI Whitepaper", href: "https://papers.hanzo.ai/hanzo-ai-chain/" },
      { label: "Proof of AI Blog", href: "https://hanzo.blog/proof-of-ai/" },
      { label: "HIP Specifications", href: "https://hips.hanzo.ai" },
      { label: "Formal Proofs", href: "https://proofs.hanzo.network" },
    ],
  },
  {
    title: "Ecosystem & DeFi",
    links: [
      { label: "Early Access (Invite)", to: "/early" },
      { label: "Ecosystem Directory", to: "/ecosystem" },
      { label: "Hanzo Market", href: "https://hanzo.market" },
      { label: "DAO Work Board", href: "https://work.hanzo.network" },
      { label: "Hanzo Works", href: "https://hanzo.works" },
      { label: "DAO Governance (Vote)", href: "https://hanzo.vote" },
    ],
  },
  {
    title: "Developers & Nodes",
    links: [
      { label: "Build & Agent MCP", to: "/build" },
      { label: "Live Model Pricing", to: "/pricing" },
      { label: "Node Operator Guide", href: "https://docs.hanzo.ai/docs/proof-of-ai/node-operator" },
      { label: "Docs MCP Server", href: "https://docs.hanzo.ai/mcp" },
      { label: "llms.txt", href: "https://hanzo.network/llms.txt" },
      { label: "Block Explorer (36963)", href: "https://explore.hanzo.network" },
    ],
  },
  {
    title: "Network & Legal",
    links: [
      { label: "Status", href: "https://status.hanzo.network" },
      { label: "Hanzo AI", href: "https://hanzo.ai" },
      { label: "Lux Network", href: "https://lux.network" },
      { label: "GitHub", href: "https://github.com/hanzoai" },
      { label: "Discord", href: "https://discord.gg/CJCyAsm9Vr" },
      { label: "Privacy & Terms", href: "https://hanzo.ai/privacy" },
    ],
  },
] as const;

export function NetworkShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { mode, setMode } = useTheme();
  const loginHref = useLogin();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cycleTheme = () => {
    const next = mode === "system" ? "dark" : mode === "dark" ? "light" : "system";
    setMode(next);
  };

  const ThemeIcon = mode === "dark" ? Moon : mode === "light" ? Sun : Monitor;
  const themeLabel =
    mode === "dark" ? "Theme: Dark" : mode === "light" ? "Theme: Light" : "Theme: System";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* Top Navigation — lowercase wordmark top-left */}
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            aria-label="hanzo network home"
            className="flex items-center rounded-full py-1.5 pr-3 hover:opacity-80 transition-opacity"
          >
            <HanzoWordmark sub="network" />
          </Link>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) =>
              "external" in item ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    location.pathname === item.to
                      ? "bg-[var(--accent)] font-medium text-[var(--foreground)]"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={cycleTheme}
              title={themeLabel}
              aria-label={themeLabel}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)] transition-colors"
            >
              <ThemeIcon className="h-4 w-4" />
            </button>

            <a
              href={loginHref}
              className="hidden sm:inline-flex items-center rounded-full px-3.5 py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Sign in
            </a>

            <Link
              to="/early"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--foreground)] px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--background)] hover:opacity-85 transition-opacity"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Enter Invite Code</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] md:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen ? (
          <div className="border-t border-[var(--border)] bg-[var(--background)] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((item) =>
                "external" in item ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--accent)]"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-60" />
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <a
                href={loginHref}
                className="rounded-xl px-3 py-2.5 text-sm text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
              >
                Sign in (hanzo.ai)
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main className="flex-1">{children}</main>

      {/* Monochrome Footer — canonical block-H mark bottom-right */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                  {col.title}
                </h2>
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {"to" in link ? (
                        <Link
                          to={link.to}
                          className="hover:text-[var(--foreground)] transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:text-[var(--foreground)] transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-end pr-16">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--muted-foreground)]">
                <span>© 2026 Hanzo Industries, Inc. · San Francisco, CA</span>
                <a
                  href="https://hanzo.ai/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)]"
                >
                  Terms
                </a>
                <a
                  href="https://hanzo.ai/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)]"
                >
                  Privacy
                </a>
                <a
                  href="https://hanzo.ai/cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)]"
                >
                  Cookies
                </a>
                <a
                  href="#choices"
                  className="inline-flex items-center gap-1.5 hover:text-[var(--foreground)] underline-offset-2 hover:underline"
                >
                  <PrivacyChoicesIcon height={12} />
                  Your Privacy Choices
                </a>
              </div>
              <p className="max-w-2xl text-[11px] leading-relaxed text-[var(--muted-foreground)]">
                Chain 36963 is live. Proof of AI mining emissions, P3Q succinct settlement, and
                monetary activation remain audit- and governance-gated per the Hanzo AI Chain
                specification.
              </p>
            </div>

            {/* Bottom-right block-H mark lockup inside footer */}
            <div className="flex items-center gap-2.5 text-[var(--foreground)] shrink-0">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted-foreground)]">
                chain 36963
              </span>
              <HanzoMark size={26} title="Hanzo Network" />
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed bottom-right block-H launcher */}
      <BottomRightLauncher />
    </div>
  );
}
