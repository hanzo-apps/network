
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
import TaskCard from "../TaskCard";
import KanbanAddTaskButton from "./KanbanAddTaskButton";
import { Task } from "../data/tasks/task-data";

interface KanbanColumnProps {
  column: {
    id: string;
    title: string;
    icon: React.ReactNode;
    tasks: Task[];
  };
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: () => void;
  onDragStart: (task: Task) => void;
  onTaskClick: (task: Task) => void;
  onAddTask: (columnId: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onDragOver,
  onDrop,
  onDragStart,
  onTaskClick,
  onAddTask
}) => {
  return (
    <div 
      key={column.id} 
      className="hz-bw-8 hz-col hz-bg hz-r-lg"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="hz-row hz-ai-center hz-jc-between hz-p-3 hz-border-b">
        <div className="hz-row hz-ai-center">
          {column.icon}
          <h3 className="hz-w-medium hz-ml-2">{column.title}</h3>
          <span className="hz-t-sm hz-fg-muted hz-ml-1">{column.tasks.length}</span>
        </div>
        <div className="hz-row hz-ai-center">
          <Button size="icon" variant="ghost" className="hz-sq-4 hz-fg-muted hz-link" onClick={() => onAddTask(column.id)}>
            <Plus className="hz-sq-2" />
          </Button>
          <Button size="icon" variant="ghost" className="hz-sq-4 hz-fg-muted hz-link">
            <MoreHorizontal className="hz-sq-2" />
          </Button>
        </div>
      </div>
      <div className="hz-grow hz-scroll-y hz-p-2 hz-stack-2">
        {column.tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={() => onDragStart(task)}
            onClick={() => onTaskClick(task)}
            className="hz-pointer"
          >
            <TaskCard task={task} />
          </div>
        ))}
        <KanbanAddTaskButton onAddTask={() => onAddTask(column.id)} />
      </div>
    </div>
  );
};

export default KanbanColumn;
