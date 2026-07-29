
import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  delay?: number;
  color?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  features,
  delay = 0,
  color = "blue"
}) => {
  const colorClasses: Record<string, { bg: string, text: string, border: string }> = {
    blue: { 
      bg: "bg-neutral-800/20", 
      text: "text-neutral-400", 
      border: "border-neutral-800/50" 
    },
    purple: { 
      bg: "bg-neutral-800/20", 
      text: "text-neutral-400", 
      border: "border-neutral-800/50" 
    },
    green: { 
      bg: "bg-neutral-800/20", 
      text: "text-neutral-400", 
      border: "border-neutral-800/50" 
    },
    amber: { 
      bg: "bg-neutral-800/20", 
      text: "text-neutral-400", 
      border: "border-neutral-800/50" 
    },
    indigo: { 
      bg: "bg-neutral-800/20", 
      text: "text-neutral-400", 
      border: "border-neutral-800/50" 
    },
    cyan: { 
      bg: "bg-neutral-800/20", 
      text: "text-neutral-400", 
      border: "border-neutral-800/50" 
    },
    rose: { 
      bg: "bg-neutral-900/20", 
      text: "text-neutral-400", 
      border: "border-neutral-800/50" 
    },
  };

  const classes = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`${classes.bg} hz-bordered ${classes.border} hz-r-lg hz-p-5 hz-h-full`}
    >
      <div className="hz-row hz-ai-center hz-mb-4">
        <div className="hz-mr-3">
          <Icon className={`hz-sq-4 ${classes.text}`} />
        </div>
        <h3 className="hz-t-xl hz-w-semibold hz-fg">{title}</h3>
      </div>
      <p className="hz-fg-soft hz-mb-4">{description}</p>
      <ul className="hz-stack-2">
        {features.map((feature, index) => (
          <li key={index} className="hz-row hz-ai-start">
            <span className={`hz-mr-2 ${classes.text}`}>•</span>
            <span className="hz-fg-soft hz-t-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FeatureCard;
