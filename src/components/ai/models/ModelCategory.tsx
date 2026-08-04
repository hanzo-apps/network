import React from "react";
import ModelCategoryCard from "./ModelCategoryCard";

interface ModelData {
  name: string;
  provider: string;
  features: string[];
  description?: string;
}

interface ModelCategoryProps {
  category: {
    name: string;
    description: string;
    models: ModelData[];
  };
  categoryIndex: number;
}

const ModelCategory = ({ category, categoryIndex }: ModelCategoryProps) => {
  return (
    <div key={categoryIndex} className="hz-mb-7">
      <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-4">{category.name}</h3>
      <p className="hz-fg-soft hz-mb-6">{category.description}</p>
      
      <div className="hz-grid hz-grid-3 hz-gap-5">
        {category.models.map((model, modelIndex) => (
          <ModelCategoryCard 
            key={modelIndex} 
            model={model} 
            modelIndex={modelIndex} 
            categoryIndex={categoryIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default ModelCategory;