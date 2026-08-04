
import React from "react";
import { motion } from "framer-motion";
import { Cloud, Cpu, Globe, Server, Database, Network, Bot, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Features = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <div className="hz-align-center hz-mb-7">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hz-t-3xl hz-w-bold hz-mb-5"
          >
            Enterprise-Grade Cloud Built for AI Engineers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hz-container-narrow hz-t-xl hz-fg-soft"
          >
            The most flexible and powerful compute platform for AI workloads. Hanzo Machines are hardware-virtualized containers, running on proprietary AI-optimized hardware, that launch instantly and scale automatically with your needs.
          </motion.p>
        </div>

        <div className="hz-grid hz-grid-3 hz-gap-7 hz-mt-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <Globe className="hz-sq-7 hz-fg-muted hz-mb-5" />
            <h3 className="hz-t-xl hz-w-bold hz-mb-4">Global Reach</h3>
            <p className="hz-fg-soft">
              Deploy in 35 regions, from Sydney to São Paulo, for sub-100ms response times and native-app feel no matter where your users are.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <Server className="hz-sq-7 hz-fg-muted hz-mb-5" />
            <h3 className="hz-t-xl hz-w-bold hz-mb-4">Instant Scaling</h3>
            <p className="hz-fg-soft">
              Hanzo Machines start fast enough to handle HTTP requests, run only when you need them, and scale into tens of thousands of instances.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <Cpu className="hz-sq-7 hz-fg-muted hz-mb-5" />
            <h3 className="hz-t-xl hz-w-bold hz-mb-4">GPU Acceleration</h3>
            <p className="hz-fg-soft">
              From LLMs to inferencing, hardware acceleration with the same developer experience as a simple CRUD app.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <Database className="hz-sq-7 hz-fg-muted hz-mb-5" />
            <h3 className="hz-t-xl hz-w-bold hz-mb-4">AI-Native Storage</h3>
            <p className="hz-fg-soft">
              Vector databases, document stores, and relational databases optimized for AI workloads with automatic scaling.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <Bot className="hz-sq-7 hz-fg-muted hz-mb-5" />
            <h3 className="hz-t-xl hz-w-bold hz-mb-4">Model Management</h3>
            <p className="hz-fg-soft">
              Streamlined deployment and management of AI models with version control, A/B testing, and monitoring built-in.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <Lock className="hz-sq-7 hz-fg-muted hz-mb-5" />
            <h3 className="hz-t-xl hz-w-bold hz-mb-4">Enterprise Security</h3>
            <p className="hz-fg-soft">
              SOC 2, GDPR, and HIPAA compliant infrastructure with private networking, encryption, and audit logging.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="hz-card hz-mt-7"
        >
          <div className="hz-col-row hz-ai-center">
            <Cloud className="hz-sq-7 hz-fg-muted hz-mb-5" />
            <div>
              <h3 className="hz-t-xl hz-w-bold hz-mb-3">Built for AI Engineering</h3>
              <p className="hz-fg-soft">
                Specialized infrastructure for AI workloads, with optimizations for large language models, computer vision, and other AI tasks. From prototype to production with zero re-architecture.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="hz-mt-7 hz-align-center"
        >
          <div className="hz-container-narrow hz-r-lg hz-p-6 hz-ring hz-transition">
            <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Enterprise Support</h3>
            <p className="hz-fg-soft hz-mb-6">
              Paid support packages include a team of actual engineers (not chatbots) who themselves ship code on our platform. Emergency support and guaranteed response times available.
            </p>
            <div className="hz-col-row hz-jc-center hz-gap-4">
              <Button
                className="hz-fg"
              >
                Contact Sales
              </Button>
              
              <Button
                variant="outline"
                className="hz-bg-none hz-fg hz-bordered hz-hoverable"
              >
                Try Free Tier
              </Button>
            </div>
            
            <div className="hz-mt-5 hz-fg-muted hz-t-sm">
              Looking for a free, self-hosted alternative? <a href="/platform" className="hz-fg-muted">Check out Hanzo Platform</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
