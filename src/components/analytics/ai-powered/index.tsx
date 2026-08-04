
import React from "react";
import AIPoweredHeader from "./AIPoweredHeader";
import AIFeatureList from "./AIFeatureList";
import AIAnalysisDemo from "./AIAnalysisDemo";

const AIPowered = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
      <div className="hz-abs hz-inset"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <AIPoweredHeader />
        <AIFeatureList />
        <AIAnalysisDemo />
      </div>
    </section>
  );
};

export default AIPowered;
