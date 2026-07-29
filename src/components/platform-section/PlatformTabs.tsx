
import React from "react";
import { motion } from "framer-motion";

interface PlatformTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PlatformTabs: React.FC<PlatformTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="hz-row hz-inline-2 hz-border-b hz-pb-4 hz-scroll-x">
      <button
        onClick={() => setActiveTab("platform")}
        className={`hz-px-4 hz-py-2 hz-whitespace-nowrap ${
          activeTab === "platform"
            ? "hz-fg hz-border-strong"
            : "hz-fg-muted hz-link"
        }`}
      >
        Platform Vision
      </button>
      <button
        onClick={() => setActiveTab("capabilities")}
        className={`hz-px-4 hz-py-2 hz-whitespace-nowrap ${
          activeTab === "capabilities"
            ? "hz-fg hz-border-strong"
            : "hz-fg-muted hz-link"
        }`}
      >
        Core Capabilities
      </button>
      <button
        onClick={() => setActiveTab("solutions")}
        className={`hz-px-4 hz-py-2 hz-whitespace-nowrap ${
          activeTab === "solutions"
            ? "hz-fg hz-border-strong"
            : "hz-fg-muted hz-link"
        }`}
      >
        Enterprise Solutions
      </button>
    </div>
  );
};

export default PlatformTabs;
