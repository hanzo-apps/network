
import React from "react";

interface PrioritySelectorProps {
  priority: "low" | "medium" | "high" | undefined;
  onChange: (priority: "low" | "medium" | "high") => void;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({ priority, onChange }) => {
  const priorityOptions = [
    { value: "low", label: "Low", color: "hz-bg-surface" },
    { value: "medium", label: "Medium", color: "hz-bg-surface" },
    { value: "high", label: "High", color: "hz-bg-surface" }
  ];

  return (
    <div>
      <label className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-1">Priority</label>
      <div className="hz-stack-1">
        {priorityOptions.map(option => (
          <div 
            key={option.value}
            className={`hz-btn hz-btn-ghost hz-pointer ${
              priority === option.value 
                ? 'hz-bg-raised' 
                : 'hz-hoverable'
            }`}
            onClick={() => onChange(option.value as "low" | "medium" | "high")}
          >
            <div className={`hz-sq-1 hz-r-full ${option.color} hz-mr-2`}></div>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrioritySelector;
