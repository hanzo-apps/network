
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
      <div className="hz-abs hz-inset hz-dim"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-6 hz-chrome">
            Ready to see the difference clarity makes?
          </h2>
          
          <div className="hz-col-row hz-gap-5 hz-jc-center hz-mb-7">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button size="lg" className="hz-t-lg hz-px-6 hz-py-5 hz-border-none">
                Get Started
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button size="lg" variant="outline" className="hz-t-lg hz-px-6 hz-py-5">
                <FileText className="hz-sq-3 hz-mr-2" /> View Docs
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button size="lg" variant="outline" className="hz-t-lg hz-px-6 hz-py-5">
                <span className="hz-row hz-ai-center">
                  Request a Demo <ArrowRight className="hz-sq-3 hz-ml-2" />
                </span>
              </Button>
            </motion.div>
          </div>
          
          <div className="hz-grid hz-grid-3 hz-container-narrow hz-gap-5">
            {[
              {
                title: "Self-Hosted",
                description: "Deploy on your own infrastructure with full control."
              },
              {
                title: "Cloud Managed",
                description: "Let us handle the operations while you focus on building."
              },
              {
                title: "Enterprise",
                description: "Custom solutions for high-scale, mission-critical deployments."
              }
            ].map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="hz-card"
              >
                <h3 className="hz-t-lg hz-w-bold hz-mb-2">{option.title}</h3>
                <p className="hz-fg-muted hz-t-sm">{option.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hz-mt-7 hz-align-center hz-fg-muted hz-t-sm"
          >
            Free 14-day trial, no credit card required.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
