
import React from "react";
import { Server, CircuitBoard, HardDrive, Globe } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ProjectResources } from "./models/project";

interface ResourceUsageSectionProps {
  resources: ProjectResources;
}

const ResourceUsageSection = ({ resources }: ResourceUsageSectionProps) => {
  return (
    <div>
      <h4 className="hz-w-medium hz-mb-4">Resource Usage</h4>
      
      <div className="hz-stack-5">
        <div>
          <div className="hz-row hz-jc-between hz-mb-1">
            <div className="hz-row hz-ai-center hz-gap-2">
              <Server className="hz-sq-2 hz-fg-muted" />
              <span className="hz-t-sm hz-fg-muted">CPU</span>
            </div>
            <span className="hz-t-sm">{resources.cpu.value}</span>
          </div>
          <Progress value={resources.cpu.usage} className="hz-bh-1" />
        </div>
        
        <div>
          <div className="hz-row hz-jc-between hz-mb-1">
            <div className="hz-row hz-ai-center hz-gap-2">
              <CircuitBoard className="hz-sq-2 hz-fg-muted" />
              <span className="hz-t-sm hz-fg-muted">RAM</span>
            </div>
            <span className="hz-t-sm">{resources.memory.value}</span>
          </div>
          <Progress value={resources.memory.usage} className="hz-bh-1" />
        </div>
        
        <div>
          <div className="hz-row hz-jc-between hz-mb-1">
            <div className="hz-row hz-ai-center hz-gap-2">
              <Globe className="hz-sq-2 hz-fg-muted" />
              <span className="hz-t-sm hz-fg-muted">Network Egress</span>
            </div>
            <span className="hz-t-sm">{resources.network.value}</span>
          </div>
          <Progress value={resources.network.usage} className="hz-bh-1" />
        </div>
        
        <div>
          <div className="hz-row hz-jc-between hz-mb-1">
            <div className="hz-row hz-ai-center hz-gap-2">
              <HardDrive className="hz-sq-2 hz-fg-muted" />
              <span className="hz-t-sm hz-fg-muted">Volume</span>
            </div>
            <span className="hz-t-sm">{resources.storage.value}</span>
          </div>
          <Progress value={resources.storage.usage} className="hz-bh-1" />
        </div>
      </div>
    </div>
  );
};

export default ResourceUsageSection;
