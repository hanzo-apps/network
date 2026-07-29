import React from "react";
import { motion } from "framer-motion";

interface CompatibilityItem {
  name: string;
  compatible: string;
}

const ecosystemItems: CompatibilityItem[] = [
  { name: "Analytics", compatible: "Insights" },
  { name: "Web Analytics", compatible: "Umami" },
  { name: "Experiments", compatible: "GrowthBook" },
  { name: "Engage", compatible: "Dittofeed" },
  { name: "Automations", compatible: "Activepieces" },
  { name: "PubSub", compatible: "NATS" },
  { name: "Tasks", compatible: "Temporal" },
  { name: "CX", compatible: "Chatwoot" },
];

const EcosystemBadge: React.FC<{ item: CompatibilityItem; index: number }> = ({
  item,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
      className="hz-btn hz-gap-2 hz-transition"
    >
      <span className="hz-t-sm hz-w-medium hz-fg">{item.name}</span>
      <span className="hz-t-xs hz-fg-muted">
        ({item.compatible}-compatible)
      </span>
    </motion.div>
  );
};

const EcosystemSection: React.FC = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-6"
        >
          <h2 className="hz-t-2xl hz-w-medium hz-fg hz-mb-2">
            Ecosystem
          </h2>
          <p className="hz-fg-muted hz-t-sm">
            Drop-in compatible, unified experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hz-row hz-wrap hz-jc-center hz-gap-3"
        >
          {ecosystemItems.map((item, index) => (
            <EcosystemBadge key={item.name} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemSection;
