import React from "react";
import { motion } from "framer-motion";

// Partners and investors
const partners = [
  { name: "Techstars", year: "'17" },
  { name: "NVIDIA" },
  { name: "Google Cloud" },
  { name: "Amazon" },
  { name: "DigitalOcean" },
  { name: "Nebius" },
];

// Companies we've worked with at Hanzo Industries
const clients = [
  "Triller",
  "Damon",
  "Bellabeat",
  "Unikrn",
  "Cover",
  "Casper",
  "Myle",
  "Drumpants",
  "Cove",
  "Aura",
  "KANOA",
  "SKULLY",
];

const TrustedBySection = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
            Trusted by the best
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-fg-muted">
            Backed by world-class partners and trusted by industry leaders
          </p>
        </motion.div>

        {/* Partners section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hz-mb-7"
        >
          <p className="hz-t-xs hz-upper hz-tracking-widest hz-fg-muted hz-mb-5 hz-align-center">
            Partners & Investors
          </p>
          <div className="hz-row hz-wrap hz-jc-center hz-ai-center hz-gap-5">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="hz-px-4 hz-py-2 hz-r-full hz-bordered hz-bg-surface hz-fg-soft hz-transition hz-hoverable"
              >
                <span className="hz-t-sm hz-w-medium hz-tracking-tight">
                  {partner.name}
                  {partner.year && (
                    <span className="hz-fg-soft hz-ml-1">{partner.year}</span>
                  )}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Clients section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="hz-t-xs hz-upper hz-tracking-widest hz-fg-muted hz-mb-5 hz-align-center">
            Trusted By
          </p>
          <div className="hz-row hz-wrap hz-jc-center hz-ai-center hz-gap-6 hz-gap-4">
            {clients.map((client, index) => (
              <motion.span
                key={client}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="hz-fg-muted hz-transition hz-t-sm hz-w-medium hz-link"
              >
                {client}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
