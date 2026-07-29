
import React from "react";
import { motion } from "framer-motion";
import { Cpu, Brain, FlaskConical, Sparkles } from "lucide-react";

const HanzoCodeFrontier = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-r-lg hz-clip hz-bordered hz-border-strong"
          >
            <div className="hz-p-6 hz-col hz-ai-center hz-jc-center hz-h-full">
              <Brain className="hz-sq-8 hz-fg-muted hz-mb-5" />
              <div className="hz-t-3xl hz-w-bold hz-align-center hz-mb-4">
                Frontier Intelligence
              </div>
              <div className="hz-fg-soft hz-align-center">
                Custom-trained models specifically optimized for software development
              </div>
              <div className="hz-grid hz-grid-2 hz-gap-4 hz-mt-6 hz-w-full">
                <div className="hz-bg-overlay hz-r-lg hz-p-4 hz-row hz-ai-center">
                  <Cpu className="hz-sq-3 hz-fg-muted hz-mr-3" />
                  <span className="hz-t-sm">Specialized Code Models</span>
                </div>
                <div className="hz-bg-overlay hz-r-lg hz-p-4 hz-row hz-ai-center">
                  <FlaskConical className="hz-sq-3 hz-fg-muted hz-mr-3" />
                  <span className="hz-t-sm">Research-Grade AI</span>
                </div>
                <div className="hz-bg-overlay hz-r-lg hz-p-4 hz-row hz-ai-center">
                  <Sparkles className="hz-sq-3 hz-fg-muted hz-mr-3" />
                  <span className="hz-t-sm">Fine-tuned Reasoning</span>
                </div>
                <div className="hz-bg-overlay hz-r-lg hz-p-4 hz-row hz-ai-center">
                  <Brain className="hz-sq-3 hz-fg-muted hz-mr-3" />
                  <span className="hz-t-sm">Continuous Learning</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Beyond Standard AI Models</h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-6">
              Hanzo Code leverages custom-built AI models designed specifically for software development, not just repurposed general-purpose models.
            </p>
            
            <div className="hz-stack-5">
              <div>
                <h3 className="hz-t-xl hz-w-semibold hz-mb-2 hz-fg-muted">Multi-Model Architecture</h3>
                <p className="hz-fg-soft">
                  Specialized models for different tasks: code generation, refactoring, debugging, testing, and optimization.
                </p>
              </div>
              
              <div>
                <h3 className="hz-t-xl hz-w-semibold hz-mb-2 hz-fg-muted">Coding-Specific Training</h3>
                <p className="hz-fg-soft">
                  Trained on billions of lines of code across all major languages, frameworks, and architectural patterns.
                </p>
              </div>
              
              <div>
                <h3 className="hz-t-xl hz-w-semibold hz-mb-2 hz-fg-muted">Adaptive Intelligence</h3>
                <p className="hz-fg-soft">
                  Learns from your codebase and coding style, becoming more personalized and effective over time.
                </p>
              </div>
              
              <div>
                <h3 className="hz-t-xl hz-w-semibold hz-mb-2 hz-fg-muted">Edge Computing</h3>
                <p className="hz-fg-soft">
                  Powerful models that can run locally for privacy, or leverage cloud infrastructure for more complex tasks.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HanzoCodeFrontier;
