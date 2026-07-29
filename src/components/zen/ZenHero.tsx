import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaijiSymbol from "./svg/TaijiSymbol";

const ZenHero = () => {
  const [currentPrinciple, setCurrentPrinciple] = useState(0);
  const principles = [
    "Before code, there is concept.",
    "Simplicity is the ultimate sophistication.",
    "The way is in training.",
    "Build with purpose, not with haste.",
    "In silence, find clarity.",
    "Each line of code should be necessary.",
    "Perfect practice makes perfect code.",
    "The path to mastery never ends."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrinciple((prev) => (prev + 1) % principles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hz-min-h-screen hz-col hz-jc-center hz-ai-center hz-px-4 hz-py-7 hz-rel">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="hz-abs hz-inset hz-no-pointer"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(20,20,20,1) 0%, rgba(0,0,0,1) 70%)"
        }}
      />
      
      <div className="hz-container-narrow hz-align-center hz-z-raised hz-rel">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hz-mb-6"
        >
          <TaijiSymbol size={80} className="hz-mx-auto hz-mb-6" animate={true} />
          
          <h1 className="hz-t-4xl hz-w-bold hz-mb-5 hz-tracking-tight">
            <span className="hz-chrome">
              The 36 Principles &amp; 64 Hexagrams
            </span>
          </h1>
          
          <motion.div
            key={currentPrinciple}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="hz-bh-7 hz-row hz-ai-center hz-jc-center"
          >
            <p className="hz-t-xl hz-fg-muted hz-italic">"{principles[currentPrinciple]}"</p>
          </motion.div>
          
          <p className="hz-container-narrow hz-mw-md hz-fg-muted hz-mt-6">
            Build software with enlightened engineering. Hanzo's platform embodies 
            36 principles and 64 hexagrams from the I Ching that guide the creation of resilient, scalable systems.
          </p>
        </motion.div>
        
        <div className="hz-mt-7 hz-stack-5">
          <div className="hz-col-row hz-gap-5 hz-jc-center">
            <Button 
              variant="outline" 
              className="hz-bg-overlay hz-bordered hz-fg hz-hoverable"
            >
              Explore Platform
            </Button>
            <Button 
              className="hz-bg-surface hz-fg hz-bordered hz-hoverable"
            >
              Learn Principles
            </Button>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="hz-fg-faint hz-mt-7"
          >
            <a href="#principles" className="hz-col hz-ai-center">
              <span className="hz-mb-2 hz-t-sm">Discover more</span>
              <ArrowDown className="hz-sq-3" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ZenHero;