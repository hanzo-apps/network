
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide hz-align-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5 hz-leading-tight">
            Get Started Today
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-7 hz-leading-relaxed">
            Launch your next-generation project instantly or request a custom demo to explore 
            Hanzo Base's powerful capabilities.
          </p>
          
          <div className="hz-col-row hz-gap-4 hz-jc-center">
            <Button size="lg" radius="full" className="hz-t-lg hz-px-6 hz-bg-raised hz-fg hz-hoverable">
              <span className="hz-py-1 hz-leading-relaxed">Start Building</span>
              <ArrowRight className="hz-sq-3 hz-ml-2" />
            </Button>
            <Button size="lg" variant="outline" radius="full" className="hz-t-lg hz-px-6 hz-fg">
              <span className="hz-py-1 hz-leading-relaxed">Read Docs</span>
              <ArrowRight className="hz-sq-3 hz-ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
