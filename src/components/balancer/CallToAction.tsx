
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, FileText, Server } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Start & Grow with Hanzo Balancer</h2>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-align-center"
          >
            <Button 
              size="lg" 
              variant="outline"
              className="hz-w-full hz-gap-2 hz-border-strong hz-fg hz-hoverable"
            >
              <Github className="hz-sq-3" />
              View on GitHub
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-align-center"
          >
            <Button 
              size="lg" 
              variant="outline"
              className="hz-w-full hz-gap-2 hz-border-strong hz-fg hz-hoverable"
            >
              <FileText className="hz-sq-3" />
              Learn more in Docs
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-align-center"
          >
            <Button 
              size="lg" 
              variant="outline"
              className="hz-w-full hz-gap-2 hz-border-strong hz-fg hz-hoverable"
            >
              <Server className="hz-sq-3" />
              Get Commercial Support
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-container-narrow hz-mw-sm hz-align-center"
        >
          <div className="hz-mb-5">
            <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Subscribe to our newsletter</h3>
            <div className="hz-row hz-gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="hz-w-full hz-px-4 hz-py-2 hz-bg-raised hz-r-md hz-bordered"
              />
              <Button className="hz-bg-raised hz-hoverable">
                Subscribe
              </Button>
            </div>
            <div className="hz-mt-2 hz-align-left">
              <label className="hz-inline hz-ai-center">
                <input type="checkbox" className="hz-r-md hz-bg-raised hz-fg-faint" />
                <span className="hz-ml-2 hz-t-sm hz-fg-muted">
                  I agree to receive communications from Hanzo
                </span>
              </label>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
