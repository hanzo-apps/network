
import React from "react";
import { motion } from "framer-motion";
import { BarChart, Terminal } from "lucide-react";

const AnalyticsView = () => {
  return (
    <div className="hz-stack-4">
      <div className="hz-row hz-ai-center hz-jc-between hz-mb-4">
        <h3 className="hz-t-sm hz-w-medium hz-fg">AI Analytics</h3>
        <div className="hz-row hz-inline-2">
          <button className="hz-px-2 hz-py-1 hz-bg-raised hz-r-md hz-t-xs hz-fg hz-row hz-ai-center">
            <BarChart className="hz-sq-1 hz-mr-1" />
            Reports
          </button>
          <button className="hz-px-2 hz-py-1 hz-bg-raised hz-r-md hz-t-xs hz-fg-muted hz-row hz-ai-center">
            <Terminal className="hz-sq-1 hz-mr-1" />
            Export
          </button>
        </div>
      </div>

      <div className="hz-grid hz-grid-2 hz-gap-3 hz-mb-4">
        <div className="hz-card hz-card-tight">
          <div className="hz-t-xs hz-fg-muted hz-mb-1">Model Usage</div>
          <div className="hz-rel hz-bh-8 hz-mt-2">
            <div className="hz-abs hz-inset">
              <div className="hz-h-full hz-w-full hz-row">
                <motion.div 
                  className="hz-h-full hz-bg-raised hz-r-md"
                  initial={{ width: 0 }}
                  animate={{ width: "42%" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                />
                <motion.div 
                  className="hz-h-full hz-bg-raised"
                  initial={{ width: 0 }}
                  animate={{ width: "28%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <motion.div 
                  className="hz-h-full hz-bg-raised"
                  initial={{ width: 0 }}
                  animate={{ width: "15%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <motion.div 
                  className="hz-h-full hz-bg-raised hz-r-md"
                  initial={{ width: 0 }}
                  animate={{ width: "15%" }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
              </div>
            </div>
          </div>
          <div className="hz-grid hz-grid-2 hz-gap-2 hz-mt-3">
            <div className="hz-row hz-ai-center">
              <div className="hz-sq-1 hz-r-full hz-bg-raised hz-mr-2"></div>
              <span className="hz-t-xs hz-fg-soft">GPT-4o (42%)</span>
            </div>
            <div className="hz-row hz-ai-center">
              <div className="hz-sq-1 hz-r-full hz-bg-raised hz-mr-2"></div>
              <span className="hz-t-xs hz-fg-soft">Claude 3 (28%)</span>
            </div>
            <div className="hz-row hz-ai-center">
              <div className="hz-sq-1 hz-r-full hz-bg-raised hz-mr-2"></div>
              <span className="hz-t-xs hz-fg-soft">Llama 3 (15%)</span>
            </div>
            <div className="hz-row hz-ai-center">
              <div className="hz-sq-1 hz-r-full hz-bg-raised hz-mr-2"></div>
              <span className="hz-t-xs hz-fg-soft">Others (15%)</span>
            </div>
          </div>
        </div>
        <div className="hz-card hz-card-tight">
          <div className="hz-t-xs hz-fg-muted hz-mb-1">Cost Analysis</div>
          <div className="hz-bh-8 hz-rel">
            <div className="hz-abs hz-bottom-0 hz-w-full hz-row hz-ai-end hz-inline-1">
              {[35, 42, 38, 52, 45, 55, 47, 62, 48, 60, 53, 58].map((value, index) => (
                <motion.div
                  key={index}
                  className="hz-r-md hz-w-full"
                  style={{ height: `${value}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                />
              ))}
            </div>
          </div>
          <div className="hz-row hz-jc-between hz-mt-2 hz-t-xs hz-fg-muted">
            <span>Jan</span>
            <span>Jun</span>
            <span>Dec</span>
          </div>
          <div className="hz-mt-1 hz-t-xs hz-fg-soft">
            $1,245 spent this month - <span className="hz-fg-muted">14% under budget</span>
          </div>
        </div>
      </div>

      <div className="hz-card hz-card-tight">
        <div className="hz-t-xs hz-fg-muted hz-mb-2">Performance Metrics</div>
        <div className="hz-stack-3">
          <div>
            <div className="hz-row hz-jc-between hz-t-xs hz-mb-1">
              <span className="hz-fg-soft">Response Quality</span>
              <span className="hz-fg-soft">89%</span>
            </div>
            <div className="hz-w-full hz-bg-raised hz-r-full hz-bh-1">
              <motion.div 
                className="hz-bg-raised hz-bh-1 hz-r-full" 
                initial={{ width: 0 }}
                animate={{ width: "89%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
          <div>
            <div className="hz-row hz-jc-between hz-t-xs hz-mb-1">
              <span className="hz-fg-soft">User Satisfaction</span>
              <span className="hz-fg-soft">94%</span>
            </div>
            <div className="hz-w-full hz-bg-raised hz-r-full hz-bh-1">
              <motion.div 
                className="hz-bg-raised hz-bh-1 hz-r-full" 
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>
          <div>
            <div className="hz-row hz-jc-between hz-t-xs hz-mb-1">
              <span className="hz-fg-soft">System Reliability</span>
              <span className="hz-fg-soft">99.8%</span>
            </div>
            <div className="hz-w-full hz-bg-raised hz-r-full hz-bh-1">
              <motion.div 
                className="hz-bg-raised hz-bh-1 hz-r-full" 
                initial={{ width: 0 }}
                animate={{ width: "99.8%" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
