
import React from "react";
import { motion } from "framer-motion";

const Architecture = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">Architecture</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            A modular system designed for flexibility and extensibility
          </p>
          <div className="hz-t-sm hz-fg-muted hz-mt-2">
            Source: <a href="https://x.com/0xCygaar/status/1874575841763770492" className="hz-fg-muted hz-link">https://x.com/0xCygaar/status/1874575841763770492</a>
          </div>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hz-card"
          >
            <div className="hz-rel hz-clip hz-r-lg hz-bg-overlay hz-p-5 hz-bh-8 hz-row hz-ai-center hz-jc-center">
              <div className="hz-abs hz-inset"></div>
              <div className="hz-rel hz-z-raised hz-align-center">
                <div className="hz-t-2xl hz-w-bold hz-fg hz-mb-4">Modular Architecture</div>
                <p className="hz-fg-muted">Visualization of the Hanzo Bot architecture would appear here</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hz-stack-4"
          >
            <div className="hz-card">
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">Character Files</h3>
              <p className="hz-fg-muted">
                Contains the agent's personality, backstory, knowledge, and topics to discuss. 
                It also defines which clients, models, and plugins to load.
              </p>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">Database</h3>
              <p className="hz-fg-muted">
                Stores relevant information for generating responses, including previous interactions 
                and embeddings. Essential for contextual responses.
              </p>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">Runtime</h3>
              <p className="hz-fg-muted">
                The core agent logic that coordinates between modules and external services. 
                It processes inputs through the LLM and generates responses or action items.
              </p>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">Clients</h3>
              <p className="hz-fg-muted">
                The platforms where agents interact with users (Discord, Twitter, Slack, Farcaster). 
                Agents can run on multiple clients simultaneously.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
