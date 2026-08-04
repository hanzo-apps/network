import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";


const SUPPORTED_PROVIDERS = [
  "OpenAI",
  "Anthropic",
  "Google",
  "Mistral",
  "Cohere",
  "Together AI",
  "Groq",
  "Fireworks",
  "Ollama",
  "LM Studio",
];

const OpenModels = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide">
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
              Open Models
            </h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-5">
              Switch between 500+ custom, local, and frontier LLMs.
            </p>
            <p className="hz-fg-muted hz-mb-6">
              Hanzo is the best gateway to discover and compare models. Use new
              models the day they come out and try stealth models for free.
            </p>

            <div className="hz-row hz-wrap hz-gap-4">
              <a
                href="https://hanzo.ai/leaderboard"
                target="_blank"
                rel="noreferrer noopener"
                className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                >
                View leaderboard
                <ArrowRight className="hz-sq-2 hz-ml-2" />
              </a>
              <a
                href="https://hanzo.ai/models/compare"
                target="_blank"
                rel="noreferrer noopener"
                className="hz-btn hz-btn-ghost hz-transition hz-fg"
              >
                Compare models
              </a>
            </div>
          </motion.div>

          {/* Right: Providers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="hz-bg-surface hz-bordered hz-r-lg hz-clip"
          >
            <div className="hz-p-4 hz-border-b">
              <span className="hz-t-sm hz-w-medium hz-fg">
                Supported Providers
              </span>
            </div>

            <div className="hz-p-4">
              <div className="hz-row hz-wrap hz-gap-2">
                {SUPPORTED_PROVIDERS.map((provider, index) => (
                  <motion.span
                    key={provider}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="hz-px-3 hz-py-2 hz-bg-raised hz-r-full hz-t-sm hz-fg-soft"
                  >
                    {provider}
                  </motion.span>
                ))}
                <span className="hz-px-3 hz-py-2 hz-bg-raised hz-r-full hz-t-sm hz-fg-muted">
                  + many more
                </span>
              </div>
            </div>

            <div className="hz-p-4 hz-border-t hz-align-center">
              <span className="hz-t-xs hz-fg-muted">
                Bring your own API keys or use Hanzo Gateway
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OpenModels;
