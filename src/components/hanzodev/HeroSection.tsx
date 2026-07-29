import { BRAND } from '@/lib/brand';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";


const HeroSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx hanzo-dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hz-rel hz-pt-6 hz-pb-6 hz-px-4 hz-clip">
      {/* Background gradient */}
      <div className="hz-abs hz-inset hz-clip hz-z-base hz-no-pointer">
        <div
          className="hz-center-xy hz-abs hz-r-full hz-dim-more"
          style={{
            background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 70%)`,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="hz-container-wide hz-rel hz-z-raised">
        {/* Main content - centered */}
        <div className="hz-align-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-5 hz-bg-quiet hz-fg"
            >
            Get up to 50% free credits with Hanzo Pass
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="hz-t-3xl hz-w-medium hz-tracking-tight hz-mb-5"
          >
            <span className="hz-fg">Move at Hanzo Speed</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="hz-container-narrow hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6"
          >
            Build, ship, and iterate faster with the most popular open source coding agent.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="hz-row hz-wrap hz-ai-center hz-jc-center hz-gap-4 hz-mb-6"
          >
            <Link
              to="/get-started"
              className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
              >
              Get Started with Hanzo
              <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Link>
            <Link
              to="/contact"
              className="hz-btn hz-btn-ghost hz-transition hz-fg"
            >
              Talk to an Expert
            </Link>
          </motion.div>

          {/* Install command */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="hz-mb-7"
          >
            <div className="hz-btn hz-gap-3">
              <code className="hz-t-sm hz-mono hz-fg-soft">
                npx hanzo-dev
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

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
