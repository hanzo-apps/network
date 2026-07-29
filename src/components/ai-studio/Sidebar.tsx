
import React from "react";
import { motion } from "framer-motion";
import { Cpu, MessageSquare, Code, Bot } from "lucide-react";
import { ModelInterface } from "./types";

interface SidebarProps {
  showSidebar: boolean;
  models: ModelInterface[];
  modelSelection: string;
  setModelSelection: (id: string) => void;
}

const Sidebar = ({ 
  showSidebar, 
  models, 
  modelSelection, 
  setModelSelection 
}: SidebarProps) => {
  if (!showSidebar) return null;

  return (
    <motion.div 
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 240, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      className="hz-bg-surface hz-border-r hz-h-full hz-mr-4 hz-p-4 hz-scroll-y"
    >
      <div className="hz-stack-5">
        <div>
          <h3 className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-2">MODELS</h3>
          <div className="hz-stack-1">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => setModelSelection(model.id)}
                className={`hz-btn hz-btn-ghost hz-btn-block hz-align-left ${
                  modelSelection === model.id ? "hz-bg-raised hz-fg" : "hz-fg-soft hz-hoverable"
                }`}
              >
                <Cpu className="hz-sq-2 hz-mr-2" />
                <div>
                  <div>{model.name}</div>
                  <div className="hz-t-xs hz-fg-muted">{model.provider}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-2">SAVED PROJECTS</h3>
          <div className="hz-stack-1">
            <button className="hz-btn hz-btn-ghost hz-btn-block hz-align-left hz-fg-soft">
              <MessageSquare className="hz-sq-2 hz-mr-2" />
              <span>Customer Support Bot</span>
            </button>
            <button className="hz-btn hz-btn-ghost hz-btn-block hz-align-left hz-fg-soft">
              <Code className="hz-sq-2 hz-mr-2" />
              <span>Code Generator</span>
            </button>
            <button className="hz-btn hz-btn-ghost hz-btn-block hz-align-left hz-fg-soft">
              <Bot className="hz-sq-2 hz-mr-2" />
              <span>Data Analysis Agent</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
