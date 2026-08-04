
import React from "react";
import { motion } from "framer-motion";

const Regions = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      <div className="hz-abs hz-inset hz-bg-surface hz-no-pointer" />
      
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
            Serverful JavaScript Without the Hassle of Serverless
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Imagine if a server could boot as fast as a serverless function? That's Hanzo Machines—serverless compute is a trade-off you no longer need to make. Graduate to a full-stack cloud to regain control over your stack & hosting bill.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-7">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Boots in 250ms or Less</h3>
            <p className="hz-fg-soft hz-mb-6">
              Functions and apps boot and respond to web requests in 250ms or less with Hanzo Machines. You decide to keep them running or automatically put them to sleep.
            </p>
            
            <div className="hz-r-lg hz-bg-surface hz-bordered hz-clip">
              <div className="hz-bg-raised hz-py-2 hz-px-4 hz-row hz-ai-center hz-inline-2">
                <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                <div className="hz-fg-muted hz-t-sm">Terminal</div>
              </div>
              <div className="hz-p-4 hz-mono hz-t-sm hz-fg-soft">
                <div className="hz-fg-muted">$ hanzo deploy</div>
                <div className="hz-fg-muted">Initializing deployment...</div>
                <div className="hz-fg-muted">Deploying to region: us-east-1</div>
                <div className="hz-fg-muted">Building container image...</div>
                <div className="hz-fg-muted">Pushing to registry...</div>
                <div className="hz-fg-muted">✓ Deployed in 250ms</div>
                <div className="hz-fg-muted">Your app is live at: <span className="hz-fg-muted">https://myapp.hanzo.cloud</span></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Built for JavaScript Developers</h3>
            <p className="hz-fg-soft hz-mb-6">
              JavaScript, TypeScript, Bun, Deno—whatever your flavor, Hanzo Launch automatically detects your runtime and generates a VM with everything you need to run your app.
            </p>
            
            <div className="hz-card">
              <h4 className="hz-t-xl hz-w-bold hz-mb-4">Real GPUs & CPUs on the Edge</h4>
              <p className="hz-fg-soft">
                Run workloads that require GPUs or lots of CPUs, memory, and storage in over 30 regions around the world—all interconnected by a private, encrypted WireGuard network that works out of the box.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Regions;
