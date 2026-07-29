
import React from "react";
import { Cpu, HardDrive, Globe, CircuitBoard } from "lucide-react";
import { motion } from "framer-motion";
import { createAnimationVariant, curves } from "@/components/ui/animation-variants";

const cardAnimation = createAnimationVariant("fadeInBlur", {
  duration: 0.4,
  curve: curves.snappy,
  distance: 15
});

const ResourceBreakdown = () => {
  const resources = [
    {
      name: "Compute (CPU)",
      icon: <Cpu className="hz-sq-3" />,
      description: "CPU cost across all services",
      cost: "$0.0021 per vCPU/hour",
      percentage: 35
    },
    {
      name: "Memory (RAM)",
      icon: <CircuitBoard className="hz-sq-3" />,
      description: "Memory cost across all services",
      cost: "$0.0015 per GB/hour",
      percentage: 45
    },
    {
      name: "Storage",
      icon: <HardDrive className="hz-sq-3" />,
      description: "Persistent volume storage",
      cost: "$0.00015 per GB/hour",
      percentage: 15
    },
    {
      name: "Network Egress",
      icon: <Globe className="hz-sq-3" />,
      description: "Outbound data transfer",
      cost: "$0.10 per GB",
      percentage: 5
    }
  ];

  return (
    <motion.div 
      variants={cardAnimation}
      className="hz-card hz-clip"
    >
      <div className="hz-grid hz-grid-4 hz-gap-5">
        {resources.map((resource, index) => (
          <div 
            key={index} 
            className="hz-card"
          >
            <div className="hz-row hz-ai-center hz-gap-3 hz-mb-4">
              <div className="hz-fg-muted">
                {resource.icon}
              </div>
              <div className="hz-w-medium">{resource.name}</div>
            </div>
            
            <div className="hz-mb-4">
              <div className="hz-t-sm hz-fg-muted hz-mb-1">{resource.description}</div>
              <div className="hz-w-medium">{resource.cost}</div>
            </div>
            
            <div className="hz-w-full hz-bg-raised hz-r-full hz-bh-1">
              <div 
                className="hz-bg-raised hz-bh-1 hz-r-full" 
                style={{ width: `${resource.percentage}%` }}
              ></div>
            </div>
            <div className="hz-t-sm hz-fg-muted hz-mt-1">
              {resource.percentage}% of total cost
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResourceBreakdown;
