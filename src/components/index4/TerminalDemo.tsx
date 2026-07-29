
import React from "react";
import { motion } from "framer-motion";
import { ArchitecturalBox } from "@/components/ui/architectural-elements";

const TerminalDemo = () => {
  return (
    <section className="hz-container-narrow hz-mb-7">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ArchitecturalBox
          className="hz-glass hz-bg-surface hz-bordered hz-r-lg hz-clip"
          showGrid={true}
          gridColor="rgba(255,255,255,0.03)"
          gridSpacing={30}
          gridOpacity={0.1}
        >
          <div className="hz-row hz-ai-center hz-border-b hz-px-4 hz-py-3">
            <div className="hz-row hz-inline-2 hz-mr-4">
              <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
              <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
              <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
            </div>
            <div className="hz-grow hz-align-center">
              <span className="hz-t-xs hz-mono hz-fg-muted">terminal</span>
            </div>
          </div>
          
          <div className="hz-p-5 hz-mono hz-t-sm">
            <div className="hz-row hz-ai-start hz-mb-4">
              <span className="hz-fg-muted hz-mr-2">$</span>
              <span className="hz-fg-soft">hanzo deploy</span>
            </div>
            
            <div className="hz-px-4 hz-fg-muted hz-stack-1">
              <p>Initializing deployment...</p>
              <p>Building application <span className="hz-fg-muted">v2.3.5</span></p>
              <p className="hz-fg-muted">Installing dependencies...</p>
              <p className="hz-fg-muted">Running build command...</p>
              <p className="hz-fg-muted">✓ Build successful</p>
              <p className="hz-fg-muted">Uploading artifacts...</p>
              <p className="hz-fg-muted">✓ Deployment complete</p>
            </div>
            
            <div className="hz-mt-5 hz-row hz-ai-start">
              <span className="hz-fg-muted hz-mr-2">$</span>
              <span className="hz-fg-soft">_</span>
            </div>
          </div>
        </ArchitecturalBox>
      </motion.div>
    </section>
  );
};

export default TerminalDemo;
