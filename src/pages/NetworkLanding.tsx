import React, { useEffect, useRef } from "react";
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
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "100K+",  label: "GPU Hours Available" },
  { value: "50+",    label: "Global Regions" },
  { value: "1.04T",  label: "Params Trained On-Chain" },
  { value: "$0.10",  label: "Per GPU Hour" },
];

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
    description: "Run Zen model inference at the edge, close to your users. Sub-100ms latency worldwide via 50+ regional nodes.",
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
    color: "border-white/20",
  },
  {
    name: "Zen Models",
    href: "https://hanzo.ai/zen",
    description: "Frontier open-weight models (0.6B–1T+). Zen5 Ultra will be the first 2T+ model trained entirely on-chain via Hanzo Network.",
    tag: "AI Models",
    color: "border-blue-500/30",
  },
  {
    name: "Lux Network",
    href: "https://lux.network",
    description: "L1 blockchain settlement layer. All Hanzo Network compute transactions settle on Lux — sub-second finality, post-quantum security.",
    tag: "L1 Blockchain",
    color: "border-purple-500/30",
  },
  {
    name: "Zoo Labs",
    href: "https://zoo.ngo",
    description: "Decentralized AI research foundation. Zoo uses Hanzo Network for open training experiments under the DeAI (Decentralized AI) initiative.",
    tag: "Research",
    color: "border-green-500/30",
  },
];

const USE_CASES = [
  {
    icon: Brain,
    title: "Train Frontier Models",
    description: "Distributed training across hundreds of GPUs. TEE attestation for every gradient update. Used to train Zen5 Ultra (2T+ params).",
    stat: "2T+ params on-chain",
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
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="https://hanzo.ai" className="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity">
            <Network className="w-4 h-4" />
            <span>hanzo</span>
            <span className="text-white/40">/ network</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/60">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#ecosystem" className="hover:text-white transition-colors">Ecosystem</a>
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <a href="https://docs.hanzo.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Docs</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://github.com/hanzoai/network" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://cloud.hanzo.ai/signup" target="_blank" rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition-all">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <GridCanvas />
        {/* Gradient orbs */}
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Mainnet Beta · Powered by Lux L1
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
            className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
            <span className="text-white">The AI</span>
            <br />
            <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">Chain.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-4 leading-relaxed">
            Verifiable compute for AI training and inference.
            Like Solana — but purpose-built for AI workloads.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
            className="text-sm text-white/30 max-w-xl mx-auto mb-10">
            NVIDIA TEE attestation · On-chain model registry · Open GPU marketplace · Lux L1 settlement
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://cloud.hanzo.ai/signup" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-white text-black hover:bg-white/90 transition-all text-sm">
              Start Building <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://docs.hanzo.ai" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium border border-white/15 text-white/80 hover:bg-white/5 hover:text-white transition-all text-sm">
              Read the Docs
            </a>
            <a href="#provide" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium border border-white/15 text-white/80 hover:bg-white/5 hover:text-white transition-all text-sm">
              <Cpu className="w-4 h-4" /> Provide Compute
            </a>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-1 tabular-nums">{s.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">Infrastructure</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Built differently.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title}
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }}
                  className="p-6 rounded-2xl border border-white/8 bg-white/[0.025] hover:bg-white/[0.04] hover:border-white/12 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">Protocol</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">How it works.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.step}
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
                <div className="text-5xl font-black text-white/6 mb-4 leading-none">{step.step}</div>
                <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 hidden lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">Use Cases</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">What runs on it.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {USE_CASES.map((u, i) => {
              const Icon = u.icon;
              return (
                <motion.div key={u.title}
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-5 p-6 rounded-2xl border border-white/8 bg-white/[0.025] hover:bg-white/[0.04] transition-all">
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-sm font-semibold text-white">{u.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/8">{u.stat}</span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">{u.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section id="ecosystem" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">Ecosystem</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The whole stack.</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              Hanzo Network is the compute layer. Lux settles it. Zen models run on it. Zoo researches with it.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {ECOSYSTEM.map((e, i) => (
              <motion.a key={e.name} href={e.href} target={e.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`group block p-6 rounded-2xl border bg-white/[0.02] hover:bg-white/[0.04] transition-all ${e.color}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30 mb-1 block">{e.tag}</span>
                    <h3 className="text-lg font-bold text-white">{e.name}</h3>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0 mt-1" />
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{e.description}</p>
              </motion.a>
            ))}
          </div>

          {/* Stack diagram */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-8 p-6 rounded-2xl border border-white/8 bg-white/[0.015]">
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-white/30 mb-4 text-center">Stack Architecture</div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm font-mono">
              {[
                { label: "Zoo Research", sub: "DeAI / DeSci", color: "text-green-300 border-green-500/30" },
                { label: "Zen Models", sub: "0.6B – 2T+", color: "text-blue-300 border-blue-500/30" },
                { label: "Hanzo AI", sub: "AI Platform", color: "text-white border-white/20" },
                { label: "Hanzo Network", sub: "Compute Layer", color: "text-orange-300 border-orange-500/30" },
                { label: "Lux L1", sub: "Settlement", color: "text-purple-300 border-purple-500/30" },
              ].map((layer, i, arr) => (
                <React.Fragment key={layer.label}>
                  <div className={`px-4 py-2.5 rounded-xl border bg-black/40 text-center ${layer.color}`}>
                    <div className="font-semibold">{layer.label}</div>
                    <div className="text-[10px] opacity-60">{layer.sub}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-white/20 flex-shrink-0 rotate-90 sm:rotate-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Provide Compute CTA */}
      <section id="provide" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Build */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.025]">
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40 mb-4">For Developers</div>
              <h3 className="text-3xl font-bold text-white mb-3">Build on it.</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Access verifiable GPU compute via a simple REST API. OpenAI-compatible inference endpoint.
                Train, fine-tune, and deploy models with on-chain provenance.
              </p>
              <ul className="space-y-2 mb-8">
                {["OpenAI-compatible API", "Verifiable training runs", "On-chain model registry", "260+ MCP tools included"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-green-400/70 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="https://cloud.hanzo.ai/signup" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold bg-white text-black hover:bg-white/90 text-sm transition-all">
                Get API Key <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Provide */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.025]">
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40 mb-4">For GPU Providers</div>
              <h3 className="text-3xl font-bold text-white mb-3">Earn from it.</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Contribute idle GPU capacity to the network. Set your own pricing, availability, and hardware tiers.
                Get paid instantly on Lux L1 for every compute second.
              </p>
              <ul className="space-y-2 mb-8">
                {["Set your own prices", "Instant Lux L1 settlement", "No lock-in contracts", "Hardware verification included"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-green-400/70 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="https://hanzo.ai/contact" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold border border-white/20 text-white hover:bg-white/5 text-sm transition-all">
                <Cpu className="w-4 h-4" /> Become a Provider
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              AI infrastructure<br />reimagined.
            </h2>
            <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
              Verifiable. Decentralized. Open. The compute layer the AI era deserves.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://cloud.hanzo.ai/signup" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-white text-black hover:bg-white/90 text-sm transition-all">
                Start Building Free <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://github.com/hanzoai/network" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border border-white/15 text-white/80 hover:bg-white/5 hover:text-white text-sm transition-all">
                <Github className="w-4 h-4" /> Open Source
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <div className="flex items-center gap-2">
            <Network className="w-3.5 h-3.5" />
            <span>© 2025 Hanzo AI, Inc. Techstars &apos;17.</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://hanzo.ai" className="hover:text-white/60 transition-colors">hanzo.ai</a>
            <a href="https://hanzo.ai/privacy" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="https://hanzo.ai/terms" className="hover:text-white/60 transition-colors">Terms</a>
            <a href="https://discord.gg/hanzo" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Discord</a>
            <a href="https://github.com/hanzoai/network" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default NetworkLanding;
