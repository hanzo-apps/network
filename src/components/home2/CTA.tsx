
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";

const CTA = () => {
  return (
    <section className="hz-py-7 hz-rel hz-clip">
      <div className="hz-abs hz-inset"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hz-container hz-mx-auto hz-px-4 hz-rel hz-z-raised"
      >
        <div className="hz-container-narrow hz-card hz-align-center">
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
            Ready to Build the Future with AI?
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-t-xl hz-fg-soft hz-mb-6">
            Join thousands of developers and start building powerful AI applications today.
          </p>
          
          <div className="hz-col-row hz-gap-4 hz-jc-center">
            <Button 
              size="sm"
              className="hz-fg hz-r-full"
            >
              Get Started Free
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
          
          <p className="hz-fg-muted hz-mt-6">
            No credit card required. Start with our free tier.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
