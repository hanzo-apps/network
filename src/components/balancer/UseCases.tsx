
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Server, Shield, FileText, Server as LoadBalancer } from "lucide-react";

const useCases = [
  {
    id: "ingress-controller",
    icon: Server,
    title: "Ingress Controller",
    description: "Deploy Hanzo Balancer as your Kubernetes Ingress Controller to simplify networking, secure your APIs, and reduce the costs of managing your microservices with a dynamic, production-ready Kubernetes Ingress routing solution.",
    learnMoreLink: "#ingress"
  },
  {
    id: "waf",
    icon: Shield,
    title: "Web Application Firewall",
    description: "Leverage Hanzo Balancer as your WAF to protect your microservices and APIs against a myriad of online threats, such as SQL injection and cross-site scripting, thus enhancing security and ensuring data integrity.",
    learnMoreLink: "#waf"
  },
  {
    id: "certificate",
    icon: FileText,
    title: "Certificate Management",
    description: "Hanzo Balancer provides built-in support for Let's Encrypt (ACME) automatic certificate management as well as user-defined certificates.",
    learnMoreLink: "#cert"
  },
  {
    id: "load-balancing",
    icon: LoadBalancer,
    title: "Load Balancing",
    description: "Control load to upstream services with flexible Layer 4 and Layer 7 routing and load balancing capabilities plus a large middleware toolkit that enables dynamic scaling, zero-downtime blue-green and canary deployments, mirroring, and more.",
    learnMoreLink: "#lb"
  }
];

const UseCaseCard = ({ useCase }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-card"
    >
      <div className="hz-sq-7 hz-bg-raised hz-r-full hz-row hz-ai-center hz-jc-center hz-mb-4">
        <useCase.icon className="hz-sq-4 hz-fg-muted" />
      </div>
      <h3 className="hz-t-xl hz-w-semibold hz-mb-3">{useCase.title}</h3>
      <p className="hz-fg-soft hz-mb-4">{useCase.description}</p>
      <a href={useCase.learnMoreLink} className="hz-fg-muted hz-link">
        Learn more
      </a>
    </motion.div>
  );
};

const UseCases = () => {
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
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Hanzo Balancer Use Cases</h2>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-6 hz-mb-7">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
