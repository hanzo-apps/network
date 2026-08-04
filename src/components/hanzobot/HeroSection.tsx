
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Star, ArrowRight } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const HeroSection = () => {
  return (
    <section className="hz-pt-6 hz-pb-6 hz-px-4 hz-bg hz-rel hz-clip">
      <div className="hz-abs hz-inset"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hz-align-center"
        >
          <div className="hz-px-4 hz-py-1 hz-mb-5 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium">
            Multi-Agent Simulation Framework
          </div>
          
          <ChromeText as="h1" className="hz-t-5xl hz-w-bold hz-mb-5 hz-leading-tight">
            Hanzo Bot
          </ChromeText>
          
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            A powerful framework for creating, deploying, and managing autonomous AI agents.
            Build intelligent systems that can interact across multiple platforms while maintaining 
            consistent personalities and knowledge.
          </p>
          
          <div className="hz-row hz-wrap hz-jc-center hz-gap-4 hz-mb-6">
            <Button 
              size="lg"
              className="hz-fg hz-r-lg"
            >
              Get Started
              <ArrowRight className="hz-sq-3 hz-ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="hz-fg hz-bg-surface hz-hoverable"
            >
              <Github className="hz-sq-3 hz-mr-2" />
              GitHub
              <div className="hz-ml-2 hz-row hz-ai-center">
                <Star className="hz-sq-2 hz-fg-muted hz-mr-1" />
                <span className="hz-fg-soft hz-t-sm">Star</span>
              </div>
            </Button>
          </div>
          
          <div className="hz-fg-muted hz-t-sm">
            As seen powering 
            <a href="https://twitter.com/DegenSpartanAI" target="_blank" rel="noopener noreferrer" className="hz-fg-muted hz-link">@DegenSpartanAI</a> 
            and 
            <a href="https://twitter.com/aixvc_agent" target="_blank" rel="noopener noreferrer" className="hz-fg-muted hz-link">@aixvc_agent</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
