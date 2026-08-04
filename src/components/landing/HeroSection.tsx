import { BRAND } from '@/lib/brand';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
  FolderKanban,
  Rocket,
  Bot,
  Database,
  Key,
  Shield,
  Link2,
  Settings,
  Bell,
  Layers,
  Activity,
  Brain
} from "lucide-react";

// Brand color

// Proof chips data - communicates the vertical stack
const PROOF_CHIPS = [
  { label: "Agents", icon: Bot },
  { label: "Models", icon: Brain },
  { label: "Vector/SQL/KV", icon: Database },
  { label: "Deploy anywhere", icon: Rocket },
  { label: "IAM/KMS", icon: Shield },
  { label: "Audit", icon: Activity },
  { label: "OSS", icon: Layers },
];

// Dashboard nav items
const DASHBOARD_NAV = [
  { label: "Projects", icon: FolderKanban, active: true },
  { label: "Deployments", icon: Rocket },
  { label: "Models", icon: Bot },
  { label: "Vector", icon: Database },
  { label: "Agents", icon: Bot },
  { label: "IAM", icon: Shield },
  { label: "KMS", icon: Key },
  { label: "Audit", icon: Activity },
  { label: "Chains", icon: Link2 },
  { label: "Settings", icon: Settings },
];

// Terminal lines - demonstrates the vertical stack in one story
const TERMINAL_LINES = [
  { text: "$ curl -fsSL hanzo.sh/install.sh | sh", type: "command" },
  { text: "$ hanzo team create acme", type: "command" },
  { text: "$ hanzo login", type: "command" },
  { text: "$ hanzo iam role bind --role engineer --to dev@acme.com", type: "command" },
  { text: "$ hanzo kms key create dev-secrets", type: "command" },
  { text: '$ hanzo dev "Ship a RAG API for ./docs. Expose /chat. Write tests."', type: "command" },
  { text: "✓ Plan created • policy=engineer • kms=dev-secrets", type: "success" },
  { text: "✓ Implemented: api/ tests/", type: "success" },
  { text: "✓ Ready to deploy as docs-api → target=k8s", type: "success" },
  { text: "? Approve deploy? (y/N) y", type: "prompt" },
  { text: "✓ Live: https://docs-api.acme.dev", type: "success", highlight: true },
];

// Mobile view tabs
type MobileTab = "dashboard" | "terminal" | "mobile";

const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("dashboard");
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Terminal typing animation
  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setTerminalStep((prev) => {
        if (prev < TERMINAL_LINES.length) return prev + 1;
        return prev;
      });
    }, 600);
    return () => clearInterval(timer);
  }, [mounted]);

  const handleCopy = () => {
    navigator.clipboard.writeText("curl -fsSL hanzo.sh/install.sh | sh");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dashboard Mock Component
  const DashboardMock = ({ className = "" }: { className?: string }) => (
    <div className={`hz-r-lg hz-bordered hz-bg-surface hz-glass hz-clip hz-shadow-lg ${className}`}>
      {/* Browser chrome */}
      <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-2 hz-border-b hz-bg-surface">
        <div className="hz-row hz-gap-2">
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        </div>
        <div className="hz-grow">
          <div className="hz-container hz-bg-raised hz-r-md hz-py-1 hz-t-xs hz-fg-muted hz-align-center">
            cloud.hanzo.ai
          </div>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="hz-row">
        {/* Left nav */}
        <div className="hz-desktop-only hz-border-r hz-bg-surface hz-p-2">
          <div className="hz-row hz-ai-center hz-gap-2 hz-px-2 hz-py-2 hz-mb-3">
            <div className="hz-sq-4 hz-r-md hz-row hz-ai-center hz-jc-center">
              <span className="hz-fg hz-t-xs hz-w-bold">H</span>
            </div>
            <span className="hz-fg hz-t-xs hz-w-medium">Hanzo</span>
          </div>
          <nav className="hz-stack-1">
            {DASHBOARD_NAV.map((item) => (
              <div
                key={item.label}
                className={`hz-btn hz-btn-ghost hz-gap-2 hz-t-xs hz-pointer hz-transition ${
                  item.active
                    ? "hz-bg-quiet hz-fg"
                    : "hz-fg-muted hz-link"
                }`}
              >
                <item.icon className="hz-sq-1" />
                {item.label}
              </div>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="hz-grow hz-p-4 hz-bg-surface">
          <div className="hz-row hz-ai-center hz-jc-between hz-mb-4">
            <h3 className="hz-fg hz-t-sm hz-w-medium">Project Overview</h3>
            <div className="hz-row hz-ai-center hz-gap-2">
              <div className="hz-px-2 hz-py-1 hz-r-md hz-bg-raised hz-fg-muted hz-t-xs hz-row hz-ai-center hz-gap-1">
                <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                All systems operational
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="hz-grid hz-grid-4 hz-gap-3 hz-mb-4">
            <div className="hz-card hz-card-tight">
              <div className="hz-row hz-ai-center hz-gap-2 hz-mb-1">
                <Rocket className="hz-sq-1 hz-fg-muted" />
                <span className="hz-t-xs hz-fg-muted">Deployments</span>
              </div>
              <div className="hz-t-lg hz-w-semibold hz-fg">24</div>
              <div className="hz-t-xs hz-fg-muted">+3 this week</div>
            </div>
            <div className="hz-card hz-card-tight">
              <div className="hz-row hz-ai-center hz-gap-2 hz-mb-1">
                <Bot className="hz-sq-1 hz-fg-muted" />
                <span className="hz-t-xs hz-fg-muted">Agent Runs</span>
              </div>
              <div className="hz-t-lg hz-w-semibold hz-fg">1.2K</div>
              <div className="hz-t-xs hz-fg-muted">Today</div>
            </div>
            <div className="hz-card hz-card-tight">
              <div className="hz-row hz-ai-center hz-gap-2 hz-mb-1">
                <Database className="hz-sq-1 hz-fg-muted" />
                <span className="hz-t-xs hz-fg-muted">Vector Indexes</span>
              </div>
              <div className="hz-t-lg hz-w-semibold hz-fg">8</div>
              <div className="hz-t-xs hz-fg-muted">2.4M vectors</div>
            </div>
            <div className="hz-card hz-card-tight">
              <div className="hz-row hz-ai-center hz-gap-2 hz-mb-1">
                <Key className="hz-sq-1 hz-fg-muted" />
                <span className="hz-t-xs hz-fg-muted">Keys/Secrets</span>
              </div>
              <div className="hz-t-lg hz-w-semibold hz-fg">47</div>
              <div className="hz-t-xs hz-fg-muted">Encrypted</div>
            </div>
          </div>

          {/* Recent deployments */}
          <div className="hz-stack-2">
            <div className="hz-t-xs hz-fg-muted hz-mb-2">Recent Deployments</div>
            {[
              { name: "docs-api", status: "live", region: "us-east-1", time: "2m ago" },
              { name: "chat-service", status: "live", region: "eu-west-1", time: "1h ago" },
              { name: "", status: "building", region: "us-west-2", time: "now" },
            ].map((deploy) => (
              <div key={deploy.name} className="hz-row hz-ai-center hz-jc-between hz-p-2 hz-r-lg hz-bg-surface hz-bordered">
                <div className="hz-row hz-ai-center hz-gap-2">
                  <div className={`hz-sq-1 hz-r-full ${deploy.status === "live" ? "hz-bg-raised" : "hz-bg-raised"}`} />
                  <span className="hz-t-sm hz-fg">{deploy.name}</span>
                  <span className="hz-t-xs hz-fg-muted hz-px-2 hz-py-1 hz-bg-raised hz-r-md">{deploy.region}</span>
                </div>
                <span className="hz-t-xs hz-fg-muted">{deploy.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Terminal Mock Component - fixed height with scrolling content
  const TerminalMock = ({ className = "" }: { className?: string }) => (
    <div className={`hz-r-lg hz-bordered hz-bg-surface hz-glass hz-clip hz-shadow-lg ${className}`}>
      {/* Terminal header */}
      <div className="hz-row hz-ai-center hz-gap-2 hz-px-3 hz-py-2 hz-border-b hz-bg-surface hz-none">
        <div className="hz-row hz-gap-2">
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        </div>
        <span className="hz-ml-2 hz-t-xs hz-fg-muted hz-mono">terminal</span>
        <div className="hz-ml-auto hz-row hz-ai-center hz-gap-2">
          <button
            onClick={handleCopy}
            className="hz-p-1 hz-r-md hz-transition hz-hoverable"
          >
            {copied ? (
              <Check className="hz-sq-1 hz-fg-muted" />
            ) : (
              <Copy className="hz-sq-1 hz-fg-muted" />
            )}
          </button>
        </div>
      </div>
      {/* Terminal content - fixed height with scroll */}
      <div className="hz-p-4 hz-mono hz-t-xs hz-bg-surface hz-scroll-y">
        {TERMINAL_LINES.slice(0, terminalStep).map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className={`hz-mb-1 ${
              line.type === "command" ? "hz-fg-soft" :
              line.type === "success" ? "hz-fg-muted" :
              line.type === "prompt" ? "hz-fg-muted" : "hz-fg-muted"
            }`}
          >
            {line.type === "success" && (
              <span className="hz-fg-muted">✓ </span>
            )}
            {line.type === "prompt" && (
              <span className="hz-fg-muted">? </span>
            )}
            <span className={line.highlight ? "hz-fg" : ""}>
              {line.text.replace(/^[✓?]\s*/, "")}
            </span>
          </motion.div>
        ))}
        {terminalStep < TERMINAL_LINES.length && (
          <div className="hz-row hz-ai-center hz-gap-1">
            <span className="hz-fg-muted">$</span>
            <span className="hz-bw-1 hz-bh-2 hz-bg-quiet" />
          </div>
        )}
        {terminalStep >= TERMINAL_LINES.length && (
          <div className="hz-row hz-ai-center hz-gap-1 hz-mt-2">
            <span className="hz-fg-muted">$</span>
            <span className="hz-bw-1 hz-bh-2 hz-bg-quiet" />
          </div>
        )}
      </div>
    </div>
  );

  // Mobile Device Mock Component - iPhone 15 Pro dimensions (71.6mm x 146.6mm = ~2.05:1 ratio)
  // Using w-[150px] = h-[308px] for proper iPhone proportions
  const MobileDeviceMock = ({ className = "" }: { className?: string }) => (
    <div className={`hz-r-md hz-border-strong hz-bg-surface hz-clip hz-shadow-lg hz-col ${className}`}>
      {/* Dynamic Island */}
      <div className="hz-bg-surface hz-pt-4 hz-pb-4 hz-row hz-jc-center hz-none">
        <div className="hz-bg hz-r-full" />
      </div>
      {/* App content */}
      <div className="hz-bg-surface hz-p-2 hz-grow hz-clip hz-col">
        <div className="hz-row hz-ai-center hz-jc-between hz-mb-2 hz-none">
          <div className="hz-row hz-ai-center hz-gap-2">
            <div className="hz-sq-3 hz-r-md hz-bg-inverse hz-row hz-ai-center hz-jc-center">
              <span className="hz-fg hz-t-xs hz-w-bold">H</span>
            </div>
            <span className="hz-fg hz-t-xs hz-w-medium">Hanzo</span>
          </div>
          <Bell className="hz-sq-2 hz-fg-muted" />
        </div>

        {/* Push notification style */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.3 }}
          className="hz-bg-surface hz-r-lg hz-p-2 hz-bordered hz-mb-2 hz-none"
        >
          <div className="hz-row hz-ai-center hz-gap-2 hz-mb-1">
            <div className="hz-sq-1 hz-r-full hz-bg-raised" />
            <span className="hz-t-xs hz-fg-muted hz-w-medium">Deploy Complete</span>
          </div>
          <div className="hz-t-xs hz-fg">docs-api is now live</div>
          <div className="hz-t-xs hz-fg-muted hz-mt-1 hz-truncate">https://docs-api.acme.dev</div>
        </motion.div>

        <div className="hz-stack-2 hz-grow hz-clip">
          <div className="hz-bg-surface hz-r-lg hz-p-2 hz-bordered">
            <div className="hz-t-xs hz-fg-muted">Status</div>
            <div className="hz-row hz-ai-center hz-gap-1">
              <div className="hz-sq-1 hz-r-full hz-bg-raised" />
              <span className="hz-t-xs hz-fg-muted">All systems operational</span>
            </div>
          </div>
          <div className="hz-bg-surface hz-r-lg hz-p-2 hz-bordered">
            <div className="hz-t-xs hz-fg-muted">Active Deployments</div>
            <div className="hz-t-xs hz-fg">24 services</div>
          </div>
        </div>
      </div>
      {/* Home indicator */}
      <div className="hz-bg-surface hz-py-2 hz-row hz-jc-center hz-none">
        <div className="hz-bg-raised hz-r-full" />
      </div>
    </div>
  );

  // Mobile Tab Selector
  const MobileTabSelector = () => (
    <div className="hz-row hz-bg-surface hz-r-lg hz-p-1 hz-bordered">
      {(["dashboard", "terminal", "mobile"] as MobileTab[]).map((tab) => (
        <button
          key={tab}
          onClick={() => setMobileTab(tab)}
          className={`hz-grow hz-px-3 hz-py-2 hz-t-xs hz-w-medium hz-r-md hz-transition ${
            mobileTab === tab
              ? "hz-bg-inverse hz-fg-inverse"
              : "hz-fg-muted hz-link"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  return (
    <section className="hz-pt-6 hz-pb-6 hz-px-4">
      {/* Main Hero Container */}
      <div className="hz-container hz-rel hz-w-full hz-r-xl hz-bordered hz-clip">

        {/* Background gradients - z-0 */}
        <div className="hz-abs hz-inset hz-clip hz-z-base">
          {/* Red accent glow - center */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 0.15 : 0 }}
            transition={{ duration: 1.5 }}
            className="hz-center-xy hz-abs hz-r-full"
            style={{
              background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 70%)`,
              filter: "blur(100px)",
            }}
          />
          {/* Secondary red glow - top right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 0.1 : 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="hz-abs hz-r-full"
            style={{
              background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 70%)`,
              filter: "blur(80px)",
            }}
          />
          {/* Subtle white glow - bottom left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 0.04 : 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="hz-abs hz-r-full"
            style={{
              background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </div>

        {/* Grid pattern */}
        <div
          className="hz-abs hz-inset hz-dim-more hz-z-base"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Content - z-10 */}
        <div className="hz-rel hz-z-raised hz-h-full hz-px-5 hz-py-6">

          {/* Desktop Layout: Two-column grid */}
          <div className="hz-desktop-only hz-grid hz-grid-2 hz-h-full">

            {/* Left Column: Copy */}
            <div className="hz-col hz-jc-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Badge */}
                <p
                  className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-4 hz-py-2 hz-bordered hz-w-fit hz-mb-5"
                  style={{ color: BRAND.fg, borderColor: `${BRAND.washStrong}` }}
                >
                  Open-source AI Cloud for builders.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Main Headline */}
                <h1 className="hz-t-4xl hz-w-medium hz-tracking-tight hz-mb-5">
                  <span className="hz-fg">A vertically integrated</span>
                  <br />
                  <span className="hz-fg" >AI platform.</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {/* Subhead */}
                <p className="hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6 hz-mw-full">
                  Agents, models, data, and deployment—with Team, IAM, KMS, and Audit built in. One platform from identity to production.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hz-row hz-ai-center hz-gap-4 hz-wrap hz-mb-6"
              >
                <Link
                  to="/products"
                  className="hz-btn hz-btn-ghost hz-tracking-tight hz-transition hz-bg-inverse"
                  
                >
                  Get Started
                  <ArrowRight className="hz-sq-2 hz-ml-2" />
                </Link>
                <a
                  href="https://docs.hanzo.ai"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hz-btn hz-btn-ghost hz-tracking-tight hz-transition"
                >
                  Documentation
                  <ExternalLink className="hz-sq-2 hz-ml-2" />
                </a>
              </motion.div>

              {/* Proof Chips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="hz-row hz-wrap hz-gap-2"
              >
                {PROOF_CHIPS.map((chip) => (
                  <div
                    key={chip.label}
                    className="hz-btn hz-gap-2 hz-t-xs hz-fg-muted"
                  >
                    <chip.icon className="hz-sq-1" />
                    {chip.label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Demo Stack */}
            <div className="hz-rel hz-col hz-jc-center">
              {/* Dashboard - Primary/Large */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hz-rel hz-z-raised"
              >
                <DashboardMock />
              </motion.div>

              {/* Terminal - Below dashboard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="hz-rel hz-z-raised hz-mt-4 hz-w-full hz-mw-full"
              >
                <TerminalMock />
              </motion.div>

              {/* Mobile Device - Floating/overlapping right */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 20, y: mounted ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="hz-center-y hz-abs hz-right-0 hz-z-header"
              >
                <MobileDeviceMock />
              </motion.div>
            </div>
          </div>

          {/* Tablet Layout (md): Stack vertically */}
          <div className="hz-desktop-only hz-row hz-col hz-gap-6">
            {/* Copy section */}
            <div className="hz-align-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p
                  className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-4 hz-py-2 hz-bordered hz-w-fit hz-mb-5"
                  style={{ color: BRAND.fg, borderColor: `${BRAND.washStrong}` }}
                >
                  Open-source AI Cloud for builders.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="hz-t-4xl hz-w-medium hz-tracking-tight hz-mb-5">
                  <span className="hz-fg">A vertically integrated</span>
                  <br />
                  <span className="hz-fg" >AI platform.</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <p className="hz-container hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-5">
                  Agents, models, data, and deployment—with Team, IAM, KMS, and Audit built in.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hz-row hz-ai-center hz-jc-center hz-gap-4 hz-wrap hz-mb-5"
              >
                <Link
                  to="/products"
                  className="hz-btn hz-btn-ghost hz-tracking-tight hz-transition hz-bg-inverse"
                  
                >
                  Get Started
                  <ArrowRight className="hz-sq-2 hz-ml-2" />
                </Link>
                <a
                  href="https://docs.hanzo.ai"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hz-btn hz-btn-ghost hz-tracking-tight hz-transition"
                >
                  Documentation
                  <ExternalLink className="hz-sq-2 hz-ml-2" />
                </a>
              </motion.div>

              {/* Proof Chips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="hz-row hz-wrap hz-jc-center hz-gap-2"
              >
                {PROOF_CHIPS.map((chip) => (
                  <div
                    key={chip.label}
                    className="hz-btn hz-gap-2 hz-t-xs hz-fg-muted"
                  >
                    <chip.icon className="hz-sq-1" />
                    {chip.label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Demo stack - tablet */}
            <div className="hz-stack-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <DashboardMock />
              </motion.div>

              <div className="hz-grid hz-grid-2 hz-gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <TerminalMock />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="hz-row hz-jc-center"
                >
                  <MobileDeviceMock />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile Layout (sm): Segmented control */}
          <div className="hz-mobile-only hz-col hz-gap-5">
            {/* Copy section */}
            <div className="hz-align-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p
                  className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-3 hz-py-2 hz-bordered hz-w-fit hz-mb-4"
                  style={{ color: BRAND.fg, borderColor: `${BRAND.washStrong}` }}
                >
                  Open-source AI Cloud for builders.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="hz-t-2xl hz-w-medium hz-tracking-tight hz-mb-4">
                  <span className="hz-fg">A vertically integrated</span>
                  <br />
                  <span className="hz-fg" >AI platform.</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <p className="hz-t-sm hz-fg-muted hz-leading-relaxed hz-mb-4">
                  Agents, models, data, and deployment—with Team, IAM, KMS, and Audit built in.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hz-col hz-ai-center hz-gap-3 hz-mb-4"
              >
                <Link
                  to="/products"
                  className="hz-btn hz-btn-ghost hz-btn-block hz-tracking-tight hz-transition hz-mw-full hz-bg-inverse"
                  
                >
                  Get Started
                  <ArrowRight className="hz-sq-2 hz-ml-2" />
                </Link>
                <a
                  href="https://docs.hanzo.ai"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hz-btn hz-btn-ghost hz-btn-block hz-tracking-tight hz-transition hz-mw-full"
                >
                  Documentation
                  <ExternalLink className="hz-sq-2 hz-ml-2" />
                </a>
              </motion.div>

              {/* Proof Chips - scrollable on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="hz-row hz-wrap hz-jc-center hz-gap-2"
              >
                {PROOF_CHIPS.slice(0, 4).map((chip) => (
                  <div
                    key={chip.label}
                    className="hz-inline hz-ai-center hz-gap-1 hz-px-2 hz-py-1 hz-r-full hz-bg-surface hz-bordered hz-t-xs hz-fg-muted"
                  >
                    <chip.icon className="hz-sq-1" />
                    {chip.label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Mobile Tab Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <MobileTabSelector />
            </motion.div>

            {/* Tab Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className=""
            >
              <AnimatePresence mode="wait">
                {mobileTab === "dashboard" && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DashboardMock />
                  </motion.div>
                )}
                {mobileTab === "terminal" && (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TerminalMock />
                  </motion.div>
                )}
                {mobileTab === "mobile" && (
                  <motion.div
                    key="mobile"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="hz-row hz-jc-center"
                  >
                    <MobileDeviceMock />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
