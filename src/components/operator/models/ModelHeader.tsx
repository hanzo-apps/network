
import React from "react";
import { motion } from "framer-motion";

const ModelHeader = () => {
  return (
    <div className="hz-container-narrow hz-align-center hz-mb-7">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
          Supported Models
        </h2>
        <p className="hz-t-xl hz-fg-soft">
          Hanzo Operative works with multiple multimodal AI models, 
          each with different capabilities and strengths
        </p>
      </motion.div>
    </div>
  );
};

export default ModelHeader;
