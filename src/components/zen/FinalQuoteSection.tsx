
import React from "react";
import { motion } from "framer-motion";
import TaijiSymbol from "./svg/TaijiSymbol";

const FinalQuoteSection = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-narrow">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="hz-align-center"
        >
          <div className="hz-card hz-rel hz-glass">
            <div className="hz-center-x hz-abs hz-top-0">
              <TaijiSymbol size={64} className="hz-fg" animate={true} />
            </div>
            
            <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-5">The Zen of Hanzo</h3>
            <p className="hz-container-narrow hz-mw-md hz-fg-soft hz-leading-relaxed hz-mb-6">
              "Before code, there is concept. Before concept, there is principle. 
              Before principle, there is emptiness. From emptiness, all possibility."
            </p>
            
            <div className="hz-bw-8 hz-mx-auto hz-mb-5"></div>
            
            <p className="hz-fg-muted hz-t-sm hz-italic">
              Ancient wisdom meets modern engineering
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalQuoteSection;
