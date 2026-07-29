
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface KanbanAddTaskButtonProps {
  onAddTask: () => void;
}

const KanbanAddTaskButton: React.FC<KanbanAddTaskButtonProps> = ({ onAddTask }) => {
  return (
    <Button 
      className="hz-w-full hz-jc-start hz-fg-muted hz-bordered hz-bg hz-link" 
      variant="outline"
      onClick={onAddTask}
    >
      <Plus className="hz-sq-2 hz-mr-2" />
      Add Task
    </Button>
  );
};

export default KanbanAddTaskButton;
