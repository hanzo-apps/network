
import React from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import IChingHexagram from "./svg/IChingHexagram";
import TaijiSymbol from "./svg/TaijiSymbol";
import { ichingPrinciples } from "./data/ichingPrinciples";

interface IChingPrinciplesGridProps {
  title?: string;
  description?: string;
}

const IChingPrinciplesGrid: React.FC<IChingPrinciplesGridProps> = ({ 
  title = "The 88 Principles of AI", 
  description = "I Ching-inspired framework for AI engineering and design" 
}) => {
  // Create an 8x11 grid (88 principles)
  const rows = 11;
  const columns = 8;
  
  return (
    <div className="hz-mt-7 hz-mb-7">
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
      
      <div className="hz-rel">
        <div className="hz-abs">
          <TaijiSymbol size={60} className="hz-fg" />
        </div>
        
        <div className="hz-scroll-x">
          <div className="hz-grid hz-grid-6 hz-card hz-gap-4">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <React.Fragment key={`row-${rowIndex}`}>
                {Array.from({ length: columns }).map((_, colIndex) => {
                  const index = rowIndex * columns + colIndex;
                  const hexagram = ichingPrinciples[index] || null;
                  
                  if (!hexagram) return <div key={`empty-${index}`} className=""></div>;
                  
                  return (
                    <motion.div
                      key={`hexagram-${hexagram.id}`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (index % 16) * 0.05 }}
                      className="hz-col hz-ai-center hz-jc-center hz-p-2 hz-bordered hz-bg-surface hz-r-md hz-transition hz-pointer hz-hoverable"
                      title={`${hexagram.id}. ${hexagram.name} (${hexagram.chineseName} - ${hexagram.pinyin}): ${hexagram.principle}`}
                    >
                      <div className="hz-mb-2 hz-t-xs hz-fg-muted">{hexagram.id}</div>
                      <IChingHexagram lines={hexagram.lines} size={32} className="hz-fg hz-mb-2" />
                      <div className="hz-align-center hz-t-xs hz-fg-muted hz-transition hz-link">
                        {hexagram.chineseName}
                      </div>
                    </motion.div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="hz-mt-6 hz-align-center hz-t-sm hz-fg-muted">
          Hover over each hexagram to see its principle
        </div>
      </div>
    </div>
  );
};

export default IChingPrinciplesGrid;
