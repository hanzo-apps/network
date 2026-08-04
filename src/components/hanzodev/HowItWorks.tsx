import React from "react";
import { motion } from "framer-motion";
import {
  GitPullRequest,
  Sliders,
  Users,
  Monitor,
  FileText,
  TestTube,
  Rocket,
  ShieldCheck,
  Terminal,
  Laptop,
} from "lucide-react";


const AUTONOMY_LEVELS = [
  {
    level: "Plan-only",
    description: "proposal + file list + diff preview",
  },
  {
    level: "Implement",
    description: "coherent multi-file edits with repo context",
  },
  {
    level: "Implement + test",
    description: "suites run automatically; logs attached",
  },
  {
    level: "Implement + PR",
    description: "ready PR with linked evidence",
  },
  {
    level: "Implement + deploy (gated)",
    description: "approvals + policy checks + audit",
  },
];

const HowItWorks = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            How It Works
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-fg-muted">
            From task to production-ready pull request, with evidence at every step.
          </p>
        </motion.div>

        {/* Step 1: Give it a task */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-mb-7"
        >
          <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
            <div>
              <div
                className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-4 hz-bg-quiet hz-fg"
                >
                <GitPullRequest className="hz-sq-2" />
                Step 1
              </div>
              <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-4">
                Give it a task. Get back a PR.
              </h3>
              <p className="hz-fg-muted hz-leading-relaxed">
                Hanzo Dev reads your repository structure, produces a coherent plan, edits multiple files,
                runs suites, benchmarks impact and generates a reviewable pull request—complete with diff
                and test evidence. Long-running work happens in isolated sandboxes.
              </p>
            </div>
            <div className="hz-card">
              <div className="hz-row hz-ai-center hz-gap-3 hz-mb-4">
                <div className="hz-row hz-gap-2">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                  <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                  <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                </div>
                <span className="hz-t-xs hz-fg-muted hz-mono">hanzo dev</span>
              </div>
              <div className="hz-stack-3 hz-mono hz-t-sm">
                <div className="hz-fg-muted">$ hanzo dev "Add rate limiting to API"</div>
                <div className="hz-fg-muted">Reading repository structure...</div>
                <div className="hz-fg-muted">Creating implementation plan...</div>
                <div className="hz-row hz-ai-center hz-gap-2">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                  <span className="hz-fg-muted">Modified 4 files</span>
                </div>
                <div className="hz-row hz-ai-center hz-gap-2">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                  <span className="hz-fg-muted">Tests: 23/23 passing</span>
                </div>
                <div className="hz-row hz-ai-center hz-gap-2">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                  <span className="hz-fg-muted">PR #127 created with evidence</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 2: Autonomy levels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-mb-7"
        >
          <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-start">
            <div className="">
              <div
                className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-4 hz-bg-quiet hz-fg"
                >
                <Sliders className="hz-sq-2" />
                Step 2
              </div>
              <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-4">
                Autonomy you can dial. Evidence you can trust.
              </h3>
              <p className="hz-fg-muted hz-leading-relaxed hz-mb-5">
                Choose exactly how much autonomy to grant. Every level produces
                artifacts you can inspect, approve, or roll back.
              </p>
              <p className="hz-t-sm hz-fg-muted hz-italic">
                "Agents don't get admin; they get policies."
              </p>
            </div>
            <div className="hz-card">
              <div className="hz-stack-4">
                {AUTONOMY_LEVELS.map((item, index) => (
                  <div
                    key={item.level}
                    className="hz-card hz-card-tight hz-row hz-ai-start hz-gap-4"
                  >
                    <div
                      className="hz-sq-5 hz-r-lg hz-row hz-ai-center hz-jc-center hz-none hz-t-sm hz-mono hz-bg-quiet hz-fg"
                      >
                      {index + 1}
                    </div>
                    <div>
                      <div className="hz-w-medium hz-fg hz-t-sm">{item.level}</div>
                      <div className="hz-t-xs hz-fg-muted">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 3: Parallel agents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-mb-7"
        >
          <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
            <div>
              <div
                className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-4 hz-bg-quiet hz-fg"
                >
                <Users className="hz-sq-2" />
                Step 3
              </div>
              <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-4">
                Parallel agents. One best result.
              </h3>
              <p className="hz-fg-muted hz-leading-relaxed">
                Dispatch the same task to several agents at once. Hanzo Dev ranks outputs by diff quality
                and test results, so you ship the strongest patch—not the first attempt.
              </p>
            </div>
            <div className="hz-card">
              <div className="hz-grid hz-grid-2 hz-gap-4">
                {["Hanzo", "Claude Code", "Codex", "Gemini"].map((agent, i) => (
                  <div
                    key={agent}
                    className={`hz-p-4 hz-r-lg hz-bordered ${
                      i === 0
                        ? "hz-bg-quiet"
                        : "hz-bg-surface"
                    }`}
                  >
                    <div className="hz-t-sm hz-w-medium hz-fg hz-mb-2">{agent}</div>
                    <div className="hz-stack-1 hz-t-xs hz-fg-muted">
                      <div>Diff: {i === 0 ? "+42/-18" : i === 1 ? "+67/-31" : i === 2 ? "+89/-45" : "+55/-22"}</div>
                      <div>Tests: {i === 0 ? "23/23" : i === 1 ? "21/23" : i === 2 ? "19/23" : "22/23"}</div>
                    </div>
                    {i === 0 && (
                      <div
                        className="hz-mt-2 hz-t-xs hz-w-medium hz-px-2 hz-py-1 hz-r-full hz-bg-inverse"
                        >
                        Best result
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 4: Works where you work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
            <div className="">
              <div
                className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-4 hz-bg-quiet hz-fg"
                >
                <Monitor className="hz-sq-2" />
                Step 4
              </div>
              <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-4">
                Works where you work.
              </h3>
              <p className="hz-fg-muted hz-leading-relaxed">
                IDE extensions for VS Code and JetBrains, a CLI for terminals and CI/CD pipelines,
                and remote sandboxes for heavy builds. Everything stays reviewable and reproducible.
              </p>
            </div>
            <div className="hz-row hz-wrap hz-gap-4">
              {[
                { icon: Laptop, label: "VS Code" },
                { icon: Laptop, label: "JetBrains" },
                { icon: Terminal, label: "CLI" },
                { icon: Monitor, label: "Remote Sandbox" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="hz-btn hz-gap-3"
                  >
                    <Icon className="hz-sq-3 hz-fg-muted" />
                    <span className="hz-t-sm hz-fg">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
