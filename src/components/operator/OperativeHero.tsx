
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Terminal, Eye, Cpu, MousePointer, Keyboard } from "lucide-react";

const OperativeHero = () => {
  return (
    <section className="hz-py-7 hz-rel hz-clip">
      {/* Background gradient */}
      <div className="hz-abs hz-inset"></div>
      <div className="hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-align-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-5">
              AI Engineering Framework
            </span>
            
            <h1 className="hz-t-5xl hz-w-bold hz-tracking-tight hz-fg hz-mb-5 hz-chrome">
              Hanzo Operative
            </h1>

            <p className="hz-container-narrow hz-mt-5 hz-t-xl hz-fg-soft">
              A framework that enables multimodal AI models to operate a computer using the same inputs and 
              outputs as a human operator, viewing the screen and executing mouse and keyboard actions to achieve objectives.
            </p>

            <div className="hz-col-row hz-mt-6 hz-gap-4 hz-jc-center">
              <Button size="lg" className="hz-t-lg hz-px-6">
                <a href="#get-started">Get Started</a>
              </Button>
              <Button size="lg" variant="outline" className="hz-t-lg hz-px-6 hz-fg hz-bg-surface hz-hoverable">
                <a href="https://docs.hanzo.ai/operative" className="hz-row hz-ai-center hz-gap-2">
                  <Terminal className="hz-sq-3" />
                  View Docs
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hz-grid hz-grid-4 hz-container-narrow hz-mt-7 hz-gap-5"
          >
            <div className="hz-col hz-ai-center">
              <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4">
                <Eye className="hz-sq-4 hz-fg-muted" />
              </div>
              <p className="hz-t-sm hz-w-medium hz-fg-soft">Screen Vision</p>
            </div>
            <div className="hz-col hz-ai-center">
              <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4">
                <Cpu className="hz-sq-4 hz-fg-muted" />
              </div>
              <p className="hz-t-sm hz-w-medium hz-fg-soft">Multimodal Models</p>
            </div>
            <div className="hz-col hz-ai-center">
              <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4">
                <MousePointer className="hz-sq-4 hz-fg-muted" />
              </div>
              <p className="hz-t-sm hz-w-medium hz-fg-soft">Cursor Control</p>
            </div>
            <div className="hz-col hz-ai-center">
              <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4">
                <Keyboard className="hz-sq-4 hz-fg-muted" />
              </div>
              <p className="hz-t-sm hz-w-medium hz-fg-soft">Keyboard Actions</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OperativeHero;
