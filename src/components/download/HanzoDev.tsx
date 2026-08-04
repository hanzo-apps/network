
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Terminal, ArrowUp } from "lucide-react";

const HanzoDev = () => {
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
            For Developers
          </h2>
          
          <p className="hz-container-narrow hz-mw-md hz-t-xl hz-fg-soft hz-mb-6">
            Install Hanzo Dev directly in your terminal and supercharge your development workflow.
          </p>
          
          <div className="hz-row hz-jc-center hz-mb-6">
            <div className="hz-btn hz-btn-lg">
              <Terminal className="hz-sq-3 hz-fg-muted hz-mr-3" />
              <code className="hz-fg-soft hz-mono">pip install hanzo-dev</code>
              <Button variant="ghost" size="sm" className="hz-ml-4 hz-fg-muted hz-link">
                Copy
              </Button>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="hz-fg hz-px-6 hz-py-5 hz-r-lg hz-t-lg hz-w-medium hz-shadow-lg hz-transition"
          >
            <a href="/hanzodev">Learn More About Hanzo Dev</a>
          </Button>
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

export default HanzoDev;
