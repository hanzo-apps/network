
import React from "react";
import { motion } from "framer-motion";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";

const HanzoCodeBenefits = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Like Cursor & Windsurf, But Better</h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-5">
              Hanzo Code gives you all the features you love from Cursor and Windsurf, with intelligence that goes beyond tab completion.
            </p>
            
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5 hz-mt-7">Advanced Code Understanding</h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-5">
              Unlike other AI coding assistants, Hanzo Code builds a complete understanding of your entire codebase, not just the current file.
            </p>
            
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5 hz-mt-7">Natural Language & Contextual Awareness</h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-5">
              Rewrite entire modules with plain English instructions. Our AI understands your context and project architecture better than any other tool.
            </p>
            
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5 hz-mt-7">True Force Multiplier</h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-5">
              Hanzo Code isn't just an assistant—it's a force multiplier that can scale your productivity by orders of magnitude.
            </p>
            
            <a href="#features" className="hz-fg-muted hz-w-medium hz-link">
              See how we compare
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-bg-surface hz-bordered hz-r-lg hz-clip"
          >
            <div className="hz-bh-8 hz-bg-surface hz-row hz-ai-center hz-jc-center hz-p-6">
              <div className="hz-stack-4 hz-align-left hz-w-full">
                <div className="hz-border-strong hz-px-4 hz-py-2">
                  <h3 className="hz-w-semibold hz-fg">What Cursor/Windsurf Users Say:</h3>
                  <p className="hz-fg-soft hz-italic">"I switched to Hanzo Code and my productivity jumped 3x. The agent capabilities are on another level."</p>
                </div>
                
                <div className="hz-border-strong hz-px-4 hz-py-2">
                  <p className="hz-fg-soft hz-italic">"Using my favorite VS Code setup with Hanzo's AI has transformed how I approach complex programming tasks."</p>
                </div>
                
                <div className="hz-border-strong hz-px-4 hz-py-2">
                  <p className="hz-fg-soft hz-italic">"Running parallel agent instances to solve different parts of the same problem simultaneously is a game-changer."</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HanzoCodeBenefits;
