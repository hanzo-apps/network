
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, LineChart } from "lucide-react";

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
          className="hz-align-center hz-mb-7"
        >
          <div className="hz-card hz-card-tight hz-inline hz-ai-center hz-jc-center hz-fg-muted hz-mb-5">
            <LineChart className="hz-sq-6" />
          </div>
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Start Analyzing Smarter, Today</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            Empower your business decisions with Hanzo Analytics—start for free and scale effortlessly.
          </p>
          
          <div className="hz-col-row hz-gap-5 hz-jc-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button size="lg" className="hz-t-lg hz-px-6 hz-py-5 hz-border-none">
                Start Free Trial
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button size="lg" variant="outline" className="hz-t-lg hz-px-6 hz-py-5">
                <span className="hz-row hz-ai-center">
                  Request Demo <ArrowRight className="hz-sq-3 hz-ml-2" />
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-5">
          {[
            {
              title: "Rapid Implementation",
              description: "Get up and running in minutes with our easy-to-use SDKs and APIs."
            },
            {
              title: "Scale With Confidence",
              description: "From startups to enterprises, Hanzo Analytics grows with your business."
            },
            {
              title: "24/7 Support",
              description: "Our expert team and vibrant community are always ready to help."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card hz-transition hz-card-interactive"
            >
              <h3 className="hz-t-xl hz-w-bold hz-mb-3">{feature.title}</h3>
              <p className="hz-fg-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hz-mt-7 hz-align-center hz-fg-muted hz-t-sm"
        >
          No credit card required. Free trial includes all premium features for 14 days.
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
