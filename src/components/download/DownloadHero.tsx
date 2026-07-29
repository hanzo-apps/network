
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Monitor, Apple } from "lucide-react";

const DownloadHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

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
    <section ref={containerRef} className="hz-pt-6 hz-pb-6 hz-px-4 hz-bg hz-rel hz-clip">
      <div className="hz-abs hz-inset hz-dim-more"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div 
          className="hz-align-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 
            className="hz-t-4xl hz-w-bold hz-mb-5 hz-fg-soft"
            style={{
              backgroundPosition: `${(mousePosition.x / (containerRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (containerRef.current?.offsetHeight || 1)) * 100}%`,
            }}
          >
            Everything you love about Hanzo,<br />
            across every app on your computer
          </h1>
          
          <p className="hz-container-narrow hz-mw-md hz-t-xl hz-fg-soft hz-mb-6">
            Your AI workspace for building AI products and AI-powered companies. Available on PC and Mac. Mobile coming soon.
          </p>
          
          <div className="hz-col-row hz-jc-center hz-gap-4 hz-mb-7">
            <Button 
              size="sm"
              className="hz-fg hz-shadow-lg hz-transition"
            >
              <Apple className="hz-sq-2 hz-mr-2" />
              Download (Apple Silicon)
            </Button>
            <Button 
              size="sm"
              className="hz-fg hz-shadow-lg hz-transition"
            >
              <Apple className="hz-sq-2 hz-mr-2" />
              Download (Intel Mac)
            </Button>
          </div>
          
          <div className="hz-container-narrow hz-r-lg hz-clip hz-shadow-lg hz-bordered">
            <div className="hz-rel hz-bh-1 hz-bg-surface">
              <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center">
                <Monitor className="hz-sq-8 hz-fg-muted" />
                <span className="hz-ml-2 hz-fg-muted">Video preview</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>
        {`
        .text-gradient-steel {
          background: linear-gradient(
            90deg,
            rgb(180, 180, 180),
            rgb(240, 240, 240),
            rgb(180, 180, 180)
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: shimmer 6s ease infinite;
          transition: background-position 0.3s ease;
        }
        
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
      </style>
    </section>
  );
};

export default DownloadHero;
