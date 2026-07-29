
import React from "react";
import { motion } from "framer-motion";
import { Hexagram } from "./data/zenHexagrams";

interface HexagramCardProps {
  hexagram: Hexagram;
  index: number;
}

const HexagramCard: React.FC<HexagramCardProps> = ({ hexagram, index }) => {
  const Icon = hexagram.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="hz-card hz-glass hz-col hz-h-full hz-transition hz-card-interactive"
    >
      <div className="hz-row hz-ai-center hz-mb-5">
        <div className="hz-sq-7 hz-bg-raised hz-r-full hz-row hz-ai-center hz-jc-center hz-mr-4">
          <Icon className="hz-sq-4 hz-fg-muted" />
        </div>
        <div>
          <div className="hz-row hz-ai-center hz-gap-2">
            <h3 className="hz-t-2xl hz-w-bold hz-fg">{hexagram.id}. {hexagram.title}</h3>
            <span className="hz-t-xl hz-fg-soft">{hexagram.chineseTitle}</span>
          </div>
          <p className="hz-fg-soft hz-t-sm">{hexagram.pinyin} • {hexagram.category}</p>
        </div>
      </div>
      
      <p className="hz-fg-soft hz-mb-5">{hexagram.description}</p>
      
      <div className="hz-stack-4 hz-grow">
        {hexagram.principles.map((principle, i) => (
          <div key={i} className="hz-fg-soft hz-row hz-ai-start">
            <span className="hz-fg-muted hz-mr-2">•</span> 
            <span>{principle}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HexagramCard;
