
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FeatureSlide } from "./";
import ExploreCard from "./ExploreCard";
import { useHorizontalScroll } from "./hooks/useHorizontalScroll";
import { Feature } from "./data/features";

interface FeatureShowcaseSliderProps {
  features: Feature[];
}

const FeatureShowcaseSlider: React.FC<FeatureShowcaseSliderProps> = ({ features }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { 
    handleMouseDown, 
    handleMouseUp, 
    handleMouseMove 
  } = useHorizontalScroll({ containerRef });

  // Add arrow navigation for better accessibility
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  // Make sure touch devices can also scroll properly
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const startX = touch.clientX;
      let startScrollLeft = container.scrollLeft;
      
      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const x = touch.clientX;
        const walk = (startX - x) * 2;
        container.scrollLeft = startScrollLeft + walk;
        e.preventDefault();
      };
      
      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    };

    container.addEventListener('touchstart', handleTouchStart);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <div className="feature-slide-container hz-rel">
      {/* Add navigation buttons */}
      <button 
        onClick={scrollLeft}
        className="hz-desktop-only hz-row hz-center-y hz-abs hz-left-0 hz-z-raised hz-bg-surface hz-fg hz-r-full hz-p-2 hz-shadow-lg hz-ml-4 hz-hoverable"
        aria-label="Scroll left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      
      <div 
        ref={containerRef}
        className="hz-row hz-gap-5 hz-pb-6 hz-scroll-x feature-scroll-container"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {features.map((feature, index) => {
          // Check if this is the last feature (Explore Platform card)
          const isLastFeature = index === features.length - 1;
          
          return (
            <motion.div 
              key={index} 
              className="hz-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.05 }}
            >
              {isLastFeature ? (
                <ExploreCard
                  title={feature.title}
                  description={feature.description}
                  link={feature.link}
                />
              ) : (
                <FeatureSlide
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  color={feature.color}
                  link={feature.link}
                />
              )}
            </motion.div>
          );
        })}
      </div>
      
      <button 
        onClick={scrollRight}
        className="hz-desktop-only hz-row hz-center-y hz-abs hz-right-0 hz-z-raised hz-bg-surface hz-fg hz-r-full hz-p-2 hz-shadow-lg hz-mr-4 hz-hoverable"
        aria-label="Scroll right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      
      <div className="hz-row hz-jc-center hz-mt-5 hz-gap-2">
        <div className="hz-bg-raised hz-bh-1 hz-bw-8 hz-r-full hz-clip">
          <div className="hz-bg-raised hz-h-full hz-r-full"></div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcaseSlider;
