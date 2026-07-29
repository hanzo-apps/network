
import React from "react";
import { motion } from "framer-motion";
import TaijiSymbol from "./svg/TaijiSymbol";

const HeroSection = () => {
  return (
    <section className="hz-rel hz-py-7 hz-px-4 hz-col hz-jc-center">
      <div className="hz-container-wide hz-align-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hz-mb-6"
        >
          <div className="hz-row hz-jc-center hz-mb-6">
            <TaijiSymbol size={80} className="hz-fg" />
          </div>

          <h1 className="hz-t-4xl hz-w-bold hz-tracking-tight hz-mb-5 hz-chrome">
            The Zen of Hanzo
          </h1>
          
          <p className="hz-container-narrow hz-t-xl hz-fg-muted hz-mb-6 hz-leading-relaxed">
            Our guiding principles that shape everything we build. Distilled wisdom from ancient knowledge, 
            reimagined for modern AI engineering.
          </p>
          
          <motion.div 
            className="hz-bw-8 hz-mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="hz-row hz-jc-center"
        >
          <a 
            href="#principles" 
            className="hz-btn hz-btn-ghost hz-gap-2 hz-fg-muted hz-transition"
          >
            <span>Explore Principles</span>
            <svg 
              className="hz-sq-2 hz-transition" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 4L12 20M12 20L18 14M12 20L6 14" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
