
import React from "react";
import { motion } from "framer-motion";

interface FeaturePoint {
  text: string;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  featurePoints: FeaturePoint[];
  delay: number;
  iconBgClass: string;
  iconTextClass: string;
  bulletColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  featurePoints,
  delay,
  iconBgClass,
  iconTextClass,
  bulletColor
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="hz-card hz-h-full hz-col"
    >
      <div className={`hz-sq-7 hz-r-lg ${iconBgClass} hz-row hz-ai-center hz-jc-center hz-mb-4`}>
        <div className={iconTextClass}>{icon}</div>
      </div>
      
      <h3 className="hz-t-xl hz-w-bold hz-mb-2">{title}</h3>
      <p className="hz-fg-muted hz-mb-4 hz-grow">{description}</p>
      
      <ul className="hz-stack-2">
        {featurePoints.map((point, index) => (
          <li key={index} className="hz-row hz-ai-start">
            <span className={`${bulletColor} hz-mr-2 hz-t-lg`}>•</span>
            <span className="hz-t-sm hz-fg-soft">{point.text}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FeatureCard;
