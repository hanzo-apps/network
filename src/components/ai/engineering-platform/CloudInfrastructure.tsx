
import React from "react";
import { motion } from "framer-motion";
import { BrainCog, Cloud, Server, Database, Monitor, Network, Activity } from "lucide-react";

const CloudInfrastructure = () => {
  return (
    <div className="hz-rel hz-bh-8 hz-w-full hz-r-lg hz-clip">
      <div className="hz-abs hz-inset" style={{
        backgroundImage: "radial-gradient(rgba(128, 90, 213, 0.07) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}></div>
      
      <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center">
        <motion.div 
          className="hz-sq-8 hz-rel hz-r-lg hz-bg-surface hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center hz-z-header"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BrainCog className="hz-sq-5 hz-fg-muted" />
        </motion.div>
        
        {[...Array(6)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 6;
          const distance = 80;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          const icons = [
            <Cloud key={0} className="hz-sq-3 hz-fg-muted" />,
            <Server key={1} className="hz-sq-3 hz-fg-muted" />,
            <Database key={2} className="hz-sq-3 hz-fg-muted" />,
            <Monitor key={3} className="hz-sq-3 hz-fg-muted" />,
            <Network key={4} className="hz-sq-3 hz-fg-muted" />,
            <Activity key={5} className="hz-sq-3 hz-fg-muted" />
          ];
          
          return (
            <motion.div 
              key={i}
              className="hz-sq-7 hz-abs hz-r-lg hz-bg-surface hz-bordered hz-row hz-ai-center hz-jc-center"
              initial={{ 
                x: 0,
                y: 0,
                opacity: 0
              }}
              animate={{ 
                x,
                y,
                opacity: 1
              }}
              transition={{
                duration: 0.8,
                delay: 0.6 + (i * 0.1),
                ease: "easeOut"
              }}
              style={{
                left: "50%",
                top: "50%",
                marginLeft: -24,
                marginTop: -24
              }}
            >
              {icons[i]}
            </motion.div>
          );
        })}
        
        {/* Connection lines */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 6;
          
          return (
            <motion.div
              key={`line-${i}`}
              className="hz-abs hz-bh-1"
              style={{
                width: 80,
                transformOrigin: "left center",
                left: "50%",
                top: "50%",
                transform: `translateY(-0.5px) rotate(${angle}rad)`,
              }}
              initial={{
                scaleX: 0,
                opacity: 0
              }}
              animate={{
                scaleX: 1,
                opacity: 1
              }}
              transition={{
                duration: 0.8,
                delay: 0.5 + (i * 0.05)
              }}
            />
          );
        })}
        
        {/* Data particles */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 6;
          const distance = 80;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="hz-sq-1 hz-abs hz-r-full hz-bg-raised"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [0, Math.cos(angle) * distance],
                y: [0, Math.sin(angle) * distance],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                duration: 2.5,
                delay: 1.2 + (i * 0.3),
                repeat: Infinity,
                repeatDelay: i * 0.5
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CloudInfrastructure;
