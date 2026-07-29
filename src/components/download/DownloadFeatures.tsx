
import React from "react";
import { motion } from "framer-motion";
import { Mic, Headphones } from "lucide-react";

const DownloadFeatures = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide">
        <motion.div 
          className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5 hz-fg">
              Local audio and mic transcription
            </h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-5">
              Automatically capture and share meeting notes, saving hours of manual work
            </p>
            
            <div className="hz-row hz-ai-center hz-inline-4 hz-fg-muted">
              <Mic className="hz-sq-4 hz-fg-muted" />
              <span>Private, secure, and processed on-device</span>
            </div>
            <div className="hz-row hz-ai-center hz-inline-4 hz-fg-muted hz-mt-3">
              <Headphones className="hz-sq-4 hz-fg-muted" />
              <span>Works with all major conferencing apps</span>
            </div>
          </div>
          
          <div className="hz-r-lg hz-clip hz-shadow-lg hz-bordered">
            <div className="hz-rel hz-bh-1 hz-bg-surface">
              <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center">
                <span className="hz-fg-muted">Transcription preview</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadFeatures;
