
import React from "react";
import { motion } from "framer-motion";
import ChromeText from "@/components/ui/chrome-text";
import { Button } from "@/components/ui/button";

const PlatformHeader: React.FC = () => {
  return (
    <div className="hz-col-row hz-jc-between hz-ai-start hz-mb-7">
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-mb-4"
        >
          <span className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium">
            AI Engineering Platform
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ChromeText 
            as="h2" 
            className="hz-t-3xl hz-w-bold hz-mb-4"
          >
            Your AI future belongs to you
          </ChromeText>
          <p className="hz-t-xl hz-fg-soft hz-mw-md">
            Pioneer the next wave of intelligence with an integrated ecosystem that gives you full control over your AI journey.
          </p>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hz-mt-6"
      >
        <Button size="lg" variant="outline" className="hz-fg">
          <a href="/solutions">Explore Solutions</a>
        </Button>
      </motion.div>
    </div>
  );
};

export default PlatformHeader;
