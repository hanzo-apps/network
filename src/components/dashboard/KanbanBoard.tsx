
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DummyTaskData } from "./data";
import { TaskDetailModal } from "./task-detail";
import { toast } from "sonner";
import { Task } from "./data/tasks/task-data";
import KanbanColumn from "./kanban/KanbanColumn";
import KanbanAddTaskButton from "./kanban/KanbanAddTaskButton";
import { Clock, CheckCircle, Zap } from "lucide-react";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(DummyTaskData);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const columns = [
    {
      id: "backlog",
      title: "Backlog",
      icon: <Clock className="hz-sq-2 hz-fg-muted" />,
      tasks: tasks.filter(task => task.status === "backlog")
    },
    {
      id: "todo",
      title: "Todo",
      icon: <CheckCircle className="hz-sq-2 hz-fg-muted" />,
      tasks: tasks.filter(task => task.status === "todo")
    },
    {
      id: "in-progress",
      title: "In Progress",
      icon: <Zap className="hz-sq-2 hz-fg-muted" />,
      tasks: tasks.filter(task => task.status === "in-progress")
    },
    {
      id: "done",
      title: "Done",
      icon: <CheckCircle className="hz-sq-2 hz-fg-muted" />,
      tasks: tasks.filter(task => task.status === "done")
    }
  ];

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (columnId: string) => {
    if (draggedTask) {
      const updatedTasks = tasks.map(task => {
        if (task.id === draggedTask.id) {
          const updatedTask = { ...task, status: columnId };
          return updatedTask;
        }
        return task;
      });

      setTasks(updatedTasks);
      setDraggedTask(null);
      toast.success(`Task moved to ${columnId.replace("-", " ")}`);
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
    toast.success("Task updated successfully");
  };

  const handleAddTask = (columnId: string) => {
    const newTask: Task = {
      id: `${Date.now()}`,
      title: "New Task",
      status: columnId,
    };
    
    setTasks([...tasks, newTask]);
    setSelectedTask(newTask);
  };

  return (
    <div className="hz-h-full hz-scroll-x">
      <div className="hz-row hz-inline-4 hz-h-full hz-pb-6">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
            onDragStart={handleDragStart}
            onTaskClick={handleTaskClick}
            onAddTask={handleAddTask}
          />
        ))}
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
