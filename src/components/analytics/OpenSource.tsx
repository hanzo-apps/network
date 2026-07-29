
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
      <div className="hz-abs hz-inset hz-bg-surface"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Open Source at Our Core</h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-6">
              Hanzo Analytics is fully open-source, fostering innovation and collaboration among thousands of global developers.
            </p>
            
            <div className="hz-grid hz-grid-3 hz-gap-5 hz-mb-6">
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
                  className="hz-align-center hz-p-4"
                  onViewportEnter={() => {
                    if (!isInView) {
                      setIsInView(true);
                    }
                  }}
                >
                  <div className="hz-row hz-jc-center hz-mb-2">{item.icon}</div>
                  <div className="hz-row hz-jc-center hz-ai-baseline">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: item.countUpDuration }}
                      className="hz-t-3xl hz-w-bold"
                    >
                      {isInView ? (
                        <CountUp end={item.value} duration={item.countUpDuration} />
                      ) : (
                        0
                      )}
                    </motion.span>
                    <span className="hz-t-3xl hz-w-bold">{item.suffix}</span>
                  </div>
                  <div className="hz-fg-muted hz-t-sm hz-mt-1">{item.label}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="hz-col-row hz-gap-4">
              <Button variant="outline" className="hz-row hz-ai-center hz-gap-2" size="sm">
                <Github className="hz-sq-2" />
                <a href="https://docs.hanzo.ai" target="_blank" rel="noopener noreferrer">
                  View Docs
                </a>
              </Button>
              <Button variant="outline" className="hz-row hz-ai-center hz-gap-2" size="sm">
                <Github className="hz-sq-2" />
                <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer">
                  View Repository
                </a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-r-lg hz-clip hz-bordered hz-shadow-lg"
          >
            <div className="hz-row hz-ai-center hz-p-4 hz-bg-surface hz-border-b">
              <div className="hz-row hz-inline-2 hz-mr-4">
                <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
              </div>
              <div className="hz-grow hz-align-center hz-fg-soft hz-t-sm">analytics.js</div>
            </div>
            
            <div className="hz-p-5 hz-align-left hz-mono hz-t-sm hz-fg-muted hz-scroll-x">
              <div className="hz-row">
                <div className="hz-mr-4 hz-fg-faint">1</div>
                <div>
                  <span className="hz-fg-muted">import</span> <span className="hz-fg-muted">{'{'}</span> <span className="hz-fg-soft">HanzoAnalytics</span> <span className="hz-fg-muted">{'}'}</span> <span className="hz-fg-muted">from</span> <span className="hz-fg-muted">'hanzo-analytics'</span>;
                </div>
              </div>
              <div className="hz-row">
                <div className="hz-mr-4 hz-fg-faint">2</div>
                <div></div>
              </div>
              <div className="hz-row">
                <div className="hz-mr-4 hz-fg-faint">3</div>
                <div><span className="hz-fg-muted">// Initialize analytics with your project ID</span></div>
              </div>
              <div className="hz-row">
                <div className="hz-mr-4 hz-fg-faint">4</div>
                <div>
                  <span className="hz-fg-muted">const</span> analytics <span className="hz-fg">=</span> <span className="hz-fg-muted">new</span> <span className="hz-fg-soft">HanzoAnalytics</span><span className="hz-fg">(</span><span className="hz-fg-muted">'YOUR_PROJECT_ID'</span><span className="hz-fg">);</span>
                </div>
              </div>
              <div className="hz-row">
                <div className="hz-mr-4 hz-fg-faint">5</div>
                <div></div>
              </div>
              <div className="hz-row">
                <div className="hz-mr-4 hz-fg-faint">6</div>
                <div><span className="hz-fg-muted">// Track page views automatically</span></div>
              </div>
              <div className="hz-row">
                <div className="hz-mr-4 hz-fg-faint">7</div>
                <div>
                  <span className="hz-fg">analytics.trackPageViews();</span>
                </div>
              </div>
              <div className="hz-row">
                <div className="hz-mr-4 hz-fg-faint">8</div>
                <div></div>
              </div>
              <div className="hz-row">
                <div className="hz-mr-4 hz-fg-faint">9</div>
                <div><span className="hz-fg-muted">// Track custom events</span></div>
              </div>
              <div className="hz-row">
                <div className="hz-mr-4 hz-fg-faint">10</div>
                <div>
                  <span className="hz-fg">analytics.track(</span><span className="hz-fg-muted">'button_click'</span><span className="hz-fg">, {'{'}</span>
                </div>
              </div>
              <div className="hz-row">
                <div className="hz-mr-4 hz-fg-faint">11</div>
                <div>
                  <span className="hz-fg">  buttonId: </span><span className="hz-fg-muted">'signup_button'</span><span className="hz-fg">,</span>
                </div>
              </div>
              <div className="hz-row">
                <div className="hz-mr-4 hz-fg-faint">12</div>
                <div>
                  <span className="hz-fg">  page: </span><span className="hz-fg-muted">'/home'</span>
                </div>
              </div>
              <div className="hz-row">
                <div className="hz-mr-4 hz-fg-faint">13</div>
                <div>
                  <span className="hz-fg">{'}'});</span>
                </div>
              </div>
            </div>
          </motion.div>
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
