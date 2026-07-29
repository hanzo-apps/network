
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TaskDetailContent from "./TaskDetailContent";
import { Task } from "../data/tasks/task-data";

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask(prev => ({ ...prev, title: e.target.value }));
  };

  const handleTaskChange = (field: string, value: any) => {
    setEditedTask(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(editedTask);
  };

  return (
    <Dialog open={!!task} onOpenChange={() => onClose()}>
      <DialogContent className="hz-mw-md">
        <DialogHeader>
          <DialogTitle>
            <Input 
              value={editedTask.title}
              onChange={handleTitleChange}
              className="hz-t-xl hz-w-semibold hz-mt-2 hz-bg-none hz-border-none hz-px-0"
            />
          </DialogTitle>
        </DialogHeader>

        <TaskDetailContent 
          task={editedTask} 
          onTaskChange={handleTaskChange} 
        />

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
