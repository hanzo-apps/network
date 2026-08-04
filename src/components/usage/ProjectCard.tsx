
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "./models/project";
import ResourceUsageSection from "./ResourceUsageSection";
import ProjectCostSection from "./ProjectCostSection";
import { createAnimationVariant, curves } from "@/components/ui/animation-variants";

const cardAnimation = createAnimationVariant("fadeInBlur", {
  duration: 0.4,
  curve: curves.snappy,
  distance: 15
});

interface ProjectCardProps {
  project: Project;
  onToggleExpand: (projectId: string) => void;
}

const ProjectCard = ({ project, onToggleExpand }: ProjectCardProps) => {
  return (
    <motion.div 
      variants={cardAnimation}
      className="hz-r-lg hz-bordered hz-bg-surface hz-clip"
    >
      <div 
        className="hz-p-4 hz-row hz-ai-center hz-jc-between hz-pointer hz-hoverable"
        onClick={() => onToggleExpand(project.id)}
      >
        <div className="hz-row hz-ai-center hz-gap-4">
          {project.expanded ? (
            <ChevronUp className="hz-sq-3 hz-fg-muted" />
          ) : (
            <ChevronDown className="hz-sq-3 hz-fg-muted" />
          )}
          <span className="hz-w-medium">{project.name}</span>
        </div>
        <div className="hz-row hz-ai-center hz-gap-6">
          <div>
            <div className="hz-t-sm hz-fg-muted">Current Cost</div>
            <div className="hz-w-medium">{project.currentCost}</div>
          </div>
          <div>
            <div className="hz-t-sm hz-fg-muted">Estimated</div>
            <div className="hz-w-medium">{project.estimatedCost}</div>
          </div>
        </div>
      </div>
      
      {project.expanded && (
        <div className="hz-p-5 hz-border-t">
          <div className="hz-grid hz-grid-2 hz-gap-5 hz-mb-6">
            <ResourceUsageSection resources={project.resources} />
            <ProjectCostSection costs={project.costs} currentCost={project.currentCost} />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
