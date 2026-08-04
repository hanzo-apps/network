
import React from "react";
import SectionHeader from "./SectionHeader";
import ZenPrinciplesList from "./ZenPrinciplesList";
import { principles } from "./data/zenPrinciples";
import { manifestoDescription } from "./data/manifestoText";

const ManifestoSection = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <SectionHeader 
          title="Our Manifesto" 
          description={manifestoDescription}
        />
        
        <ZenPrinciplesList principles={principles} groupByDiscipline={true} />
      </div>
    </section>
  );
};

export default ManifestoSection;
