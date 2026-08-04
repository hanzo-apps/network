
import React from "react";
import { motion } from "framer-motion";
import TaijiSymbol from "./svg/TaijiSymbol";

interface ZenQuoteSectionProps {
  quote: string;
  attribution?: string;
}

const ZenQuoteSection: React.FC<ZenQuoteSectionProps> = ({ quote, attribution }) => {
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
              <TaijiSymbol size={48} className="hz-fg" animate={true} />
            </div>
            
            <p className="hz-container-narrow hz-mw-md hz-fg-soft hz-leading-relaxed hz-mb-6">
              "{quote}"
            </p>
            
            <div className="hz-bw-8 hz-mx-auto hz-mb-4"></div>
            
            {attribution && (
              <p className="hz-fg-muted hz-t-sm hz-italic">
                {attribution}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ZenQuoteSection;
