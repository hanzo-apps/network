
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutHero = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
      {/* Background elements */}
      <div className="hz-abs hz-inset hz-dim-more"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hz-align-center"
        >
          <span className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-5">
            Our Journey
          </span>
          
          <h1 className="hz-t-4xl hz-w-bold hz-mb-5">
            History and Evolution of <span className="hz-fg-muted">Hanzo Industries</span>
          </h1>
          
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-7">
            From startup to AI powerhouse, our journey of transformation, innovation, and purpose.
          </p>
          
          <div className="hz-row hz-wrap hz-jc-center hz-gap-4 hz-mb-7">
            <Button 
              size="lg"
              className="hz-fg hz-px-6 hz-py-5 hz-r-lg hz-t-lg hz-w-medium"
            >
              <a href="#timeline" className="hz-row hz-ai-center">
                Explore Our Timeline
                <ArrowRight className="hz-sq-3 hz-ml-2" />
              </a>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="hz-border-strong hz-fg hz-px-6 hz-py-5 hz-r-lg hz-t-lg hz-w-medium hz-hoverable"
            >
              <a href="/zen" className="hz-row hz-ai-center">
                The Zen of Hanzo
                <ArrowRight className="hz-sq-3 hz-ml-2" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
