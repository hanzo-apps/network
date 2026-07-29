
import React from "react";
import { motion } from "framer-motion";
import ChromeText from "@/components/ui/chrome-text";

const FeatureShowcaseHeader: React.FC = () => {
  return (
    <div className="hz-align-center hz-mb-7">
      <motion.div 
        className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Open Source AI Engineering
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="hz-container-narrow"
      >
        <ChromeText as="span" className="hz-t-4xl hz-w-bold hz-leading-tight">
          Build the Future with AI
        </ChromeText>
      </motion.h2>
      
      <motion.p 
        className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-soft hz-mt-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        A complete platform for developers to build, deploy, and scale AI applications
        with unprecedented speed and complete control
      </motion.p>
    </div>
  );
};

export default FeatureShowcaseHeader;
