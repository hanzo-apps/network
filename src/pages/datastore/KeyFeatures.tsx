
import React from "react";
import { motion } from "framer-motion";
import { Zap, Scale, Shield, Grid, DatabaseIcon, Activity } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="hz-card"
  >
    <div className="hz-sq-7 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-5">
      <Icon className="hz-sq-4 hz-fg-muted" />
    </div>
    <ChromeText as="h3" className="hz-t-xl hz-w-bold hz-mb-4">
      {title}
    </ChromeText>
    <p className="hz-fg-muted">
      {description}
    </p>
  </motion.div>
);

const KeyFeatures = () => {
  const features = [
    {
      icon: Zap,
      title: "Blazing Fast",
      description: "Processes analytical queries faster than traditional row and column oriented systems."
    },
    {
      icon: Scale,
      title: "Linearly Scalable",
      description: "Scales efficiently with hardware resources horizontally and vertically to petabyte scale."
    },
    {
      icon: Shield,
      title: "Highly Reliable",
      description: "Supports asyncronous replication and can be deployed across multiple datacenters."
    },
    {
      icon: Grid,
      title: "Flexible Architecture",
      description: "Supports shared-nothing clusters as well as separation of storage and compute."
    },
    {
      icon: DatabaseIcon,
      title: "Feature-rich",
      description: "The most complete analytical datastore with support for joins, federated queries, and more."
    },
    {
      icon: Activity,
      title: "Easy to Use",
      description: "Simplifies writing queries with a user-friendly SQL dialect, optimized for common analytical use cases."
    }
  ];

  return (
    <section id="features" className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide">
        <div className="hz-align-center hz-mb-7">
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-5">
            Key Features
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            A powerful datastore built for modern analytical applications
          </p>
        </div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
