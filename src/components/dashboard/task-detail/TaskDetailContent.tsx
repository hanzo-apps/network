
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import AssigneesList from "./AssigneesList";
import LabelsList from "./LabelsList";
import StatusSelector from "./StatusSelector";
import PrioritySelector from "./PrioritySelector";
import { Task } from "../data/tasks/task-data";

interface TaskDetailContentProps {
  task: Task;
  onTaskChange: (field: string, value: any) => void;
}

const TaskDetailContent: React.FC<TaskDetailContentProps> = ({ task, onTaskChange }) => {
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTaskChange("description", e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTaskChange("dueDate", e.target.value);
  };

  return (
    <div className="hz-grid hz-grid-3 hz-gap-5">
      <div className="hz-span-2">
        <div className="hz-mb-5">
          <label className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-1">Description</label>
          <Textarea 
            value={task.description || ""}
            onChange={handleDescriptionChange}
            placeholder="Add a description..."
            className="hz-bg-surface"
          />
        </div>

        <AssigneesList 
          assignees={task.assignees} 
          onRemove={(id) => {
            const newAssignees = task.assignees?.filter(a => a.id !== id);
            onTaskChange("assignees", newAssignees);
          }} 
        />

        <LabelsList 
          labels={task.labels} 
          onRemove={(id) => {
            const newLabels = task.labels?.filter(l => l.id !== id);
            onTaskChange("labels", newLabels);
          }} 
        />
      </div>

      <div className="hz-stack-5">
        <StatusSelector 
          status={task.status} 
          onChange={(value) => onTaskChange("status", value)} 
        />

        <PrioritySelector 
          priority={task.priority} 
          onChange={(value) => onTaskChange("priority", value)} 
        />

        <div>
          <label className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-1">Due Date</label>
          <Input 
            type="date"
            value={task.dueDate || ""}
            onChange={handleDateChange}
            className="hz-bg-surface"
          />
        </div>

        <div>
          <label className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-1">AI Agents</label>
          <Button 
            variant="outline" 
            className="hz-w-full hz-jc-start hz-bg-surface"
          >
            <Bot className="hz-sq-2 hz-mr-2" />
            Assign Agent
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailContent;
