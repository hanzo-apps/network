
import React from "react";
import { Slider } from "@/components/ui/slider";

interface ResourceSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: number;
  onChange: (value: number[]) => void;
  min: number;
  max: number;
  cost: number;
  unit: string;
}

const ResourceSection = ({
  icon,
  title,
  description,
  value,
  onChange,
  min,
  max,
  cost,
  unit
}: ResourceSectionProps) => {
  return (
    <div className="hz-card hz-card-interactive">
      <div className="hz-row hz-ai-center hz-gap-3 hz-mb-4">
        <div className="hz-fg-muted">
          {icon}
        </div>
        <div>
          <h3 className="hz-w-medium">{title}</h3>
          <p className="hz-t-sm hz-fg-muted">{description}</p>
        </div>
      </div>

      <div className="hz-stack-4">
        <div className="hz-row hz-jc-between hz-ai-center">
          <span className="hz-t-sm hz-fg-muted">{value} {unit}</span>
          <span className="hz-w-semibold">${cost.toFixed(2)}/mo</span>
        </div>

        <Slider
          value={[value]}
          onValueChange={onChange}
          min={min}
          max={max}
          step={1}
          className="hz-mt-4 hz-mb-4"
        />

        <div className="hz-row hz-jc-between hz-t-xs hz-fg-muted">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceSection;
