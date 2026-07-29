
import React from "react";
import ModelHeader from "./models/ModelHeader";
import ModelCategory from "./models/ModelCategory";
import AdditionalFeatures from "./models/AdditionalFeatures";
import modelCategories from "./models/data/modelData";

const SupportedModels = () => {
  return (
    <section className="hz-py-7 hz-rel hz-clip">
      <div className="hz-container hz-rel hz-z-raised">
        <ModelHeader />

        {/* Model Categories */}
        {modelCategories.map((category, categoryIndex) => (
          <ModelCategory 
            key={categoryIndex} 
            category={category} 
            categoryIndex={categoryIndex} 
          />
        ))}

        {/* Additional Features Section */}
        <AdditionalFeatures />
      </div>
    </section>
  );
};

export default SupportedModels;
