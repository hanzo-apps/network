
import React from "react";
import { motion } from "framer-motion";
import { LineChart } from "lucide-react";

const AIAnalysisDemo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="hz-card hz-shadow-lg hz-clip hz-rel"
    >
      <div className="hz-abs hz-inset hz-bg-surface"></div>
      
      <div className="hz-rel hz-z-raised">
        <div className="hz-row hz-ai-center hz-mb-5">
          <LineChart className="hz-sq-4 hz-fg-muted hz-mr-3" />
          <h3 className="hz-t-2xl hz-w-bold">AI Analysis in Action</h3>
        </div>
        
        <div className="hz-grid hz-grid-3 hz-gap-5">
          <div className="hz-span-2">
            <div className="hz-card">
              <h4 className="hz-t-lg hz-w-medium hz-mb-4">Traffic Anomaly Detection</h4>
              <div className="hz-bh-8 hz-rel">
                {/* Base line chart */}
                <svg className="hz-w-full hz-h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <motion.path
                    d="M0,80 C25,70 50,65 75,60 C100,55 125,50 150,55 C175,60 200,80 225,50 C250,20 275,35 300,30"
                    fill="none"
                    stroke="#a3a3a3"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2 }}
                  />
                  
                  {/* Anomaly area */}
                  <motion.path
                    d="M200,80 C206,65 212,40 218,20 C224,30 230,45 236,50"
                    fill="none"
                    stroke="#a3a3a3"
                    strokeWidth="3"
                    strokeDasharray="2,2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 1.8 }}
                  />
                  
                  {/* Anomaly circle */}
                  <motion.circle
                    cx="218"
                    cy="20"
                    r="5"
                    fill="#a3a3a3"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 2 }}
                  />
                </svg>
                
                {/* Anomaly detection popup */}
                <motion.div
                  className="hz-abs hz-bg-raised hz-fg hz-t-xs hz-r-md hz-px-3 hz-py-2 hz-bordered"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 2.2 }}
                >
                  <div className="hz-w-bold hz-mb-1">Anomaly Detected</div>
                  <div>Unusual traffic spike</div>
                  <div>Confidence: 98.7%</div>
                </motion.div>
              </div>
            </div>
          </div>
          
          <div className="hz-stack-4">
            <div className="hz-card">
              <h4 className="hz-t-lg hz-w-medium hz-mb-3">AI Insights</h4>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2.4 }}
                className="hz-stack-3"
              >
                <div className="hz-t-sm">
                  <div className="hz-w-medium hz-fg-muted">Traffic Anomaly</div>
                  <div className="hz-fg-muted">Unusual spike detected at 14:32 UTC</div>
                </div>
                <div className="hz-t-sm">
                  <div className="hz-w-medium hz-fg-muted">Conversion Opportunity</div>
                  <div className="hz-fg-muted">Checkout abandonment 23% higher on mobile</div>
                </div>
                <div className="hz-t-sm">
                  <div className="hz-w-medium hz-fg-muted">Performance Alert</div>
                  <div className="hz-fg-muted">API latency increased by 150ms</div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2.6 }}
              className="hz-card"
            >
              <h4 className="hz-t-lg hz-w-medium hz-mb-2">AI Recommendation</h4>
              <p className="hz-t-sm hz-fg-soft">
                Based on the traffic pattern analysis, we recommend scaling your infrastructure in the US-West region for the next 3 hours.
              </p>
              <button className="hz-mt-3 hz-t-sm hz-bg-raised hz-fg hz-px-3 hz-py-1 hz-r-md hz-hoverable">
                Apply Recommendation
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAnalysisDemo;
