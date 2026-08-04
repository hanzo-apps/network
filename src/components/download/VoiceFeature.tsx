
import React from "react";
import { motion } from "framer-motion";
import { Mic, Command } from "lucide-react";

const VoiceFeature = () => {
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
                <span className="hz-fg-muted">Voice input preview</span>
              </div>
            </div>
          </div>
          
          <div className="hz-order-first">
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5 hz-fg">
              Hold command anywhere to talk
            </h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-5">
              Control apps, dictate content, and ask questions completely hands-free
            </p>
            
            <div className="hz-row hz-ai-center hz-inline-4 hz-fg-muted">
              <Command className="hz-sq-4 hz-fg-muted" />
              <span>Use system-wide keyboard shortcuts</span>
            </div>
            <div className="hz-row hz-ai-center hz-inline-4 hz-fg-muted hz-mt-3">
              <Mic className="hz-sq-4 hz-fg-muted" />
              <span>Seamless voice recognition</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VoiceFeature;
