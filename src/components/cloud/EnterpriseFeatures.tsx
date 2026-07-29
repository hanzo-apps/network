
import React from "react";
import { motion } from "framer-motion";

const EnterpriseFeatures = () => {
  return (
    <section id="infra-log" className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      <div className="hz-abs hz-inset hz-dim-more">
        <div className="hz-abs hz-inset hz-bg-surface" />
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg" />
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg" />
      </div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center"
        >
          <div>
            <div className="hz-r-lg hz-bordered hz-clip hz-shadow-lg">
              <div className="hz-bg-raised hz-py-2 hz-px-4 hz-row hz-ai-center hz-jc-between">
                <div className="hz-row hz-ai-center hz-inline-2">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                </div>
                <div className="hz-fg-muted hz-t-sm">infrastructure.log</div>
              </div>
              <div className="hz-p-4 hz-mono hz-t-sm hz-fg-soft hz-scroll-y">
                <div className="hz-fg-muted"># Hanzo Infrastructure Log</div>
                <div className="hz-fg-muted">[INFO] Sydney region: 12 new CPU machines online</div>
                <div className="hz-fg-muted">[SCALING] Tokyo region: GPU cluster expanding</div>
                <div className="hz-fg-muted">[NETWORK] Frankfurt: New 100Gbps uplink active</div>
                <div className="hz-fg-muted">[UPDATE] Global: System update scheduled for May 15</div>
                <div className="hz-fg-muted">[INFO] Amsterdam: Storage cluster expansion complete</div>
                <div className="hz-fg-muted">[SCALING] São Paulo: 8 new CPU machines online</div>
                <div className="hz-fg-muted">[NETWORK] New York: DDoS protection enhanced</div>
                <div className="hz-fg-muted">[INFO] Singapore: New edge region now available</div>
                <div className="hz-fg-muted">[UPDATE] Global: Network routes optimized</div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
              Use the Tech You Love
            </h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-6">
              Build with your favorite framework. No Dockerfile? No problem: our CLI generates containers for most popular frameworks, including Rails, Phoenix, Django, Node, Laravel, and .NET.
            </p>
            <motion.a
              href="#learn-more"
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="hz-px-5 hz-py-3 hz-r-lg hz-fg hz-w-medium hz-transition"
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnterpriseFeatures;
