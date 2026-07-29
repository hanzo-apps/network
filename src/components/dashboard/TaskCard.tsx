
import React from "react";
import { Bot, MessageSquare, Paperclip, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority?: "low" | "medium" | "high";
    assignees?: { id: string; name: string; avatar?: string }[];
    labels?: { id: string; name: string; color: string }[];
    agentCount?: number;
    messageCount?: number;
    dueDate?: string;
  };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const priorityColors = {
    low: "hz-bg-surface",
    medium: "hz-bg-surface",
    high: "hz-bg-surface"
  };

  return (
    <div className="hz-card hz-card-tight hz-pointer hz-transition hz-card-interactive">
      {/* Task ID and Priority */}
      <div className="hz-row hz-ai-center hz-jc-between hz-mb-2">
        <div className="hz-t-xs hz-fg-muted hz-row hz-ai-center">
          <span>HAN-{task.id}</span>
        </div>
        {task.priority && (
          <div className={cn("hz-sq-1 hz-r-full", priorityColors[task.priority])}></div>
        )}
      </div>
      
      {/* Title */}
      <h3 className="hz-w-medium hz-t-sm hz-mb-2">{task.title}</h3>
      
      {/* Description (optional) */}
      {task.description && (
        <p className="hz-t-xs hz-fg-muted hz-mb-3 hz-clamp-2">{task.description}</p>
      )}
      
      {/* Labels */}
      {task.labels && task.labels.length > 0 && (
        <div className="hz-row hz-wrap hz-gap-1 hz-mb-3">
          {task.labels.map(label => (
            <span 
              key={label.id} 
              className="hz-px-2 hz-py-1 hz-t-xs hz-r-full" 
              style={{ backgroundColor: `${label.color}20`, color: label.color }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}
      
      {/* Footer */}
      <div className="hz-row hz-ai-center hz-jc-between hz-mt-2">
        {/* Assignees */}
        <div className="hz-row">
          {task.assignees && task.assignees.map((assignee, index) => (
            <div 
              key={assignee.id} 
              className="hz-sq-4 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center hz-t-xs"
              title={assignee.name}
            >
              {assignee.avatar ? (
                <img src={assignee.avatar} alt={assignee.name} className="hz-h-full hz-w-full hz-r-full" />
              ) : (
                assignee.name.charAt(0)
              )}
            </div>
          ))}
          
          {task.agentCount && task.agentCount > 0 && (
            <div 
              className="hz-sq-4 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center"
              title={`${task.agentCount} AI agents`}
            >
              <Bot className="hz-sq-1 hz-fg-muted" />
            </div>
          )}
        </div>
        
        {/* Metadata */}
        <div className="hz-row hz-ai-center hz-inline-2 hz-fg-muted">
          {task.messageCount && task.messageCount > 0 && (
            <div className="hz-row hz-ai-center hz-t-xs">
              <MessageSquare className="hz-sq-1 hz-mr-1" />
              {task.messageCount}
            </div>
          )}
          
          {task.dueDate && (
            <div className="hz-row hz-ai-center hz-t-xs">
              <AlertCircle className="hz-sq-1 hz-mr-1" />
              {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
