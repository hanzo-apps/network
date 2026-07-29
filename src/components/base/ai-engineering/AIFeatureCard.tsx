
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeaturePoint {
  text: string;
}

interface AIFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  featurePoints: FeaturePoint[];
  delay: number;
  iconBgClass: string;
  iconTextClass: string;
  bulletColor: string;
}

const AIFeatureCard = ({
  icon,
  title,
  description,
  featurePoints,
  delay,
  iconBgClass,
  iconTextClass,
  bulletColor,
}: AIFeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: title.includes("Vector") || title.includes("AI-Enhanced") ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="hz-card"
    >
      <div className="hz-row hz-ai-center hz-mb-5">
        <div className="hz-none">
          <div className={`hz-sq-7 hz-row hz-ai-center hz-jc-center hz-r-lg ${iconBgClass} ${iconTextClass}`}>
            {icon}
          </div>
        </div>
        <div className="hz-ml-4">
          <h3 className="hz-t-xl hz-w-semibold hz-fg">{title}</h3>
        </div>
      </div>
      <p className="hz-fg-soft hz-mb-5">
        {description}
      </p>
      <ul className="hz-stack-3">
        {featurePoints.map((point, index) => (
          <li key={index} className="hz-row hz-ai-start">
            <span className={`${bulletColor} hz-mr-2`}>•</span>
            <span className="hz-fg-soft">{point.text}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default AIFeatureCard;
