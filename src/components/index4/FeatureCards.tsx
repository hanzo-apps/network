
import React from "react";
import { motion } from "framer-motion";
import { Terminal, Code, Database } from "lucide-react";
import { ArchitecturalBox } from "@/components/ui/architectural-elements";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <ArchitecturalBox
      className="hz-card hz-glass hz-transition hz-card-interactive"
      showCorners={true}
      cornerColor="rgba(100, 100, 100, 0.2)"
      cornerSize={20}
    >
      <div className="hz-sq-6 hz-mb-4 hz-p-2 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center">
        {icon}
      </div>
      <h3 className="hz-t-xl hz-w-medium hz-mb-2 hz-fg">{title}</h3>
      <p className="hz-fg-muted hz-t-sm hz-leading-relaxed">
        {description}
      </p>
    </ArchitecturalBox>
  );
};

const FeatureCards = () => {
  const features = [
    {
      icon: <Terminal className="hz-sq-3 hz-fg-soft" />,
      title: "Developer Experience",
      description: "Intuitive CLI and dashboard designed for efficient workflow and rapid development."
    },
    {
      icon: <Code className="hz-sq-3 hz-fg-soft" />,
      title: "Instant Deployments",
      description: "From code to production in seconds with automatic builds and zero downtime updates."
    },
    {
      icon: <Database className="hz-sq-3 hz-fg-soft" />,
      title: "Global Infrastructure",
      description: "Scale effortlessly with our distributed network optimized for performance and reliability."
    }
  ];

  return (
    <section className="hz-container-wide hz-mb-7">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="hz-grid hz-grid-3 hz-gap-5"
      >
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default FeatureCards;
