
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, DollarSign, CreditCard, Zap } from "lucide-react";

const CommerceAnalytics = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  return (
    <section 
      ref={sectionRef}
      className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip"
    >
      {/* Background gradient */}
      <div className="hz-abs hz-inset hz-dim-more"></div>
      
      {/* Content */}
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Commerce-Focused Analytics</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Optimize your sales funnel and boost revenue with insights designed specifically for commerce.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-2 hz-gap-7">
          <div className="hz-stack-6">
            {[
              {
                icon: <Zap className="hz-sq-4" />,
                title: "AI-powered recommendations",
                description: "Personalize experiences based on real-time user insights and behavior patterns."
              },
              {
                icon: <DollarSign className="hz-sq-4" />,
                title: "Dynamic Pricing & Predictive Analytics",
                description: "Forecast sales, detect anomalies, and optimize revenue streams with AI-powered insights."
              },
              {
                icon: <CreditCard className="hz-sq-4" />,
                title: "Seamless Payments & Omnichannel Insights",
                description: "Unified tracking across web, mobile, in-store, and global commerce channels."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hz-row"
              >
                <div className="hz-card hz-card-tight hz-mr-4 hz-fg-muted">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="hz-t-xl hz-w-bold hz-mb-2">{feature.title}</h3>
                  <p className="hz-fg-muted">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            style={{ scale, opacity }}
            className="hz-r-lg hz-clip hz-bordered hz-shadow-lg"
          >
            <div className="hz-p-4 hz-border-b">
              <div className="hz-row hz-ai-center">
                <ShoppingCart className="hz-sq-3 hz-fg-muted hz-mr-2" />
                <span className="hz-fg hz-w-medium">Commerce Dashboard</span>
              </div>
            </div>
            
            <div className="hz-p-5">
              <div className="hz-mb-5">
                <h4 className="hz-t-lg hz-w-medium hz-mb-4">Sales Performance</h4>
                <div className="hz-bh-8 hz-bg-raised hz-r-lg hz-rel hz-clip">
                  {/* Bar chart */}
                  <div className="hz-abs hz-inset hz-row hz-ai-end hz-jc-around hz-px-4 hz-pb-4">
                    {[65, 80, 55, 90, 70, 85, 60].map((height, i) => (
                      <motion.div
                        key={i}
                        className="hz-bw-4 hz-r-md"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      ></motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="hz-grid hz-grid-2 hz-gap-4 hz-mb-5">
                <div className="hz-bg-raised hz-p-4 hz-r-lg">
                  <div className="hz-t-sm hz-fg-muted">Conversion Rate</div>
                  <div className="hz-t-2xl hz-w-bold hz-mt-2">4.78%</div>
                  <div className="hz-fg-muted hz-t-sm hz-row hz-ai-center hz-mt-1">
                    <svg className="hz-sq-1 hz-mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    +0.6%
                  </div>
                </div>
                <div className="hz-bg-raised hz-p-4 hz-r-lg">
                  <div className="hz-t-sm hz-fg-muted">Avg. Order Value</div>
                  <div className="hz-t-2xl hz-w-bold hz-mt-2">$87.32</div>
                  <div className="hz-fg-muted hz-t-sm hz-row hz-ai-center hz-mt-1">
                    <svg className="hz-sq-1 hz-mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    +2.4%
                  </div>
                </div>
              </div>
              
              <div className="hz-border-t hz-pt-4">
                <h4 className="hz-t-lg hz-w-medium hz-mb-4">Product Recommendations</h4>
                <div className="hz-stack-3">
                  {[
                    { name: "Premium Headphones", score: 98 },
                    { name: "Wireless Keyboard", score: 85 },
                    { name: "Smart Watch", score: 79 }
                  ].map((product, i) => (
                    <div key={i} className="hz-row hz-ai-center hz-jc-between">
                      <span className="hz-fg-soft">{product.name}</span>
                      <div className="hz-row hz-ai-center">
                        <div className="hz-bw-8 hz-bh-1 hz-bg-raised hz-r-full hz-mr-2 hz-clip">
                          <motion.div
                            className="hz-h-full hz-bg-raised"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${product.score}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                          ></motion.div>
                        </div>
                        <span className="hz-t-sm hz-fg-muted">{product.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommerceAnalytics;
