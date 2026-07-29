
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ServiceCards: React.FC = () => {
  return (
    <div className="hz-grid hz-grid-2 hz-gap-5 hz-mt-7">
      {/* Hanzo Agency Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hz-card hz-rel hz-clip"
      >
        <div className="hz-row hz-ai-center hz-gap-4 hz-mb-4">
          <div className="hz-p-3 hz-bg-raised hz-r-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hz-fg-soft">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="hz-t-2xl hz-w-bold hz-fg">Hanzo Agency</h3>
        </div>
        <p className="hz-fg-soft hz-mb-5">
          Elevate your brand with our AI-powered creative agency. We craft cutting-edge digital experiences that captivate audiences and deliver measurable business results.
        </p>
        <a href="/agency" className="hz-inline hz-ai-center hz-fg-soft hz-transition hz-hoverable">
          <span className="hz-mr-2">Learn more</span>
          <ArrowRight className="hz-sq-2 hz-transition" />
        </a>
      </motion.div>
      
      {/* Sensei Group Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hz-card hz-rel hz-clip"
      >
        <div className="hz-row hz-ai-center hz-gap-4 hz-mb-4">
          <div className="hz-p-3 hz-bg-raised hz-r-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hz-fg-soft">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="hz-t-2xl hz-w-bold hz-fg">Sensei Group</h3>
        </div>
        <p className="hz-fg-soft hz-mb-5">
          Accelerate enterprise transformation with our elite collective of CXOs and technology experts. We guide organizations through digital evolution with strategic implementation.
        </p>
        <a href="/sensei" className="hz-inline hz-ai-center hz-fg-soft hz-transition hz-hoverable">
          <span className="hz-mr-2">Learn more</span>
          <ArrowRight className="hz-sq-2 hz-transition" />
        </a>
      </motion.div>
    </div>
  );
};

export default ServiceCards;
