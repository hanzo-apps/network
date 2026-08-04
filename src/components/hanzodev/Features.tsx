import React from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  GitPullRequest,
  Rocket,
  GitBranch,
  Layout,
  Search,
  Users,
  RefreshCw,
  Mic,
  Code,
  BarChart3,
  CreditCard,
  Puzzle,
  Ticket,
  MessageSquare,
  Terminal,
  Wrench,
  Bug,
  Brain,
  Keyboard,
  ArrowRight,
  ExternalLink,
} from "lucide-react";


const RECENTLY_SHIPPED = [
  {
    icon: Cloud,
    title: "Cloud Agents",
    description:
      "Run AI agents in the cloud without consuming local resources. Execute long-running tasks, complex workflows, and resource-intensive operations while your machine stays free for other work.",
    link: "https://docs.hanzo.ai/cloud-agents",
  },
  {
    icon: GitPullRequest,
    title: "Code Reviews",
    description:
      "Automated code review agents that analyze pull requests, suggest improvements, catch bugs, and ensure code quality standards. Get instant feedback before merging.",
    link: "https://docs.hanzo.ai/code-reviews",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description:
      "One-click deployment. Deploy your applications directly from Hanzo Dev with intelligent configuration detection and automated setup.",
    link: "https://docs.hanzo.ai/deploy",
  },
  {
    icon: GitBranch,
    title: "Parallel Agents (CLI)",
    description:
      "Run multiple AI agents simultaneously using git worktrees in the Hanzo Dev CLI. Coordinate complex tasks across different parts of your codebase and review results as pull requests.",
    link: "https://docs.hanzo.ai/parallel-agents",
  },
];

const ALL_FEATURES = [
  {
    icon: Layout,
    title: "App Builder",
    description:
      "Visual app builder that generates production-ready code. Design interfaces, define logic, and let Hanzo Dev create the implementation.",
  },
  {
    icon: Search,
    title: "Managed Indexing",
    description:
      "Deep semantic understanding of your entire codebase. Navigate, understand, and modify large projects with full context awareness.",
  },
  {
    icon: Users,
    title: "Agent Manager",
    description:
      "Run multiple AI agents simultaneously directly in your IDE. Coordinate complex tasks across different parts of your codebase.",
  },
  {
    icon: RefreshCw,
    title: "Sessions",
    description:
      "Start a session in one place and continue on another platform. Your AI agents, context, and progress follow you everywhere.",
  },
  {
    icon: Mic,
    title: "Voice Prompting",
    description:
      "Use natural voice commands to interact with AI agents directly in your IDE. Speak your requests instead of typing.",
  },
  {
    icon: Code,
    title: "Autocomplete in JetBrains",
    description:
      "AI-powered autocomplete and code suggestions directly in your JetBrains IDE with full codebase understanding.",
  },
  {
    icon: BarChart3,
    title: "AI Adoption Score",
    description:
      "Track and measure your team's AI adoption effectiveness. Understand usage patterns and optimize workflows.",
  },
  {
    icon: CreditCard,
    title: "Auto Top Ups",
    description:
      "Never run out of credits mid-task. Auto-replenish your balance automatically whenever it drops below $5.",
  },
  {
    icon: Puzzle,
    title: "Skills",
    description:
      "Extend Hanzo Dev with skills. Sharable packages of domain expertise, new capabilities, and repeatable workflows.",
  },
  {
    icon: Ticket,
    title: "Hanzo Pass",
    description:
      "Get up to 50% free credits on your AI subscription. Credits never expire, plus bonus credits on top.",
  },
  {
    icon: MessageSquare,
    title: "Hanzo for Slack",
    description:
      "Ask questions about your codebase, get explanations, or create PRs via cloud agents—all in Slack.",
  },
  {
    icon: Terminal,
    title: "Install where you work",
    description:
      "Terminal CLI, VS Code, JetBrains. Hanzo works wherever you do.",
  },
  {
    icon: Wrench,
    title: "Auto failure recovery",
    description:
      "Hanzo automatically detects errors, runs test suites and recovers on failure. No more explaining errors to AI.",
  },
  {
    icon: Search,
    title: "Hallucination-free code",
    description:
      "MCP marketplace with tools that automatically look up library documentation. AI follows best practices.",
  },
  {
    icon: Brain,
    title: "Context is king",
    description:
      "Hanzo searches for the right context automatically. Any context you add is bonus, not required.",
  },
  {
    icon: Bug,
    title: "Kickstart debugging",
    description:
      "Debug mode goes through your codebase with a fine-toothed comb to find bug sources.",
  },
  {
    icon: Brain,
    title: "Memory bank",
    description:
      "Stop re-explaining your app. AI keeps its own records of what it worked on and your preferences.",
  },
  {
    icon: Keyboard,
    title: "Tab autocomplete",
    description:
      "Fast inline completion including multiline suggestions. Intelligent completions that understand your codebase.",
  },
];

const Features = () => {
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
            Features
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-fg-muted">
            Everything you need for agentic development
          </p>
        </motion.div>

        {/* Recently Shipped */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-mb-7"
        >
          <div className="hz-row hz-ai-center hz-gap-3 hz-mb-6">
            <div
              className="hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-bg-quiet hz-fg"
              >
              Recently Shipped
            </div>
          </div>

          <div className="hz-grid hz-grid-2 hz-gap-5">
            {RECENTLY_SHIPPED.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.a
                  key={feature.title}
                  href={feature.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="hz-card hz-transition hz-card-interactive"
                >
                  <div className="hz-row hz-ai-start hz-jc-between hz-mb-4">
                    <div
                      className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-bg-quiet"
                      >
                      <Icon className="hz-sq-4 hz-fg" />
                    </div>
                    <span className="hz-t-xs hz-w-medium hz-px-2 hz-py-1 hz-r-full hz-bg-raised hz-fg-muted">
                      New
                    </span>
                  </div>
                  <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2 hz-transition hz-hoverable">
                    {feature.title}
                  </h3>
                  <p className="hz-t-sm hz-fg-muted hz-mb-4">
                    {feature.description}
                  </p>
                  <span className="hz-t-sm hz-fg hz-row hz-ai-center hz-gap-1">
                    View Documentation
                    <ExternalLink className="hz-sq-2" />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* All Features Grid */}
        <div className="hz-grid hz-grid-3 hz-gap-4">
          {ALL_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 6) * 0.05 }}
                className="hz-card hz-transition hz-card-interactive"
              >
                <div className="hz-row hz-ai-center hz-gap-3 hz-mb-3">
                  <Icon className="hz-sq-3 hz-fg-muted" />
                  <h4 className="hz-t-sm hz-w-medium hz-fg">
                    {feature.title}
                  </h4>
                </div>
                <p className="hz-t-xs hz-fg-muted hz-leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* See upcoming features link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mt-7"
        >
          <a
            href="https://docs.hanzo.ai/roadmap"
            target="_blank"
            rel="noreferrer noopener"
            className="hz-inline hz-ai-center hz-gap-2 hz-t-sm hz-fg-muted hz-transition hz-link"
          >
            See upcoming features
            <ArrowRight className="hz-sq-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
