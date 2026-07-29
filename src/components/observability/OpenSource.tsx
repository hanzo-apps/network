
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Star, Download, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const statsItems = [
  { 
    icon: <Download className="hz-sq-4 hz-fg-muted" />,
    value: 17,
    suffix: "M+",
    label: "Downloads",
    countUpDuration: 2
  },
  { 
    icon: <Star className="hz-sq-4 hz-fg-muted" />,
    value: 25,
    suffix: "K+",
    label: "GitHub Stars",
    countUpDuration: 2.2
  },
  { 
    icon: <Users className="hz-sq-4 hz-fg-muted" />,
    value: 280,
    suffix: "+",
    label: "Contributors",
    countUpDuration: 1.8
  }
];

const OpenSource = () => {
  const [isInView, setIsInView] = useState(false);
  
  return (
    <section className="hz-py-7 hz-px-4 hz-rel">
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <div className="hz-inline hz-ai-center hz-jc-center hz-mb-5 hz-bg-raised hz-p-3 hz-r-full">
            <Github className="hz-sq-5 hz-fg-muted" />
          </div>
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Proudly Open Source</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Transparency is at the core of Hanzo Observability. Deploy it locally, self-host on your own infrastructure, or leverage our managed cloud solution.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-5 hz-mb-7">
          {statsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1
                }
              }}
              viewport={{ once: true }}
              className="hz-card hz-align-center"
              onViewportEnter={() => {
                if (!isInView) {
                  setIsInView(true);
                }
              }}
            >
              <div className="hz-row hz-jc-center hz-mb-3">{item.icon}</div>
              <div className="hz-row hz-jc-center hz-ai-baseline">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: item.countUpDuration }}
                  className="hz-t-4xl hz-w-bold"
                >
                  {isInView ? (
                    <CountUp end={item.value} duration={item.countUpDuration} />
                  ) : (
                    0
                  )}
                </motion.span>
                <span className="hz-t-4xl hz-w-bold">{item.suffix}</span>
              </div>
              <div className="hz-fg-muted hz-mt-2">{item.label}</div>
            </motion.div>
          ))}
        </div>
        
        <div className="hz-row hz-jc-center hz-gap-4">
          <Button variant="outline" size="lg" className="hz-fg hz-hoverable">
            <Github className="hz-sq-3 hz-mr-2" /> Read Documentation
          </Button>
          <Button variant="outline" size="lg" className="hz-fg hz-hoverable">
            <Github className="hz-sq-3 hz-mr-2" /> View GitHub Repository
          </Button>
        </div>
      </div>
    </section>
  );
};

// Simple CountUp component
const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);
  
  return <>{count}</>;
};

export default OpenSource;
