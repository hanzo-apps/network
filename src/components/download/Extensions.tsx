
import React from "react";
import { motion } from "framer-motion";
import { Chrome, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const Extensions = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg-overlay">
      <div className="hz-container-wide">
        <motion.div
          className="hz-align-center hz-mb-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4 hz-fg">
            Available everywhere you code
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-t-xl hz-fg-soft">
            Use Hanzo in your browser or directly in VS Code for a seamless development experience
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-2 hz-gap-6">
          <motion.div
            className="hz-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="hz-row hz-ai-center hz-mb-5">
              <Chrome className="hz-sq-6 hz-fg-muted hz-mr-4" />
              <h3 className="hz-t-2xl hz-w-bold hz-fg">Browser Extensions</h3>
            </div>
            
            <p className="hz-fg-soft hz-mb-5">
              Access Hanzo AI directly in your browser for seamless web development and browsing assistance.
            </p>
            
            <div className="hz-row hz-wrap hz-gap-3">
              <Button variant="outline" className="hz-fg hz-hoverable">
                <Chrome className="hz-sq-2 hz-mr-2" />
                Chrome Extension
              </Button>
              <Button variant="outline" className="hz-fg hz-hoverable">
                <Chrome className="hz-sq-2 hz-mr-2" />
                Firefox Add-on
              </Button>
              <Button variant="outline" className="hz-fg hz-hoverable">
                <Chrome className="hz-sq-2 hz-mr-2" />
                Edge Extension
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            className="hz-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="hz-row hz-ai-center hz-mb-5">
              <Code className="hz-sq-6 hz-fg-muted hz-mr-4" />
              <h3 className="hz-t-2xl hz-w-bold hz-fg">VS Code Extension</h3>
            </div>
            
            <p className="hz-fg-soft hz-mb-5">
              Supercharge your development workflow with Hanzo AI integrated directly in VS Code.
            </p>
            
            <div className="hz-row hz-wrap hz-gap-3">
              <Button className="hz-bg-raised hz-fg hz-hoverable">
                <Code className="hz-sq-2 hz-mr-2" />
                Install for VS Code
              </Button>
              <Button variant="outline" className="hz-fg hz-hoverable">
                Learn more about Hanzo Code
              </Button>
            </div>
            
            <p className="hz-fg-muted hz-mt-5 hz-t-sm">
              Hanzo Code offers dedicated features for developers. Explore our separate Hanzo Code editor for an even more powerful experience.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Extensions;
