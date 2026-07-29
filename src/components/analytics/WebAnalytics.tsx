
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { LineChart, Users, Filter, Layers, Activity } from "lucide-react";

const features = [
  { 
    icon: <Activity />,
    title: "Real-Time Data", 
    description: "Instantly track live user actions and site performance."
  },
  { 
    icon: <Users />,
    title: "User Journeys", 
    description: "Visualize complete paths users take within your site or app."
  },
  {
    icon: <Layers />,
    title: "Funnels & Retention", 
    description: "Analyze user conversion and retention metrics with clarity."
  },
  { 
    icon: <LineChart />,
    title: "Event Tracking", 
    description: "Capture user interactions, from clicks to complex events."
  },
  { 
    icon: <Filter />,
    title: "Powerful Segmentation", 
    description: "Deeply filter and segment your data by geography, platform, and more."
  }
];

const WebAnalytics = () => {
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationTriggered) {
          controls.start("");
          setAnimationTriggered(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (chartRef.current) {
      observer.observe(chartRef.current);
    }
    
    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, [controls, animationTriggered]);

  const lineVariants = {
    initial: {
      pathLength: 0
    },
    animate: {
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const dataPointVariants = {
    initial: {
      opacity: 0,
      scale: 0
    },
    animate: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.5 + i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel">
      <div className="hz-abs hz-inset hz-dim-more"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Comprehensive Web Analytics</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Hanzo Analytics delivers real-time insights into every interaction, from clicks to conversions.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-mb-7">
          <div className="hz-stack-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hz-row"
              >
                <div className="hz-mr-4 hz-mt-1 hz-bg-raised hz-p-2 hz-r-lg hz-fg-muted">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="hz-t-xl hz-w-bold hz-fg hz-mb-2">{feature.title}</h3>
                  <p className="hz-fg-muted">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hz-rel"
            ref={chartRef}
          >
            <div className="hz-card">
              <div className="hz-row hz-jc-between hz-ai-center hz-mb-4">
                <h3 className="hz-t-lg hz-w-medium">Live User Activity</h3>
                <div className="hz-sq-1 hz-bg-raised hz-r-full"></div>
              </div>
              
              <div className="hz-bh-8 hz-w-full hz-rel">
                {/* Chart grid */}
                <div className="hz-grid hz-grid-6 hz-abs hz-inset">
                  {Array(30).fill(0).map((_, i) => (
                    <div key={i} className="hz-border-b hz-border-r hz-dim-more"></div>
                  ))}
                </div>
                
                {/* Chart area */}
                <div className="hz-abs hz-inset hz-p-4">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Chart lines */}
                    <motion.path
                      d="M0,80 C10,70 20,85 30,60 C40,40 50,55 60,30 C70,40 80,20 90,10 L100,20"
                      stroke="#a3a3a3"
                      strokeWidth="2"
                      fill="none"
                      variants={lineVariants}
                      initial="initial"
                      animate={controls}
                    />
                    <motion.path
                      d="M0,90 C15,80 25,75 35,70 C45,65 55,60 65,50 C75,70 85,60 95,40 L100,50"
                      stroke="#a3a3a3"
                      strokeWidth="2"
                      fill="none"
                      variants={lineVariants}
                      initial="initial"
                      animate={controls}
                    />
                    
                    {/* Data points */}
                    {[
                      { x: 30, y: 60, color: "#a3a3a3" },
                      { x: 60, y: 30, color: "#a3a3a3" },
                      { x: 90, y: 10, color: "#a3a3a3" },
                      { x: 35, y: 70, color: "#a3a3a3" },
                      { x: 65, y: 50, color: "#a3a3a3" },
                      { x: 95, y: 40, color: "#a3a3a3" }
                    ].map((point, i) => (
                      <motion.circle
                        key={i}
                        cx={point.x}
                        cy={point.y}
                        r="2"
                        fill={point.color}
                        custom={i}
                        variants={dataPointVariants}
                        initial="initial"
                        animate={controls}
                      />
                    ))}
                  </svg>
                </div>
                
                {/* Tooltip */}
                <motion.div
                  className="hz-abs hz-bg-raised hz-r-md hz-p-2 hz-t-xs hz-bw-8 hz-shadow-lg hz-bordered"
                  style={{ top: "30%", left: "60%" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={controls}
                  variants={{
                    animate: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 2, duration: 0.3 }
                    }
                  }}
                >
                  <div className="hz-row hz-jc-between">
                    <span>Pageviews</span>
                    <span className="hz-w-bold">1,240</span>
                  </div>
                  <div className="hz-row hz-jc-between hz-mt-1">
                    <span>Users</span>
                    <span className="hz-w-bold">876</span>
                  </div>
                  <div className="hz-fg-muted hz-align-right hz-mt-1">+24.5%</div>
                </motion.div>
              </div>
              
              <div className="hz-row hz-jc-between hz-t-sm hz-fg-muted hz-mt-2">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WebAnalytics;
