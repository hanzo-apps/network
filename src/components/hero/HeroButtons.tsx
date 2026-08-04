import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

interface HeroButtonsProps {
  titleAnimationComplete: boolean;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ titleAnimationComplete }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="hz-col-row hz-mt-7 hz-gap-4 hz-jc-center"
      style={{
        opacity: titleAnimationComplete ? 1 : 0,
        transform: titleAnimationComplete ? "translateY(0)" : "translateY(20px)",
        filter: titleAnimationComplete ? "blur(0px)" : "blur(8px)",
        transition: "opacity 0.4s ease, transform 0.4s ease, filter 0.4s ease",
        transitionDelay: "0.35s"
      }}
    >
      <Button 
        size="sm" 
        variant="outline" 
        radius="full"
        className="hz-fg hz-bg-none hz-bh-6 hz-hoverable"
      >
        <a href="/ai" className="chrome-text hz-row hz-ai-center">
          <Sparkles className="hz-sq-2 hz-mr-2" />
          Our models
        </a>
      </Button>
      <Button 
        size="sm" 
        radius="full"
        className="hz-bg-inverse hz-fg-inverse hz-bordered hz-border-strong hz-transition hz-bh-6 hz-hoverable"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a href="/zen" className="hz-row hz-ai-center">
          <Zap className="hz-sq-2 hz-mr-2" />
          Our principles
        </a>
      </Button>
    </div>
  );
};

export default HeroButtons;