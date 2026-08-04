
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

interface Label {
  id: string;
  name: string;
  color: string;
}

interface LabelsListProps {
  labels?: Label[];
  onRemove?: (id: string) => void;
}

const LabelsList: React.FC<LabelsListProps> = ({ labels = [], onRemove }) => {
  return (
    <div className="hz-mb-5">
      <div className="hz-row hz-jc-between hz-mb-2">
        <label className="hz-t-sm hz-w-medium hz-fg-muted">Labels</label>
        <Button size="sm" variant="ghost" className="hz-fg-muted hz-bh-4 hz-px-2 hz-link">
          <PlusCircle className="hz-sq-2 hz-mr-1" />
          Add
        </Button>
      </div>
      <div className="hz-row hz-wrap hz-gap-2">
        {labels.map(label => (
          <div 
            key={label.id}
            className="hz-row hz-ai-center hz-gap-2 hz-px-2 hz-py-1 hz-r-md hz-t-sm"
            style={{ backgroundColor: `${label.color}20`, color: label.color }}
          >
            <span>{label.name}</span>
            <button onClick={() => onRemove && onRemove(label.id)}>
              <X className="hz-sq-1" />
            </button>
          </div>
        ))}
        {!labels.length && (
          <div className="hz-t-sm hz-fg-muted">No labels</div>
        )}
      </div>
    </div>
  );
};

export default LabelsList;
