import { BRAND } from '@/lib/brand';
import React from "react";
import { motion } from "framer-motion";
import { Shield, Database, Brain, Rocket } from "lucide-react";

const layers = [
  {
    name: "Identity & Control Plane",
    icon: Shield,
    items: ["Hanzo Team", "Hanzo ID", "IAM", "KMS", "Audit"],
  },
  {
    name: "Data Plane",
    icon: Database,
    items: ["Vector", "SQL", "KV", "Streaming", "Workflows"],
  },
  {
    name: "AI Plane",
    icon: Brain,
    items: ["Models", "Inference", "Agents (Hanzo Dev)", "Evaluation"],
  },
  {
    name: "Deployment Plane",
    icon: Rocket,
    items: ["Local", "Kubernetes", "Cloud", "Edge"],
  },
];


const VerticalStackSection = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      {/* Background grid */}
      <div
        className="hz-abs hz-inset hz-dim-more"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${BRAND.fg} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="hz-container-narrow hz-rel hz-z-raised">
        {/* Header */}
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
            Architecture
          </p>
          <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-5">
            The vertically integrated stack
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted">
            Identity to production in one platform.
          </p>
        </motion.div>

        {/* Vertical Stack Diagram */}
        <div className="hz-rel">
          {/* Vertical connecting line */}
          <motion.div
            className="hz-center-x hz-abs hz-top-0 hz-bottom-0 hz-z-base hz-bg-quiet"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Layer Cards */}
          <div className="hz-rel hz-z-raised hz-col hz-gap-5">
            {layers.map((layer, index) => {
              const Icon = layer.icon;
              const isLast = index === layers.length - 1;

              return (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="hz-rel"
                >
                  {/* Connection dot */}
                  <motion.div
                    className="hz-center-x hz-sq-1 hz-abs hz-r-full hz-bordered hz-border-strong hz-bg hz-z-raised"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                  />

                  {/* Card */}
                  <motion.div
                    className="hz-card hz-rel hz-glass hz-transition hz-card-interactive"
                    whileHover={{
                      boxShadow: `0 0 40px -10px ${BRAND.washStrong}`,
                      borderColor: `${BRAND.washStrong}`,
                    }}
                  >
                    {/* Layer Header */}
                    <div className="hz-row hz-ai-center hz-gap-4 hz-mb-4">
                      <div
                        className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-none hz-bg-quiet"
                        >
                        <Icon className="hz-sq-4 hz-fg" />
                      </div>
                      <h3 className="hz-t-lg hz-w-semibold hz-fg">
                        {layer.name}
                      </h3>
                    </div>

                    {/* Items */}
                    <div className="hz-row hz-wrap hz-gap-2 hz-ml-4">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="hz-px-3 hz-py-2 hz-t-sm hz-w-medium hz-r-lg hz-bg-raised hz-fg-soft hz-transition hz-hoverable"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Flow arrow indicator */}
                    {!isLast && (
                      <motion.div
                        className="hz-center-x hz-abs hz-fg-faint"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.3 }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className=""
                        >
                          <path
                            d="M6 0L12 8H0L6 0Z"
                            fill={BRAND.fg}
                            fillOpacity="0.5"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom endpoint */}
          <motion.div
            className="hz-center-x hz-sq-2 hz-abs hz-r-full hz-z-raised hz-bg-inverse"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.8 }}
          />
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="hz-align-center hz-mt-7"
        >
          <p className="hz-fg-muted hz-t-sm">
            From identity management to edge deployment, every layer works together seamlessly.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VerticalStackSection;
