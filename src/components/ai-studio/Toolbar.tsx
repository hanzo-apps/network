
import React from "react";
import { PanelLeft, MessageSquare, Layers, Terminal, Save, Play, Share2, Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolbarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Toolbar = ({ 
  showSidebar, 
  setShowSidebar, 
  activeTab, 
  setActiveTab 
}: ToolbarProps) => {
  return (
    <div className="hz-bg-surface hz-p-2 hz-border-b hz-row hz-ai-center">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setShowSidebar(!showSidebar)}
        className="hz-fg-muted hz-mr-2 hz-link"
      >
        <PanelLeft className="hz-sq-3" />
      </Button>
      
      <div className="hz-row hz-inline-1">
        <Button 
          variant={activeTab === "chat" ? "secondary" : "ghost"} 
          size="sm"
          onClick={() => setActiveTab("chat")}
          className="hz-t-sm"
        >
          <MessageSquare className="hz-sq-2 hz-mr-1" /> Chat
        </Button>
        <Button 
          variant={activeTab === "playground" ? "secondary" : "ghost"}
          size="sm" 
          onClick={() => setActiveTab("playground")}
          className="hz-t-sm"
        >
          <Layers className="hz-sq-2 hz-mr-1" /> Playground
        </Button>
        <Button 
          variant={activeTab === "terminal" ? "secondary" : "ghost"} 
          size="sm"
          onClick={() => setActiveTab("terminal")}
          className="hz-t-sm"
        >
          <Terminal className="hz-sq-2 hz-mr-1" /> Terminal
        </Button>
      </div>
      
      <div className="hz-ml-auto hz-row hz-ai-center hz-inline-1">
        <Button variant="ghost" size="icon" className="hz-fg-muted hz-link">
          <Save className="hz-sq-2" />
        </Button>
        <Button variant="ghost" size="icon" className="hz-fg-muted hz-link">
          <Play className="hz-sq-2" />
        </Button>
        <Button variant="ghost" size="icon" className="hz-fg-muted hz-link">
          <Share2 className="hz-sq-2" />
        </Button>
        <Button variant="ghost" size="icon" className="hz-fg-muted hz-link">
          <Download className="hz-sq-2" />
        </Button>
        <Button variant="ghost" size="icon" className="hz-fg-muted hz-link">
          <Settings className="hz-sq-2" />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
