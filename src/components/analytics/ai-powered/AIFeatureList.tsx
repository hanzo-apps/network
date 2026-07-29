
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, Eye, Zap } from "lucide-react";
import AIFeatureCard from "./AIFeatureCard";

const AIFeatureList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const features = [
    {
      icon: <Eye className="hz-sq-6 hz-fg-muted" />,
      title: "Real-time anomaly detection",
      description: "Automatically identify unusual patterns and potential issues before they impact your business.",
      delay: 0
    },
    {
      icon: <AlertTriangle className="hz-sq-6 hz-fg-muted" />,
      title: "Predictive alerts and proactive monitoring",
      description: "Get alerted about potential problems before they occur with AI-powered predictive monitoring.",
      delay: 0.1
    },
    {
      icon: <Zap className="hz-sq-6 hz-fg-muted" />,
      title: "Deep integration with Hanzo Cloud and Base",
      description: "Seamlessly connect your analytics with your entire infrastructure for comprehensive visibility.",
      delay: 0.2
    }
  ];

  return (
    <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7" ref={ref}>
      {features.map((feature, index) => (
        <AIFeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          delay={feature.delay}
          index={index}
        />
      ))}
    </div>
  );
};

export default AIFeatureList;
