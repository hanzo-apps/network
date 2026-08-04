
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";

interface CloudHeaderProps {
  mousePosition: { x: number; y: number };
  containerRef: React.RefObject<HTMLElement>;
}

const CloudHeader: React.FC<CloudHeaderProps> = ({ mousePosition, containerRef }) => {
  return (
    <div className="hz-col-row hz-jc-between hz-ai-start hz-mb-7">
      <div className="hz-mw-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-mb-4"
        >
          <span className="hz-px-4 hz-py-1 hz-r-full hz-bg hz-bordered hz-fg hz-t-sm hz-w-medium">
            Infinitely Scalable, Globally Distributed
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
            className="hz-t-3xl hz-w-bold hz-mb-4 hz-align-left"
            style={{
              backgroundPosition: `${(mousePosition.x / (containerRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (containerRef.current?.offsetHeight || 1)) * 100}%`,
            }}
          >
            AI Cloud
          </ChromeText>
          <p className="hz-t-xl hz-fg-soft hz-mt-4">
            Global, infinitely scalable, sustainable compute infrastructure specifically optimized for AI applications
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
        <Button size="lg" variant="outline" className="hz-fg hz-bg hz-whitespace-nowrap hz-hoverable">
          <a href="/cloud">Explore Cloud</a>
        </Button>
      </motion.div>
    </div>
  );
};

export default CloudHeader;
