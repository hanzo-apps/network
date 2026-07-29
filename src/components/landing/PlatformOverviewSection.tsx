import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap,
  Users,
  Clock,
  Eye,
  ArrowRight,
  GitBranch,
  TestTube,
  FileCheck,
  Rocket,
  Shield,
  Lock,
  ChevronRight,
} from "lucide-react";


// AI providers we support for multi-agent execution
const aiProviders = [
  { name: "OpenAI", logo: "/logos/openai.svg" },
  { name: "Anthropic", logo: "/logos/anthropic.svg" },
  { name: "Google", logo: "/logos/google.svg" },
  { name: "Qwen", logo: "/logos/qwen.svg" },
  { name: "Gemini", logo: "/logos/gemini.svg" },
  { name: "Mistral", logo: "/logos/mistral.svg" },
  { name: "Kimi", logo: "/logos/kimi.svg" },
  { name: "Moonshot", logo: "/logos/moonshot.svg" },
];

const multiAgentFeatures = [
  {
    icon: Zap,
    title: "Multi-agent runs",
    description: "One prompt, many implementations across agents/models.",
  },
  {
    icon: Users,
    title: "Consensus selection",
    description: "Compare diffs, benchmarks, and test logs; select the strongest patch.",
  },
  {
    icon: Clock,
    title: "Long-running sandboxes",
    description: "Install deps, refactor safely, run suites, iterate until green.",
  },
  {
    icon: Eye,
    title: "Team visibility",
    description: "Shared workspace for runs, artifacts, decisions, and audit links.",
  },
];

const autonomyModes = [
  {
    id: "plan",
    title: "Plan-only",
    description: "Proposal + file list + risk notes + diff preview",
    icon: FileCheck,
  },
  {
    id: "implement",
    title: "Implement",
    description: "Coherent multi-file edits with repo context",
    icon: GitBranch,
  },
  {
    id: "test",
    title: "Implement + test",
    description: "Suites run automatically; logs attached",
    icon: TestTube,
  },
  {
    id: "deploy",
    title: "Implement + deploy",
    description: "Approvals + policy checks + audit trail",
    icon: Rocket,
  },
];

const PlatformOverviewSection = () => {
  const [activeMode, setActiveMode] = useState("plan");

  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide">
        {/* Multi-Agent Remote Execution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-mb-7"
        >
          <p
            className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-4 hz-py-2 hz-bordered hz-mb-5 hz-fg hz-border-strong"
            >
            Core Differentiator
          </p>
          <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
            Parallel execution. One best outcome.
          </h2>
          <p className="hz-t-lg hz-fg-muted hz-mw-md hz-mb-6">
            Dispatch the same task to multiple agents (Hanzo + external), then pick the winner based on diff quality + test evidence, not vibes.
          </p>

          {/* AI Provider logos */}
          <div className="hz-card hz-row hz-wrap hz-ai-center hz-gap-5 hz-mb-7">
            <span className="hz-t-xs hz-fg-muted hz-upper hz-tracking-wide hz-w-medium">Supported agents:</span>
            {aiProviders.map((provider) => (
              <div
                key={provider.name}
                className="hz-row hz-ai-center hz-gap-2 hz-fg-muted hz-transition hz-link"
                title={provider.name}
              >
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="hz-sq-3 hz-dim hz-transition"
                  style={{ filter: 'grayscale(100%) brightness(2)' }}
                />
                <span className="hz-desktop-only hz-t-xs">{provider.name}</span>
              </div>
            ))}
          </div>

          <div className="hz-grid hz-grid-4 hz-gap-5 hz-mb-6">
            {multiAgentFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="hz-card"
                >
                  <div
                    className="hz-sq-6 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4"
                    style={{ backgroundColor: `#ffffff15` }}
                  >
                    <Icon className="hz-sq-3 hz-fg" />
                  </div>
                  <h3 className="hz-t-base hz-w-semibold hz-fg hz-mb-2">{feature.title}</h3>
                  <p className="hz-t-sm hz-fg-muted">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          <Link
            to="/dev"
            className="hz-btn hz-btn-ghost hz-transition hz-fg"
          >
            Run your first task
            <ArrowRight className="hz-sq-2 hz-ml-2" />
          </Link>
        </motion.div>

        {/* Controllable Autonomy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-4 hz-py-2 hz-bordered hz-mb-5 hz-fg hz-border-strong"
            >
            Your Wedge
          </p>
          <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
            Autonomy you can dial. Evidence you can trust.
          </h2>
          <p className="hz-t-lg hz-fg-muted hz-mw-md hz-mb-7">
            Move fast without giving agents the keys. Every step is explicit, reviewable, and enforceable.
          </p>

          {/* Mode Selector */}
          <div className="hz-grid hz-grid-4 hz-gap-4 hz-mb-6">
            {autonomyModes.map((mode, index) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <motion.button
                  key={mode.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setActiveMode(mode.id)}
                  className={`hz-p-4 hz-r-lg hz-bordered hz-align-left hz-transition ${
                    isActive
                      ? "hz-bg-quiet"
                      : "hz-bg-surface hz-hoverable"
                  }`}
                >
                  <div className="hz-row hz-ai-start hz-gap-3">
                    <div
                      className={`hz-sq-5 hz-r-lg hz-row hz-ai-center hz-jc-center hz-none ${
                        isActive ? "hz-bg-quiet" : "hz-bg-raised"
                      }`}
                    >
                      <Icon className={`hz-sq-2 ${isActive ? "hz-fg" : "hz-fg-muted"}`} />
                    </div>
                    <div>
                      <h3 className={`hz-t-sm hz-w-semibold hz-mb-1 ${isActive ? "hz-fg" : "hz-fg-soft"}`}>
                        {mode.title}
                      </h3>
                      <p className="hz-t-xs hz-fg-muted">{mode.description}</p>
                    </div>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="hz-mt-3 hz-row hz-ai-center hz-fg hz-t-xs hz-w-medium"
                    >
                      <ChevronRight className="hz-sq-1 hz-mr-1" />
                      Selected
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Signature line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hz-card hz-row hz-ai-center hz-gap-3 hz-mw-sm"
          >
            <div className="hz-sq-6 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center">
              <Lock className="hz-sq-3 hz-fg-muted" />
            </div>
            <p className="hz-t-sm hz-fg-soft">
              <span className="hz-w-medium hz-fg">Agents don't get admin.</span>{" "}
              They get policies.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformOverviewSection;
