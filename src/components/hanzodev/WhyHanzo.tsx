import React from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  Smartphone,
  Eye,
  Rocket,
  Users,
  Brain,
  Keyboard,
  Settings,
  Shield,
  BarChart3,
  CreditCard,
  Copy,
} from "lucide-react";


const VALUE_PROPS = [
  {
    title: "Stay in your flow",
    subtitle: "The all-in-one agentic engineering platform",
    color: "#a3a3a3",
    features: [
      {
        icon: Smartphone,
        title: "Sync across every interface",
        description:
          "Start a task on your mobile device and finish it in VS Code, JetBrains, or the CLI without missing a beat.",
      },
      {
        icon: RefreshCw,
        title: "Persist your context",
        description:
          "Never lose state. Your session history, active agents, and variables follow you automatically across devices and environments.",
      },
      {
        icon: Eye,
        title: "Open the black box",
        description:
          "Hanzo is open source so you can inspect, customize, and integrate to meet your specific needs.",
      },
      {
        icon: Rocket,
        title: "Ship without friction",
        description:
          'Move from "commit" to "live" in one motion. Get AI code reviews and deployments without leaving your IDE.',
      },
    ],
  },
  {
    title: "1000x every dev",
    subtitle: "Multiply your engineering output",
    color: "#a3a3a3",
    features: [
      {
        icon: Users,
        title: "Multiply your output",
        description:
          "Use Orchestrator Mode and Code Review to plan, build, and audit simultaneously. Be everywhere at once.",
      },
      {
        icon: Brain,
        title: "Externalize your context",
        description:
          "Stop repeating yourself. Use Memory Bank to store architectural decisions and onboard the team automatically.",
      },
      {
        icon: Keyboard,
        title: "Code at thought speed",
        description:
          "Eliminate boilerplate. Use intelligent Tab Autocomplete to ship PRs faster than you can type them.",
      },
      {
        icon: Settings,
        title: "Use the best model for the job",
        description:
          "With 500+ models, you can control the right tradeoffs between latency, cost, context, and reasoning for each task.",
      },
    ],
  },
  {
    title: "Accelerate AI ROI",
    subtitle: "Enterprise-grade AI management",
    color: "#a3a3a3",
    features: [
      {
        icon: Shield,
        title: "Stop AI sprawl",
        description:
          "Centralize usage to prevent shadow IT, security risks, and wasted credits before they spiral.",
      },
      {
        icon: BarChart3,
        title: "Track and improve velocity",
        description:
          "Use the AI Management Dashboard to track adoption rates, measure new hire speed, and prove ROI.",
      },
      {
        icon: CreditCard,
        title: "Centralize management",
        description:
          "Simplify administration with pooled credits, unified billing, and enterprise-grade data privacy controls.",
      },
      {
        icon: Copy,
        title: "Duplicate your best devs",
        description:
          'Build a managed index to speed up onboarding. Capture individual "superpowers" into custom modes the whole team can use.',
      },
    ],
  },
];

const WhyHanzo = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Why Hanzo
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-fg-muted">
            The all-in-one agentic engineering platform
          </p>
        </motion.div>

        {/* Value Props */}
        <div className="hz-stack-6">
          {VALUE_PROPS.map((prop, propIndex) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: propIndex * 0.1 }}
            >
              {/* Prop Header */}
              <div className="hz-mb-6">
                <h3
                  className="hz-t-2xl hz-w-bold hz-mb-2"
                  style={{ color: prop.color }}
                >
                  {prop.title}
                </h3>
                <p className="hz-fg-muted">{prop.subtitle}</p>
              </div>

              {/* Features Grid */}
              <div className="hz-grid hz-grid-2 hz-gap-5">
                {prop.features.map((feature, featureIndex) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: featureIndex * 0.05 }}
                      className="hz-card hz-transition hz-card-interactive"
                    >
                      <div
                        className="hz-sq-6 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4"
                        style={{ backgroundColor: `${prop.color}20` }}
                      >
                        <Icon className="hz-sq-3" style={{ color: prop.color }} />
                      </div>
                      <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">
                        {feature.title}
                      </h4>
                      <p className="hz-t-sm hz-fg-muted">
                        {feature.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHanzo;
