
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, HexagonIcon } from "lucide-react";

const SenseiMethodSection = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg-overlay">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">The Sensei Method</h2>
          <div className="hz-bw-8 hz-bg-raised hz-mx-auto"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-card hz-glass hz-mb-6"
        >
          <div className="hz-row hz-jc-center hz-mb-6">
            <HexagonIcon className="hz-sq-8 hz-fg-muted hz-dim" />
          </div>
          
          <p className="hz-container-narrow hz-fg-soft hz-leading-relaxed hz-mb-6 hz-align-center">
            Our principles come alive through the Sensei Method, a framework that brings these 64 hexagrams
            into practice. It combines wisdom from ancient philosophies with modern engineering practices
            to create technology that is both powerful and humane.
          </p>
          
          <div className="hz-grid hz-grid-2 hz-gap-6 hz-mt-7">
            <a 
              href="https://hanzo.agency" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hz-btn hz-btn-lg hz-jc-between hz-fg hz-transition"
            >
              <div className="hz-row hz-ai-center">
                <BookOpen className="hz-sq-3 hz-fg-muted hz-mr-3" />
                <div>
                  <h3 className="hz-t-xl hz-w-medium hz-mb-2">Hanzo Agency</h3>
                  <p className="hz-t-sm hz-fg-soft">AI-powered creative & marketing</p>
                </div>
              </div>
              <ArrowRight className="hz-sq-3 hz-transition" />
            </a>
            
            <a 
              href="https://sensei.group" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hz-btn hz-btn-lg hz-jc-between hz-fg hz-transition"
            >
              <div className="hz-row hz-ai-center">
                <HexagonIcon className="hz-sq-3 hz-fg-muted hz-mr-3" />
                <div>
                  <h3 className="hz-t-xl hz-w-medium hz-mb-2">Sensei Group</h3>
                  <p className="hz-t-sm hz-fg-soft">Enterprise transformation experts</p>
                </div>
              </div>
              <ArrowRight className="hz-sq-3 hz-transition" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SenseiMethodSection;
