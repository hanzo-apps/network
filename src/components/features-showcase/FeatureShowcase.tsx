
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import FeatureShowcaseHeader from "./FeatureShowcaseHeader";
import FeatureShowcaseSlider from "./FeatureShowcaseSlider";
import { features, aiCloudFeatures_export, dxPlatformFeatures_export } from "./data/features";
import { Button } from "@/components/ui/button";

const FeatureShowcase: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [maxScrollDistance, setMaxScrollDistance] = useState(0);
  const [activeTab, setActiveTab] = useState<'all' | 'ai-cloud' | 'dx-platform'>('all');
  const [activeFeatures, setActiveFeatures] = useState(features);

  useEffect(() => {
    // Update displayed features based on selected tab
    switch (activeTab) {
      case 'ai-cloud':
        setActiveFeatures([...aiCloudFeatures_export, features[features.length - 1]]);
        break;
      case 'dx-platform':
        setActiveFeatures([...dxPlatformFeatures_export, features[features.length - 1]]);
        break;
      default:
        setActiveFeatures(features);
    }
  }, [activeTab]);

  useEffect(() => {
    const calculateMaxScroll = () => {
      // Calculate the total width of all cards (including gap) minus the visible area
      // Adding extra buffer space to ensure all cards are visible
      const totalWidth = (activeFeatures.length * 350) + 100; // Each card is 350px wide + extra buffer
      const visibleWidth = window.innerWidth - 100; // Subtract some padding
      const newMaxScroll = Math.max(0, totalWidth - visibleWidth);
      setMaxScrollDistance(newMaxScroll);
    };

    calculateMaxScroll();
    window.addEventListener('resize', calculateMaxScroll);
    
    return () => {
      window.removeEventListener('resize', calculateMaxScroll);
    };
  }, [activeFeatures]);

  // Scroll animation values
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  // Modified horizontal scroll to show full content
  // Use a lower end value to prevent scrolling too far
  const x = useTransform(
    scrollYProgress, 
    [0.2, 0.8], 
    [0, -maxScrollDistance * 0.85] // Only scroll to 85% of max to ensure more content is visible
  ); 

  return (
    <section className="hz-py-7 hz-bg hz-rel hz-clip" id="features-showcase" ref={scrollRef}>
      <div className="hz-abs hz-inset hz-z-behind">
        <div className="hz-abs hz-inset"></div>
      </div>
      
      <motion.div 
        className="hz-container hz-px-4 hz-mx-auto"
        style={{ opacity, y }}
      >
        <FeatureShowcaseHeader />
        
        <div className="hz-row hz-jc-center hz-mb-6">
          <div className="hz-inline hz-r-full hz-bg-surface hz-p-2 hz-glass">
            <Button
              variant={activeTab === 'all' ? 'default' : 'ghost'}
              className={`hz-r-full hz-px-5 ${activeTab === 'all' ? 'hz-bg-raised hz-hoverable' : 'hz-fg-soft hz-hoverable'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </Button>
            <Button
              variant={activeTab === 'ai-cloud' ? 'default' : 'ghost'}
              className={`hz-r-full hz-px-5 ${activeTab === 'ai-cloud' ? 'hz-bg-raised hz-hoverable' : 'hz-fg-soft hz-hoverable'}`}
              onClick={() => setActiveTab('ai-cloud')}
            >
              AI Cloud
            </Button>
            <Button
              variant={activeTab === 'dx-platform' ? 'default' : 'ghost'}
              className={`hz-r-full hz-px-5 ${activeTab === 'dx-platform' ? 'hz-bg-raised hz-hoverable' : 'hz-fg-soft hz-hoverable'}`}
              onClick={() => setActiveTab('dx-platform')}
            >
              DX Platform
            </Button>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ x }}
            className="" // Ensure content doesn't get clipped
          >
            <FeatureShowcaseSlider features={activeFeatures} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default FeatureShowcase;
