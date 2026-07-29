
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";
import { ArrowRight, LineChart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hz-rel hz-min-h-screen hz-row hz-ai-center hz-jc-center hz-px-4 hz-py-7 hz-clip">
      <div className="hz-abs hz-inset hz-bg hz-z-base" />
      
      {/* Animated dots/points background */}
      <div className="hz-abs hz-inset hz-clip hz-dim-more">
        {Array(20).fill(0).map((_, i) => (
          <motion.div
            key={i}
            className="hz-sq-1 hz-abs hz-r-full hz-bg-raised"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hz-mb-6 hz-align-center"
        >
          <div className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-5">
            AI-Powered Analytics for Next-Generation Growth
          </div>
          <ChromeText as="h1" className="hz-t-4xl hz-w-bold hz-tracking-tight hz-mb-5">
            Hanzo Analytics
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Precise, real-time insights into user behavior, product performance, and business outcomes, 
            enabling you to optimize faster, smarter, and at scale.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hz-col-row hz-gap-4 hz-jc-center hz-mt-6"
        >
          <Button size="lg" className="hz-t-lg hz-px-6 hz-border-none">
            <a href="#start-free-trial">Start Free Trial</a>
          </Button>
          <Button size="lg" variant="outline" className="hz-t-lg hz-px-6">
            <a href="#request-demo" className="hz-row hz-ai-center">
              Request Demo <ArrowRight className="hz-sq-3 hz-ml-2" />
            </a>
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hz-container-wide hz-mt-7 hz-rel"
        >
          <div className="hz-card hz-shadow-lg hz-clip">
            <div className="hz-row hz-ai-center hz-jc-between hz-mb-4 hz-border-b hz-pb-4">
              <div className="hz-row hz-ai-center">
                <LineChart className="hz-sq-3 hz-fg-muted hz-mr-2" />
                <span className="hz-fg hz-w-medium">Hanzo Analytics Dashboard</span>
              </div>
              <div className="hz-row hz-inline-1">
                <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
              </div>
            </div>
            <div className="hz-grid hz-grid-3 hz-gap-4">
              <div className="hz-span-2 hz-bg-raised hz-r-lg hz-p-4 hz-bh-8">
                {/* Animated chart lines */}
                <div className="hz-h-full hz-w-full hz-rel">
                  <div className="hz-abs hz-bottom-0 hz-left-0 hz-w-full hz-bg-raised"></div>
                  <div className="hz-abs hz-left-0 hz-top-0 hz-h-full hz-bg-raised"></div>
                  
                  {/* Chart line */}
                  <svg className="hz-h-full hz-w-full" viewBox="0 0 100 50">
                    <motion.path
                      d="M0,50 L10,40 L20,45 L30,35 L40,38 L50,25 L60,30 L70,20 L80,15 L90,10 L100,5"
                      fill="none"
                      stroke="#a3a3a3"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    <motion.path
                      d="M0,50 L10,42 L20,40 L30,38 L40,30 L50,32 L60,25 L70,28 L80,20 L90,18 L100,15"
                      fill="none"
                      stroke="#a3a3a3"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.8 }}
                    />
                  </svg>
                </div>
              </div>
              <div className="hz-stack-4">
                <div className="hz-bg-raised hz-r-lg hz-p-4">
                  <div className="hz-t-sm hz-fg-muted">Users</div>
                  <motion.div 
                    className="hz-t-2xl hz-w-bold hz-fg hz-mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    127,543
                  </motion.div>
                  <div className="hz-fg-muted hz-t-xs hz-mt-1">+12.4% vs last week</div>
                </div>
                <div className="hz-bg-raised hz-r-lg hz-p-4">
                  <div className="hz-t-sm hz-fg-muted">Conversion Rate</div>
                  <motion.div 
                    className="hz-t-2xl hz-w-bold hz-fg hz-mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    4.87%
                  </motion.div>
                  <div className="hz-fg-muted hz-t-xs hz-mt-1">+0.8% vs last week</div>
                </div>
                <div className="hz-bg-raised hz-r-lg hz-p-4">
                  <div className="hz-t-sm hz-fg-muted">Revenue</div>
                  <motion.div 
                    className="hz-t-2xl hz-w-bold hz-fg hz-mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    $45,892
                  </motion.div>
                  <div className="hz-fg-muted hz-t-xs hz-mt-1">+15.2% vs last week</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
