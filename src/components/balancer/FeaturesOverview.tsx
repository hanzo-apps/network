
import React from "react";
import { motion } from "framer-motion";

const FeaturesOverview = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">What is Hanzo Balancer?</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Hanzo Balancer is a leading modern open source reverse proxy and ingress controller that makes deploying services and APIs easy. 
            Hanzo Balancer integrates with your existing infrastructure components and configures itself automatically and dynamically.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-card"
          >
            <h3 className="hz-t-2xl hz-w-semibold hz-mb-4">Simplified Operation, Complex Deployments</h3>
            <p className="hz-fg-soft">
              Hanzo Balancer is designed to be as simple as possible to operate, but capable of handling large, 
              highly-complex deployments across a wide range of environments and protocols in public, private, and hybrid clouds.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card"
          >
            <h3 className="hz-t-2xl hz-w-semibold hz-mb-4">Enhanced with Powerful Middleware Suite</h3>
            <p className="hz-fg-soft">
              Hanzo Balancer also comes with a powerful set of middlewares that enhance its capabilities to include 
              load balancing, API gateway, orchestrator ingress, and more.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hz-card"
          >
            <h3 className="hz-t-2xl hz-w-semibold hz-mb-4">Upgrade from Other Proxies in Seconds</h3>
            <p className="hz-fg-soft">
              Watch our short demo video to see why our cloud native, GitOps-driven API Gateway is Developers' #1 choice.
            </p>
            <a href="#watch-demo" className="hz-inline hz-mt-4 hz-fg-muted hz-link">
              Watch Demo Video
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
