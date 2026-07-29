import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Info, X } from "lucide-react";
import { Link } from "react-router-dom";
import { principles } from "./data/zenPrinciples";

interface WisdomDialogProps {
  principle: {
    number: string;
    title: string;
    description: string;
    discipline: string;
    emoji: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const WisdomDialog: React.FC<WisdomDialogProps> = ({ principle, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="hz-fixed hz-inset hz-bg-surface hz-glass hz-z-overlay hz-row hz-ai-center hz-jc-center hz-p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="hz-card hz-mw-sm hz-w-full hz-shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hz-row hz-ai-start hz-jc-between hz-mb-4">
              <div className="hz-row hz-ai-center">
                <div className="hz-sq-5 hz-row hz-ai-center hz-jc-center hz-bg-quiet hz-r-full hz-fg hz-mr-3">
                  {principle.emoji}
                </div>
                <div>
                  <h3 className="hz-fg hz-t-xl hz-w-medium">{principle.title}</h3>
                  <div className="hz-fg-muted hz-t-sm">
                    {principle.discipline}
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="hz-fg-muted hz-transition hz-link"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="hz-mb-4 hz-fg hz-w-medium">
              "{principle.description}"
            </div>
            
            <div className="hz-fg-muted hz-t-sm">
              Deep mastery of this principle leads to engineering excellence. Apply it consistently to create systems that are elegant, resilient, and sustainable.
            </div>
            
            <div className="hz-mt-5 hz-pt-4 hz-border-t hz-align-center">
              <Link 
                to="/philosophy" 
                className="hz-fg-muted hz-transition hz-t-sm hz-row hz-ai-center hz-jc-center hz-link"
              >
                <span>Explore more principles</span>
                <ArrowRight className="hz-sq-1 hz-ml-2" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PrinciplesPreview = () => {
  const [selectedPrinciple, setSelectedPrinciple] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);

  // Get unique disciplines from principles
  const disciplines = Array.from(new Set(principles.map(p => p.discipline)));

  // Get 8 representative principles - one from each discipline
  const previewPrinciples = disciplines.map(discipline => {
    return principles.find(p => p.discipline === discipline);
  }).filter(Boolean);

  const openWisdomDialog = (principle: any) => {
    setSelectedPrinciple(principle);
    setIsDialogOpen(true);
  };

  const closeWisdomDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <section className="hz-py-7 hz-px-4 hz-rel" id="principles">
      <div 
        className="hz-abs hz-inset hz-no-pointer hz-dim-more"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(20,20,20,1) 100%)"
        }}
      />
      
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4 hz-chrome">
            Zen of Hanzo
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-fg-muted">
            Engineering principles rooted in ancient wisdom, designed for modern developers building 
            next-generation AI systems and applications.
          </p>
        </motion.div>
        
        {/* Discipline Filter */}
        <div className="hz-row hz-wrap hz-jc-center hz-gap-2 hz-mb-7">
          <button
            className={`hz-px-3 hz-py-1 hz-r-full hz-t-sm ${
              selectedDiscipline === null 
                ? "hz-bg-quiet hz-fg" 
                : "hz-bg-raised hz-fg-muted hz-link"
            } hz-transition`}
            onClick={() => setSelectedDiscipline(null)}
          >
            All
          </button>
          {disciplines.map(discipline => (
            <button
              key={discipline}
              className={`hz-px-3 hz-py-1 hz-r-full hz-t-sm ${
                selectedDiscipline === discipline 
                  ? "hz-bg-quiet hz-fg" 
                  : "hz-bg-raised hz-fg-muted hz-link"
              } hz-transition`}
              onClick={() => setSelectedDiscipline(discipline)}
            >
              {discipline}
            </button>
          ))}
        </div>
        
        <div className="hz-grid hz-grid-4 hz-gap-5">
          {(selectedDiscipline 
            ? previewPrinciples.filter(p => p?.discipline === selectedDiscipline)
            : previewPrinciples
          ).map((principle, index) => principle && (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                transition: { duration: 0.2 }
              }}
              className="hz-card hz-transition hz-rel hz-clip hz-card-interactive"
              onClick={() => openWisdomDialog(principle)}
            >
              <div className="hz-abs hz-fg-soft hz-invisible hz-transition">
                <Info size={16} />
              </div>
              
              <div className="hz-row hz-ai-center hz-mb-4">
                <div className="hz-sq-6 hz-r-full hz-bg-quiet hz-row hz-ai-center hz-jc-center hz-mr-3 hz-t-lg">
                  {principle.emoji}
                </div>
                <div>
                  <h3 className="hz-fg hz-t-lg hz-w-medium">{principle.title}</h3>
                  <div className="hz-fg-muted hz-t-sm">
                    {principle.discipline}
                  </div>
                </div>
              </div>
              <p className="hz-fg-muted hz-t-sm hz-mb-4">{principle.description}</p>
              
              <motion.div 
                className="hz-abs hz-inset hz-bg-quiet hz-invisible hz-transition hz-r-xl"
                initial={false}
                whileHover={{ scale: 1.05, opacity: 0.1 }}
              />
            </motion.div>
          ))}
        </div>
        
        <div className="hz-align-center hz-mt-7">
          <Link to="/philosophy" className="hz-inline hz-ai-center hz-fg-muted hz-transition hz-link">
            <span className="">Learn more principles</span>
            <ArrowRight className="hz-sq-2 hz-ml-2 hz-transition" />
          </Link>
        </div>
      </div>

      {selectedPrinciple && (
        <WisdomDialog 
          principle={selectedPrinciple} 
          isOpen={isDialogOpen} 
          onClose={closeWisdomDialog} 
        />
      )}
    </section>
  );
};

export default PrinciplesPreview;