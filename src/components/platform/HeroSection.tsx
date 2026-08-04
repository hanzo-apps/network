import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";
import { Github, Terminal, Download } from "lucide-react";

const HeroSection = () => {
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
    <section 
      ref={containerRef}
      className="hz-pt-6 hz-pb-6 hz-px-4 hz-rel hz-clip"
    >
      {/* Background elements */}
      <div className="hz-abs hz-inset hz-dim-more"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container-wide hz-align-center hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hz-mb-5"
        >
          <span className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium">
            Open Source
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hz-mb-6"
        >
          <ChromeText 
            as="h1" 
            className="hz-t-4xl hz-w-bold hz-mb-5"
            style={{
              backgroundPosition: `${(mousePosition.x / (containerRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (containerRef.current?.offsetHeight || 1)) * 100}%`,
            }}
          >
            Hanzo Platform
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            The free, forever, open-source version of our cloud infrastructure.
          </p>
          <p className="hz-container-narrow hz-t-lg hz-fg-muted hz-mb-6">
            Build locally, deploy anywhere. Hanzo Platform gives developers the same powerful experience as our cloud offering, but with the freedom to run it on your own hardware.
          </p>
          <p className="hz-container-narrow hz-t-lg hz-fg-muted hz-mb-7">
            Permissively licensed, community-driven, and built for the modern developer who values sovereignty and control over their stack.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hz-col-row hz-jc-center hz-gap-4"
        >
          <Button 
            size="lg"
            className="hz-btn hz-btn-lg hz-fg hz-shadow-lg hz-transition"
          >
            <Github className="hz-sq-3 hz-mr-2" />
            <a href="https://github.com/hanzo/platform" className="hz-grow">Get on GitHub</a>
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="hz-btn hz-btn-ghost hz-btn-lg hz-fg"
          >
            <Terminal className="hz-sq-3 hz-mr-2" />
            <span className="hz-grow">Quick Start</span>
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="hz-btn hz-btn-ghost hz-btn-lg hz-fg"
          >
            <Download className="hz-sq-3 hz-mr-2" />
            <span className="hz-grow">Download CLI</span>
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hz-mt-7 hz-px-4 hz-py-3 hz-bg-surface hz-r-lg"
        >
          <code className="hz-t-sm hz-fg-soft">
            npx @hanzo/cli create my-new-project
          </code>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
