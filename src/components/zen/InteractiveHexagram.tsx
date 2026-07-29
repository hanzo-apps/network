
import React, { useState } from "react";
import { motion } from "framer-motion";
import IChingHexagram from "./svg/IChingHexagram";

export interface HexagramDetails {
  id: string;
  name: string;
  chineseName: string;
  pinyin: string;
  lines: { type: 'solid' | 'broken' }[];
  principle: string;
  description?: string;
}

interface InteractiveHexagramProps {
  hexagram: HexagramDetails;
  index: number;
  onClick: (hexagram: HexagramDetails) => void;
  isSelected?: boolean;
}

const InteractiveHexagram: React.FC<InteractiveHexagramProps> = ({
  hexagram,
  index,
  onClick,
  isSelected = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className={`hz-p-3 hz-bordered ${isSelected ? 'hz-border-strong hz-bg-raised' : 'hz-bg-surface'} 
                 hz-r-md hz-pointer hz-transition hz-col hz-ai-center hz-jc-center hz-hoverable`}
      onClick={() => onClick(hexagram)}
      whileHover={{ y: -2 }}
    >
      <div className="hz-t-xs hz-fg-muted hz-mb-1">{hexagram.id}</div>
      <IChingHexagram 
        lines={hexagram.lines} 
        size={32} 
        className={`${isSelected ? 'hz-fg-muted' : 'hz-fg'} hz-mb-2`} 
      />
      <div className="hz-align-center hz-t-xs hz-fg-muted">
        {hexagram.chineseName}
      </div>
    </motion.div>
  );
};

export default InteractiveHexagram;
