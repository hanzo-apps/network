
import React from "react";
import { motion } from "framer-motion";

const TrustedBy = () => {
  const companies = [
    "Mozilla", "GitHub", "1Password", "PwC", "Pika", "Humata", 
    "Krea", "Udio", "LangChain", "Resend", "Loops", "Mobbin", 
    "Gopuff", "Chatbase", "Betashares"
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface">
      <div className="hz-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-6"
        >
          <h2 className="hz-t-2xl hz-w-semibold hz-fg hz-mb-2">Trusted Worldwide</h2>
          <div className="hz-bw-8 hz-bh-1 hz-bg-raised hz-mx-auto"></div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hz-row hz-wrap hz-jc-center hz-gap-6 hz-gap-4"
        >
          {companies.map((company, index) => (
            <div 
              key={index} 
              className="hz-fg-muted hz-w-medium hz-t-lg hz-transition hz-link"
            >
              {company}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;
