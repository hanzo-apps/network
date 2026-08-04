
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Target, BarChart3, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const SenseiMethod = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-4">
              Principles in Practice
            </span>
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
              The Sensei Method
            </h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-6">
              A practical framework for applying AI and data to achieve exponential growth for businesses.
              If the "Zen of Hanzo" is the theory, the Sensei Method is the practice.
            </p>
            
            <div className="hz-stack-5 hz-mb-6">
              <div className="hz-row hz-ai-start">
                <div className="hz-p-2 hz-bg-raised hz-r-lg hz-mr-4">
                  <Target className="hz-sq-4 hz-fg-muted" />
                </div>
                <div>
                  <h3 className="hz-t-xl hz-w-semibold hz-mb-1">Identify First-Principle Goals</h3>
                  <p className="hz-fg-soft">Drill down to the fundamental objectives that drive real value.</p>
                </div>
              </div>
              
              <div className="hz-row hz-ai-start">
                <div className="hz-p-2 hz-bg-raised hz-r-lg hz-mr-4">
                  <Zap className="hz-sq-4 hz-fg-muted" />
                </div>
                <div>
                  <h3 className="hz-t-xl hz-w-semibold hz-mb-1">Rapid Prototyping</h3>
                  <p className="hz-fg-soft">Build quickly, test assumptions, and iterate with purpose.</p>
                </div>
              </div>
              
              <div className="hz-row hz-ai-start">
                <div className="hz-p-2 hz-bg-raised hz-r-lg hz-mr-4">
                  <BarChart3 className="hz-sq-4 hz-fg-muted" />
                </div>
                <div>
                  <h3 className="hz-t-xl hz-w-semibold hz-mb-1">Data-Driven Decisions</h3>
                  <p className="hz-fg-soft">Measure impact, analyze patterns, and let insights guide strategy.</p>
                </div>
              </div>
              
              <div className="hz-row hz-ai-start">
                <div className="hz-p-2 hz-bg-raised hz-r-lg hz-mr-4">
                  <Users className="hz-sq-4 hz-fg-muted" />
                </div>
                <div>
                  <h3 className="hz-t-xl hz-w-semibold hz-mb-1">Sensei Mentorship</h3>
                  <p className="hz-fg-soft">Work directly with expert "senseis" to implement and refine your approach.</p>
                </div>
              </div>
            </div>
            
            <Button 
              className="hz-fg"
            >
              <a href="https://sensei.group" target="_blank" rel="noopener noreferrer" className="hz-row hz-ai-center">
                Visit Sensei Group
                <ArrowRight className="hz-sq-3 hz-ml-2" />
              </a>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hz-rel"
          >
            <div className="hz-r-xl hz-p-1">
              <div className="hz-bg-overlay hz-glass hz-r-lg hz-clip">
                <img 
                  src="/placeholder.svg" 
                  alt="Sensei Method in action" 
                  className="hz-w-full"
                />
                <div className="hz-p-6">
                  <h3 className="hz-t-2xl hz-w-bold hz-mb-4">The Impact of Sensei</h3>
                  <p className="hz-fg-soft hz-mb-5">
                    Through the Sensei Method and Sensei Group, we've helped clients generate over $1 billion in revenue,
                    launch groundbreaking products, and build scalable businesses.
                  </p>
                  <div className="hz-row hz-wrap hz-gap-4">
                    <div className="hz-bg-raised hz-px-4 hz-py-2 hz-r-lg">
                      <span className="hz-t-2xl hz-w-bold hz-fg-soft">$1B+</span>
                      <p className="hz-t-sm hz-fg-muted">Client Revenue</p>
                    </div>
                    <div className="hz-bg-raised hz-px-4 hz-py-2 hz-r-lg">
                      <span className="hz-t-2xl hz-w-bold hz-fg-soft">100+</span>
                      <p className="hz-t-sm hz-fg-muted">Product Launches</p>
                    </div>
                    <div className="hz-bg-raised hz-px-4 hz-py-2 hz-r-lg">
                      <span className="hz-t-2xl hz-w-bold hz-fg-soft">10+</span>
                      <p className="hz-t-sm hz-fg-muted">Years Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SenseiMethod;
