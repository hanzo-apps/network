import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Terminal, Sparkles, Bug, Rocket, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";


const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Code Generation",
    description: "Generate APIs, scripts, components, and features directly from your terminal using simple natural-language prompts.",
  },
  {
    icon: Bug,
    title: "Smart Debugging & Fixes",
    description: "Identify bugs, understand errors, and apply AI-generated fixes automatically without leaving the CLI.",
  },
  {
    icon: Rocket,
    title: "End-to-End Project Automation",
    description: "Set up projects, generate tests, configure CI/CD, and manage deployments — all from one CLI.",
  },
  {
    icon: Layers,
    title: "Works Across Any Stack",
    description: "Use the CLI with Python, JavaScript, React, Node.js, databases, and more — no framework lock-in.",
  },
];

const tools = [
  "Ramp", "Cred", "Zapier", "GitHub", "Docker", "Kubernetes",
  "AWS", "GCP", "Azure", "Terraform", "Ansible", "Jenkins",
];

const CLISection = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <div
            className="hz-btn hz-btn-ghost hz-gap-2 hz-mb-5 hz-bordered"
            >
            <Terminal className="hz-sq-2 hz-fg" />
            <span className="hz-t-sm hz-fg" >Hanzo CLI</span>
          </div>
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            AI-powered development,
            <br />
            right from your terminal.
          </h2>
          <Button
            size="lg"
            className="hz-mt-4 hz-fg hz-bg-inverse"
            asChild
          >
            <Link to="/download">
              Get Started Now
              <ArrowRight className="hz-sq-3 hz-ml-2" />
            </Link>
          </Button>
        </motion.div>

        {/* Feature cards */}
        <div className="hz-grid hz-grid-2 hz-gap-5 hz-mb-7">
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

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center"
        >
          <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-4">
            Connects with your favorite command line tools
          </h3>
          <p className="hz-container-narrow hz-mw-md hz-fg-muted hz-mb-6">
            Your terminal is where real work happens. Hanzo Dev connects with the tools that power development—deployment, databases, monitoring, version control. Rather than adding another interface to juggle, it enhances your existing stack.
          </p>

          {/* Tool logos marquee */}
          <div className="hz-row hz-jc-center hz-gap-5 hz-wrap">
            {tools.map((tool) => (
              <div
                key={tool}
                className="hz-px-4 hz-py-2 hz-bg-surface hz-bordered hz-r-lg hz-fg-muted hz-t-sm"
              >
                {tool}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CLISection;
