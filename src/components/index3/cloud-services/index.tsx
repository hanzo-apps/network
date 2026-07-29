
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CloudHeader from "./CloudHeader";
import CloudServiceGrid from "./CloudServiceGrid";
import GlobalNetwork from "./GlobalNetwork";
import BackgroundEffects from "./BackgroundEffects";
import CloudDeploymentAnimation from "@/components/animations/CloudDeploymentAnimation";

interface CloudServicesProps {
  onDeploymentEvent?: (message: string) => void;
}

const CloudServices: React.FC<CloudServicesProps> = ({ onDeploymentEvent }) => {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [scanPoints, setScanPoints] = useState<Array<{ x: number; y: number; active: boolean }>>([]);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  // Initialize grid points
  useEffect(() => {
    const points = [];
    const gridSize = 10;
    
    for (let i = 0; i < 30; i++) {
      points.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        active: false
      });
    }
    
    setScanPoints(points);
    
    // Gradually activate points over time
    points.forEach((_, index) => {
      setTimeout(() => {
        setScanPoints(prevPoints => {
          const newPoints = [...prevPoints];
          if (newPoints[index]) {
            newPoints[index] = { ...newPoints[index], active: true };
          }
          return newPoints;
        });
      }, 300 * index);
    });
  }, []);

  // Track mouse position for header effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - left,
          y: e.clientY - top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="cloud" 
      className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip"
    >
      <BackgroundEffects scanPoints={scanPoints} />
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <CloudHeader mousePosition={mousePosition} containerRef={containerRef} />
        
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-mb-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-col hz-jc-center"
          >
            <h3 className="hz-t-2xl hz-w-bold hz-mb-5 hz-fg">
              Intelligent Architecture Canvas
            </h3>
            <p className="hz-fg-soft hz-mb-6 hz-t-lg">
              Visually compose and deploy entire cloud architectures with our drag-and-drop canvas. 
              Connect services, configure dependencies, and deploy with a single click.
            </p>
            <ul className="hz-stack-4 hz-fg-muted">
              <li className="hz-row hz-ai-start">
                <div className="hz-mr-2 hz-mt-1 hz-fg-muted">•</div>
                <span>Automatic resource provisioning and configuration</span>
              </li>
              <li className="hz-row hz-ai-start">
                <div className="hz-mr-2 hz-mt-1 hz-fg-muted">•</div>
                <span>Real-time deployment status and monitoring</span>
              </li>
              <li className="hz-row hz-ai-start">
                <div className="hz-mr-2 hz-mt-1 hz-fg-muted">•</div>
                <span>AI-powered recommendations for optimizing your architecture</span>
              </li>
              <li className="hz-row hz-ai-start">
                <div className="hz-mr-2 hz-mt-1 hz-fg-muted">•</div>
                <span>Version control and rollback capabilities</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-row hz-ai-center hz-jc-center"
          >
            <div className="hz-container-narrow hz-mw-sm hz-w-full">
              <CloudDeploymentAnimation />
            </div>
          </motion.div>
        </div>
        
        <GlobalNetwork />
        
        <CloudServiceGrid isHovered={isHovered} setIsHovered={setIsHovered} />
      </div>
    </section>
  );
};

export default CloudServices;
