
import React from "react";
import AIEngineeringHeader from "./AIEngineeringHeader";
import ExpandableFeatureCard from "../../ai/engineering-platform/ExpandableFeatureCard";
import { featureData } from "./featureData";

const AIEngineering = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <AIEngineeringHeader />
        
        <div className="hz-grid hz-grid-2 hz-gap-7">
          {featureData.map((feature, index) => (
            <ExpandableFeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              featurePoints={feature.featurePoints}
              delay={feature.delay}
              iconBgClass={feature.iconBgClass}
              iconTextClass={feature.iconTextClass}
              bulletColor={feature.bulletColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIEngineering;
