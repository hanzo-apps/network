import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


const GATEWAY_FEATURES = [
  "Choose from more than 60 providers",
  "Use more than 500 models",
  "Pay the exact list price of Anthropic, OpenAI, and Google",
  "No commission or hidden fees, we make money on Teams/Enterprise",
  "Pay as you go, no subscriptions, no waste",
  "No need to wait for a daily reset, no slow pool, no rate limits!",
  "Get Hanzo Pass - Get up to 50% bonus free credits",
];

const ALTERNATIVE_FEATURES = [
  "Other Gateways (OpenRouter, Vercel, Requesty)",
  "Managed Services (AWS Bedrock, Azure OpenAI, Google AI Studio)",
  "Free, stealth, and budget models (Llama, Mistral, etc.)",
  "Fallback when you hit a quota limit with our virtual provider",
  "Bring your own API keys (BYOK) for any provider/subscription",
  "Run models locally (Ollama, LM Studio)",
];

const OpenPricing = () => {
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
            Open Pricing
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-fg-muted">
            Run AI where you want and pay as you go
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-6">
          {/* Hanzo Gateway */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-card"
          >
            <div className="hz-row hz-ai-center hz-gap-3 hz-mb-5">
              <div
                className="hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-bg-quiet hz-fg"
                >
                Recommended
              </div>
            </div>

            <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-2">
              Hanzo Gateway
            </h3>
            <p className="hz-fg-muted hz-mb-5">Open & transparent</p>

            <ul className="hz-stack-3 hz-mb-6">
              {GATEWAY_FEATURES.map((feature, index) => (
                <li key={index} className="hz-row hz-ai-start hz-gap-3">
                  <Check className="hz-sq-3 hz-fg hz-none hz-mt-1" />
                  <span className="hz-t-sm hz-fg-soft">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/pricing"
              className="hz-btn hz-btn-ghost hz-btn-block hz-transition hz-bg-inverse"
              >
              View Pricing
              <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Link>
          </motion.div>

          {/* Alternatives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="hz-card"
          >
            <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-2">
              Or use any alternative
            </h3>
            <p className="hz-fg-muted hz-mb-5">For AI inference</p>

            <ul className="hz-stack-3 hz-mb-6">
              {ALTERNATIVE_FEATURES.map((feature, index) => (
                <li key={index} className="hz-row hz-ai-start hz-gap-3">
                  <Check className="hz-sq-3 hz-fg-muted hz-none hz-mt-1" />
                  <span className="hz-t-sm hz-fg-muted">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://docs.hanzo.ai/byok"
              target="_blank"
              rel="noreferrer noopener"
              className="hz-btn hz-btn-ghost hz-btn-block hz-transition hz-fg"
            >
              Learn about BYOK
              <ArrowRight className="hz-sq-2 hz-ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OpenPricing;
