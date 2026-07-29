
import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ExploreCardProps {
  title: string;
  description: string;
  link: string;
}

const ExploreCard: React.FC<ExploreCardProps> = ({
  title,
  description,
  link
}) => {
  return (
    <motion.div 
      className="hz-card feature-card hz-h-full hz-w-full hz-col hz-ai-center hz-glass"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <div className="hz-sq-8 hz-r-full hz-row hz-ai-center hz-jc-center hz-mb-4">
        <ArrowRight className="hz-sq-5 hz-fg" />
      </div>
      
      <h3 className="hz-t-xl hz-w-bold hz-mb-3 hz-fg hz-align-center">{title}</h3>
      
      <p className="hz-fg-soft hz-align-center hz-mb-5 hz-grow">
        {description}
      </p>
      
      <a 
        href={link} 
        className="hz-btn hz-gap-2 hz-fg hz-transition"
      >
        Explore Platform
        <ArrowRight className="hz-sq-2" />
      </a>
    </motion.div>
  );
};

export default ExploreCard;
