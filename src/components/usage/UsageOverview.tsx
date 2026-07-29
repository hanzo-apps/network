
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { createAnimationVariant, curves } from "@/components/ui/animation-variants";

interface UsageOverviewProps {
  dateRange: {
    start: string;
    end: string;
  };
  currentUsage: string;
  discounts: string;
  creditsUsed: string;
  estimatedCost: string;
  creditsAvailable: string;
  creditsRequired: string;
}

const cardAnimation = createAnimationVariant("fadeInBlur", {
  duration: 0.4,
  curve: curves.snappy,
  distance: 15
});

const UsageOverview = ({
  dateRange,
  currentUsage,
  discounts,
  creditsUsed,
  estimatedCost,
  creditsAvailable,
  creditsRequired
}: UsageOverviewProps) => {
  return (
    <motion.div 
      variants={cardAnimation}
      className="hz-r-lg hz-bordered hz-bg-surface hz-clip"
    >
      <div className="hz-p-5 hz-border-b">
        <h2 className="hz-t-xl hz-w-semibold hz-mb-1">
          {dateRange.start} to {dateRange.end} Credit Usage
        </h2>
      </div>
      
      <div className="hz-p-5">
        <div className="hz-grid hz-grid-2 hz-gap-6">
          <div className="hz-stack-4">
            <div className="hz-row hz-jc-between hz-ai-center">
              <span className="hz-fg-muted">Current Usage</span>
              <span>{currentUsage}</span>
            </div>
            <div className="hz-row hz-jc-between hz-ai-center">
              <span className="hz-fg-muted">Discounts</span>
              <span>{discounts}</span>
            </div>
            <div className="hz-row hz-jc-between hz-ai-center">
              <span className="hz-fg-muted">Credits Used</span>
              <span>{creditsUsed}</span>
            </div>
            <div className="hz-row hz-jc-between hz-ai-center">
              <span className="hz-fg-muted">Estimated Month's Cost</span>
              <span>{estimatedCost}</span>
            </div>
          </div>
          
          <div className="hz-bg-surface hz-r-lg hz-p-5 hz-col hz-ai-center hz-jc-center hz-align-center">
            <div className="hz-mb-2">
              <div className="hz-t-sm hz-fg-muted">Credits Available</div>
              <div className="hz-t-3xl hz-w-bold">{creditsAvailable}</div>
            </div>
            
            <div className="hz-mb-5">
              <div className="hz-t-sm hz-fg-muted">Est Credits Required</div>
              <div className="hz-t-3xl hz-w-bold hz-fg-muted">{creditsRequired}</div>
            </div>
            
            <Button 
              className="hz-bg-raised hz-fg hz-w-full hz-hoverable"
            >
              Purchase Credits
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UsageOverview;
