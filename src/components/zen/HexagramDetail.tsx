
import React from "react";
import { motion } from "framer-motion";
import type { Hexagram } from "./data/ichingPrinciples";
import IChingHexagram from "./svg/IChingHexagram";

interface HexagramDetailProps {
  hexagram: Hexagram;
}

const HexagramDetail: React.FC<HexagramDetailProps> = ({ hexagram }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="hz-card hz-glass"
    >
      <div className="hz-row hz-ai-center hz-mb-4">
        <div className="hz-mr-4">
          <IChingHexagram lines={hexagram.lines} size={64} className="hz-fg" />
        </div>
        <div>
          <div className="hz-col-row hz-gap-2 hz-mb-2">
            <h3 className="hz-t-2xl hz-w-bold hz-fg">{hexagram.name}</h3>
            <span className="hz-t-xl hz-fg-muted">{hexagram.chineseName}</span>
            <span className="hz-t-sm hz-fg-muted">{hexagram.pinyin}</span>
          </div>
          <div className="hz-fg-muted hz-t-sm">Hexagram {hexagram.id}</div>
        </div>
      </div>
      
      <div className="hz-mt-4 hz-mb-5" />
      
      <p className="hz-fg-soft hz-mb-4">{hexagram.description || hexagram.principle}</p>
      
      <div className="hz-mt-4 hz-t-sm hz-fg-muted">
        Click on any hexagram in the grid to view its details
      </div>
    </motion.div>
  );
};

export default HexagramDetail;
