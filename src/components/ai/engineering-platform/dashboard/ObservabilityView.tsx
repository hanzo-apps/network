
import React from "react";
import { motion } from "framer-motion";
import { Activity, Terminal, ChartLine } from "lucide-react";

const ObservabilityView = () => {
  return (
    <div className="hz-stack-4">
      <div className="hz-row hz-ai-center hz-jc-between hz-mb-4">
        <h3 className="hz-t-sm hz-w-medium hz-fg">AI Observability Dashboard</h3>
        <div className="hz-row hz-inline-2">
          <button className="hz-px-2 hz-py-1 hz-bg-raised hz-r-md hz-t-xs hz-fg hz-row hz-ai-center">
            <Activity className="hz-sq-1 hz-mr-1" />
            Real-time
          </button>
          <button className="hz-px-2 hz-py-1 hz-bg-raised hz-r-md hz-t-xs hz-fg-muted hz-row hz-ai-center">
            <Terminal className="hz-sq-1 hz-mr-1" />
            Logs
          </button>
        </div>
      </div>

      <div className="hz-grid hz-grid-3 hz-gap-3 hz-mb-4">
        <div className="hz-card hz-card-tight">
          <div className="hz-t-xs hz-fg-muted hz-mb-1">Requests</div>
          <div className="hz-t-lg hz-w-medium hz-fg">3,452</div>
          <div className="hz-mt-1 hz-t-xs hz-fg-muted hz-row hz-ai-center">
            <ChartLine className="hz-sq-1 hz-mr-1" />
            +18% from yesterday
          </div>
        </div>
        <div className="hz-card hz-card-tight">
          <div className="hz-t-xs hz-fg-muted hz-mb-1">Avg. Latency</div>
          <div className="hz-t-lg hz-w-medium hz-fg">94ms</div>
          <div className="hz-mt-1 hz-t-xs hz-fg-muted hz-row hz-ai-center">
            <ChartLine className="hz-sq-1 hz-mr-1" />
            -12ms from yesterday
          </div>
        </div>
        <div className="hz-card hz-card-tight">
          <div className="hz-t-xs hz-fg-muted hz-mb-1">Error Rate</div>
          <div className="hz-t-lg hz-w-medium hz-fg">0.4%</div>
          <div className="hz-mt-1 hz-t-xs hz-fg-muted hz-row hz-ai-center">
            <ChartLine className="hz-sq-1 hz-mr-1" />
            -0.2% from yesterday
          </div>
        </div>
      </div>

      <div className="hz-card hz-card-tight hz-mb-4">
        <div className="hz-t-xs hz-fg-muted hz-mb-2">Response Time Trend</div>
        <div className="hz-bh-8 hz-row hz-ai-end hz-inline-1">
          {[35, 42, 38, 30, 45, 55, 47, 40, 48, 60, 53, 41, 48, 50, 58, 45, 43, 49, 55, 62].map((value, index) => (
            <motion.div
              key={index}
              className="hz-bg-raised hz-r-md hz-w-full"
              style={{ height: `${value}%` }}
              initial={{ height: 0 }}
              animate={{ height: `${value}%` }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
            />
          ))}
        </div>
        <div className="hz-row hz-jc-between hz-mt-1 hz-t-xs hz-fg-muted">
          <span>00:00</span>
          <span>12:00</span>
          <span>23:59</span>
        </div>
      </div>

      <div className="hz-card hz-card-tight">
        <div className="hz-t-xs hz-fg-muted hz-mb-2">Recent Traces</div>
        <div className="hz-stack-2">
          {[
            { id: "t1", model: "GPT-4o", time: "2m ago", status: "success", duration: "92ms" },
            { id: "t2", model: "Llama 3", time: "5m ago", status: "success", duration: "84ms" },
            { id: "t3", model: "Claude 3", time: "12m ago", status: "error", duration: "176ms" },
            { id: "t4", model: "Mixtral", time: "18m ago", status: "success", duration: "78ms" },
          ].map((trace) => (
            <div key={trace.id} className="hz-row hz-ai-center hz-jc-between hz-t-xs hz-p-2 hz-r-md hz-hoverable">
              <div className="hz-row hz-ai-center">
                <div className={`hz-sq-1 hz-r-full hz-mr-2 ${trace.status === "success" ? "hz-bg-raised" : "hz-bg-raised"}`}></div>
                <span className="hz-fg-soft">{trace.model}</span>
              </div>
              <div className="hz-row hz-ai-center hz-inline-3">
                <span className="hz-fg-muted">{trace.time}</span>
                <span className={`${trace.status === "success" ? "hz-fg-muted" : "hz-fg-muted"}`}>{trace.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ObservabilityView;
