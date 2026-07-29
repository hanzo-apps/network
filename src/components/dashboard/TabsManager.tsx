
import React, { useState, useEffect } from "react";
import { X, Plus, LayoutGrid, List, MenuSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabType = {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
};

interface TabsManagerProps {
  initialTabs: TabType[];
  onAddTab?: () => void;
}

const TabsManager: React.FC<TabsManagerProps> = ({ initialTabs, onAddTab }) => {
  const [tabs, setTabs] = useState<TabType[]>(initialTabs);
  const [activeTabId, setActiveTabId] = useState<string>(initialTabs[0]?.id || "");
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    if (tabs.length > 1) {
      const newTabs = tabs.filter(tab => tab.id !== tabId);
      setTabs(newTabs);
      
      // If the active tab is being closed, set another tab as active
      if (activeTabId === tabId) {
        setActiveTabId(newTabs[0].id);
      }
    }
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const toggleViewMode = () => {
    setViewMode(prev => prev === "kanban" ? "list" : "kanban");
  };

  return (
    <div className="hz-col hz-h-full">
      <div className="hz-row hz-border-b">
        <div className="hz-grow hz-row hz-scroll-x">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={cn(
                "hz-row hz-ai-center hz-px-4 hz-py-2 hz-border-r hz-pointer hz-transition",
                activeTabId === tab.id ? "hz-bg-surface" : "hz-hoverable"
              )}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.icon && <span className="hz-mr-2">{tab.icon}</span>}
              <span className="hz-truncate hz-mw-full">{tab.title}</span>
              {tabs.length > 1 && (
                <button
                  className="hz-ml-2 hz-invisible hz-transition hz-fg-muted hz-link"
                  onClick={(e) => handleCloseTab(e, tab.id)}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="hz-row hz-ai-center">
          <button
            onClick={onAddTab}
            className="hz-p-2 hz-transition hz-hoverable"
            title="New Tab"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={toggleViewMode}
            className="hz-p-2 hz-transition hz-hoverable"
            title={viewMode === "kanban" ? "Switch to List View" : "Switch to Kanban View"}
          >
            {viewMode === "kanban" ? <List size={16} /> : <LayoutGrid size={16} />}
          </button>
        </div>
      </div>
      
      <div className="hz-grow hz-clip">
        {activeTab && activeTab.content}
      </div>
    </div>
  );
};

export default TabsManager;
