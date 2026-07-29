
import React from "react";
import { Button } from "@/components/ui/button";
import { CostItem } from "./models/project";

interface ProjectCostSectionProps {
  costs: CostItem[];
  currentCost: string;
}

const ProjectCostSection = ({ costs, currentCost }: ProjectCostSectionProps) => {
  return (
    <div>
      <div className="hz-row hz-jc-between hz-mb-4">
        <h4 className="hz-w-medium">Project Cost</h4>
        <Button 
          variant="ghost" 
          size="sm"
          className="hz-fg-muted hz-link"
        >
          View Cost by Service
        </Button>
      </div>
      
      <div className="hz-stack-4">
        {costs.map((cost, index) => (
          <div key={index} className="hz-row hz-jc-between">
            <div>
              <div className="hz-w-medium">{cost.name}</div>
              <div className="hz-t-xs hz-fg-muted">{cost.usage}</div>
              <div className="hz-t-xs hz-fg-muted">{cost.rate}</div>
            </div>
            <div className="hz-w-medium">{cost.cost}</div>
          </div>
        ))}
        
        <div className="hz-pt-4 hz-border-t hz-row hz-jc-between">
          <div className="hz-t-sm">Metrics are shown as minutely accumulated values</div>
          <div className="hz-w-bold">{currentCost}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCostSection;
