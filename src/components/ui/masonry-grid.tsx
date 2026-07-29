
import React, { useEffect, useState } from "react";

interface MasonryGridProps {
  children: React.ReactNode[];
  columns?: number;
  gap?: number;
  className?: string;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  columns = 3,
  gap = 20,
  className = ""
}) => {
  const [columnCount, setColumnCount] = useState(columns);
  
  // Responsive column adjustment
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnCount(1);
      } else if (width < 768) {
        setColumnCount(2);
      } else {
        setColumnCount(columns);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columns]);

  // Distribute children into columns
  const columnItems: React.ReactNode[][] = Array.from({ length: columnCount }, () => []);
  
  children.forEach((child, index) => {
    const columnIndex = index % columnCount;
    columnItems[columnIndex].push(
      <div 
        key={index} 
        className="hz-mb-4"
        style={{ marginBottom: `${gap}px` }}
      >
        {child}
      </div>
    );
  });

  return (
    <div 
      className={`hz-row hz-w-full ${className}`} 
      style={{ gap: `${gap}px` }}
    >
      {columnItems.map((column, index) => (
        <div 
          key={index} 
          className="hz-grow hz-col"
        >
          {column}
        </div>
      ))}
    </div>
  );
};

export const MasonryItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div className={`hz-w-full hz-clip ${className}`}>
      {children}
    </div>
  );
};
