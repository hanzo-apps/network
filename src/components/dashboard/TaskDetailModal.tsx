
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, Calendar, Tag, 
  User, AlertCircle, X,
  PlusCircle
} from "lucide-react";

interface Task {
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
}

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  onClose,
  onUpdate
}) => {
  const [editedTask, setEditedTask] = useState<Task>({ ...task });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(editedTask);
  };

  const priorityOptions = [
    { value: "low", label: "Low", color: "hz-bg-surface" },
    { value: "medium", label: "Medium", color: "hz-bg-surface" },
    { value: "high", label: "High", color: "hz-bg-surface" }
  ];

  const statusOptions = [
    { value: "backlog", label: "Backlog" },
    { value: "todo", label: "Todo" },
    { value: "in-progress", label: "In Progress" },
    { value: "done", label: "Done" }
  ];

  return (
    <Dialog open={!!task} onOpenChange={() => onClose()}>
      <DialogContent className="hz-mw-md">
        <DialogHeader>
          <DialogTitle>
            <Input 
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="hz-t-xl hz-w-semibold hz-mt-2 hz-bg-none hz-border-none hz-px-0"
            />
          </DialogTitle>
        </DialogHeader>

        <div className="hz-grid hz-grid-3 hz-gap-5">
          <div className="hz-span-2">
            <div className="hz-mb-5">
              <label className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-1">Description</label>
              <Textarea 
                name="description"
                value={editedTask.description || ""}
                onChange={handleChange}
                placeholder="Add a description..."
                className="hz-bg-surface"
              />
            </div>

            <div className="hz-mb-5">
              <div className="hz-row hz-jc-between hz-mb-2">
                <label className="hz-t-sm hz-w-medium hz-fg-muted">Assignees</label>
                <Button size="sm" variant="ghost" className="hz-fg-muted hz-bh-4 hz-px-2 hz-link">
                  <PlusCircle className="hz-sq-2 hz-mr-1" />
                  Add
                </Button>
              </div>
              <div className="hz-row hz-wrap hz-gap-2">
                {editedTask.assignees?.map(assignee => (
                  <div 
                    key={assignee.id}
                    className="hz-row hz-ai-center hz-gap-2 hz-bg-raised hz-px-2 hz-py-1 hz-r-md hz-t-sm"
                  >
                    <div className="hz-sq-3 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-t-xs">
                      {assignee.name.charAt(0)}
                    </div>
                    <span>{assignee.name}</span>
                    <button className="hz-fg-muted hz-link">
                      <X className="hz-sq-1" />
                    </button>
                  </div>
                ))}
                {!editedTask.assignees?.length && (
                  <div className="hz-t-sm hz-fg-muted">No assignees</div>
                )}
              </div>
            </div>

            <div className="hz-mb-5">
              <div className="hz-row hz-jc-between hz-mb-2">
                <label className="hz-t-sm hz-w-medium hz-fg-muted">Labels</label>
                <Button size="sm" variant="ghost" className="hz-fg-muted hz-bh-4 hz-px-2 hz-link">
                  <PlusCircle className="hz-sq-2 hz-mr-1" />
                  Add
                </Button>
              </div>
              <div className="hz-row hz-wrap hz-gap-2">
                {editedTask.labels?.map(label => (
                  <div 
                    key={label.id}
                    className="hz-row hz-ai-center hz-gap-2 hz-px-2 hz-py-1 hz-r-md hz-t-sm"
                    style={{ backgroundColor: `${label.color}20`, color: label.color }}
                  >
                    <span>{label.name}</span>
                    <button>
                      <X className="hz-sq-1" />
                    </button>
                  </div>
                ))}
                {!editedTask.labels?.length && (
                  <div className="hz-t-sm hz-fg-muted">No labels</div>
                )}
              </div>
            </div>
          </div>

          <div className="hz-stack-5">
            <div>
              <label className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-1">Status</label>
              <div className="hz-stack-1">
                {statusOptions.map(option => (
                  <div 
                    key={option.value}
                    className={`hz-px-3 hz-py-2 hz-r-md hz-pointer ${
                      editedTask.status === option.value 
                        ? 'hz-bg-raised hz-bordered' 
                        : 'hz-hoverable'
                    }`}
                    onClick={() => setEditedTask(prev => ({ ...prev, status: option.value }))}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-1">Priority</label>
              <div className="hz-stack-1">
                {priorityOptions.map(option => (
                  <div 
                    key={option.value}
                    className={`hz-btn hz-btn-ghost hz-pointer ${
                      editedTask.priority === option.value 
                        ? 'hz-bg-raised' 
                        : 'hz-hoverable'
                    }`}
                    onClick={() => setEditedTask(prev => ({ ...prev, priority: option.value as "low" | "medium" | "high" }))}
                  >
                    <div className={`hz-sq-1 hz-r-full ${option.color} hz-mr-2`}></div>
                    {option.label}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-1">Due Date</label>
              <Input 
                type="date"
                name="dueDate"
                value={editedTask.dueDate || ""}
                onChange={handleChange}
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

        <div className="hz-row hz-jc-end hz-gap-2 hz-mt-5">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailModal;
