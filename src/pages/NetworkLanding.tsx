import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Cpu, Globe, Shield, Zap, Network, Users,
  Code2, Brain, Lock, BarChart3, ExternalLink, Github, CheckCircle,
} from "lucide-react";

// ─── Grid background canvas ──────────────────────────────────────────────────
function GridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf: number;
    let t = 0;
    const draw = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
      const W = c.width, H = c.height;
      const size = 48;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += size) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += size) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      // pulse dots at intersections
      const now = t * 0.004;
      for (let x = 0; x < W; x += size) {
        for (let y = 0; y < H; y += size) {
          const pulse = Math.sin(now + x * 0.02 + y * 0.015) * 0.5 + 0.5;
          if (pulse > 0.85) {
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${pulse * 0.3})`;
            ctx.fill();
          }
        }
      }
      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="hz-abs hz-inset hz-w-full hz-h-full" />;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Lock,
    title: "Verifiable Compute",
    description: "NVIDIA TEE (Trusted Execution Environment) ensures every training run is cryptographically verifiable. Know exactly what ran on what hardware.",
  },
  {
    icon: Network,
    title: "Decentralized by Design",
    description: "No single point of failure. Workloads distributed across a global peer-to-peer network of permissionless compute providers.",
  },
  {
    icon: Zap,
    title: "Instant Elastic Scale",
    description: "From 1 to 10,000 GPUs in seconds. Auto-routing to the cheapest available compute. Pay only for active compute time.",
  },
  {
    icon: Globe,
    title: "Edge Inference",
    description: "Run Zen model inference at the edge, close to your users. Sub-100ms latency worldwide via regional nodes.",
  },
  {
    icon: Users,
    title: "Open Provider Marketplace",
    description: "Contribute idle GPU capacity and earn. Set your own pricing, availability windows, and hardware tiers.",
  },
  {
    icon: Shield,
    title: "On-Chain Model Registry",
    description: "Model weights, training lineage, and evaluation results recorded on Lux L1. Immutable provenance for every Zen model.",
  },
];

const ECOSYSTEM = [
  {
    name: "Hanzo AI",
    href: "https://hanzo.ai",
    description: "AI platform & infrastructure. The primary consumer of Hanzo Network compute for model serving and inference routing.",
    tag: "AI Platform",
    color: "hz-bordered",
  },
  {
    name: "Zen Models",
    href: "https://hanzo.ai/zen",
    description: "Frontier open-weight models (0.6B–1T+). Zen5 Ultra (2T+ MoDE) is in development to be trained on-chain via Hanzo Network.",
    tag: "AI Models",
    color: "hz-bordered",
  },
  {
    name: "Lux Network",
    href: "https://lux.network",
    description: "L1 blockchain settlement layer. All Hanzo Network compute transactions settle on Lux — sub-second finality, post-quantum security.",
    tag: "L1 Blockchain",
    color: "hz-bordered",
  },
  {
    name: "Zoo Labs",
    href: "https://zoo.ngo",
    description: "Zoo Labs is building decentralized AI research infrastructure on Hanzo Network.",
    tag: "Research",
    color: "hz-bordered",
  },
];

const USE_CASES = [
  {
    icon: Brain,
    title: "Train Frontier Models",
    description: "Distributed training across hundreds of GPUs. TEE attestation for every gradient update. Used to train Zen models on-chain.",
    stat: "1.04T params on-chain",
  },
  {
    icon: Zap,
    title: "Inference at Scale",
    description: "Route production inference traffic to the cheapest available GPU cluster globally. Auto-fallback, load balancing, latency SLAs.",
    stat: "<100ms edge latency",
  },
  {
    icon: Code2,
    title: "Agent Compute",
    description: "Long-running AI agent workloads with persistent state. MCP tool calls, multi-step reasoning, autonomous code execution.",
    stat: "260+ MCP tools",
  },
  {
    icon: BarChart3,
    title: "Benchmark & Eval",
    description: "On-chain evaluation runs with verifiable results. Transparent leaderboards backed by cryptographic compute proofs.",
    stat: "Verifiable results",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Submit Workload", desc: "Define compute requirements — GPU type, memory, region, duration. Sign with your Lux wallet." },
  { step: "02", title: "Network Routing", desc: "Smart contracts match your workload to available providers. Pricing set by open market supply and demand." },
  { step: "03", title: "TEE Execution", desc: "Your workload runs inside a Trusted Execution Environment. Hardware attestation generated at runtime." },
  { step: "04", title: "On-Chain Settlement", desc: "Results and proofs recorded on Lux L1. Payment released to provider. Immutable audit trail." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const NetworkLanding = () => {
  const [modelCount, setModelCount] = useState<number>(41);

  useEffect(() => {
    fetch("https://api.hanzo.ai/v1/pricing")
      .then(r => r.json())
      .then(d => {
        const count = (d.hanzoModels || []).filter(Boolean).length;
        if (count > 0) setModelCount(count);
      })
      .catch(() => {});
  }, []);

  const STATS = [
    { value: String(modelCount), label: "Models Available",  sub: "via api.hanzo.ai" },
    { value: "1.04T",            label: "Largest Model",     sub: "parameters (zen4-ultra)" },
    { value: "2M",               label: "Max Context",       sub: "tokens per request" },
    { value: "$0.15",            label: "Starting Price",    sub: "per million tokens" },
  ];

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">

      {/* Nav */}
      <header className="hz-fixed hz-top-0 hz-left-0 hz-right-0 hz-z-overlay hz-border-b hz-bg-surface hz-glass">
        <div className="hz-container-wide hz-py-4 hz-row hz-ai-center hz-jc-between">
          <a href="https://hanzo.ai" className="hz-row hz-ai-center hz-gap-2 hz-t-sm hz-w-semibold hz-transition">
            <Network className="hz-sq-2" />
            <span>hanzo</span>
            <span className="hz-fg-soft">/ network</span>
          </a>
          <nav className="hz-desktop-only hz-row hz-ai-center hz-gap-5 hz-t-sm hz-fg-soft">
            <a href="#how-it-works" className="hz-transition hz-hoverable">How it works</a>
            <a href="#ecosystem" className="hz-transition hz-hoverable">Ecosystem</a>
            <Link to="/pricing" className="hz-transition hz-hoverable">Pricing</Link>
            <a href="https://docs.hanzo.ai" target="_blank" rel="noopener noreferrer" className="hz-transition hz-hoverable">Docs</a>
          </nav>
          <div className="hz-row hz-ai-center hz-gap-3">
            <a href="https://github.com/hanzoai/network" target="_blank" rel="noopener noreferrer"
              className="hz-desktop-only hz-row hz-ai-center hz-gap-2 hz-t-sm hz-fg-soft hz-transition hz-hoverable">
              <Github className="hz-sq-2" />
            </a>
            <a href="https://cloud.hanzo.ai/signup" target="_blank" rel="noopener noreferrer"
              className="hz-px-4 hz-py-2 hz-r-full hz-t-sm hz-w-medium hz-bg-inverse hz-fg-inverse hz-transition hz-hoverable">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hz-rel hz-min-h-screen hz-row hz-ai-center hz-jc-center hz-clip hz-pt-6">
        <GridCanvas />
        {/* Gradient orbs */}
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg hz-no-pointer" />
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg hz-no-pointer" />
        <div className="hz-center-xy hz-abs hz-bg-quiet hz-r-full hz-blur-bg hz-no-pointer" />

        <div className="hz-container-wide hz-rel hz-z-raised hz-align-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="hz-btn hz-btn-primary hz-gap-2 hz-fg-soft hz-t-xs hz-mb-6">
              <div className="hz-sq-1 hz-r-full hz-bg-raised" />
              Mainnet Beta · Powered by Lux L1
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
            className="hz-t-6xl hz-w-bold hz-tracking-tight hz-mb-5">
            <span className="hz-fg">The AI</span>
            <br />
            <span className="hz-chrome">Chain.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-soft hz-mb-4 hz-leading-relaxed">
            Verifiable compute for AI training and inference.
            Like Solana — but purpose-built for AI workloads.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
            className="hz-container-narrow hz-mw-md hz-t-sm hz-fg-soft hz-mb-6">
            NVIDIA TEE attestation · On-chain model registry · Open GPU marketplace · Lux L1 settlement
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="hz-row hz-wrap hz-ai-center hz-jc-center hz-gap-4">
            <a href="https://cloud.hanzo.ai/signup" target="_blank" rel="noopener noreferrer"
              className="hz-btn hz-btn-primary hz-gap-2 hz-fg-inverse hz-transition">
              Start Building <ArrowRight className="hz-sq-2" />
            </a>
            <a href="https://docs.hanzo.ai" target="_blank" rel="noopener noreferrer"
              className="hz-btn hz-btn-ghost hz-gap-2 hz-fg-soft hz-transition">
              Read the Docs
            </a>
            <a href="#provide" className="hz-btn hz-btn-ghost hz-gap-2 hz-fg-soft hz-transition">
              <Cpu className="hz-sq-2" /> Provide Compute
            </a>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="hz-abs hz-bottom-0 hz-left-0 hz-right-0 hz-bh-8 hz-no-pointer" />
      </section>

      {/* Stats */}
      <section className="hz-py-7 hz-px-5 hz-border-t">
        <div className="hz-grid hz-grid-4 hz-container-wide hz-gap-5">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="hz-align-center">
              <div className="hz-t-4xl hz-w-bold hz-fg hz-mb-1">{s.value}</div>
              <div className="hz-t-xs hz-fg-soft hz-upper hz-tracking-wide">{s.label}</div>
              <div className="hz-t-xs hz-fg-soft hz-mt-1">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="hz-py-7 hz-px-5 hz-border-t">
        <div className="hz-container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="hz-align-center hz-mb-7">
            <div className="hz-t-xs hz-w-semibold hz-upper hz-tracking-widest hz-fg-soft hz-mb-4">Infrastructure</div>
            <h2 className="hz-t-4xl hz-w-bold hz-fg">Built differently.</h2>
          </motion.div>
          <div className="hz-grid hz-grid-3 hz-gap-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title}
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }}
                  className="hz-card hz-transition hz-card-interactive">
                  <div className="hz-sq-6 hz-r-lg hz-bg-quiet hz-row hz-ai-center hz-jc-center hz-mb-4">
                    <Icon className="hz-sq-3 hz-fg-soft" />
                  </div>
                  <h3 className="hz-t-base hz-w-semibold hz-fg hz-mb-2">{f.title}</h3>
                  <p className="hz-t-sm hz-fg-soft hz-leading-relaxed">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="hz-py-7 hz-px-5 hz-border-t">
        <div className="hz-container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="hz-align-center hz-mb-7">
            <div className="hz-t-xs hz-w-semibold hz-upper hz-tracking-widest hz-fg-soft hz-mb-4">Protocol</div>
            <h2 className="hz-t-4xl hz-w-bold hz-fg">How it works.</h2>
          </motion.div>
          <div className="hz-grid hz-grid-4 hz-gap-4">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.step}
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="hz-card hz-rel">
                <div className="hz-t-5xl hz-w-bold hz-fg-soft hz-mb-4 hz-leading-none">{step.step}</div>
                <h3 className="hz-t-sm hz-w-semibold hz-fg hz-mb-2">{step.title}</h3>
                <p className="hz-t-xs hz-fg-soft hz-leading-relaxed">{step.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <ArrowRight className="hz-desktop-only hz-center-y hz-sq-2 hz-abs hz-fg-soft" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="hz-py-7 hz-px-5 hz-border-t hz-bg-quiet">
        <div className="hz-container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="hz-align-center hz-mb-7">
            <div className="hz-t-xs hz-w-semibold hz-upper hz-tracking-widest hz-fg-soft hz-mb-4">Use Cases</div>
            <h2 className="hz-t-4xl hz-w-bold hz-fg">What runs on it.</h2>
          </motion.div>
          <div className="hz-grid hz-grid-2 hz-gap-4">
            {USE_CASES.map((u, i) => {
              const Icon = u.icon;
              return (
                <motion.div key={u.title}
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="hz-card hz-row hz-gap-4 hz-transition hz-card-interactive">
                  <div className="hz-sq-6 hz-r-lg hz-bg-quiet hz-row hz-ai-center hz-jc-center hz-none">
                    <Icon className="hz-sq-3 hz-fg-soft" />
                  </div>
                  <div className="hz-grow">
                    <div className="hz-row hz-ai-center hz-gap-3 hz-mb-2">
                      <h3 className="hz-t-sm hz-w-semibold hz-fg">{u.title}</h3>
                      <span className="hz-t-xs hz-px-2 hz-py-1 hz-r-full hz-bg-quiet hz-fg-soft hz-bordered">{u.stat}</span>
                    </div>
                    <p className="hz-t-sm hz-fg-soft hz-leading-relaxed">{u.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section id="ecosystem" className="hz-py-7 hz-px-5 hz-border-t">
        <div className="hz-container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="hz-align-center hz-mb-7">
            <div className="hz-t-xs hz-w-semibold hz-upper hz-tracking-widest hz-fg-soft hz-mb-4">Ecosystem</div>
            <h2 className="hz-t-4xl hz-w-bold hz-fg hz-mb-4">The whole stack.</h2>
            <p className="hz-container-narrow hz-mw-md hz-fg-soft hz-t-lg">
              Hanzo Network is the compute layer. Lux settles it. Zen models run on it. Zoo researches with it.
            </p>
          </motion.div>
          <div className="hz-grid hz-grid-2 hz-gap-4">
            {ECOSYSTEM.map((e, i) => (
              <motion.a key={e.name} href={e.href} target={e.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`hz-card hz-transition hz-card-interactive ${e.color}`}>
                <div className="hz-row hz-ai-start hz-jc-between hz-mb-3">
                  <div>
                    <span className="hz-t-xs hz-w-semibold hz-upper hz-tracking-widest hz-fg-soft hz-mb-1">{e.tag}</span>
                    <h3 className="hz-t-lg hz-w-bold hz-fg">{e.name}</h3>
                  </div>
                  <ExternalLink className="hz-sq-2 hz-fg-soft hz-transition hz-none hz-mt-1 hz-hoverable" />
                </div>
                <p className="hz-t-sm hz-fg-soft hz-leading-relaxed">{e.description}</p>
              </motion.a>
            ))}
          </div>

          {/* Stack diagram */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="hz-card hz-mt-6">
            <div className="hz-t-xs hz-w-semibold hz-upper hz-tracking-widest hz-fg-soft hz-mb-4 hz-align-center">Stack Architecture</div>
            <div className="hz-col-row hz-ai-center hz-jc-center hz-gap-2 hz-t-sm hz-mono">
              {[
                { label: "Zoo Research", sub: "DeAI / DeSci", color: "hz-fg-muted hz-bordered" },
                { label: "Zen Models", sub: "0.6B – 1.04T", color: "hz-fg-muted hz-bordered" },
                { label: "Hanzo AI", sub: "AI Platform", color: "hz-fg hz-bordered" },
                { label: "Hanzo Network", sub: "Compute Layer", color: "hz-fg-muted hz-bordered" },
                { label: "Lux L1", sub: "Settlement", color: "hz-fg-muted hz-bordered" },
              ].map((layer, i, arr) => (
                <React.Fragment key={layer.label}>
                  <div className={`hz-px-4 hz-py-2 hz-r-lg hz-bordered hz-bg-surface hz-align-center ${layer.color}`}>
                    <div className="hz-w-semibold">{layer.label}</div>
                    <div className="hz-t-xs hz-dim">{layer.sub}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight className="hz-sq-2 hz-fg-soft hz-none" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Provide Compute CTA */}
      <section id="provide" className="hz-py-7 hz-px-5 hz-border-t">
        <div className="hz-container-wide">
          <div className="hz-grid hz-grid-2 hz-gap-5">
            {/* Build */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="hz-card">
              <div className="hz-t-xs hz-w-semibold hz-upper hz-tracking-widest hz-fg-soft hz-mb-4">For Developers</div>
              <h3 className="hz-t-3xl hz-w-bold hz-fg hz-mb-3">Build on it.</h3>
              <p className="hz-fg-soft hz-t-sm hz-leading-relaxed hz-mb-5">
                Access verifiable GPU compute via a simple REST API. OpenAI-compatible inference endpoint.
                Train, fine-tune, and deploy models with on-chain provenance.
              </p>
              <ul className="hz-stack-2 hz-mb-6">
                {["OpenAI-compatible API", "Verifiable training runs", "On-chain model registry", "260+ MCP tools included"].map(f => (
                  <li key={f} className="hz-row hz-ai-center hz-gap-2 hz-t-sm hz-fg-soft">
                    <CheckCircle className="hz-sq-2 hz-fg-muted hz-none" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="https://cloud.hanzo.ai/signup" target="_blank" rel="noopener noreferrer"
                className="hz-btn hz-btn-primary hz-gap-2 hz-fg-inverse hz-transition">
                Get API Key <ArrowRight className="hz-sq-2" />
              </a>
            </motion.div>

            {/* Provide */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="hz-card">
              <div className="hz-t-xs hz-w-semibold hz-upper hz-tracking-widest hz-fg-soft hz-mb-4">For GPU Providers</div>
              <h3 className="hz-t-3xl hz-w-bold hz-fg hz-mb-3">Earn from it.</h3>
              <p className="hz-fg-soft hz-t-sm hz-leading-relaxed hz-mb-5">
                Contribute idle GPU capacity to the network. Set your own pricing, availability, and hardware tiers.
                Get paid instantly on Lux L1 for every compute second.
              </p>
              <ul className="hz-stack-2 hz-mb-6">
                {["Set your own prices", "Instant Lux L1 settlement", "No lock-in contracts", "Hardware verification included"].map(f => (
                  <li key={f} className="hz-row hz-ai-center hz-gap-2 hz-t-sm hz-fg-soft">
                    <CheckCircle className="hz-sq-2 hz-fg-muted hz-none" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="https://hanzo.ai/contact" target="_blank" rel="noopener noreferrer"
                className="hz-btn hz-btn-ghost hz-gap-2 hz-fg hz-transition">
                <Cpu className="hz-sq-2" /> Become a Provider
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hz-py-7 hz-px-5 hz-border-t hz-rel hz-clip">
        <div className="hz-abs hz-inset hz-no-pointer" />
        <div className="hz-container-narrow hz-align-center hz-rel hz-z-raised">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="hz-t-5xl hz-w-bold hz-fg hz-mb-4">
              AI infrastructure<br />reimagined.
            </h2>
            <p className="hz-container-narrow hz-mw-md hz-fg-soft hz-t-lg hz-mb-6">
              Verifiable. Decentralized. Open. The compute layer the AI era deserves.
            </p>
            <div className="hz-row hz-wrap hz-jc-center hz-gap-4">
              <a href="https://cloud.hanzo.ai/signup" target="_blank" rel="noopener noreferrer"
                className="hz-btn hz-btn-primary hz-btn-lg hz-gap-2 hz-fg-inverse hz-transition">
                Start Building Free <ArrowRight className="hz-sq-2" />
              </a>
              <a href="https://github.com/hanzoai/network" target="_blank" rel="noopener noreferrer"
                className="hz-btn hz-btn-ghost hz-btn-lg hz-gap-2 hz-fg-soft hz-transition">
                <Github className="hz-sq-2" /> Open Source
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hz-border-t hz-px-5 hz-py-6">
        <div className="hz-col-row hz-container-wide hz-ai-center hz-jc-between hz-gap-4 hz-t-xs hz-fg-soft">
          <div className="hz-row hz-ai-center hz-gap-2">
            <Network className="hz-sq-2" />
            <span>© 2025 Hanzo AI, Inc. Techstars &apos;17.</span>
          </div>
          <div className="hz-row hz-ai-center hz-gap-4">
            <a href="https://hanzo.ai" className="hz-transition hz-hoverable">hanzo.ai</a>
            <a href="https://hanzo.ai/privacy" className="hz-transition hz-hoverable">Privacy</a>
            <a href="https://hanzo.ai/terms" className="hz-transition hz-hoverable">Terms</a>
            <a href="https://discord.gg/hanzo" target="_blank" rel="noopener noreferrer" className="hz-transition hz-hoverable">Discord</a>
            <a href="https://github.com/hanzoai/network" target="_blank" rel="noopener noreferrer" className="hz-transition hz-hoverable">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default NetworkLanding;
