import { BRAND } from '@/lib/brand';
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";


const plans = [
  {
    name: "Pro",
    highlight: false,
    description: "Hanzo Dev is included in your Pro plan. Perfect for short coding sprints in small codebases with access to both Sonnet 4.5 and Opus 4.5.",
    price: "$17",
    period: "Per month with annual subscription discount ($200 billed up front). $20 if billed monthly.",
    features: [
      "Access to Sonnet 4.5 and Opus 4.5",
      "Terminal, IDE, and web access",
      "Codebase context understanding",
      "Standard usage limits",
    ],
  },
  {
    name: "Max 5x",
    highlight: true,
    description: "Hanzo Dev is included in your Max plan. Great value for everyday use in larger codebases.",
    price: "$100",
    period: "Per person billed monthly",
    features: [
      "Everything in Pro",
      "5x more usage",
      "Large codebase support",
      "Priority model access",
      "Slack integration",
    ],
  },
  {
    name: "Max 20x",
    highlight: false,
    description: "Even more Hanzo Dev included in your Max plan. Great value for power users with the most access to Hanzo models.",
    price: "$200",
    period: "Per person billed monthly",
    features: [
      "Everything in Max 5x",
      "20x more usage",
      "Priority support",
      "Advanced analytics",
      "Team collaboration",
    ],
  },
];

const PricingSection = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <p
            className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-4 hz-py-2 hz-bordered hz-mb-5"
            style={{ color: BRAND.fg, borderColor: `${BRAND.washStrong}` }}
          >
            Pricing
          </p>
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Choose your plan
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted">
            Start building with Hanzo Dev today. Scale as your needs grow.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-5">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`hz-rel hz-r-xl hz-p-6 ${
                plan.highlight
                  ? "hz-bordered hz-border-strong"
                  : "hz-bg-surface hz-bordered"
              } `}
              style={plan.highlight ? { borderColor: BRAND.fg } : {}}
            >
              {plan.highlight && (
                <div
                  className="hz-center-x hz-abs hz-px-4 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-fg hz-bg-inverse"
                  >
                  Most Popular
                </div>
              )}

              <div className="hz-mb-5">
                <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">{plan.name}</h3>
                <p className="hz-t-sm hz-fg-muted">{plan.description}</p>
              </div>

              <div className="hz-mb-5">
                <div className="hz-row hz-ai-baseline hz-gap-1">
                  <span className="hz-t-4xl hz-w-bold hz-fg">{plan.price}</span>
                </div>
                <p className="hz-t-xs hz-fg-muted hz-mt-2">{plan.period}</p>
              </div>

              <Button
                className={`hz-w-full hz-mb-5 ${
                  plan.highlight
                    ? "hz-fg"
                    : "hz-bg-quiet hz-fg hz-hoverable"
                }`}
                style={plan.highlight ? { backgroundColor: BRAND.fg } : {}}
                asChild
              >
                <Link to="/signup">
                  Try Hanzo
                  <ArrowRight className="hz-sq-2 hz-ml-2" />
                </Link>
              </Button>

              <ul className="hz-stack-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="hz-row hz-ai-start hz-gap-3">
                    <Check className="hz-sq-3 hz-fg-muted hz-none hz-mt-1" />
                    <span className="hz-t-sm hz-fg-soft">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hz-align-center hz-t-sm hz-fg-muted hz-mt-6"
        >
          Extra usage limits apply. Prices shown don't include applicable tax.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
