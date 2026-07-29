
import React from "react";
import { motion } from "framer-motion";

interface HeroTitleProps {
  mousePosition: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement>;
  onAnimationComplete: () => void;
  animationComplete: boolean;
  onTitleAnimationComplete: () => void;
}

const HeroTitle: React.FC<HeroTitleProps> = ({
  mousePosition,
  containerRef,
  onAnimationComplete,
  animationComplete,
  onTitleAnimationComplete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={() => {
        onAnimationComplete();
        onTitleAnimationComplete();
      }}
    >
      <div className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-5">
        Open Source AI Engineering Platform
      </div>
      
      <h1 className="hz-t-5xl hz-w-bold hz-mb-5 hz-leading-tight">
        <span className="hz-chrome">
          Build As Fast
        </span>
        <br />
        <span 
          className="hz-chrome"
          style={{
            backgroundPosition: `${(mousePosition.x / (containerRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (containerRef.current?.offsetHeight || 1)) * 100}%`,
          }}
        >
          As You Think
        </span>
      </h1>
    </motion.div>
  );
};

export default HeroTitle;
