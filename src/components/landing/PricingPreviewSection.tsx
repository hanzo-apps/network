import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const freeFeatures = [
  "100K API calls / month",
  "1GB vector storage",
  "10GB file storage",
  "Community support",
  "All core features",
  "Unlimited projects",
];

const PricingPreviewSection = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <p
            className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-4 hz-py-2 hz-bordered hz-mb-5"
            style={{ color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.3)" }}
          >
            Pricing
          </p>
          <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-5">
            Scale forever
          </h2>
          <p className="hz-t-lg hz-fg-muted">
            No credit card required. Upgrade when you're ready.
          </p>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hz-rel"
        >
          {/* Glow effect */}
          <div
            className="hz-abs hz-inset hz-r-xl hz-blur-bg hz-dim-more"
            style={{ background: "linear-gradient(135deg, #ffffff, #a3a3a3)" }}
          />

          <div className="hz-card hz-rel hz-glass">
            <div className="hz-grid hz-grid-2 hz-gap-6 hz-ai-center">
              {/* Left: Free tier info */}
              <div>
                <div className="hz-row hz-ai-center hz-gap-2 hz-mb-4">
                  <Sparkles className="hz-sq-3 hz-fg" />
                  <span className="hz-t-sm hz-w-medium hz-fg">Free Forever</span>
                </div>
                <h3 className="hz-t-3xl hz-w-bold hz-fg hz-mb-2">
                  $0<span className="hz-t-lg hz-w-normal hz-fg-muted">/month</span>
                </h3>
                <p className="hz-fg-muted hz-mb-5">
                  Everything you need to start building. No strings attached.
                </p>

                <ul className="hz-stack-3">
                  {freeFeatures.map((feature) => (
                    <li key={feature} className="hz-row hz-ai-center hz-gap-3">
                      <div className="hz-sq-3 hz-r-full hz-bg-quiet hz-row hz-ai-center hz-jc-center hz-none">
                        <Check className="hz-sq-1 hz-fg" />
                      </div>
                      <span className="hz-fg-soft hz-t-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: CTAs */}
              <div className="hz-col hz-ai-center hz-gap-4">
                <a
                  href="https://iam.hanzo.ai/sign-up"
                  className="hz-btn hz-btn-ghost hz-btn-lg hz-btn-block hz-fg hz-transition"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  Start Building Free
                  <ArrowRight className="hz-sq-3 hz-ml-2" />
                </a>

                <Link
                  to="/pricing"
                  className="hz-inline hz-ai-center hz-gap-2 hz-t-sm hz-fg-muted hz-transition hz-link"
                >
                  View all plans
                  <ArrowRight className="hz-sq-2" />
                </Link>

                <p className="hz-t-xs hz-fg-faint hz-align-center hz-mt-4">
                  No credit card required
                  <br />
                  Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enterprise callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hz-mt-6 hz-align-center"
        >
          <p className="hz-fg-muted">
            Need custom limits, SLAs, or dedicated support?{" "}
            <Link
              to="/enterprise"
              className="hz-fg"
            >
              Talk to sales
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPreviewSection;
