
import React from "react";
import { motion } from "framer-motion";
import { Crop, MonitorSmartphone } from "lucide-react";

const ScreenCapture = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg-overlay">
      <div className="hz-container-wide">
        <motion.div 
          className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="hz-r-lg hz-clip hz-shadow-lg hz-bordered">
            <div className="hz-rel hz-bh-1 hz-bg-surface">
              <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center">
                <span className="hz-fg-muted">Screen capture preview</span>
              </div>
            </div>
          </div>
          
          <div className="hz-order-first">
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5 hz-fg">
              Use Apps & Your Screen as input
            </h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-5">
              Capture any part of your screen for instant insights and explanations
            </p>
            
            <div className="hz-row hz-ai-center hz-inline-4 hz-fg-muted">
              <Crop className="hz-sq-4 hz-fg-muted" />
              <span>Select any region of your screen</span>
            </div>
            <div className="hz-row hz-ai-center hz-inline-4 hz-fg-muted hz-mt-3">
              <MonitorSmartphone className="hz-sq-4 hz-fg-muted" />
              <span>Ask questions without leaving your workflow</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScreenCapture;
