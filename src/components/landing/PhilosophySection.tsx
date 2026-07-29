
import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Code } from "lucide-react";

interface PhilosophyItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const PhilosophyItem: React.FC<PhilosophyItemProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="hz-col hz-ai-center hz-align-center"
    >
      <div className="hz-sq-8 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4">
        {icon}
      </div>
      <h3 className="hz-t-xl hz-w-bold hz-mb-2 hz-fg">{title}</h3>
      <p className="hz-fg-soft">{description}</p>
    </motion.div>
  );
};

const PhilosophySection: React.FC = () => {
  const items = [
    {
      icon: <Shield className="hz-sq-5 hz-fg-muted" />,
      title: "Developer-First",
      description: "Built by developers for developers, with a focus on exceptional DX and intuitive APIs."
    },
    {
      icon: <Zap className="hz-sq-5 hz-fg-muted" />,
      title: "Open Source",
      description: "Complete transparency with our core tools open source and free forever."
    },
    {
      icon: <Code className="hz-sq-5 hz-fg-muted" />,
      title: "Complete Control",
      description: "No black boxes. You own your data, models, and infrastructure with full control."
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
      <div className="hz-container">
        <div className="hz-align-center hz-mb-7">
          <div className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-5">
            Our Philosophy
          </div>
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
            Building AI, the Right Way
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            We believe AI should be powerful, transparent, and fully under your control.
            Our platform is built with these principles at its core.
          </p>
        </div>

        <div className="hz-grid hz-grid-3 hz-gap-7">
          {items.map((item, index) => (
            <PhilosophyItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
