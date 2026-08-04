
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";

const CallToAction: React.FC = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
      <div className="hz-abs hz-inset hz-bg-surface" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hz-container-wide hz-card hz-rel hz-z-raised"
      >
        <div className="hz-align-center">
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
            Ready to Build the Future with AI?
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            Join thousands of developers using Hanzo to build powerful, 
            transparent AI applications that users love.
          </p>
          
          <div className="hz-col-row hz-gap-4 hz-jc-center">
            <Button 
              size="sm"
              className="hz-bg-inverse hz-fg-inverse hz-bordered hz-r-full hz-transition hz-hoverable"
            >
              Get Started
              <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Button>
            
            <Button 
              size="sm"
              variant="outline"
              className="hz-fg hz-r-full hz-hoverable"
            >
              <Github className="hz-sq-2 hz-mr-2" />
              Star on GitHub
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
