
import React from "react";
import { motion } from "framer-motion";

const Usage = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">
            4.8M+ deploys per month (and counting)
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Real-time usage showing totals for users and services, along with 30-day deploys, requests, and logs.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-card hz-rel hz-clip"
        >
          <div className="hz-grid hz-grid-3 hz-gap-5">
            <div className="hz-col hz-ai-center hz-jc-center hz-p-5 hz-bg-overlay hz-r-lg">
              <div className="hz-t-4xl hz-w-bold hz-fg hz-mb-2">4.8M+</div>
              <div className="hz-fg-muted">Monthly Deploys</div>
            </div>
            
            <div className="hz-col hz-ai-center hz-jc-center hz-p-5 hz-bg-overlay hz-r-lg">
              <div className="hz-t-4xl hz-w-bold hz-fg hz-mb-2">1.2B+</div>
              <div className="hz-fg-muted">Monthly Requests</div>
            </div>
            
            <div className="hz-col hz-ai-center hz-jc-center hz-p-5 hz-bg-overlay hz-r-lg">
              <div className="hz-t-4xl hz-w-bold hz-fg hz-mb-2">850K+</div>
              <div className="hz-fg-muted">Active Developers</div>
            </div>
          </div>
          
          <div className="hz-mt-6 hz-bg-overlay hz-p-4 hz-r-lg">
            <div className="hz-bh-8 hz-w-full hz-bg-surface hz-r-lg hz-row hz-ai-center hz-jc-center">
              <p className="hz-fg-muted">Usage Metrics Visualization</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Usage;
