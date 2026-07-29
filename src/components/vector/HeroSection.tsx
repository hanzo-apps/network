
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";
import AnimatedSection, { AnimatedHeading, AnimatedStaggerContainer } from "@/components/ui/animated-section";
import { createAnimationVariant, curves, buttonAnimation } from "@/components/ui/animation-variants";

const fadeInUpVariant = createAnimationVariant("fadeInBlur", {
  duration: 0.4,
  curve: curves.snappy,
  distance: 15,
  blur: 8
});

const HeroSection = () => {
  return (
    <AnimatedSection className="hz-min-h-screen hz-col hz-jc-center hz-px-4 hz-py-7 hz-rel hz-clip">
      <div className="hz-abs hz-inset hz-dim-more"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <AnimatedStaggerContainer className="hz-container-wide hz-align-center hz-rel hz-z-raised" delayFactor={0.07}>
        <AnimatedHeading>
          <div className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-5">
            Vector Database for AI
          </div>
        </AnimatedHeading>
        
        <AnimatedHeading>
          <ChromeText as="h1" className="hz-t-4xl hz-w-bold hz-mb-5">
            Blazing Fast Vector Search
          </ChromeText>
        </AnimatedHeading>
        
        <motion.p variants={fadeInUpVariant} className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
          Hanzo Vector is a high-performance vector database designed for AI applications,
          with advanced similarity search and seamless integrations with popular ML frameworks.
        </motion.p>
        
        <motion.div 
          variants={buttonAnimation}
          className="hz-col-row hz-gap-4 hz-jc-center"
        >
          <Button size="lg" className="hz-t-lg hz-px-6 hz-border-none">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="hz-t-lg hz-px-6">
            Documentation
          </Button>
        </motion.div>
      </AnimatedStaggerContainer>
    </AnimatedSection>
  );
};

export default HeroSection;
