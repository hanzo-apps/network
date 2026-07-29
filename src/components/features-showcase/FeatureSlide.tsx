
import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureSlideProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  link: string;
  category?: 'ai-cloud' | 'dx-platform';
}

const FeatureSlide: React.FC<FeatureSlideProps> = ({
  title,
  description,
  icon: Icon,
  color,
  link,
  category
}) => {
  // Define category badge styles
  const getCategoryBadge = () => {
    if (!category) return null;
    
    const badgeStyles = {
      'ai-cloud': 'bg-neutral-800/30 border-neutral-500/30 text-neutral-300',
      'dx-platform': 'bg-neutral-800/30 border-neutral-500/30 text-neutral-300'
    };
    
    const badgeText = {
      'ai-cloud': 'AI Cloud',
      'dx-platform': 'DX Platform'
    };
    
    return (
      <div className={`hz-abs hz-px-2 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-bordered ${badgeStyles[category]}`}>
        {badgeText[category]}
      </div>
    );
  };

  return (
    <motion.div 
      className="hz-card feature-card hz-glass hz-rel"
      whileHover={{ 
        y: -5,
        borderColor: "rgba(163, 163, 163, 0.5)",
        boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.15)"
      }}
      transition={{ duration: 0.2 }}
    >
      {getCategoryBadge()}
      
      <div className={`hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-5 ${color} hz-transition`}>
        <Icon className="hz-sq-5 hz-fg" />
      </div>
      
      <h3 className="hz-t-xl hz-w-bold hz-mb-3 hz-fg">{title}</h3>
      
      <p className="hz-fg-soft hz-mb-5">
        {description}
      </p>
      
      <a 
        href={link} 
        className="hz-inline hz-ai-center hz-t-sm hz-fg-soft hz-transition hz-hoverable"
      >
        Learn More
        <svg 
          className="hz-sq-2 hz-ml-1 hz-transition" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </motion.div>
  );
};

export default FeatureSlide;
