
import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { NodeType } from "./types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { renderIcon } from "./utils/iconUtils";

interface DeploymentNodeProps {
  node: NodeType;
  onClick: (node: NodeType) => void;
}

const DeploymentNode: React.FC<DeploymentNodeProps> = ({ node, onClick }) => {
  const getNodeBackgroundClass = () => {
    switch(node.type) {
      case 'app': return 'bg-neutral-600/20 border border-neutral-500/30';
      case 'redis': return 'bg-neutral-600/20 border border-neutral-500/30';
      case 'postgres': return 'bg-neutral-600/20 border border-neutral-500/30';
      case 'github': return 'bg-gray-500/20 border border-gray-500/30';
      case 'volume': return 'bg-neutral-500/20 border border-neutral-500/30';
      case 'network': 
        return node.id === 'network-public' 
          ? 'bg-neutral-500/20 border-2 border-neutral-500/50' // Highlighted yellow for public network
          : 'bg-neutral-600/20 border-2 border-neutral-400/40'; // Yellow outline for private network
      default: return 'bg-neutral-600/20 border border-neutral-500/30';
    }
  };

  return (
    <motion.div
      className="hz-abs hz-col hz-ai-center hz-jc-center hz-pointer"
      style={{ 
        left: `${node.position.x}%`, 
        top: `${node.position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: node.active ? 1 : 0,
        opacity: node.active ? 1 : 0
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        duration: 0.5
      }}
      onClick={() => onClick(node)}
    >
      <div className={`hz-sq-7 hz-row hz-ai-center hz-jc-center hz-r-lg ${getNodeBackgroundClass()}`}>
        {renderIcon(node.iconType, node.iconProps)}
        {node.status && (
          <div className="hz-abs hz-r-full hz-bg-raised hz-bordered hz-p-1">
            {node.status === 'deployed' && <Check className="hz-sq-1 hz-fg-muted" />}
            {node.status === 'pending' && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <svg className="hz-sq-1 hz-fg-muted" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
            {node.status === 'error' && <X className="hz-sq-1 hz-fg-muted" />}
          </div>
        )}
      </div>
      <span className="hz-mt-2 hz-t-xs hz-fg-soft hz-whitespace-nowrap">{node.label}</span>
    </motion.div>
  );
};

// Wrapped version with tooltip
const DeploymentNodeWithTooltip: React.FC<DeploymentNodeProps> = (props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <DeploymentNode {...props} />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{props.node.label}</p>
          {props.node.statusMessage && <p className="hz-t-xs hz-dim">{props.node.statusMessage}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DeploymentNodeWithTooltip;
