
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
      bg: "bg-neutral-800/30", 
      hoverBg: "bg-neutral-600/30", 
      text: "text-neutral-400", 
      hoverText: "text-neutral-300" 
    },
    blue: { 
      bg: "bg-neutral-800/30", 
      hoverBg: "bg-neutral-600/30", 
      text: "text-neutral-400", 
      hoverText: "text-neutral-300" 
    },
    green: { 
      bg: "bg-neutral-800/30", 
      hoverBg: "bg-neutral-600/30", 
      text: "text-neutral-400", 
      hoverText: "text-neutral-300" 
    },
    teal: { 
      bg: "bg-neutral-800/30", 
      hoverBg: "bg-neutral-600/30", 
      text: "text-neutral-400", 
      hoverText: "text-neutral-300" 
    },
    amber: { 
      bg: "bg-neutral-800/30", 
      hoverBg: "bg-neutral-600/30", 
      text: "text-neutral-400", 
      hoverText: "text-neutral-300" 
    },
    indigo: { 
      bg: "bg-neutral-800/30", 
      hoverBg: "bg-neutral-600/30", 
      text: "text-neutral-400", 
      hoverText: "text-neutral-300" 
    },
    rose: { 
      bg: "bg-neutral-900/30", 
      hoverBg: "bg-neutral-600/30", 
      text: "text-neutral-400", 
      hoverText: "text-neutral-300" 
    },
    cyan: { 
      bg: "bg-neutral-800/30", 
      hoverBg: "bg-neutral-600/30", 
      text: "text-neutral-400", 
      hoverText: "text-neutral-300" 
    },
    gray: { 
      bg: "bg-gray-900/30", 
      hoverBg: "bg-gray-700/30", 
      text: "text-neutral-400", 
      hoverText: "text-neutral-300" 
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

  const containerClasses = "bg-gray-900/20 border border-gray-800 rounded-xl p-6 group hover:bg-gray-900/30 transition-colors h-full flex flex-col";

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
