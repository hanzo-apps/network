
import React, { useRef, useEffect } from 'react';
import GlobeRenderer from './components/GlobeRenderer';

interface GlobeThreeJsProps {
  width: number;
  height: number;
}

const GlobeThreeJs: React.FC<GlobeThreeJsProps> = ({ width, height }) => {
  return (
    <div className="hz-rel hz-w-full hz-h-full">
      <GlobeRenderer width={width} height={height} />
      
      {/* Status indicator */}
      <div className="hz-abs hz-row hz-ai-center hz-inline-2">
        <div className="hz-sq-1 hz-bg-raised hz-r-full"></div>
        <span className="hz-t-xs hz-fg-muted">Live network traffic</span>
      </div>
    </div>
  );
};

export default GlobeThreeJs;
