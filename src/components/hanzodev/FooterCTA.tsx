import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";


const FooterCTA = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("curl -fsSL hanzo.sh/install.sh | sh");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-narrow hz-align-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-t-3xl hz-w-bold hz-fg hz-mb-4"
        >
          Ship faster. Keep control.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted hz-mb-6"
        >
          All coding agents in one workspace. Parallel execution, evidence-driven output,
          and policies you control.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="hz-row hz-wrap hz-ai-center hz-jc-center hz-gap-4 hz-mb-6"
        >
          <Link
            to="/get-started"
            className="hz-btn hz-btn-ghost hz-btn-lg hz-transition hz-bg-inverse"
            >
            Start free
            <ArrowRight className="hz-sq-3 hz-ml-2" />
          </Link>
          <a
            href="https://marketplace.visualstudio.com/items?itemName=hanzo.hanzo-dev"
            target="_blank"
            rel="noreferrer noopener"
            className="hz-btn hz-btn-ghost hz-btn-lg hz-transition hz-fg"
          >
            Install VS Code extension
            <ExternalLink className="hz-sq-3 hz-ml-2" />
          </a>
        </motion.div>

        {/* Install command */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="hz-mb-5"
        >
          <div className="hz-btn hz-gap-3">
            <code className="hz-t-sm hz-mono hz-fg-soft">
              curl -fsSL hanzo.sh/install.sh | sh
            </code>
            <button
              onClick={handleCopy}
              className="hz-fg-muted hz-transition hz-link"
            >
              {copied ? (
                <Check className="hz-sq-2 hz-fg-muted" />
              ) : (
                <Copy className="hz-sq-2" />
              )}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://docs.hanzo.ai/dev"
            target="_blank"
            rel="noreferrer noopener"
            className="hz-t-sm hz-fg-muted hz-transition hz-link"
          >
            Read the documentation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
