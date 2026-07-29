
import React from "react";
import { motion } from "framer-motion";
import ChromeText from "@/components/ui/chrome-text";

const ModelHeader = () => {
  return (
    <div className="hz-container-narrow hz-align-center hz-mb-7">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-5">
          Unified Model Access
        </ChromeText>
        <p className="hz-t-xl hz-fg-soft">
          Access thousands of AI models through a single, unified API with consistent interfaces
          and predictable pricing
        </p>
      </motion.div>
    </div>
  );
};

export default ModelHeader;
