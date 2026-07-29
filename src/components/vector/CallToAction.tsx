
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";
import { ArrowRight } from "lucide-react";

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
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-5">
            Ready to transform your AI applications?
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            Join thousands of developers building faster, more accurate AI-powered experiences with Hanzo Vector
          </p>
          
          <div className="hz-col-row hz-gap-4 hz-jc-center">
            <Button 
              size="lg"
              className="hz-fg hz-px-6 hz-py-5 hz-r-lg hz-t-lg hz-w-medium hz-shadow-lg hz-transition"
            >
              Get Started Free
              <ArrowRight className="hz-sq-3 hz-ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="hz-t-lg hz-px-6"
            >
              Join the Community
            </Button>
          </div>
          
          <p className="hz-fg-muted hz-mt-6">
            Have questions? Contact us at <a href="mailto:vector@hanzo.ai" className="hz-fg-muted hz-link">vector@hanzo.ai</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
