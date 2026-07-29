
import React from "react";
import { motion } from "framer-motion";
import { Activity, Users, Zap, Cpu, Server, Network } from "lucide-react";

const Scaling = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Scale to Millions of Connections
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Built for massive scale from day one, with no infrastructure management required
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-card"
          >
            <Activity className="hz-sq-5 hz-fg-muted hz-mb-4" />
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">High Throughput</h3>
            <p className="hz-fg-soft">
              Process millions of messages per second with sub-millisecond latency. 
              Perfect for high-frequency data updates and time-sensitive applications.
            </p>
            
            <div className="hz-mt-5 hz-pt-6 hz-border-t">
              <div className="hz-row hz-ai-center hz-jc-between hz-mb-2">
                <span className="hz-fg-muted hz-t-sm">Message throughput</span>
                <span className="hz-fg hz-w-medium">Unlimited</span>
              </div>
              <div className="hz-w-full hz-bg-raised hz-bh-1 hz-r-full hz-clip">
                <div className="hz-bg-raised hz-h-full hz-r-full" style={{ width: "100%" }}></div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card"
          >
            <Users className="hz-sq-5 hz-fg-muted hz-mb-4" />
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">Concurrent Connections</h3>
            <p className="hz-fg-soft">
              Support millions of simultaneous client connections with automatic
              scaling. No connection limits or throttling to worry about.
            </p>
            
            <div className="hz-mt-5 hz-pt-6 hz-border-t">
              <div className="hz-row hz-ai-center hz-jc-between hz-mb-2">
                <span className="hz-fg-muted hz-t-sm">Connection capacity</span>
                <span className="hz-fg hz-w-medium">Millions+</span>
              </div>
              <div className="hz-w-full hz-bg-raised hz-bh-1 hz-r-full hz-clip">
                <div className="hz-bg-raised hz-h-full hz-r-full" style={{ width: "95%" }}></div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hz-card"
          >
            <Network className="hz-sq-5 hz-fg-muted hz-mb-4" />
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">Global Edge Network</h3>
            <p className="hz-fg-soft">
              Deployed at the edge across 200+ locations worldwide, ensuring
              low-latency connections for users anywhere on the planet.
            </p>
            
            <div className="hz-mt-5 hz-pt-6 hz-border-t">
              <div className="hz-row hz-ai-center hz-jc-between hz-mb-2">
                <span className="hz-fg-muted hz-t-sm">Global coverage</span>
                <span className="hz-fg hz-w-medium">200+ regions</span>
              </div>
              <div className="hz-w-full hz-bg-raised hz-bh-1 hz-r-full hz-clip">
                <div className="hz-bg-raised hz-h-full hz-r-full" style={{ width: "90%" }}></div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hz-grid hz-grid-3 hz-mt-7 hz-gap-5"
        >
          <div className="hz-card hz-row hz-ai-center">
            <Zap className="hz-sq-5 hz-fg-muted hz-mr-4" />
            <div>
              <h4 className="hz-fg hz-w-medium">Auto-scaling</h4>
              <p className="hz-fg-muted hz-t-sm">Scales automatically based on demand</p>
            </div>
          </div>
          
          <div className="hz-card hz-row hz-ai-center">
            <Cpu className="hz-sq-5 hz-fg-muted hz-mr-4" />
            <div>
              <h4 className="hz-fg hz-w-medium">High Availability</h4>
              <p className="hz-fg-muted hz-t-sm">99.99% uptime SLA guarantee</p>
            </div>
          </div>
          
          <div className="hz-card hz-row hz-ai-center">
            <Server className="hz-sq-5 hz-fg-muted hz-mr-4" />
            <div>
              <h4 className="hz-fg hz-w-medium">Zero Management</h4>
              <p className="hz-fg-muted hz-t-sm">No servers or infrastructure to manage</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Scaling;
