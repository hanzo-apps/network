
import React from "react";
import { motion } from "framer-motion";

const ArchitectureOverview = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Hanzo Balancer Architecture Overview</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Unlike a traditional reverse proxy, which requires manual configuration, Hanzo Balancer uses service 
            discovery to dynamically configure routing. Hanzo Balancer supports all major protocols, leveraging a rich set 
            of middleware for load balancing, rate-limiting, circuit-breakers, mirroring, authentication, and more.
          </p>
        </motion.div>

        <div className="hz-col-row hz-ai-center hz-gap-7 hz-mb-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-w-full"
          >
            <div className="hz-card hz-row hz-ai-center hz-jc-center">
              <p className="hz-t-xl hz-fg-muted">Hanzo Balancer Architecture Diagram</p>
              {/* Replace with actual diagram image when available */}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-w-full"
          >
            <p className="hz-fg-soft hz-mb-5">
              Hanzo Balancer also supports SSL termination and works with ACME providers (like Let's Encrypt) 
              for automatic certificate generation. Hanzo Balancer's extensive features and capabilities make it 
              the comprehensive gateway to all your applications.
            </p>
            <div className="hz-card">
              <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Maximize Uptime, Solve Issues Quickly</h3>
              <p className="hz-fg-soft hz-mb-4">
                Need support with Hanzo Balancer? Our team of experts is here to help 24/7/365!
              </p>
              <a 
                href="#support" 
                className="hz-px-4 hz-py-2 hz-bg-raised hz-r-md hz-w-medium hz-transition hz-hoverable"
              >
                REQUEST COMMERCIAL SUPPORT
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureOverview;
