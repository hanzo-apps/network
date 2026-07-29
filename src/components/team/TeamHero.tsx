import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Zap, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TeamHero = () => {
  return (
    <section className="hz-rel hz-row hz-ai-center hz-pt-6 hz-pb-6 hz-px-4 hz-clip">
      {/* Background elements */}
      <div className="hz-abs hz-inset hz-bg hz-z-base">
        <div className="hz-abs hz-inset hz-dim-more"></div>
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg" style={{ animationDelay: "1s" }}></div>
        
        {/* Animated grid */}
        <div className="hz-abs hz-inset hz-dim-more">
          <div className="hz-h-full hz-w-full" style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px' 
          }} />
        </div>
      </div>

      <div className="hz-container hz-rel hz-z-raised hz-w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hz-col hz-align-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge 
              variant="outline" 
              className="hz-bg-raised hz-border-strong hz-fg-soft hz-self-center hz-mb-5 hz-px-4 hz-py-2 hz-t-sm"
            >
              AI + Human Integration
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hz-t-4xl hz-w-bold hz-mb-5 hz-tracking-tight"
          >
            Meet your <span className="hz-chrome">AI Team</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6"
          >
            Autonomous AI agents working seamlessly alongside humans. 
            Train them with a simple Zoom call, monitor their work in real-time, 
            and benefit from enterprise-grade security and audit features.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hz-row hz-wrap hz-jc-center hz-gap-4 hz-mb-7"
          >
            <Button 
              size="lg" 
              className="hz-r-lg"
            >
              Get Started
              <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="hz-bg-overlay hz-fg hz-r-lg hz-hoverable"
            >
              Watch Demo
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hz-row hz-wrap hz-jc-center hz-inline-4 hz-mt-6"
          >
            <motion.div 
              className="hz-col hz-ai-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="hz-card hz-card-tight hz-mb-3">
                <BrainCircuit className="hz-sq-4 hz-fg-muted" />
              </div>
              <span className="hz-t-sm hz-fg-soft">AI-Powered</span>
            </motion.div>
            
            <motion.div 
              className="hz-col hz-ai-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="hz-card hz-card-tight hz-mb-3">
                <Users className="hz-sq-4 hz-fg-muted" />
              </div>
              <span className="hz-t-sm hz-fg-soft">Human Integration</span>
            </motion.div>
            
            <motion.div 
              className="hz-col hz-ai-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="hz-card hz-card-tight hz-mb-3">
                <Zap className="hz-sq-4 hz-fg-muted" />
              </div>
              <span className="hz-t-sm hz-fg-soft">Enterprise Ready</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="hz-center-x hz-abs hz-row hz-inline-2">
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="hz-bw-1 hz-bh-5 hz-r-full hz-dim"
        />
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="hz-bw-1 hz-bh-4 hz-r-full hz-dim-more"
        />
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1.5,
            delay: 0.4,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="hz-bw-1 hz-bh-2 hz-r-full hz-dim-more"
        />
      </div>
    </section>
  );
};

export default TeamHero;