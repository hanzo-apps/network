
import React from "react";
import { motion } from "framer-motion";
import { 
  Server, 
  Router, 
  Lock, 
  Gauge, 
  BarChart, 
  Terminal 
} from "lucide-react";

const CoreCapabilities = () => {
  const capabilities = [
    {
      icon: Router,
      title: "Intelligent Routing",
      description: "Advanced L4 and L7 routing with traffic splitting, blue/green deployments, canary releases, and A/B testing."
    },
    {
      icon: Gauge,
      title: "AI-Optimized Performance",
      description: "Machine learning-driven load balancing algorithms that adapt to traffic patterns for optimal resource utilization."
    },
    {
      icon: Lock,
      title: "End-to-End Security",
      description: "Built-in TLS, authentication, rate limiting, and WAF capabilities to protect your services from threats."
    },
    {
      icon: BarChart,
      title: "Real-Time Observability",
      description: "Comprehensive metrics, logging, and tracing capabilities with out-of-the-box integrations for popular platforms."
    },
    {
      icon: Server,
      title: "Global Edge Network",
      description: "Deploy your balancer instances at the edge for ultra-low latency and global availability."
    },
    {
      icon: Terminal,
      title: "GitOps Native",
      description: "Declarative configuration with version control integration for reproducible, auditable deployments."
    }
  ];

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
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Core Capabilities</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Hanzo Balancer provides a comprehensive set of features to handle the most demanding traffic management requirements.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card"
            >
              <div className="hz-bg-raised hz-p-3 hz-r-full hz-w-fit hz-mb-4">
                <capability.icon className="hz-sq-4 hz-fg-muted" />
              </div>
              <h3 className="hz-t-xl hz-w-semibold hz-mb-3">{capability.title}</h3>
              <p className="hz-fg-soft">{capability.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities;
