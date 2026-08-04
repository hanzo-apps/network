import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bot, Cloud, Rocket, Database, ArrowRight } from "lucide-react";

const entryPoints = [
  {
    icon: Bot,
    title: "Hanzo Dev",
    tagline: "AI engineer",
    description: "Ship code with an AI agent that respects your policies.",
    link: "/products/apps/agent",
  },
  {
    icon: Cloud,
    title: "Hanzo Cloud",
    tagline: "UI + control plane",
    description: "Manage your entire stack from one dashboard.",
    link: "/products/apps/cloud",
  },
  {
    icon: Rocket,
    title: "Deploy Anywhere",
    tagline: "k8s / cloud / edge",
    description: "One command to deploy to any target.",
    link: "/products/platform/platform",
  },
  {
    icon: Database,
    title: "Data & Vector",
    tagline: "RAG-ready",
    description: "SQL, Vector, KV—everything for AI data.",
    link: "/products/data",
  },
];

const CuratedEntryPointsSection = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      {/* Background grid */}
      <div
        className="hz-abs hz-inset hz-dim-more"
        style={{
          backgroundImage: `radial-gradient(circle at center, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
            Start building
          </h2>
          <p className="hz-t-lg hz-fg-muted">
            Four paths into the platform.
          </p>
        </motion.div>

        {/* Entry Points Grid */}
        <div className="hz-grid hz-grid-4 hz-gap-4">
          {entryPoints.map((entry, index) => {
            const Icon = entry.icon;
            return (
              <motion.div
                key={entry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={entry.link} className="hz-h-full">
                  <motion.div
                    className="hz-card hz-h-full hz-transition hz-rel hz-clip hz-card-interactive"
                    whileHover={{
                      y: -4,
                      boxShadow: "0 0 40px -10px rgba(255, 255, 255, 0.3)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Icon */}
                    <div
                      className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    >
                      <Icon
                        className="hz-sq-4"
                        style={{ color: "#ffffff" }}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-1 hz-transition hz-hoverable">
                      {entry.title}
                    </h3>

                    {/* Tagline */}
                    <p className="hz-t-xs hz-w-medium hz-fg-muted hz-mb-3">
                      {entry.tagline}
                    </p>

                    {/* Description */}
                    <p className="hz-t-sm hz-fg-muted hz-leading-relaxed">
                      {entry.description}
                    </p>

                    {/* Hover accent line */}
                    <motion.div
                      className="hz-abs hz-bottom-0 hz-left-0 hz-r-full"
                      style={{ backgroundColor: "#ffffff" }}
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Products Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hz-align-center hz-mt-6"
        >
          <Link
            to="/products"
            className="hz-inline hz-ai-center hz-gap-2 hz-t-sm hz-w-medium hz-fg-muted hz-transition hz-link"
          >
            View all products
            <ArrowRight className="hz-sq-2 hz-transition" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CuratedEntryPointsSection;
