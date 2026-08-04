
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, MessageSquare } from "lucide-react";

const Community = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel">
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">Community and Support</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Join us in building the future of autonomous AI agents with Hanzo!
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hz-card"
        >
          <div className="hz-grid hz-grid-2 hz-gap-6 hz-ai-center">
            <div>
              <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-4">Next Steps</h3>
              <ul className="hz-stack-4">
                <li className="hz-row hz-ai-start">
                  <div className="hz-bg-raised hz-p-1 hz-r-md hz-fg-muted hz-mr-3 hz-mt-1">
                    <div className="hz-sq-2 hz-row hz-ai-center hz-jc-center">1</div>
                  </div>
                  <div>
                    <span className="hz-fg hz-w-medium">Create Your First Agent</span>
                    <p className="hz-fg-muted hz-t-sm hz-mt-1">Follow our guide to build your first AI agent</p>
                  </div>
                </li>
                <li className="hz-row hz-ai-start">
                  <div className="hz-bg-raised hz-p-1 hz-r-md hz-fg-muted hz-mr-3 hz-mt-1">
                    <div className="hz-sq-2 hz-row hz-ai-center hz-jc-center">2</div>
                  </div>
                  <div>
                    <span className="hz-fg hz-w-medium">Understand Core Concepts</span>
                    <p className="hz-fg-muted hz-t-sm hz-mt-1">Learn about the key components of the Hanzo Bot framework</p>
                  </div>
                </li>
                <li className="hz-row hz-ai-start">
                  <div className="hz-bg-raised hz-p-1 hz-r-md hz-fg-muted hz-mr-3 hz-mt-1">
                    <div className="hz-sq-2 hz-row hz-ai-center hz-jc-center">3</div>
                  </div>
                  <div>
                    <span className="hz-fg hz-w-medium">Explore Advanced Features</span>
                    <p className="hz-fg-muted hz-t-sm hz-mt-1">Discover how to leverage the full potential of your agents</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="hz-stack-5">
              <div className="hz-col hz-stack-4">
                <Button 
                  size="sm"
                  className="hz-bg-raised hz-fg hz-hoverable"
                >
                  <Github className="hz-sq-3 hz-mr-2" />
                  <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer">
                    Open Source: Contribute on GitHub
                  </a>
                </Button>
                
                <Button 
                  size="sm"
                  variant="outline"
                  className="hz-fg-soft hz-hoverable"
                >
                  <MessageSquare className="hz-sq-3 hz-mr-2" />
                  <a href="https://discord.gg/XthHQQj" target="_blank" rel="noopener noreferrer">
                    Join Discord Community
                  </a>
                </Button>
              </div>
              
              <div className="hz-fg-muted hz-t-sm">
                <p className="hz-mb-2">Looking for examples?</p>
                <a href="#" className="hz-fg-muted hz-link">
                  View ready-to-use character templates and implementations →
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="hz-mt-7 hz-align-center hz-fg-muted hz-t-sm">
          Last updated on Feb 20, 2025 by jin
        </div>
      </div>
    </section>
  );
};

export default Community;
