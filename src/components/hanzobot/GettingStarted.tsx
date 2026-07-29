
import React from "react";
import { motion } from "framer-motion";
import { Terminal, Github, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const GettingStarted = () => {
  const prerequisites = [
    "Python 2.7+",
    "Node.js 23+",
    "pnpm",
    "Note for Windows Users: WSL 2 is required"
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel">
      <div className="hz-abs hz-inset"></div>
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">Getting Started</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Begin your journey with Hanzo Bot in a few simple steps
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-2 hz-gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className=""
          >
            <div className="hz-card hz-mb-5">
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-4">Prerequisites</h3>
              <ul className="hz-stack-3">
                {prerequisites.map((req, index) => (
                  <li key={index} className="hz-row hz-ai-start">
                    <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-2 hz-mt-1" />
                    <span className="hz-fg-soft">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-4">Automated Start</h3>
              <div className="hz-bg-surface hz-r-lg hz-p-4 hz-mono hz-t-sm hz-fg-soft hz-mb-4 hz-scroll-x">
                <p>git clone https://github.com/hanzoai/bot-starter.git</p>
                <p>cd bot-starter</p>
                <p>cp .env.example .env</p>
                <p>pnpm i && pnpm build && pnpm start</p>
              </div>
              
              <p className="hz-fg-muted hz-t-sm hz-mb-4">OR</p>
              
              <div className="hz-bg-surface hz-r-lg hz-p-4 hz-mono hz-t-sm hz-fg-soft hz-mb-4 hz-scroll-x">
                <p>git clone https://github.com/hanzoai/bot</p>
                <p>cd bot</p>
                <p>sh scripts/start.sh</p>
              </div>
              
              <p className="hz-fg-muted hz-t-sm">
                The start script handles all dependencies, environment setup, and character management automatically.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hz-order-first hz-col"
          >
            <div className="hz-card hz-col hz-h-full">
              <div className="hz-mb-5 hz-align-center">
                <Terminal className="hz-sq-7 hz-fg-muted hz-mx-auto hz-mb-4" />
                <h3 className="hz-t-2xl hz-w-semibold hz-fg">Quickstart Guide</h3>
                <p className="hz-fg-muted hz-mt-2">
                  For a more detailed guide, check out our comprehensive documentation
                </p>
              </div>
              
              <div className="hz-grow hz-col hz-jc-center hz-ai-center">
                <div className="hz-align-center hz-stack-5 hz-mw-sm">
                  <p className="hz-fg-soft">
                    Ready to create your first autonomous AI agent? Our detailed quickstart guide will walk you through every step.
                  </p>
                  
                  <Button 
                    size="lg"
                    className="hz-bg-raised hz-fg hz-px-6 hz-w-full hz-hoverable"
                  >
                    View Quickstart Guide
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="hz-fg-soft hz-px-6 hz-w-full hz-hoverable"
                  >
                    <Github className="hz-sq-3 hz-mr-2" />
                    Clone Repository
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
