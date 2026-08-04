
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="hz-rel hz-py-7 hz-clip">
      {/* Background gradient */}
      <div className="hz-abs hz-inset"></div>
      
      {/* Animated orbs */}
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container hz-mx-auto hz-px-4 hz-rel hz-z-raised">
        <div className="hz-container-narrow hz-align-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="hz-t-5xl hz-w-bold hz-mb-5 hz-chrome">
              The AI Engineering Platform
            </h1>
            
            <p className="hz-t-xl hz-fg-soft hz-mb-6">
              Build, deploy, and scale AI applications with unprecedented speed
            </p>
            
            <div className="hz-col-row hz-jc-center hz-gap-4">
              <Button 
                size="lg" 
                className="hz-fg hz-px-6 hz-py-5 hz-t-lg hz-r-full"
              >
                Get Started Free
                <ArrowRight className="hz-sq-3 hz-ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="hz-fg hz-px-6 hz-py-5 hz-t-lg hz-r-full hz-hoverable"
              >
                See Demo
              </Button>
            </div>
            
            <div className="hz-mt-7 hz-t-sm hz-fg-muted hz-row hz-wrap hz-jc-center hz-gap-6 hz-gap-2">
              <div>3.2B+ Downloads</div>
              <div>47k+ GitHub Stars</div>
              <div>900+ Contributors</div>
              <div>10k+ Active Developers</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
