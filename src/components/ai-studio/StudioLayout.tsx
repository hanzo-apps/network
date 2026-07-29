
import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import Content from "./Content";
import { MessageInterface, ModelInterface } from "./types";

interface StudioLayoutProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  models: ModelInterface[];
  modelSelection: string;
  setModelSelection: (id: string) => void;
  conversation: MessageInterface[];
  promptText: string;
  setPromptText: (text: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const StudioLayout = ({
  showSidebar,
  setShowSidebar,
  activeTab,
  setActiveTab,
  models,
  modelSelection,
  setModelSelection,
  conversation,
  promptText,
  setPromptText,
  handleSubmit
}: StudioLayoutProps) => {
  return (
    <div className="hz-container hz-grow hz-row hz-clip hz-w-full hz-p-4">
      <Sidebar 
        showSidebar={showSidebar}
        models={models}
        modelSelection={modelSelection}
        setModelSelection={setModelSelection}
      />
      
      <div className="hz-grow hz-col hz-bg-surface hz-bordered hz-r-lg hz-clip">
        <Toolbar 
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <Content 
          activeTab={activeTab}
          conversation={conversation}
          promptText={promptText}
          setPromptText={setPromptText}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default StudioLayout;
