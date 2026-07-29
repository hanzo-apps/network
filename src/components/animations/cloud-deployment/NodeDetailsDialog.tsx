
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NodeType } from "./types";

interface NodeDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedNode: NodeType | null;
}

const NodeDetailsDialog: React.FC<NodeDetailsDialogProps> = ({ isOpen, onOpenChange, selectedNode }) => {
  if (!selectedNode) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedNode.label}
          </DialogTitle>
          <DialogDescription>
            {selectedNode.statusMessage}
          </DialogDescription>
        </DialogHeader>
        
        <div className="hz-p-4 hz-bg-raised hz-r-md hz-mb-4">
          <h4 className="hz-t-sm hz-w-medium hz-fg-soft hz-mb-2">Service Details</h4>
          <div className="hz-grid hz-grid-2 hz-gap-2 hz-t-sm">
            <div className="hz-fg-muted">Status</div>
            <div className="hz-fg">
              {selectedNode.status === 'deployed' && <span className="hz-fg-muted">Deployed</span>}
              {selectedNode.status === 'pending' && <span className="hz-fg-muted">Pending</span>}
              {selectedNode.status === 'error' && <span className="hz-fg-muted">Failed</span>}
            </div>
            
            <div className="hz-fg-muted">Type</div>
            <div className="hz-fg">{selectedNode.type}</div>
            
            <div className="hz-fg-muted">Created</div>
            <div className="hz-fg">Just now</div>
          </div>
        </div>
        
        <div className="hz-row hz-jc-end hz-inline-2">
          <button 
            className="hz-px-3 hz-py-2 hz-r-md hz-bg-raised hz-fg-soft hz-t-sm hz-hoverable"
            onClick={() => onOpenChange(false)}
          >
            Close
          </button>
          <button 
            className="hz-px-3 hz-py-2 hz-r-md hz-bg-raised hz-fg hz-t-sm hz-hoverable"
            onClick={() => onOpenChange(false)}
          >
            View Details
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NodeDetailsDialog;
