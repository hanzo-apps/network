
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GlobeThreeJs from "./GlobeThreeJs";

const GlobeContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="hz-rel hz-w-full hz-bg hz-r-lg hz-clip hz-mt-6 hz-mb-7 hz-bordered"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient */}
      <div className="hz-abs hz-inset hz-dim-more"></div>
      
      {dimensions.width > 0 && dimensions.height > 0 && (
        <GlobeThreeJs width={dimensions.width} height={dimensions.height} />
      )}
      
      <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center hz-align-center hz-p-4 hz-no-pointer">
        <div className="hz-card hz-mt-6 hz-glass">
          <h3 className="hz-t-2xl hz-w-semibold hz-fg hz-mb-2">Global Network</h3>
          <p className="hz-container-narrow hz-mw-sm hz-fg-soft hz-t-sm">
            Deploy to 35+ regions around the world with 99.99% uptime SLA and automatic failover.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default GlobeContainer;
