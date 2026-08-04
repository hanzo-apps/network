
import React from "react";
import { motion } from "framer-motion";
import { Database, Search, Zap, Shield, Code, BarChart } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";
import AnimatedSection, { AnimatedHeading, AnimatedStaggerContainer } from "@/components/ui/animated-section";
import { createAnimationVariant, curves } from "@/components/ui/animation-variants";

const featureCardVariant = createAnimationVariant("popIn", {
  duration: 0.4,
  curve: curves.bouncy,
  blur: 5
});

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => (
  <motion.div
    variants={featureCardVariant}
    className="hz-card hz-transition hz-card-interactive"
    whileHover={{ 
      y: -5, 
      boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.1)",
      borderColor: "rgba(99, 102, 241, 0.4)"
    }}
    transition={{ duration: 0.2 }}
  >
    <div className="hz-sq-7 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4">
      {icon}
    </div>
    <ChromeText as="h3" className="hz-t-xl hz-w-bold hz-mb-2">
      {title}
    </ChromeText>
    <p className="hz-fg-muted">
      {description}
    </p>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      icon: <Database className="hz-sq-4 hz-fg-muted" />,
      title: "Vector Storage",
      description: "Store and index millions of vector embeddings with automatic sharding and high-throughput capabilities."
    },
    {
      icon: <Search className="hz-sq-4 hz-fg-muted" />,
      title: "Similarity Search",
      description: "Ultra-fast nearest neighbor search using HNSW, IVF, and other algorithms for maximum performance."
    },
    {
      icon: <Zap className="hz-sq-4 hz-fg-muted" />,
      title: "Real-time Indexing",
      description: "Index new vectors instantly with zero downtime and minimal performance impact on queries."
    },
    {
      icon: <Shield className="hz-sq-4 hz-fg-muted" />,
      title: "Secure Access",
      description: "Role-based access control, end-to-end encryption, and audit logging for enterprise-grade security."
    },
    {
      icon: <Code className="hz-sq-4 hz-fg-muted" />,
      title: "API & SDKs",
      description: "Well-documented REST API and client libraries for Python, JavaScript, Go, and more."
    },
    {
      icon: <BarChart className="hz-sq-4 hz-fg-muted" />,
      title: "Analytics",
      description: "Monitor performance metrics, query patterns, and usage statistics through a built-in dashboard."
    }
  ];

  return (
    <AnimatedSection className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <AnimatedHeading className="hz-align-center hz-mb-7">
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-4">
            Powerful Features
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-muted">
            Everything you need for building AI-powered vector search applications
          </p>
        </AnimatedHeading>
        
        <AnimatedStaggerContainer className="hz-grid hz-grid-3 hz-gap-6" delayFactor={0.05}>
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </AnimatedStaggerContainer>
      </div>
    </AnimatedSection>
  );
};

export default Features;
