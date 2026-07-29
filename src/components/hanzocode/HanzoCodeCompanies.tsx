
import React from "react";
import { motion } from "framer-motion";

const HanzoCodeCompanies = () => {
  const companies = [
    { name: "Company 1", logo: "/img/28d53ec4-328f-4812-862b-b9a760bbabae.png" },
    { name: "Company 2", logo: "/img/28d53ec4-328f-4812-862b-b9a760bbabae.png" },
    { name: "Company 3", logo: "/img/28d53ec4-328f-4812-862b-b9a760bbabae.png" },
    { name: "Company 4", logo: "/img/28d53ec4-328f-4812-862b-b9a760bbabae.png" },
    { name: "Company 5", logo: "/img/28d53ec4-328f-4812-862b-b9a760bbabae.png" },
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg-overlay">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-6"
        >
          <p className="hz-t-xl hz-fg-muted">Trusted by engineers at</p>
        </motion.div>
        
        <div className="hz-row hz-wrap hz-jc-center hz-ai-center hz-gap-6">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-bh-5 hz-bw-8 hz-row hz-ai-center hz-jc-center"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="hz-bh-5 hz-object-contain hz-dim hz-transition"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HanzoCodeCompanies;
