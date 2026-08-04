
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FeaturePoint {
  text: string;
}

interface ExpandableFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  featurePoints: FeaturePoint[];
  delay: number;
  iconBgClass: string;
  iconTextClass: string;
  bulletColor: string;
}

const ExpandableFeatureCard: React.FC<ExpandableFeatureCardProps> = ({
  icon,
  title,
  description,
  featurePoints,
  delay,
  iconBgClass,
  iconTextClass,
  bulletColor
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="hz-card hz-h-full"
    >
      <div className="hz-row hz-ai-center hz-jc-between hz-mb-4">
        <div className="hz-row hz-ai-center">
          <div className={`hz-sq-7 hz-r-lg ${iconBgClass} hz-row hz-ai-center hz-jc-center hz-mr-4`}>
            <div className={iconTextClass}>{icon}</div>
          </div>
          <h3 className="hz-t-xl hz-w-bold">{title}</h3>
        </div>
        <button 
          onClick={toggleExpand}
          className={`hz-sq-5 hz-r-full hz-row hz-ai-center hz-jc-center hz-transition ${isExpanded ? 'hz-bg-raised' : 'hz-bg-raised hz-hoverable'}`}
        >
          {isExpanded ? (
            <Minus className="hz-sq-2 hz-fg-soft" />
          ) : (
            <Plus className="hz-sq-2 hz-fg-soft" />
          )}
        </button>
      </div>
      
      <p className="hz-fg-soft hz-mb-4">{description}</p>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="hz-clip"
          >
            <div className="hz-pt-4 hz-border-t">
              <h4 className="hz-w-medium hz-fg hz-mb-3 hz-mt-3">Key Features:</h4>
              <ul className="hz-stack-2">
                {featurePoints.map((point, index) => (
                  <li key={index} className="hz-row hz-ai-start">
                    <span className={`${bulletColor} hz-mr-2 hz-t-lg`}>•</span>
                    <span className="hz-t-sm hz-fg-soft">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExpandableFeatureCard;
