
import React from "react";
import { motion } from "framer-motion";
import { Activity, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-narrow hz-align-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-inline hz-ai-center hz-px-3 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-mb-5"
        >
          <Activity className="hz-sq-2 hz-fg-muted hz-mr-2" />
          <span className="hz-t-sm hz-fg-soft">Get Started Today</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hz-t-3xl hz-w-bold hz-fg hz-mb-5"
        >
          Build Real-time Experiences in Minutes
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hz-t-xl hz-fg-soft hz-mb-6"
        >
          Join thousands of developers building with Hanzo Realtime.
          No credit card required to get started.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hz-col-row hz-ai-center hz-jc-center hz-gap-4"
        >
          <Button 
            size="lg" 
            className="hz-bg-raised hz-fg hz-px-6 hz-py-5 hz-t-lg hz-w-full hz-hoverable"
          >
            Start Building <ArrowRight className="hz-sq-3 hz-ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="hz-fg hz-px-6 hz-py-5 hz-t-lg hz-w-full hz-hoverable"
          >
            <a href="https://docs.hanzo.ai" className="hz-row hz-ai-center">
              Documentation <ChevronRight className="hz-sq-3 hz-ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
