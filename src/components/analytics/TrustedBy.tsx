
import React from "react";
import { motion } from "framer-motion";

const clients = [
  { name: "AMD", delay: 0 },
  { name: "Accenture", delay: 0.1 },
  { name: "GM", delay: 0.2 },
  { name: "ESPN", delay: 0.3 },
  { name: "Siemens", delay: 0.4 },
  { name: "Intel", delay: 0.5 },
  { name: "Hulu", delay: 0.6 },
  { name: "VSP", delay: 0.7 }
];

const TrustedBy = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-6"
        >
          <h2 className="hz-t-2xl hz-w-medium hz-fg-muted">Trusted by Industry Leaders</h2>
        </motion.div>
        
        <div className="hz-row hz-wrap hz-jc-center hz-ai-center hz-gap-5 hz-px-4">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: client.delay }}
              className="hz-t-2xl hz-w-bold hz-chrome"
            >
              {client.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
