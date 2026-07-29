
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroTitle from "@/components/hero/HeroTitle";

interface HeroSectionProps {
  onAnimationComplete: () => void;
  animationComplete: boolean;
  onTitleAnimationComplete: () => void;
  titleAnimationComplete: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onAnimationComplete,
  animationComplete,
  onTitleAnimationComplete,
  titleAnimationComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

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

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <section ref={containerRef} className="hz-pt-6 hz-pb-6 hz-px-4 hz-col hz-jc-center hz-rel">
      <motion.div
        style={{ scale, opacity }}
        className="hz-container-wide hz-align-center"
      >
        <HeroTitle 
          mousePosition={mousePosition}
          containerRef={containerRef}
          onAnimationComplete={onAnimationComplete}
          animationComplete={animationComplete}
          onTitleAnimationComplete={onTitleAnimationComplete}
        />

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: titleAnimationComplete ? 1 : 0, y: titleAnimationComplete ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hz-container-narrow hz-mt-5 hz-mb-6 hz-t-lg hz-fg-soft"
        >
          Your AI future belongs in your hands. With Hanzo, pioneer a new era of intelligence with customizable, private, transparent, and trusted AI solutions.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: titleAnimationComplete ? 1 : 0, y: titleAnimationComplete ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hz-mt-6 hz-row hz-wrap hz-jc-center hz-gap-4"
        >
          <Button 
            size="lg" 
            className="hz-bg-raised hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable"
            onClick={handleGetStarted}
          >
            Get Started for Free <ArrowRight className="hz-sq-3 hz-ml-2" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="hz-border-strong hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable"
            onClick={() => navigate('/platform')}
          >
            Explore Platform
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
