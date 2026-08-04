
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Chrome, Globe } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const HanzoExtensionHero = () => {
  return (
    <section className="hz-pt-6 hz-pb-6 hz-px-4 hz-rel hz-clip">
      {/* Background elements */}
      <div className="hz-abs hz-inset hz-dim-more"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hz-align-center"
        >
          <h1 className="hz-t-4xl hz-w-bold hz-mb-5">
            Hanzo <span className="hz-fg-muted">Extension</span>
          </h1>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-7">
            Access Hanzo AI directly in your browser
            <br />for a seamless web experience
          </p>
          
          <div className="hz-row hz-wrap hz-jc-center hz-gap-4 hz-mb-7">
            <Button 
              size="lg"
              className="hz-fg hz-px-6 hz-py-5 hz-r-lg hz-t-lg hz-w-medium"
            >
              <a href="#browsers" className="hz-row hz-ai-center">
                <Chrome className="hz-sq-3 hz-mr-2" />
                Add to Chrome
                <ArrowRight className="hz-sq-3 hz-ml-2" />
              </a>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="hz-border-strong hz-fg hz-px-6 hz-py-5 hz-r-lg hz-t-lg hz-w-medium hz-hoverable"
            >
              <a href="#browsers" className="hz-row hz-ai-center">
                <Globe className="hz-sq-3 hz-mr-2" />
                Get Firefox Add-on
              </a>
            </Button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hz-container-narrow hz-rel hz-w-full hz-r-lg hz-clip hz-shadow-lg">
              <img 
                src="/placeholder.svg" 
                alt="Hanzo Extension Preview" 
                className="hz-w-full"
              />
              <div className="hz-abs hz-inset"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HanzoExtensionHero;
