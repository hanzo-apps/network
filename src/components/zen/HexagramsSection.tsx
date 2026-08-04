
import React from "react";
import { motion } from "framer-motion";
import HexagramsGrid from "./HexagramsGrid";

const HexagramsSection = () => {
  return (
    <section className="hz-py-7 hz-px-4" id="principles">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-6"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4 hz-chrome">
            Zen of Hanzo
          </h2>
          <p className="hz-container-narrow hz-t-lg hz-fg-muted">
            Engineering principles for building next-generation AI systems
          </p>
        </motion.div>
        
        <HexagramsGrid />
      </div>
    </section>
  );
};

export default HexagramsSection;
