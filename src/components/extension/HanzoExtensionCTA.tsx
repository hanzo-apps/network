
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HanzoExtensionCTA = () => {
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
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
            Get Started with Hanzo Extension Today
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            Join thousands of users who have enhanced their browsing experience with Hanzo AI capabilities.
          </p>
          
          <Button 
            size="lg"
            className="hz-fg hz-px-6 hz-py-5 hz-r-lg hz-t-lg hz-w-medium hz-shadow-lg hz-transition"
          >
            <a href="#browsers" className="hz-row hz-ai-center">
              Install Extension
              <ArrowRight className="hz-sq-3 hz-ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HanzoExtensionCTA;
