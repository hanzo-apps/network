
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";
import { Github, ArrowRight } from "lucide-react";

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
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-5">
            Start building locally today
          </ChromeText>
          
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-7">
            Join our community of developers building the future of AI applications with open source tools.
          </p>
          
          <div className="hz-col-row hz-jc-center hz-gap-4">
            <Button 
              size="lg"
              className="hz-btn hz-btn-lg hz-fg hz-shadow-lg hz-transition"
            >
              <Github className="hz-sq-3 hz-mr-2" />
              <a href="https://github.com/hanzo/platform">Get on GitHub</a>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="hz-btn hz-btn-ghost hz-btn-lg hz-fg"
            >
              <span className="hz-grow">Read the Docs</span>
              <ArrowRight className="hz-sq-3 hz-ml-2" />
            </Button>
          </div>
          
          <div className="hz-mt-7 hz-fg-muted hz-t-sm">
            Need enterprise features? <a href="/cloud" className="hz-fg-muted hz-underline hz-link">Check out Hanzo Cloud</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
