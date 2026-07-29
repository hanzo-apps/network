
import React from "react";
import { motion } from "framer-motion";
import { Scale, Network, Shield } from "lucide-react";

const PlatformVision = () => {
  const visionPoints = [
    {
      icon: <Scale className="hz-sq-6 hz-fg-muted" />,
      title: "Intelligent Load Distribution",
      description: "Hanzo Balancer dynamically routes traffic based on real-time service health, load, and AI-driven insights to ensure optimal performance and resource utilization."
    },
    {
      icon: <Network className="hz-sq-6 hz-fg-muted" />,
      title: "Global Edge Network",
      description: "Deploy your services globally with our planetary-scale edge network, providing ultra-low latency and instant scaling for AI workloads anywhere in the world."
    },
    {
      icon: <Shield className="hz-sq-6 hz-fg-muted" />,
      title: "Always-On Security",
      description: "Built-in Web Application Firewall (WAF), DDoS protection, and AI-powered threat detection ensure your services are secured against evolving cyber threats."
    }
  ];

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
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Platform Vision</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Hanzo Balancer represents the next evolution in intelligent traffic management, designed for the AI-first era
            of cloud computing where millisecond performance and dynamic scaling are non-negotiable.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6">
          {visionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-bg-raised hz-p-6 hz-r-lg"
            >
              <div className="hz-mb-4">{point.icon}</div>
              <h3 className="hz-t-xl hz-w-semibold hz-mb-3">{point.title}</h3>
              <p className="hz-fg-soft">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformVision;
