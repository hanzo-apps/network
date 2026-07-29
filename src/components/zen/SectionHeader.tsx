
import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="hz-align-center hz-mb-7"
    >
      <h2 className="hz-t-3xl hz-w-bold hz-mb-4 hz-fg">{title}</h2>
      <div className="hz-bh-1 hz-bw-8 hz-bg-raised hz-mx-auto hz-mb-5"></div>
      {description && (
        <p className="hz-container-narrow hz-fg-soft">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
