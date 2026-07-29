
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ChromeText from "@/components/ui/chrome-text";
import { Server, Globe, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hz-rel hz-min-h-screen hz-row hz-ai-center hz-jc-center hz-px-4 hz-py-7 hz-clip">
      <div className="hz-abs hz-inset hz-bg" />
      
      {/* Enhanced background with subtle animated gradient */}
      <div className="hz-abs hz-inset hz-dim-more"></div>
      <div className="hz-abs hz-top-0 hz-left-0 hz-w-full hz-h-full hz-bg-surface hz-dim-more"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hz-mb-6 hz-align-center"
        >
          <div className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-5">
            Hanzo Cloud - Built for Production
          </div>
          <ChromeText as="h1" className="hz-t-4xl hz-w-bold hz-tracking-tight hz-mb-5">
            A High-Performance Cloud 
            <span className="hz-mt-2">Optimized for AI Workloads</span>
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Powering over 100 award-winning AI products with global infrastructure that scales from prototype to planet-scale. Deploy in seconds with zero configuration and scale limitlessly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hz-col-row hz-gap-4 hz-jc-center hz-mt-6"
        >
          <Button size="lg" className="hz-t-lg hz-px-6 hz-border-none">
            <a href="https://dashboard.hanzo.cloud">Deploy Now</a>
          </Button>
          
          <Button 
            variant="outline"
            size="lg" 
            className="hz-t-lg hz-px-6 hz-fg hz-border-strong hz-hoverable"
          >
            <a href="/platform">Try Open Source</a>
          </Button>
        </motion.div>
        
        {/* Added feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hz-grid hz-grid-3 hz-container-narrow hz-mt-7 hz-gap-6"
        >
          <div className="hz-card hz-align-center">
            <Server className="hz-sq-5 hz-fg-muted hz-mx-auto hz-mb-4" />
            <h3 className="hz-t-lg hz-w-semibold hz-mb-2">Global Infrastructure</h3>
            <p className="hz-fg-muted hz-t-sm">35+ regions worldwide for ultra-low latency at the edge</p>
          </div>
          
          <div className="hz-card hz-align-center">
            <Zap className="hz-sq-5 hz-fg-muted hz-mx-auto hz-mb-4" />
            <h3 className="hz-t-lg hz-w-semibold hz-mb-2">Instant Deployment</h3>
            <p className="hz-fg-muted hz-t-sm">Deploy in seconds with push-button simplicity</p>
          </div>
          
          <div className="hz-card hz-align-center">
            <Globe className="hz-sq-5 hz-fg-muted hz-mx-auto hz-mb-4" />
            <h3 className="hz-t-lg hz-w-semibold hz-mb-2">AI-Optimized</h3>
            <p className="hz-fg-muted hz-t-sm">Purpose-built for complex AI workloads and inference</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hz-grid hz-grid-6 hz-mt-7 hz-gap-5 hz-align-center"
        >
          <a href="#security" className="hz-fg-muted hz-transition hz-link">Security</a>
          <a href="#infra-log" className="hz-fg-muted hz-transition hz-link">Infra Log</a>
          <a href="https://docs.hanzo.cloud" className="hz-fg-muted hz-transition hz-link">Docs</a>
          <a href="https://community.hanzo.cloud" className="hz-fg-muted hz-transition hz-link">Community</a>
          <a href="https://status.hanzo.cloud" className="hz-fg-muted hz-transition hz-link">Status</a>
          <a href="/pricing" className="hz-fg-muted hz-transition hz-link">Pricing</a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
