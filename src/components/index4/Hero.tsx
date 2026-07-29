
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlueprintLine } from "@/components/ui/architectural-elements";
import { createAnimationVariant, timing, curves } from "@/components/ui/animation-variants";

const fadeInAnimation = createAnimationVariant("fadeIn", {
  duration: timing.medium,
  curve: curves.snappy
});

const Hero = () => {
  return (
    <section className="hz-container-wide hz-mb-7 hz-rel">
      <BlueprintLine orientation="horizontal" position="20%" color="rgba(255,255,255,0.04)" />
      <BlueprintLine orientation="vertical" position="15%" color="rgba(255,255,255,0.04)" />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInAnimation}
        className="hz-align-center"
      >
        <h1 className="hz-t-4xl hz-w-medium hz-tracking-tight hz-mb-5 hz-fg">
          Infrastructure for the<br />modern world
        </h1>
        <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted hz-mb-7 hz-leading-relaxed">
          Build, deploy, and scale applications effortlessly with our developer-focused platform.
        </p>

        <div className="hz-col-row hz-gap-4 hz-jc-center hz-mb-7">
          <Button 
            size="sm" 
            className="hz-bg-inverse hz-fg-inverse hz-transition hz-hoverable"
          >
            Start building <ArrowRight className="hz-sq-2 hz-ml-2" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="hz-bg-none hz-transition hz-hoverable"
          >
            Documentation
          </Button>
        </div>
        
        <div className="hz-t-sm hz-fg-muted hz-row hz-ai-center hz-jc-center hz-gap-2">
          No credit card required <span className="">•</span> Cancel anytime
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
