
import React from "react";
import ModelHeader from "./models/ModelHeader";
import ModelCard from "./models/ModelCard";
import ModelFooter from "./models/ModelFooter";
import { operatorModels } from "./models/operatorModelData";

const OperativeModels = () => {
  return (
    <section className="hz-py-7 hz-rel hz-clip">
      {/* Background gradient */}
      <div className="hz-abs hz-inset"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <ModelHeader />
        
        <div className="hz-grid hz-grid-3 hz-gap-5">
          {operatorModels.map((model, index) => (
            <ModelCard 
              key={index}
              model={model} 
              index={index} 
            />
          ))}
        </div>
        
        <ModelFooter />
      </div>
    </section>
  );
};

export default OperativeModels;
