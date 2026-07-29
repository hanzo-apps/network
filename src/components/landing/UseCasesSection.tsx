import { BRAND } from '@/lib/brand';
import React from "react";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";


const features = [
  { name: "Multi-agent parallelism + consensus", hanzo: "full", others: "none", desc: "Best patch wins" },
  { name: "Policy / approvals / audit by default", hanzo: "full", others: "none", desc: "Humans + agents" },
  { name: "Self-host and air-gapped options", hanzo: "full", others: "partial", desc: "On-prem ready" },
  { name: "Evidence-driven output", hanzo: "full", others: "partial", desc: "Diffs + tests + traces, not screenshots" },
  { name: "Long-running sandboxes", hanzo: "full", others: "partial", desc: "Install, refactor, iterate" },
];

const renderStatus = (status: string) => {
  switch (status) {
    case "full":
      return (
        <div className="hz-row hz-ai-center hz-jc-center">
          <Check className="hz-sq-3 hz-fg-muted" />
        </div>
      );
    case "partial":
      return (
        <div className="hz-row hz-ai-center hz-jc-center">
          <Minus className="hz-sq-3 hz-fg-muted" />
        </div>
      );
    case "none":
      return (
        <div className="hz-row hz-ai-center hz-jc-center">
          <X className="hz-sq-3 hz-fg-faint" />
        </div>
      );
    default:
      return null;
  }
};

const UseCasesSection = () => {
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
            style={{ color: BRAND.fg, borderColor: `${BRAND.washStrong}` }}
          >
            Comparison
          </p>
          <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
            Why Hanzo vs agents + glue
          </h2>
          <p className="hz-t-lg hz-fg-muted">
            Production software needs more than autocomplete.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hz-r-lg hz-bordered hz-clip"
        >
          {/* Header */}
          <div className="hz-grid hz-grid-3 hz-gap-4 hz-p-4 hz-bg-surface hz-border-b">
            <div className="hz-t-sm hz-w-medium hz-fg-muted">Capability</div>
            <div className="hz-t-sm hz-w-medium hz-align-center hz-fg" >Hanzo</div>
            <div className="hz-t-sm hz-w-medium hz-fg-muted hz-align-center">Others</div>
          </div>

          {/* Rows */}
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`hz-grid hz-grid-3 hz-gap-4 hz-p-4 ${
                index !== features.length - 1 ? "hz-border-b" : ""
              } hz-transition hz-hoverable`}
            >
              <div>
                <div className="hz-t-sm hz-fg hz-w-medium">{feature.name}</div>
                <div className="hz-t-xs hz-fg-muted hz-mt-1">{feature.desc}</div>
              </div>
              <div className="hz-row hz-jc-center hz-ai-center">{renderStatus(feature.hanzo)}</div>
              <div className="hz-row hz-jc-center hz-ai-center">{renderStatus(feature.others)}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <div className="hz-row hz-jc-center hz-gap-5 hz-mt-5">
          <div className="hz-row hz-ai-center hz-gap-2">
            <Check className="hz-sq-2 hz-fg-muted" />
            <span className="hz-t-xs hz-fg-muted">Full support</span>
          </div>
          <div className="hz-row hz-ai-center hz-gap-2">
            <Minus className="hz-sq-2 hz-fg-muted" />
            <span className="hz-t-xs hz-fg-muted">Partial / varies</span>
          </div>
          <div className="hz-row hz-ai-center hz-gap-2">
            <X className="hz-sq-2 hz-fg-faint" />
            <span className="hz-t-xs hz-fg-muted">Not available</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
