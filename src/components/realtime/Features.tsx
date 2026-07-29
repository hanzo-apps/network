
import React from "react";
import { motion } from "framer-motion";
import { Activity, Zap, Globe, Users, Clock, Lock, Workflow, Shield } from "lucide-react";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="hz-card"
    >
      <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4">
        <Icon className="hz-sq-4 hz-fg-muted" />
      </div>
      <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">{title}</h3>
      <p className="hz-fg-muted">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Activity,
      title: "WebSocket Messaging",
      description: "Reliable, low-latency WebSocket connections with automatic reconnection and health monitoring."
    },
    {
      icon: Workflow,
      title: "Pub/Sub Channels",
      description: "Create and manage channels for organized communication between clients and services."
    },
    {
      icon: Globe,
      title: "Global Distribution",
      description: "Deploy to 200+ edge locations worldwide for single-digit millisecond latency."
    },
    {
      icon: Users,
      title: "Presence Detection",
      description: "Track user online status and activity with built-in presence management."
    },
    {
      icon: Clock,
      title: "Event History",
      description: "Configurable event history allows clients to catch up on missed updates."
    },
    {
      icon: Zap,
      title: "Message Filtering",
      description: "Advanced filtering to ensure clients only receive relevant data updates."
    },
    {
      icon: Lock,
      title: "Authentication",
      description: "Secure communication with JWT authentication and channel-level access control."
    },
    {
      icon: Shield,
      title: "Rate Limiting",
      description: "Protect your services with configurable rate limiting and abuse prevention."
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Key Features
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Everything you need to build scalable real-time applications
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-4 hz-gap-5">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
