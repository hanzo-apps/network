import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { Measure } from "./components/Measure";
import { Consent } from "./components/Consent";
import { Away } from "./components/Try";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import { NetworkShell } from "./components/network/NetworkShell";
import NetworkLanding from "./pages/NetworkLanding";

const EarlyAccess = lazy(() => import("./pages/EarlyAccess"));
const NetworkEconomics = lazy(() => import("./pages/NetworkEconomics"));
const NetworkBuild = lazy(() => import("./pages/NetworkBuild"));
const NetworkPricing = lazy(() => import("./pages/NetworkPricing"));
const NetworkEcosystem = lazy(() => import("./pages/NetworkEcosystem"));

function RouteFallback() {
  return (
    <NetworkShell>
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
          Loading…
        </span>
      </div>
    </NetworkShell>
  );
}

/**
 * Legacy routes inherited from the earlier hanzo.ai mirror hand off cleanly
 * to the matching hanzo.ai page with path, query, and hash intact.
 */
const LEGACY_HANZO_AI_PREFIXES = [
  "/status",
  "/referrals",
  "/open-source",
  "/team",
  "/security",
  "/contact",
  "/enterprise",
  "/zen",
  "/philosophy",
  "/brand",
  "/press",
  "/solutions",
  "/products",
  "/ai",
  "/datastore",
  "/commerce",
  "/extension",
  "/base",
  "/download",
  "/analytics",
  "/cloud",
  "/edge",
  "/platform",
  "/operative",
  "/app",
  "/bot",
  "/code",
  "/dev",
  "/blockchain",
  "/web3",
  "/vector",
  "/payments",
  "/functions",
  "/identity",
  "/machines",
  "/realtime",
  "/automations",
] as const;

function matchesLegacyHanzoAI(pathname: string): boolean {
  return LEGACY_HANZO_AI_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`) || pathname.startsWith(`${prefix}-`)
  );
}

function FallbackRoute() {
  const { pathname, search, hash } = useLocation();
  const isLegacy = matchesLegacyHanzoAI(pathname);
  const target = `https://hanzo.ai${pathname}${search}${hash}`;

  useEffect(() => {
    if (isLegacy) {
      window.location.replace(target);
    }
  }, [isLegacy, target]);

  if (isLegacy) {
    return (
      <NetworkShell>
        <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-start justify-center px-6 py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
            Redirecting
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Continuing on hanzo.ai
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            This page lives on Hanzo AI. If your browser does not redirect automatically, open it
            directly below.
          </p>
          <a
            href={target}
            className="mt-6 inline-flex items-center rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] hover:opacity-85 transition-opacity"
          >
            Open {pathname} on hanzo.ai
          </a>
        </section>
      </NetworkShell>
    );
  }

  return (
    <NetworkShell>
      <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-start justify-center px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
          404 · Not Found
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          No route matches <code className="font-mono text-[var(--foreground)]">{pathname}</code> on
          hanzo.network.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] hover:opacity-85 transition-opacity"
          >
            Back to Home
          </Link>
          <Link
            to="/early"
            className="inline-flex items-center rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
          >
            Enter Invite Code
          </Link>
        </div>
      </section>
    </NetworkShell>
  );
}

const NetworkRoutes = () => {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
      <Route path="/" element={<NetworkLanding />} />
      <Route path="/index" element={<Navigate to="/" replace />} />
      <Route path="/home2" element={<Navigate to="/" replace />} />
      <Route path="/original" element={<Navigate to="/" replace />} />

      {/* Invite-only Genesis terminal */}
      <Route path="/early" element={<EarlyAccess />} />
      <Route path="/genesis" element={<EarlyAccess />} />
      <Route path="/token" element={<EarlyAccess />} />
      <Route path="/raise" element={<EarlyAccess />} />
      <Route path="/invite" element={<EarlyAccess />} />

      {/* Core protocol & developer surfaces */}
      <Route path="/economics" element={<NetworkEconomics />} />
      <Route path="/tokenomics" element={<Navigate to="/economics" replace />} />
      <Route path="/build" element={<NetworkBuild />} />
      <Route path="/developers" element={<Navigate to="/build" replace />} />
      <Route path="/pricing" element={<NetworkPricing />} />
      <Route path="/models" element={<Navigate to="/pricing" replace />} />
      <Route path="/ecosystem" element={<NetworkEcosystem />} />

      {/* hanzo.ai signs people in and owns every account page */}
      <Route path="/login" element={<Away />} />
      <Route path="/signup" element={<Away />} />
      <Route path="/account/*" element={<Away />} />
      <Route path="/dashboard" element={<Away />} />
      <Route path="/user-profile" element={<Away />} />
      <Route path="/organization-profile" element={<Away />} />

      {/* Legacy hanzo.ai handoff or monochrome 404 */}
      <Route path="*" element={<FallbackRoute />} />
      </Routes>
    </Suspense>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Measure>
        <ThemeProvider>
          <ScrollToTop />
          <NetworkRoutes />
          <Consent />
        </ThemeProvider>
      </Measure>
    </BrowserRouter>
  );
};

export default App;
