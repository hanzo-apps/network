
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";

const CallToAction = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      <div className="hz-abs hz-inset hz-dim-more"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div 
          className="hz-align-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-5 hz-mx-auto hz-align-center">
            Build Your Vision, Shape the Future
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            Join the revolution of AI-driven development. Hanzo gives your team the tools, platform, and support needed to innovate fearlessly, deploy instantly, and scale infinitely.
          </p>
          
          <Button 
            size="lg"
            className="hz-bg-inverse hz-fg-inverse hz-px-6 hz-py-5 hz-r-lg hz-t-lg hz-w-medium hz-shadow-lg hz-transition hz-hoverable"
          >
            <a href="https://dashboard.hanzo.cloud">Get Started with Hanzo</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
