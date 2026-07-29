
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChromeText from "@/components/ui/chrome-text";

interface HeroProps {
  mousePosition: { x: number; y: number };
  opacity: any;
  scale: any;
}

const Hero: React.FC<HeroProps> = ({ mousePosition, opacity, scale }) => {
  const navigate = useNavigate();
  
  return (
    <section className="hz-rel hz-min-h-screen hz-col hz-jc-center hz-ai-center hz-px-4 hz-py-7 hz-clip">
      <motion.div 
        className="hz-container-wide hz-align-center hz-z-raised hz-rel"
        style={{ opacity, scale }}
      >
        {/* Floating orbs in background */}
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg" style={{ animationDelay: "1s" }}></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hz-mb-5"
        >
          <span className="hz-px-4 hz-py-2 hz-r-full hz-fg hz-t-sm hz-w-medium hz-bordered hz-border-strong">
            The Future of AI Development
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ChromeText 
            as="h1" 
            className="hz-t-5xl hz-w-bold hz-mb-5"
            style={{
              backgroundPosition: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
              backgroundSize: "200% 200%"
            }}
          >
            AI Cloud + DX Platform
          </ChromeText>
          
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mt-5 hz-leading-relaxed">
            Build, deploy, and scale AI applications with unmatched speed and efficiency.
            From development to production, Hanzo provides everything you need.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="hz-col-row hz-gap-4 hz-jc-center hz-mt-7"
        >
          <Button 
            size="lg" 
            className="hz-t-lg hz-px-6 hz-py-5 hz-border-none"
            onClick={() => navigate('/signup')}
          >
            Start Building <ArrowRight className="hz-sq-3 hz-ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="hz-t-lg hz-px-6 hz-py-5 hz-bg-overlay hz-glass hz-hoverable"
            onClick={() => navigate('/pricing')}
          >
            View Pricing
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hz-mt-7"
        >
          <div className="hz-row hz-jc-center">
            <ArrowRight className="hz-sq-6 hz-fg" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
