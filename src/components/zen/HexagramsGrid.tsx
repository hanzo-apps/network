
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveHexagram, { HexagramDetails } from "./InteractiveHexagram";
import HexagramDetail from "./HexagramDetail";
import { ichingPrinciples } from "./data/ichingPrinciples";

interface HexagramsGridProps {
  title?: string;
  description?: string;
}

const HexagramsGrid: React.FC<HexagramsGridProps> = ({
  title = "The 64 Hexagrams",
  description = "Ancient wisdom for modern engineering"
}) => {
  const [selectedHexagram, setSelectedHexagram] = useState<HexagramDetails | null>(null);
  
  // Create a grid of 8x8 = 64 hexagrams
  const rows = 8;
  const columns = 8;
  
  const handleHexagramClick = (hexagram: HexagramDetails) => {
    setSelectedHexagram(hexagram);
  };
  
  return (
    <div className="hz-py-7" id="hexagrams">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hz-align-center hz-mb-7"
      >
        <h2 className="hz-t-3xl hz-w-bold hz-mb-4 hz-fg">{title}</h2>
        <p className="hz-container-narrow hz-t-lg hz-fg-muted">
          {description}
        </p>
        <div className="hz-bw-8 hz-bg-raised hz-mx-auto hz-mt-5"></div>
      </motion.div>
      
      <AnimatePresence mode="wait">
        {selectedHexagram && (
          <div className="hz-container-narrow hz-mb-6">
            <HexagramDetail hexagram={selectedHexagram} />
          </div>
        )}
      </AnimatePresence>
      
      <div className="hz-rel hz-px-4">
        <div className="hz-scroll-x">
          <div className="hz-grid hz-grid-6 hz-container-wide hz-card hz-gap-2">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <React.Fragment key={`row-${rowIndex}`}>
                {Array.from({ length: columns }).map((_, colIndex) => {
                  const index = rowIndex * columns + colIndex;
                  const hexagram = ichingPrinciples[index] || null;
                  
                  if (!hexagram) return <div key={`empty-${index}`} className=""></div>;
                  
                  return (
                    <InteractiveHexagram 
                      key={`hexagram-${hexagram.id}`}
                      hexagram={hexagram}
                      index={index}
                      onClick={handleHexagramClick}
                      isSelected={selectedHexagram?.id === hexagram.id}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="hz-mt-5 hz-align-center hz-t-sm hz-fg-muted">
          Click on a hexagram to view its meaning and principle
        </div>
      </div>
    </div>
  );
};

export default HexagramsGrid;
