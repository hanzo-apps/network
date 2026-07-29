import React from "react";
import { motion } from "framer-motion";
import { Download, Settings, Rocket, ArrowRight } from "lucide-react";


const steps = [
  {
    number: "01",
    icon: Download,
    title: "Install or open",
    description: "Download the desktop app, open hanzo.app in your browser, or install via CLI.",
    code: "curl -fsSL hanzo.sh | sh",
  },
  {
    number: "02",
    icon: Settings,
    title: "Configure your mode",
    description: "Choose web, desktop, local AI, or node mode. Connect your accounts and preferences.",
    code: "hanzo config --mode local --model qwen3-32b",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Start building",
    description: "Create, code, and ship with AI assistance. Your work syncs across all devices.",
    code: "hanzo dev \"Build a payment API with Square\"",
  },
];

const HowItWorks = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Get started in minutes
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted">
            Three steps to productive AI-assisted development.
          </p>
        </motion.div>

        <div className="hz-stack-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="hz-grid hz-grid-2 hz-gap-6 hz-ai-center"
              >
                <div className={isEven ? "" : ""}>
                  <div className="hz-row hz-ai-center hz-gap-3 hz-mb-4">
                    <div
                      className="hz-sq-5 hz-r-lg hz-row hz-ai-center hz-jc-center hz-bg-quiet"
                      >
                      <span className="hz-t-sm hz-w-bold hz-fg" >
                        {step.number}
                      </span>
                    </div>
                    <Icon className="hz-sq-3 hz-fg-muted" />
                  </div>
                  <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-3">{step.title}</h3>
                  <p className="hz-fg-muted hz-mb-4">{step.description}</p>
                </div>

                <div className={isEven ? "" : ""}>
                  <div className="hz-card">
                    <div className="hz-row hz-ai-center hz-gap-2 hz-mb-3">
                      <div className="hz-row hz-gap-2">
                        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                        <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                      </div>
                      <span className="hz-t-xs hz-fg-muted hz-mono">terminal</span>
                    </div>
                    <div className="hz-mono hz-t-sm">
                      <span className="hz-fg-muted">$ </span>
                      <span className="hz-fg-muted">{step.code}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
