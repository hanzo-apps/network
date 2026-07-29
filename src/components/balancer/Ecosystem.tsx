
import React from "react";
import { motion } from "framer-motion";

const ecosystemCategories = [
  {
    title: "Providers & Orchestrators",
    items: [
      "Kubernetes",
      "Docker Swarm",
      "etcd",
      "Consul",
      "K3S",
      "HashiCorp Nomad",
      "Redis",
      "Azure Service Fabric",
      "Amazon ECS",
      "AKS",
      "GKE",
      "EKS",
      "IBM Cloud Kubernetes Service",
      "OpenShift"
    ]
  },
  {
    title: "Tracing & Metrics",
    items: [
      "OpenTelemetry",
      "Datadog",
      "Prometheus",
      "InfluxDB"
    ]
  },
  {
    title: "TLS Certificates",
    items: [
      "Let's Encrypt",
      "Tailscale",
      "SPIFFE"
    ]
  }
];

const Ecosystem = () => {
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
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Hanzo Balancer Ecosystem</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Hanzo Balancer integrates with every major cluster technology and includes built-in support for 
            the top distributed tracing and metrics providers.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6">
          {ecosystemCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card"
            >
              <h3 className="hz-t-xl hz-w-semibold hz-mb-4">{category.title}</h3>
              <ul className="hz-stack-2">
                {category.items.map((item) => (
                  <li key={item} className="hz-fg-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
