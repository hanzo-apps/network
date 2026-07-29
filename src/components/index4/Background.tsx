
import React from "react";
import { GridLines } from "@/components/ui/architectural-elements";

const Background = () => {
  console.log("Background component rendering");
  return (
    <>
      {/* Subtle grid background */}
      <GridLines spacing={40} opacity={0.07} className="hz-fixed hz-inset hz-z-behind" />
      
      {/* Subtle gradient accents */}
      <div className="hz-fixed hz-inset hz-z-behind hz-dim-more">
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
        <div className="hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      </div>
    </>
  );
};

export default Background;
