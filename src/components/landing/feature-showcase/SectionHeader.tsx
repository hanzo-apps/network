
import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ badge, badgeColor, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-align-center hz-mb-7"
    >
      <div className={`hz-px-4 hz-py-1 hz-r-full ${badgeColor} hz-t-sm hz-w-medium hz-mb-5`}>
        {badge}
      </div>
      <h3 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
        {title}
      </h3>
      <p className="hz-container-narrow hz-t-lg hz-fg-soft">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionHeader;
