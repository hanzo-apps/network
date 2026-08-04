
import React, { useRef } from "react";
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
  onTitleAnimationComplete
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const titleVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.15
      }
    }
  };
  
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.25,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hz-mb-4 hz-align-center"
      >
        <div className="hz-px-4 hz-py-2 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-4">
          AI Engineering Platform
        </div>
      </motion.div>
      
      <motion.h1 
        ref={headingRef}
        className="hz-t-5xl hz-tracking-tight hz-w-medium hz-fg hz-pb-4"
        initial="hidden" 
        animate="visible" 
        variants={titleVariants} 
        onAnimationComplete={onAnimationComplete}
        style={{
          backgroundPosition: `${(mousePosition.x / (containerRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (containerRef.current?.offsetHeight || 1)) * 100}%`,
        }}
      >
        <motion.span className="hz-inline hz-ai-center chrome-text hz-w-bold hz-mb-4">
          Accelerating AI
        </motion.span>
        
        <motion.span 
          className="hz-fg hz-mt-5 hz-pb-4 chrome-text hz-w-bold" 
          initial="hidden" 
          animate={animationComplete ? "visible" : "hidden"} 
          variants={titleVariants} 
          onAnimationComplete={onTitleAnimationComplete}
        >
          For a Better Future
        </motion.span>
      </motion.h1>
    </>
  );
};

export default HeroTitle;
