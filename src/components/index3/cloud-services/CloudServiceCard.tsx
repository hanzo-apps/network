
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";
import { Link } from "react-router-dom";

interface CloudServiceCardProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  isHovered: string | null;
  setIsHovered: (id: string | null) => void;
  color?: string;
}

const getColorClasses = (color: string = "purple", isHovered: boolean) => {
  const colorMap: Record<string, { bg: string, hoverBg: string, text: string, hoverText: string }> = {
    purple: { 
      bg: "hz-bg-surface", 
      hoverBg: "hz-bg-surface", 
      text: "hz-fg-muted", 
      hoverText: "hz-fg-muted" 
    },
    blue: { 
      bg: "hz-bg-surface", 
      hoverBg: "hz-bg-surface", 
      text: "hz-fg-muted", 
      hoverText: "hz-fg-muted" 
    },
    green: { 
      bg: "hz-bg-surface", 
      hoverBg: "hz-bg-surface", 
      text: "hz-fg-muted", 
      hoverText: "hz-fg-muted" 
    },
    teal: { 
      bg: "hz-bg-surface", 
      hoverBg: "hz-bg-surface", 
      text: "hz-fg-muted", 
      hoverText: "hz-fg-muted" 
    },
    amber: { 
      bg: "hz-bg-surface", 
      hoverBg: "hz-bg-surface", 
      text: "hz-fg-muted", 
      hoverText: "hz-fg-muted" 
    },
    indigo: { 
      bg: "hz-bg-surface", 
      hoverBg: "hz-bg-surface", 
      text: "hz-fg-muted", 
      hoverText: "hz-fg-muted" 
    },
    rose: { 
      bg: "hz-bg-surface", 
      hoverBg: "hz-bg-surface", 
      text: "hz-fg-muted", 
      hoverText: "hz-fg-muted" 
    },
    cyan: { 
      bg: "hz-bg-surface", 
      hoverBg: "hz-bg-surface", 
      text: "hz-fg-muted", 
      hoverText: "hz-fg-muted" 
    },
    gray: { 
      bg: "hz-bg-surface", 
      hoverBg: "hz-bg-surface", 
      text: "hz-fg-muted", 
      hoverText: "hz-fg-muted" 
    }
  };

  const colorClasses = colorMap[color] || colorMap.purple;
  
  return {
    bgClass: isHovered ? colorClasses.hoverBg : colorClasses.bg,
    textClass: isHovered ? colorClasses.hoverText : colorClasses.text
  };
};

const CloudServiceCard: React.FC<CloudServiceCardProps> = ({
  id,
  title,
  description,
  features,
  icon: Icon,
  isHovered,
  setIsHovered,
  color = "purple"
}) => {
  const isHoveredState = isHovered === id;
  const { bgClass, textClass } = getColorClasses(color, isHoveredState);
  
  const CardContent = (
    <>
      <div className={`hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4 hz-transition ${bgClass}`}>
        <Icon className={`hz-sq-4 hz-transition ${textClass}`} />
      </div>
      <ChromeText as="h3" className="hz-t-xl hz-w-bold hz-mb-2">
        {title}
      </ChromeText>
      <p className="hz-fg-soft hz-mb-4 hz-t-sm">
        {description}
      </p>
      <ul className="hz-desktop-only hz-fg-muted hz-stack-2 hz-t-xs hz-mt-auto">
        {features.slice(0, 2).map((feature, index) => (
          <li key={`${id}-feature-${index}`} className="hz-row hz-ai-start">
            <span className="hz-mr-2">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </>
  );

  const containerClasses = "hz-bg-surface hz-bordered hz-r-xl hz-p-3 hz-transition hz-h-full hz-row hz-col";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
      onMouseEnter={() => setIsHovered(id)}
      onMouseLeave={() => setIsHovered(null)}
    >
      {id === "more" ? (
        <Link to="/cloud" className={containerClasses}>
          {CardContent}
        </Link>
      ) : (
        <Link to={`/${id}`} className={containerClasses}>
          {CardContent}
        </Link>
      )}
    </motion.div>
  );
};

export default CloudServiceCard;
