
import React from "react";
import { motion } from "framer-motion";

interface MainSectionProps {
  children: React.ReactNode;
}

const MainSection: React.FC<MainSectionProps> = ({ children }) => {
  return (
    <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
      <div className="hz-container">
        <div className="hz-align-center hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-5">
              Open Source AI Engineering
            </div>
            <h2 className="hz-t-4xl hz-w-bold hz-fg hz-mb-5">
              Build the Future with AI
            </h2>
            <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
              A complete platform for developers to build, deploy, and scale AI
              applications with unprecedented speed and complete control.
            </p>
          </motion.div>
        </div>

        {children}
      </div>
    </section>
  );
};

export default MainSection;
