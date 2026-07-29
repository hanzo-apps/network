
import React from "react";
import { motion } from "framer-motion";

const AIPoweredHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-align-center hz-mb-7"
    >
      <h2 className="hz-t-3xl hz-w-bold hz-mb-5">AI-Powered Observability & Monitoring</h2>
      <p className="hz-container-narrow hz-t-xl hz-fg-soft">
        Proactively identify issues and opportunities with AI-powered insights and monitoring.
      </p>
    </motion.div>
  );
};

export default AIPoweredHeader;
