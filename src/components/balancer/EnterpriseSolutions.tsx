
import React from "react";
import { motion } from "framer-motion";
import { Building2, Shield, FileCode, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const EnterpriseSolutions = () => {
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
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Enterprise Solutions</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Power your mission-critical applications with enterprise-grade features designed for reliability, security, and compliance.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-6 hz-mb-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-card"
          >
            <div className="hz-row hz-ai-start hz-mb-5">
              <div className="hz-bg-raised hz-p-3 hz-r-full hz-mr-4">
                <Shield className="hz-sq-4 hz-fg-muted" />
              </div>
              <div>
                <h3 className="hz-t-2xl hz-w-semibold hz-mb-2">Enhanced Security Suite</h3>
                <p className="hz-fg-soft">
                  Advanced WAF protection, multi-factor authentication, and zero-trust network access controls to protect your infrastructure from sophisticated threats.
                </p>
              </div>
            </div>
            <div className="hz-row hz-ai-start">
              <div className="hz-bg-raised hz-p-3 hz-r-full hz-mr-4">
                <Building2 className="hz-sq-4 hz-fg-muted" />
              </div>
              <div>
                <h3 className="hz-t-2xl hz-w-semibold hz-mb-2">High Availability Clustering</h3>
                <p className="hz-fg-soft">
                  Multi-region and multi-zone failover capabilities with automated health checks and self-healing for 99.99% uptime SLAs.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card"
          >
            <div className="hz-row hz-ai-start hz-mb-5">
              <div className="hz-bg-raised hz-p-3 hz-r-full hz-mr-4">
                <FileCode className="hz-sq-4 hz-fg-muted" />
              </div>
              <div>
                <h3 className="hz-t-2xl hz-w-semibold hz-mb-2">Advanced Traffic Policies</h3>
                <p className="hz-fg-soft">
                  Sophisticated traffic management with circuit breaking, API rate limiting, and content-based routing for granular control.
                </p>
              </div>
            </div>
            <div className="hz-row hz-ai-start">
              <div className="hz-bg-raised hz-p-3 hz-r-full hz-mr-4">
                <Users className="hz-sq-4 hz-fg-muted" />
              </div>
              <div>
                <h3 className="hz-t-2xl hz-w-semibold hz-mb-2">Enterprise Support</h3>
                <p className="hz-fg-soft">
                  24/7/365 priority support, dedicated technical account managers, and professional services to ensure your success.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hz-align-center"
        >
          <Button 
            size="lg" 
            className="hz-px-6"
          >
            Request Enterprise Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EnterpriseSolutions;
