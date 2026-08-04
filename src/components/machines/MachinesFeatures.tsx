
import React from 'react';
import { motion } from "framer-motion";
import { Cpu, Server, Zap, Network, BarChart, Globe } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="hz-card"
    >
      <Icon className="hz-sq-6 hz-fg-muted hz-mb-4" />
      <h3 className="hz-t-xl hz-w-bold hz-mb-2">{title}</h3>
      <p className="hz-fg-soft">
        {description}
      </p>
    </motion.div>
  );
};

const MachinesFeatures = () => {
  const features = [
    {
      icon: Cpu,
      title: "High-Performance GPUs",
      description: "Access to NVIDIA H100, A100, and L4 GPUs for AI training and inference workloads.",
      delay: 0
    },
    {
      icon: Server,
      title: "Flexible Configurations",
      description: "Custom CPU, memory, and storage configurations to match your specific workload requirements.",
      delay: 0.1
    },
    {
      icon: Zap,
      title: "Instant Provisioning",
      description: "Launch machines in seconds with pre-configured environments for ML frameworks and data science.",
      delay: 0.2
    },
    {
      icon: Network,
      title: "High-Speed Networking",
      description: "Up to 100 Gbps networking with ultra-low latency between machines for distributed workloads.",
      delay: 0.3
    },
    {
      icon: BarChart,
      title: "Comprehensive Monitoring",
      description: "Real-time metrics and performance monitoring for all machine resources and workloads.",
      delay: 0.4
    },
    {
      icon: Globe,
      title: "Global Availability",
      description: "Deploy machines in 20+ regions worldwide with automatic failover and redundancy.",
      delay: 0.5
    }
  ];

  return (
    <section className="hz-py-7 hz-rel">
      <div className="hz-container">
        <div className="hz-align-center hz-mb-7">
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-4">
            Key Features & Capabilities
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Purpose-built infrastructure for the most demanding AI and compute workloads
          </p>
        </div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachinesFeatures;
