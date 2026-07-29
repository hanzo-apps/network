
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const HeroBanner = () => {
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
          <ChromeText 
            as="h1" 
            className="hz-t-4xl hz-w-bold hz-mb-5"
            preHeading="AI-Native Platform for Building the Future"
          >
            Accelerate your vision.<br />Scale without limits.
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mt-5">
            Hanzo is the AI-native platform purpose-built to power innovative software companies. 
            From ideation to deployment, Hanzo delivers everything you need to streamline product
            development, accelerate growth, and scale effortlessly.
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
            Learn More
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hz-mt-7"
        >
          <a href="#platform" className="hz-fg-muted hz-transition hz-row hz-ai-center hz-jc-center hz-link">
            Scroll to explore
            <ArrowDown className="hz-sq-3 hz-ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
