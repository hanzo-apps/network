
import React from "react";
import { motion } from "framer-motion";
import { Globe, Zap, Shield } from "lucide-react";

const Infrastructure = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface hz-clip">
      <div className="hz-container hz-rel">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">Global Infrastructure</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Serverless architecture that scales automatically with your application needs
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-card hz-align-center"
          >
            <div className="hz-sq-7 hz-inline hz-ai-center hz-jc-center hz-r-full hz-bg-raised hz-fg-muted hz-mb-4 hz-mx-auto">
              <Globe className="hz-sq-4" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-3">Global Distribution</h3>
            <p className="hz-fg-soft">
              Multi-region deployments ensuring low latency and high availability for users worldwide.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card hz-align-center"
          >
            <div className="hz-sq-7 hz-inline hz-ai-center hz-jc-center hz-r-full hz-bg-raised hz-fg-muted hz-mb-4 hz-mx-auto">
              <Zap className="hz-sq-4" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-3">Automatic Scaling</h3>
            <p className="hz-fg-soft">
              Serverless infrastructure that scales resources up and down based on demand without manual intervention.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hz-card hz-align-center"
          >
            <div className="hz-sq-7 hz-inline hz-ai-center hz-jc-center hz-r-full hz-bg-raised hz-fg-muted hz-mb-4 hz-mx-auto">
              <Shield className="hz-sq-4" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-3">High Redundancy</h3>
            <p className="hz-fg-soft">
              Fault-tolerant architecture with redundancy and failover capabilities to ensure 99.99% uptime.
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hz-mt-7 hz-rel"
        >
          <div className="hz-card hz-clip hz-rel">
            <div className="hz-grid hz-grid-5 hz-gap-2 hz-mb-5">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="hz-bh-1 hz-r-full hz-bg-raised"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                ></div>
              ))}
            </div>
            
            <div className="hz-row hz-wrap hz-jc-center hz-gap-4">
              {["North America", "Europe", "Asia", "Australia", "South America"].map((region, i) => (
                <div key={i} className="hz-px-3 hz-py-1 hz-bg-raised hz-r-full hz-fg-muted hz-t-sm">
                  {region}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Infrastructure;
