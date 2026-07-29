import React from "react";
import { motion } from "framer-motion";
import { GitBranch, GitPullRequest, Zap } from "lucide-react";


const CodebaseDemo = () => {
  return (
    <div className="hz-bg-surface hz-r-lg hz-bordered hz-clip">
      {/* Chat interface */}
      <div className="hz-p-5">
        {/* User message */}
        <div className="hz-row hz-gap-3 hz-mb-5">
          <div className="hz-sq-5 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-fg hz-t-sm hz-w-medium hz-none">
            &gt;
          </div>
          <div className="hz-bg-raised hz-r-lg hz-px-4 hz-py-3 hz-mw-sm">
            <p className="hz-fg hz-t-sm">I'm new to this codebase. Can you explain it to me?</p>
          </div>
        </div>

        {/* AI response */}
        <div className="hz-row hz-gap-3">
          <div
            className="hz-sq-5 hz-r-full hz-row hz-ai-center hz-jc-center hz-fg hz-t-sm hz-w-medium hz-none hz-bg-inverse"
            >
            ⏺
          </div>
          <div className="hz-grow">
            <p className="hz-fg-soft hz-t-sm hz-mb-3">
              I'll analyze the Excalidraw codebase structure and provide a high-level overview.
            </p>

            <div className="hz-card hz-mb-4">
              <p className="hz-t-xs hz-fg-muted hz-mb-2">
                ⏺ Analyze(what: "Excalidraw codebase structure and provide a high-level overview...")
              </p>
            </div>

            <div className="hz-stack-4 hz-t-sm">
              <p className="hz-fg-soft">
                Excalidraw is an open-source virtual whiteboard application with a hand-drawn style. It's designed for creating diagrams, wireframes, and collaborative drawings.
              </p>

              <div>
                <h4 className="hz-fg hz-w-semibold hz-mb-2">## Purpose</h4>
                <ul className="hz-fg-muted hz-stack-1 hz-ml-4">
                  <li>• Web-based drawing tool with infinite canvas</li>
                  <li>• Hand-drawn aesthetic with support for shapes, arrows, text</li>
                  <li>• End-to-end encrypted collaboration</li>
                  <li>• Works offline as a PWA (Progressive Web App)</li>
                </ul>
              </div>

              <div>
                <h4 className="hz-fg hz-w-semibold hz-mb-2">## Architecture</h4>
                <p className="hz-fg-muted hz-mb-2">The project is organized as a monorepo with these main components:</p>
                <div className="hz-ml-4 hz-stack-2">
                  <div>
                    <span className="hz-fg">1. Core Package</span>
                    <span className="hz-fg-muted"> (packages/excalidraw)</span>
                  </div>
                  <div>
                    <span className="hz-fg">2. Web Application</span>
                    <span className="hz-fg-muted"> (excalidraw-app/)</span>
                  </div>
                  <div>
                    <span className="hz-fg">3. Support Packages</span>
                    <span className="hz-fg-muted"> - common, element, math, utils</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="hz-fg hz-w-semibold hz-mb-2">## Technology Stack</h4>
                <ul className="hz-fg-muted hz-stack-1 hz-ml-4">
                  <li>• React for UI</li>
                  <li>• TypeScript for type safety</li>
                  <li>• Firebase for collaboration backend</li>
                  <li>• Jotai for state management</li>
                  <li>• Vite for development and building</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: GitBranch,
    title: "Code onboarding",
    description: "Hanzo Dev maps and explains entire codebases in seconds. It uses agentic search to understand project structure and dependencies without you having to manually select context files.",
  },
  {
    icon: GitPullRequest,
    title: "Turn issues into PRs",
    description: "Stop bouncing between tools. Hanzo Dev integrates with GitHub, GitLab, and your command line tools to handle the entire workflow—reading issues, writing code, running tests, and submitting PRs—all from your terminal.",
  },
  {
    icon: Zap,
    title: "Make powerful edits",
    description: "Hanzo Dev's understanding of your codebase and dependencies enables it to make powerful, multi-file edits that work.",
  },
];

const CodeOnboardingSection = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide">
        {/* Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-mb-7"
        >
          <CodebaseDemo />
        </motion.div>

        {/* Feature cards */}
        <div className="hz-grid hz-grid-3 hz-gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="hz-card hz-transition hz-card-interactive"
              >
                <div
                  className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4 hz-bg-quiet"
                  >
                  <Icon className="hz-sq-4 hz-fg" />
                </div>
                <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">{feature.title}</h3>
                <p className="hz-t-sm hz-fg-muted">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CodeOnboardingSection;
