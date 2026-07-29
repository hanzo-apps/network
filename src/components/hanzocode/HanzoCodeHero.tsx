
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const HanzoCodeHero = () => {
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
            The <span className="hz-fg-muted">Ultimate AI-Powered</span> Code Editor
          </h1>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-7">
            Beyond Cursor and Windsurf, Hanzo Code supercharges your favorite VS Code-compatible editor 
            with autonomous agents that transform how you build software.
          </p>
          
          <div className="hz-mb-7">
            <Button 
              size="lg"
              className="hz-fg hz-px-6 hz-py-5 hz-r-lg hz-t-lg hz-w-medium"
            >
              <a href="#" className="hz-row hz-ai-center">
                Get Hanzo Code
                <ArrowRight className="hz-sq-3 hz-ml-2" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HanzoCodeHero;
