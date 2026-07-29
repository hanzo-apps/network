
import React from "react";

interface StatusSelectorProps {
  status: string;
  onChange: (status: string) => void;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({ status, onChange }) => {
  const statusOptions = [
    { value: "backlog", label: "Backlog" },
    { value: "todo", label: "Todo" },
    { value: "in-progress", label: "In Progress" },
    { value: "done", label: "Done" }
  ];

  return (
    <div>
      <label className="hz-t-sm hz-w-medium hz-fg-muted hz-mb-1">Status</label>
      <div className="hz-stack-1">
        {statusOptions.map(option => (
          <div 
            key={option.value}
            className={`hz-px-3 hz-py-2 hz-r-md hz-pointer ${
              status === option.value 
                ? 'hz-bg-raised hz-bordered' 
                : 'hz-hoverable'
            }`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusSelector;
