
import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface BackgroundEffectsProps {
  scanPoints: Array<{ x: number; y: number; active: boolean }>;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ scanPoints }) => {
  return (
    <>
      {/* Background blur elements - subtle blue/cyan */}
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      {/* Grid pattern - very subtle */}
      <div className="hz-abs hz-inset hz-dim-more" style={{
        backgroundImage: "radial-gradient(rgba(100, 150, 200, 0.1) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}></div>
      
      {/* Background grid points - reduced quantity */}
      {scanPoints.filter((_, idx) => idx % 3 === 0).map((point, idx) => (
        <motion.div
          key={`point-${idx}`}
          className="hz-sq-1 hz-abs hz-r-full hz-bg-raised"
          style={{ 
            left: `${point.x}%`, 
            top: `${point.y}%` 
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: point.active ? [0, 0.4, 0.2] : 0,
            scale: point.active ? [0, 1.1, 1] : 0
          }}
          transition={{ 
            duration: 2.5,
            repeat: point.active ? Infinity : 0,
            repeatType: "loop",
            repeatDelay: 5
          }}
        />
      ))}
      
      {/* Network connection lines have been completely removed */}
    </>
  );
};

export default BackgroundEffects;
