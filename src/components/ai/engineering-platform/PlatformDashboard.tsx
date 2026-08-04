
import React, { useState } from "react";
import { motion } from "framer-motion";
import AIModelsView from "./dashboard/AIModelsView";
import ObservabilityView from "./dashboard/ObservabilityView";
import AnalyticsView from "./dashboard/AnalyticsView";

const PlatformDashboard = () => {
  const [activeSection, setActiveSection] = useState("models");

  return (
    <div className="hz-rel hz-w-full hz-bg-surface hz-r-lg hz-clip hz-bordered hz-shadow-lg">
      {/* Dashboard header */}
      <div className="hz-bg-raised hz-p-3 hz-row hz-ai-center hz-jc-between">
        <div className="hz-row hz-ai-center hz-inline-2">
          <div className="hz-row hz-inline-2">
            <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
            <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
            <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
          </div>
          <div className="hz-t-xs hz-fg-muted">Hanzo AI Engineering Platform</div>
        </div>
        <div className="hz-row hz-inline-3">
          <button 
            className={`hz-px-3 hz-py-1 hz-r-md hz-t-xs ${activeSection === "models" ? "hz-bg-raised hz-fg" : "hz-bg-raised hz-fg-muted"}`} 
            onClick={() => setActiveSection("models")}
          >
            AI Models
          </button>
          <button 
            className={`hz-px-3 hz-py-1 hz-r-md hz-t-xs ${activeSection === "observability" ? "hz-bg-raised hz-fg" : "hz-bg-raised hz-fg-muted"}`} 
            onClick={() => setActiveSection("observability")}
          >
            Observability
          </button>
          <button 
            className={`hz-px-3 hz-py-1 hz-r-md hz-t-xs ${activeSection === "analytics" ? "hz-bg-raised hz-fg" : "hz-bg-raised hz-fg-muted"}`} 
            onClick={() => setActiveSection("analytics")}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="hz-p-4 hz-scroll-y">
        {activeSection === "models" && <AIModelsView />}
        {activeSection === "observability" && <ObservabilityView />}
        {activeSection === "analytics" && <AnalyticsView />}
      </div>
    </div>
  );
};

export default PlatformDashboard;
