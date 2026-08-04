
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import HeroTitle from "@/components/hero/HeroTitle";
import HeroDescription from "@/components/hero/HeroDescription";
import HeroButtons from "@/components/hero/HeroButtons";
import HeroFeatures from "@/components/hero/HeroFeatures";
import { GridLines, BlueprintLine, ArchitecturalBox } from "@/components/ui/architectural-elements";

const Hero = () => {
  const { toast } = useToast();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="hz-rel hz-min-h-screen hz-row hz-ai-center hz-jc-center hz-clip">
      <div className="hz-abs hz-inset hz-bg" />

      {/* Architectural grid background with minimal opacity */}
      <GridLines spacing={50} opacity={0.03} />
      
      {/* Blueprint lines with minimal opacity */}
      <BlueprintLine orientation="horizontal" position="15%" color="rgba(200, 200, 200, 0.03)" />
      <BlueprintLine orientation="horizontal" position="85%" color="rgba(200, 200, 200, 0.03)" />
      <BlueprintLine orientation="vertical" position="15%" color="rgba(200, 200, 200, 0.03)" />
      <BlueprintLine orientation="vertical" position="85%" color="rgba(200, 200, 200, 0.03)" />
      
      {/* Background subtle gradient effects */}
      <div className="hz-abs hz-inset">
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
        <div className="hz-sq-8 hz-abs hz-bottom-0 hz-right-0 hz-bg-raised hz-r-full hz-blur-bg"></div>
      </div>

      <div className="hz-container hz-rel hz-z-raised hz-py-7 hz-w-full">
        <ArchitecturalBox 
          className="hz-align-center hz-bg-none hz-p-4 hz-mx-auto"
          showCorners={true}
          showGrid={false}
          cornerSize={40}
          cornerColor="rgba(200, 200, 200, 0.05)"
        >
          <HeroTitle 
            mousePosition={mousePosition}
            containerRef={containerRef}
            onAnimationComplete={() => setAnimationComplete(true)}
            animationComplete={animationComplete}
            onTitleAnimationComplete={() => setTitleAnimationComplete(true)}
          />

          <HeroDescription titleAnimationComplete={titleAnimationComplete} />

          <div className="hz-row hz-jc-center">
            <HeroButtons titleAnimationComplete={titleAnimationComplete} />
          </div>
          
          <div className="hz-mt-7">
            <HeroFeatures titleAnimationComplete={titleAnimationComplete} />
          </div>
        </ArchitecturalBox>
      </div>
    </div>
  );
};

export default Hero;
