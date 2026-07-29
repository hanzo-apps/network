
import React from "react";
import { motion } from "framer-motion";

const PlatformTechnologies: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="hz-mt-7 hz-align-center"
    >
      <p className="hz-container-narrow hz-fg-muted hz-mb-6">
        Join the global pioneers who are 100x-ing their capabilities with the world's most comprehensive AI platform.
      </p>
      
      <div className="hz-grid hz-grid-4 hz-gap-7 hz-gap-5">
        <div className="hz-row hz-ai-center hz-jc-center hz-bh-5">
          <span className="hz-fg-soft hz-t-sm hz-w-medium">OPEN SOURCE</span>
        </div>
        <div className="hz-row hz-ai-center hz-jc-center hz-bh-5">
          <span className="hz-fg-soft hz-t-sm hz-w-medium">INFERENCE</span>
        </div>
        <div className="hz-row hz-ai-center hz-jc-center hz-bh-5">
          <span className="hz-fg-soft hz-t-sm hz-w-medium">FINE-TUNING</span>
        </div>
        <div className="hz-row hz-ai-center hz-jc-center hz-bh-5">
          <span className="hz-fg-soft hz-t-sm hz-w-medium">PRIVATE CLOUD</span>
        </div>
        <div className="hz-row hz-ai-center hz-jc-center hz-bh-5">
          <span className="hz-fg-soft hz-t-sm hz-w-medium">RAG</span>
        </div>
        <div className="hz-row hz-ai-center hz-jc-center hz-bh-5">
          <span className="hz-fg-soft hz-t-sm hz-w-medium">MODEL DISTILLATION</span>
        </div>
        <div className="hz-row hz-ai-center hz-jc-center hz-bh-5">
          <span className="hz-fg-soft hz-t-sm hz-w-medium">EDGE DEPLOYMENT</span>
        </div>
        <div className="hz-row hz-ai-center hz-jc-center hz-bh-5">
          <span className="hz-fg-soft hz-t-sm hz-w-medium">AGENTIC WORKFLOWS</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PlatformTechnologies;
