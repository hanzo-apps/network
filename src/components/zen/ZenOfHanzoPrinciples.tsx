import React, { useState } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ZenPrincipleCard from "./ZenPrincipleCard";
import { principles } from "./data/zenPrinciples";

const ZenOfHanzoPrinciples: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  
  // Get unique disciplines from principles data
  const disciplines = Array.from(new Set(principles.map(p => p.discipline)));

  const filteredPrinciples = selectedDiscipline
    ? principles.filter(p => p.discipline === selectedDiscipline)
    : principles;

  return (
    <div className="hz-mt-7 hz-mb-7 hz-px-4" id="principles">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hz-align-center hz-mb-7"
      >
        <h2 className="hz-t-3xl hz-w-bold hz-mb-4 hz-fg">Our Principles</h2>
        <p className="hz-container-narrow hz-t-lg hz-fg-muted">
          Time-tested principles guiding the development of next-generation AI systems and applications
        </p>
        <div className="hz-bw-8 hz-bg-raised hz-mx-auto hz-mt-5"></div>
      </motion.div>

      {/* Sticky Discipline Filter */}
      <div className="hz-sticky hz-top-0 hz-z-header hz-bg-overlay hz-glass hz-border-b hz-py-5 hz-mb-6">
        <div className="hz-row hz-wrap hz-jc-center hz-gap-2">
          <button
            className={`hz-px-4 hz-py-2 hz-r-full hz-t-sm hz-w-medium hz-transition ${
              selectedDiscipline === null 
                ? "hz-bg-inverse hz-fg-inverse hz-shadow-lg" 
                : "hz-bg-raised hz-fg-muted hz-link"
            }`}
            onClick={() => setSelectedDiscipline(null)}
          >
            All Disciplines
          </button>
          {disciplines.map(discipline => (
            <button
              key={discipline}
              className={`hz-px-4 hz-py-2 hz-r-full hz-t-sm hz-w-medium hz-transition ${
                selectedDiscipline === discipline 
                  ? "hz-bg-inverse hz-fg-inverse hz-shadow-lg" 
                  : "hz-bg-raised hz-fg-muted hz-link"
              }`}
              onClick={() => setSelectedDiscipline(discipline)}
            >
              {discipline}
            </button>
          ))}
        </div>
        
        {/* Display count of displayed principles */}
        <div className="hz-align-center hz-mt-4 hz-fg-muted hz-t-sm">
          {selectedDiscipline ? (
            <p>Showing principles from the {selectedDiscipline} discipline</p>
          ) : (
            <p>Showing all engineering principles across {disciplines.length} disciplines</p>
          )}
        </div>
      </div>

      <div className="hz-grid hz-grid-4 hz-container hz-gap-5">
        {filteredPrinciples.map((principle, index) => (
          <ZenPrincipleCard 
            key={principle.number} 
            principle={principle} 
            index={index} 
          />
        ))}
      </div>
      
      <div className="hz-align-center hz-mt-7">
        <div className="hz-container-narrow hz-card">
          <h3 className="hz-t-2xl hz-w-semibold hz-mb-4">Apply These Principles</h3>
          <p className="hz-fg-muted hz-mb-5">
            Ready to build with these principles? Explore our documentation, try our models, or dive into our open-source platform.
          </p>
          <div className="hz-col-row hz-gap-4 hz-jc-center">
            <a
              href="https://docs.hanzo.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hz-px-5 hz-py-3 hz-bg-inverse hz-fg-inverse hz-r-lg hz-transition hz-hoverable"
            >
              Read Documentation
            </a>
            <a
              href="/platform"
              className="hz-px-5 hz-py-3 hz-bg-none hz-bordered hz-fg hz-r-lg hz-transition hz-hoverable"
            >
              Explore Platform
            </a>
            <a
              href="https://github.com/hanzoai"
              target="_blank"
              rel="noopener noreferrer"
              className="hz-px-5 hz-py-3 hz-bg-none hz-bordered hz-fg hz-r-lg hz-transition hz-hoverable"
            >
              Open Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZenOfHanzoPrinciples;