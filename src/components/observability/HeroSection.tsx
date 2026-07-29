
import React from "react";
import { motion } from "framer-motion";
import { LineChart, BarChart4, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="hz-pt-6 hz-pb-6 hz-px-4 hz-bg hz-rel hz-clip">
      {/* Gradient effects */}
      <div className="hz-abs hz-inset hz-dim"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bottom-0 hz-right-0 hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <div className="hz-container-narrow hz-align-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hz-row hz-jc-center hz-mb-5"
          >
            <div className="hz-p-3 hz-r-lg">
              <Activity className="hz-sq-5 hz-fg" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hz-t-4xl hz-w-bold hz-mb-5 hz-chrome"
          >
            Unified Intelligence for AI Applications
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6"
          >
            Hanzo Observability provides end-to-end visibility and proactive insights designed specifically for debugging, optimizing, and improving your AI applications.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hz-col-row hz-gap-4 hz-jc-center"
          >
            <Button size="lg" className="hz-fg hz-border-none hz-px-6 hz-py-5 hz-r-md hz-t-lg">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="hz-border-strong hz-px-6 hz-py-5 hz-r-md hz-t-lg hz-hoverable">
              View Documentation
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hz-mt-7 hz-rel"
        >
          <div className="hz-abs hz-inset hz-z-raised hz-bh-8 hz-bottom-0"></div>
          <div className="hz-p-2 hz-r-lg hz-bordered hz-shadow-lg hz-clip">
            <div className="hz-grid hz-grid-5 hz-gap-3 hz-p-4 hz-bg-overlay hz-r-lg">
              <div className="hz-stack-4">
                <div className="hz-bh-5 hz-bg-raised hz-r-md"></div>
                <div className="hz-bh-5 hz-bg-raised hz-r-md"></div>
                <div className="hz-bh-5 hz-bg-raised hz-r-md"></div>
                <div className="hz-bh-5 hz-bg-raised hz-r-md"></div>
                <div className="hz-bh-5 hz-bg-raised hz-r-md"></div>
                <div className="hz-bh-8 hz-bg-raised hz-r-md hz-mt-6"></div>
              </div>
              <div className="hz-span-full hz-stack-4">
                <div className="hz-bh-7 hz-bg-raised hz-r-md"></div>
                <div className="hz-bh-8 hz-r-lg hz-rel hz-clip">
                  <div className="hz-abs hz-bottom-0 hz-bh-8">
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="hz-w-full hz-h-full">
                      <path
                        d="M0,150 L0,40 Q125,10 250,40 T500,40 L500,150 Z"
                        fill="rgba(124, 58, 237, 0.5)"
                      ></path>
                      <path
                        d="M0,150 L0,60 Q125,30 250,60 T500,60 L500,150 Z"
                        fill="rgba(37, 99, 235, 0.4)"
                      ></path>
                    </svg>
                  </div>
                  <div className="hz-abs hz-row hz-inline-2">
                    <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                    <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                  </div>
                </div>
                <div className="hz-grid hz-grid-2 hz-gap-4">
                  <div className="hz-bh-8 hz-bg-raised hz-r-lg"></div>
                  <div className="hz-bh-8 hz-bg-raised hz-r-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
