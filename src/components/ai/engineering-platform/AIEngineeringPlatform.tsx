
import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import CloudInfrastructure from "./CloudInfrastructure";
import PlatformDashboard from "./PlatformDashboard";
import { featureData } from "@/components/base/ai-engineering/featureData";

const AIEngineeringPlatform: React.FC = () => {
  return (
    <section className="hz-py-7 hz-rel">
      <div className="hz-container">
        <div className="hz-align-center hz-mb-7">
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5 hz-chrome">
            AI Engineering Platform
          </h2>
          <p className="hz-container-narrow hz-t-lg hz-fg-soft">
            Build, deploy, and scale AI applications with an integrated suite of tools designed for modern engineering teams.
          </p>
        </div>

        <div className="hz-grid hz-grid-2 hz-gap-5 hz-mb-7">
          <div>
            <CloudInfrastructure />
          </div>
          <div>
            <PlatformDashboard />
          </div>
        </div>
        
        <div className="hz-grid hz-grid-4 hz-gap-5">
          {featureData.map((feature, index) => (
            <FeatureCard
              key={feature.title}
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

export default AIEngineeringPlatform;
