
import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Security = () => {
  return (
    <section id="security" className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <Shield className="hz-sq-8 hz-fg-muted hz-mx-auto hz-mb-5" />
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
            Enterprise-Ready
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Apps running on Hanzo Machines are KVM hardware-isolated, built on a memory-safe stack and running directly on our own metal.
          </p>
        </motion.div>

        <div className="hz-col-row hz-gap-7 hz-ai-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-grow"
          >
            <h3 className="hz-t-2xl hz-w-bold hz-mb-5">Enterprise Features</h3>
            <ul className="hz-stack-4">
              {[
                "Single Sign-On",
                "Guaranteed Support Response Times",
                "SOC2 Type 2 Attested",
                "Memory-safe Rust and Go stack",
                "CI/CD Integration"
              ].map((feature, index) => (
                <li key={index} className="hz-row hz-ai-start">
                  <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-3 hz-mt-1" />
                  <span className="hz-fg-soft">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-grow"
          >
            <div className="hz-card">
              <Lock className="hz-sq-7 hz-fg-muted hz-mb-5" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-4">Hanzo.io Security</h3>
              <p className="hz-fg-soft hz-mb-6">
                Our security team works around the clock to ensure your applications and data are protected. We employ industry-leading practices and regularly undergo independent security audits.
              </p>
              <Button variant="outline" className="hz-bg-none hz-fg hz-bordered hz-hoverable">
                <a href="https://hanzo.ai/security">Security Details</a>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hz-mt-7 hz-align-center"
        >
          <p className="hz-t-xl hz-w-semibold hz-mb-6">Trusted by teams at</p>
          <div className="hz-row hz-wrap hz-jc-center hz-ai-center hz-gap-7">
            <div className="hz-bh-7 hz-bw-8 hz-bg-raised hz-r-md"></div>
            <div className="hz-bh-7 hz-bw-8 hz-bg-raised hz-r-md"></div>
            <div className="hz-bh-7 hz-bw-8 hz-bg-raised hz-r-md"></div>
            <div className="hz-bh-7 hz-bw-8 hz-bg-raised hz-r-md"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Security;
