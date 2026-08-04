
import React, { useEffect, useRef } from "react";
import { useCanvasContext } from "./CanvasContext";

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { 
    globeRadius,
    centerX,
    centerY,
    setCanvasContext,
    connectionPoints,
    drawGlobe
  } = useCanvasContext();

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    setCanvasContext(ctx);
  }, [setCanvasContext]);

  useEffect(() => {
    drawGlobe();
  }, [drawGlobe, connectionPoints]);

  return (
    <canvas 
      ref={canvasRef} 
      width={width}
      height={height}
      className="hz-abs hz-inset hz-w-full hz-h-full"
    />
  );
};

export default Canvas;
