
import React from "react";
import Trail from "./Trail";

interface TrailGeneratorProps {
  trailCount: number;
}

const TrailGenerator: React.FC<TrailGeneratorProps> = ({ trailCount }) => {
  const trails = [];
  
  for (let i = 0; i < trailCount; i++) {
    trails.push(<Trail key={`trail-${i}`} index={i} />);
  }
  
  return (
    <div className="hz-abs hz-inset hz-w-full hz-h-full hz-clip hz-no-pointer">
      {trails}
    </div>
  );
};

export default TrailGenerator;
