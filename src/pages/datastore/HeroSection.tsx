
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";

const HeroSection = () => {
  return (
    <section className="hz-min-h-screen hz-col hz-jc-center hz-px-4 hz-py-7 hz-rel hz-clip">
      <div className="hz-abs hz-inset hz-no-pointer"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container-wide hz-align-center hz-rel hz-z-raised hz-mb-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hz-mb-6"
        >
          <div className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-5">
            Hanzo Datastore
          </div>
          <ChromeText as="h1" className="hz-t-4xl hz-w-bold hz-mb-5">
            The Fastest Open-Source Planet Scale Datastore
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mt-5">
            Hanzo Datastore is a column-oriented data store that enables its users to generate powerful analytics, 
            using SQL queries, in real-time.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hz-col-row hz-gap-4 hz-jc-center hz-mt-6"
        >
          <Button size="lg" className="hz-t-lg hz-px-6 hz-border-none">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="hz-t-lg hz-px-6 hz-fg hz-bg-surface hz-hoverable">
            Documentation
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hz-mt-7"
        >
          <a href="#features" className="hz-fg-muted hz-transition hz-row hz-ai-center hz-jc-center hz-link">
            Scroll to explore
            <svg className="hz-sq-3 hz-ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
