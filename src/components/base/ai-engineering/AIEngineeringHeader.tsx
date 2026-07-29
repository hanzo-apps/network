
import React from "react";
import { motion } from "framer-motion";

const AIEngineeringHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-align-center hz-mb-7"
    >
      <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">Built for AI Engineers</h2>
      <p className="hz-container-narrow hz-t-xl hz-fg-soft">
        Powerful features specifically designed for AI-powered applications
      </p>
    </motion.div>
  );
};

export default AIEngineeringHeader;
