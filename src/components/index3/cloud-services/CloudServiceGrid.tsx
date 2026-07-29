
import React from "react";
import CloudServiceCard from "./CloudServiceCard";
import { cloudServiceData } from "./cloudServiceData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArchitecturalBox, GridLines } from "@/components/ui/architectural-elements";

interface CloudServiceGridProps {
  isHovered: string | null;
  setIsHovered: (id: string | null) => void;
}

const CloudServiceGrid: React.FC<CloudServiceGridProps> = ({ isHovered, setIsHovered }) => {
  // Get all but the last item for regular display
  const mainServices = cloudServiceData.slice(0, 11);
  
  return (
    <div className="hz-stack-6 hz-rel">
      {/* Add architectural grid lines */}
      <div className="hz-abs hz-inset hz-z-behind">
        <GridLines spacing={60} opacity={0.15} color="rgba(59, 130, 246, 0.2)" />
      </div>
      
      <div className="hz-grid hz-grid-4 hz-gap-4">
        {/* Regular service cards */}
        {mainServices.map((service) => (
          <CloudServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            features={service.features}
            icon={service.icon}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            color={service.color}
          />
        ))}
        
        {/* Special "Learn More" card as the last item */}
        <Link
          to="/cloud"
          className="hz-card hz-transition hz-h-full hz-col hz-jc-center hz-ai-center hz-card-interactive"
          onMouseEnter={() => setIsHovered("learn-more")}
          onMouseLeave={() => setIsHovered(null)}
        >
          <div className="hz-align-center hz-stack-4">
            <div className="hz-sq-7 hz-mx-auto hz-bg-raised hz-r-full hz-row hz-ai-center hz-jc-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="hz-sq-4 hz-fg-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-fg">Explore More</h3>
            <p className="hz-fg-soft hz-t-sm">Discover our full range of cloud solutions and services</p>
            <Button 
              className="hz-mt-2 hz-fg hz-border-none"
              radius="full"
            >
              View All Services
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CloudServiceGrid;
