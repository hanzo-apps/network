
import React from "react";

interface PrioritySelectorProps {
  priority: "low" | "medium" | "high" | undefined;
  onChange: (priority: "low" | "medium" | "high") => void;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({ priority, onChange }) => {
  const priorityOptions = [
    { value: "low", label: "Low", color: "bg-gray-500" },
    { value: "medium", label: "Medium", color: "bg-neutral-500" },
    { value: "high", label: "High", color: "bg-neutral-600" }
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
