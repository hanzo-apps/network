
import React from "react";
import { motion } from "framer-motion";
import { Brain, Scale, Leaf, Shield, Code } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const WhyHanzo = () => {
  const features = [
    {
      icon: <Brain className="hz-sq-4 hz-fg-muted" />,
      title: "AI-Native",
      description: "Purpose-built for AI-driven software development and deployment."
    },
    {
      icon: <Code className="hz-sq-4 hz-fg-muted" />,
      title: "Autonomous",
      description: "Delegate complex tasks to intelligent AI agents."
    },
    {
      icon: <Scale className="hz-sq-4 hz-fg-muted" />,
      title: "Scalable",
      description: "Grow seamlessly from startup to enterprise-level demands."
    },
    {
      icon: <Leaf className="hz-sq-4 hz-fg-muted" />,
      title: "Sustainable",
      description: "Operate with 100% renewable energy at planet-scale efficiency."
    },
    {
      icon: <Shield className="hz-sq-4 hz-fg-muted" />,
      title: "Open and Secure",
      description: "Fully open-source options ensuring transparency and control."
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        <div className="hz-align-center hz-mb-7">
          <ChromeText 
            as="h2" 
            className="hz-t-3xl hz-w-bold hz-mb-5"
            preHeading="Innovative Technology"
          >
            Why Visionary Teams Choose Hanzo
          </ChromeText>
        </div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="hz-card"
            >
              <div className="hz-sq-7 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4">
                {feature.icon}
              </div>
              <ChromeText as="h3" className="hz-t-xl hz-w-bold hz-mb-2">
                {feature.title}
              </ChromeText>
              <p className="hz-fg-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHanzo;
