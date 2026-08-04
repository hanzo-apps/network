
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

interface Assignee {
  id: string;
  name: string;
  avatar?: string;
}

interface AssigneesListProps {
  assignees?: Assignee[];
  onRemove?: (id: string) => void;
}

const AssigneesList: React.FC<AssigneesListProps> = ({ assignees = [], onRemove }) => {
  return (
    <div className="hz-mb-5">
      <div className="hz-row hz-jc-between hz-mb-2">
        <label className="hz-t-sm hz-w-medium hz-fg-muted">Assignees</label>
        <Button size="sm" variant="ghost" className="hz-fg-muted hz-bh-4 hz-px-2 hz-link">
          <PlusCircle className="hz-sq-2 hz-mr-1" />
          Add
        </Button>
      </div>
      <div className="hz-row hz-wrap hz-gap-2">
        {assignees.map(assignee => (
          <div 
            key={assignee.id}
            className="hz-row hz-ai-center hz-gap-2 hz-bg-raised hz-px-2 hz-py-1 hz-r-md hz-t-sm"
          >
            <div className="hz-sq-3 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-t-xs">
              {assignee.name.charAt(0)}
            </div>
            <span>{assignee.name}</span>
            <button 
              className="hz-fg-muted hz-link"
              onClick={() => onRemove && onRemove(assignee.id)}
            >
              <X className="hz-sq-1" />
            </button>
          </div>
        ))}
        {!assignees.length && (
          <div className="hz-t-sm hz-fg-muted">No assignees</div>
        )}
      </div>
    </div>
  );
};

export default AssigneesList;
