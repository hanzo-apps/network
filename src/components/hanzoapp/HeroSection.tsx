import { BRAND } from '@/lib/brand';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  Globe,
  Monitor,
  Cpu,
  Shield,
  Check,
  Copy,
  ExternalLink,
  Apple,
  Chrome,
} from "lucide-react";


const PLATFORMS = [
  { id: "web", label: "Web App", icon: Globe, description: "Build in browser" },
  { id: "desktop", label: "Desktop", icon: Monitor, description: "macOS, Windows, Linux" },
  { id: "local", label: "Local AI", icon: Cpu, description: "Private & offline" },
  { id: "node", label: "Node", icon: Shield, description: "Blockchain powered" },
];

const AppDemo = ({ activeTab }: { activeTab: string }) => {
  const demos: Record<string, { title: string; content: React.ReactNode }> = {
    web: {
      title: "hanzo.app",
      content: (
        <div className="hz-stack-3">
          <div className="hz-row hz-ai-center hz-gap-2 hz-t-sm">
            <Check className="hz-sq-2 hz-fg-muted" />
            <span className="hz-fg-muted">Workspace synced</span>
          </div>
          <div className="hz-bg-surface hz-r-lg hz-p-3">
            <div className="hz-t-xs hz-fg-muted hz-mb-2">Active Projects</div>
            <div className="hz-stack-2">
              <div className="hz-row hz-ai-center hz-jc-between hz-t-sm">
                <span className="hz-fg">signal-server</span>
                <span className="hz-fg-muted">12 files changed</span>
              </div>
              <div className="hz-row hz-ai-center hz-jc-between hz-t-sm">
                <span className="hz-fg">payments-api</span>
                <span className="hz-fg-muted">3 PRs pending</span>
              </div>
            </div>
          </div>
          <div className="hz-t-xs hz-fg-muted">Collaborative editing • Real-time sync • Cloud storage</div>
        </div>
      ),
    },
    desktop: {
      title: "Hanzo Desktop",
      content: (
        <div className="hz-stack-3">
          <div className="hz-row hz-ai-center hz-gap-2 hz-t-sm">
            <Monitor className="hz-sq-2 hz-fg-muted" />
            <span className="hz-fg-muted">Native performance</span>
          </div>
          <div className="hz-grid hz-grid-3 hz-gap-2">
            <div className="hz-bg-surface hz-r-lg hz-p-2 hz-align-center">
              <Apple className="hz-sq-3 hz-mx-auto hz-mb-1 hz-fg-muted" />
              <span className="hz-t-xs hz-fg-muted">macOS</span>
            </div>
            <div className="hz-bg-surface hz-r-lg hz-p-2 hz-align-center">
              <Monitor className="hz-sq-3 hz-mx-auto hz-mb-1 hz-fg-muted" />
              <span className="hz-t-xs hz-fg-muted">Windows</span>
            </div>
            <div className="hz-bg-surface hz-r-lg hz-p-2 hz-align-center">
              <Chrome className="hz-sq-3 hz-mx-auto hz-mb-1 hz-fg-muted" />
              <span className="hz-t-xs hz-fg-muted">Linux</span>
            </div>
          </div>
          <div className="hz-t-xs hz-fg-muted">Offline capable • System integrations • Native UI</div>
        </div>
      ),
    },
    local: {
      title: "Local AI Mode",
      content: (
        <div className="hz-stack-3">
          <div className="hz-row hz-ai-center hz-gap-2 hz-t-sm">
            <Cpu className="hz-sq-2 hz-fg-muted" />
            <span className="hz-fg-muted">Running locally</span>
          </div>
          <div className="hz-bg-surface hz-r-lg hz-p-3 hz-mono hz-t-xs">
            <div className="hz-fg-muted">$ hanzo local start</div>
            <div className="hz-fg-muted hz-mt-1">✓ Qwen3-32B loaded (16GB VRAM)</div>
            <div className="hz-fg-muted">✓ MCP tools connected</div>
            <div className="hz-fg-muted">✓ Ready on localhost:8080</div>
          </div>
          <div className="hz-t-xs hz-fg-muted">Zero data leaves your machine • Full privacy • GPU accelerated</div>
        </div>
      ),
    },
    node: {
      title: "Hanzo Node",
      content: (
        <div className="hz-stack-3">
          <div className="hz-row hz-ai-center hz-gap-2 hz-t-sm">
            <Shield className="hz-sq-2 hz-fg" />
            <span className="hz-fg" >Node active</span>
          </div>
          <div className="hz-bg-surface hz-r-lg hz-p-3 hz-mono hz-t-xs">
            <div className="hz-row hz-jc-between">
              <span className="hz-fg-muted">Staked:</span>
              <span className="hz-fg">50,000 LUX</span>
            </div>
            <div className="hz-row hz-jc-between">
              <span className="hz-fg-muted">Earnings:</span>
              <span className="hz-fg-muted">+127.4 LUX/day</span>
            </div>
            <div className="hz-row hz-jc-between">
              <span className="hz-fg-muted">Uptime:</span>
              <span className="hz-fg">99.97%</span>
            </div>
          </div>
          <div className="hz-t-xs hz-fg-muted">Earn rewards • Decentralized compute • Proof of AI</div>
        </div>
      ),
    },
  };

  const demo = demos[activeTab];

  return (
    <div className="hz-r-lg hz-bordered hz-bg-surface hz-glass hz-clip hz-shadow-lg hz-col">
      <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface hz-none">
        <div className="hz-row hz-gap-2">
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hz-t-xs hz-fg-muted hz-mono hz-ml-2"
          >
            {demo.title}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="hz-grow hz-p-4 hz-bg-surface hz-scroll-y">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {demo.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("web");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("curl -fsSL hanzo.sh | sh");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hz-rel hz-pt-6 hz-pb-6 hz-px-4 hz-clip">
      {/* Background gradient */}
      <div className="hz-abs hz-inset hz-clip hz-z-base hz-no-pointer">
        <div
          className="hz-center-xy hz-abs hz-r-full hz-dim-more"
          style={{
            background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 70%)`,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
          {/* Left Column */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="hz-t-3xl hz-w-medium hz-tracking-tight hz-mb-5"
            >
              <span className="hz-fg">Build anywhere.</span>
              <br />
              <span className="hz-fg-muted">Ship everywhere.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6 hz-mw-md"
            >
              Hanzo App works in your browser, as a native desktop app, with private local AI, or connected to the decentralized network. Your choice.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="hz-row hz-wrap hz-ai-center hz-gap-4 hz-mb-5"
            >
              <a
                href="https://hanzo.app"
                target="_blank"
                rel="noreferrer noopener"
                className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                >
                Open in browser
                <ArrowRight className="hz-sq-2 hz-ml-2" />
              </a>
              <Link
                to="/download"
                className="hz-btn hz-btn-ghost hz-transition hz-fg"
              >
                <Download className="hz-sq-2 hz-mr-2" />
                Download app
              </Link>
            </motion.div>

            {/* Install command */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="hz-mb-6"
            >
              <div className="hz-btn hz-gap-3">
                <code className="hz-t-sm hz-mono hz-fg-soft">
                  curl -fsSL hanzo.sh | sh
                </code>
                <button
                  onClick={handleCopy}
                  className="hz-fg-muted hz-transition hz-link"
                >
                  {copied ? <Check className="hz-sq-2 hz-fg-muted" /> : <Copy className="hz-sq-2" />}
                </button>
                <a
                  href="https://docs.hanzo.ai"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hz-fg-muted hz-transition hz-link"
                >
                  <ExternalLink className="hz-sq-2" />
                </a>
              </div>
            </motion.div>

            {/* Platform tabs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="hz-row hz-wrap hz-gap-2"
            >
              {PLATFORMS.map((platform) => {
                const Icon = platform.icon;
                const isActive = activeTab === platform.id;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setActiveTab(platform.id)}
                    className={`hz-btn hz-btn-ghost hz-gap-2 hz-transition ${
                      isActive
                        ? "hz-bg-inverse hz-fg-inverse"
                        : "hz-bg-surface hz-bordered hz-fg-muted hz-link"
                    }`}
                  >
                    <Icon className="hz-sq-2" />
                    {platform.label}
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Demo */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <AppDemo activeTab={activeTab} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
