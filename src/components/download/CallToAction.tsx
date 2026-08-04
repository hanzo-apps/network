
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Apple, Chrome, Terminal } from "lucide-react";

const CallToAction = () => {
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
    <section ref={containerRef} className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      <div className="hz-abs hz-inset hz-dim-more"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div 
          className="hz-align-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="hz-t-3xl hz-w-bold hz-mb-5 hz-fg-soft"
            style={{
              backgroundPosition: `${(mousePosition.x / (containerRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (containerRef.current?.offsetHeight || 1)) * 100}%`,
            }}
          >
            Do everything 100x faster
          </h2>
          
          <p className="hz-container-narrow hz-mw-md hz-t-xl hz-fg-soft hz-mb-7">
            Hanzo AI lets models understand your desktop activity. Build faster.
          </p>
          
          <div className="hz-col-row hz-jc-center hz-gap-4 hz-mb-6">
            <Button 
              size="sm"
              className="hz-fg hz-shadow-lg hz-transition hz-row hz-ai-center"
            >
              <Apple className="hz-sq-2 hz-mr-2" />
              Download (Apple Silicon)
            </Button>
            <Button 
              size="sm"
              className="hz-fg hz-shadow-lg hz-transition hz-row hz-ai-center"
            >
              <Apple className="hz-sq-2 hz-mr-2" />
              Download (Intel Mac)
            </Button>
            <Button 
              size="sm"
              className="hz-fg hz-shadow-lg hz-transition hz-row hz-ai-center"
            >
              <ArrowDown className="hz-sq-2 hz-mr-2" />
              Download for Windows
            </Button>
          </div>
          
          <div className="hz-row hz-wrap hz-jc-center hz-gap-4 hz-mb-6">
            <Button 
              size="sm"
              variant="outline"
              className="hz-fg hz-hoverable"
            >
              <Chrome className="hz-sq-2 hz-mr-2" />
              Chrome Extension
            </Button>
            <Button 
              size="sm"
              variant="outline"
              className="hz-fg hz-hoverable"
            >
              <Chrome className="hz-sq-2 hz-mr-2" />
              Safari Extension
            </Button>
            <Button 
              size="sm"
              variant="outline"
              className="hz-fg hz-hoverable"
            >
              <Chrome className="hz-sq-2 hz-mr-2" />
              Firefox Add-on
            </Button>
            <Button 
              size="sm"
              variant="outline"
              className="hz-fg hz-hoverable"
            >
              <Chrome className="hz-sq-2 hz-mr-2" />
              Edge Extension
            </Button>
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

export default CallToAction;
