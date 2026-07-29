
import React from "react";
import { motion } from "framer-motion";

const clients = [
  { name: "Damon", delay: 0 },
  { name: "Triller", delay: 0.1 },
  { name: "Zoo", delay: 0.2 },
  { name: "Skully", delay: 0.3 },
  { name: "Bellabeat", delay: 0.4 },
  { name: "Lifemed AI", delay: 0.5 }
];

const testimonial = {
  quote: "Hanzo accelerated our innovation beyond what we thought possible, helping us launch groundbreaking AI applications at scale.",
  author: "Sarah Chen",
  role: "CTO, Damon Motorcycles"
};

const TrustedBy = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Trusted Globally</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Industry leaders trust Hanzo Payments to manage their complex financial operations.
          </p>
        </motion.div>
        
        <div className="hz-row hz-wrap hz-jc-center hz-ai-center hz-gap-5 hz-px-4 hz-mb-7">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-container-narrow hz-card"
        >
          <div className="hz-col hz-ai-center hz-align-center">
            <div className="hz-t-5xl hz-fg-muted hz-mb-4">"</div>
            <p className="hz-t-xl hz-fg hz-italic hz-mb-5">
              {testimonial.quote}
            </p>
            <div className="hz-mt-4">
              <p className="hz-w-semibold">{testimonial.author}</p>
              <p className="hz-fg-muted hz-t-sm">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>

        <div className="hz-grid hz-grid-4 hz-mt-7 hz-gap-4 hz-align-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="hz-p-4"
          >
            <div className="hz-t-3xl hz-w-bold hz-fg-muted hz-mb-2">200+</div>
            <div className="hz-fg-muted">Currencies Supported</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-p-4"
          >
            <div className="hz-t-3xl hz-w-bold hz-fg-muted hz-mb-2">99.99%</div>
            <div className="hz-fg-muted">Uptime SLA</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-p-4"
          >
            <div className="hz-t-3xl hz-w-bold hz-fg-muted hz-mb-2">190+</div>
            <div className="hz-fg-muted">Countries Served</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hz-p-4"
          >
            <div className="hz-t-3xl hz-w-bold hz-fg-muted hz-mb-2">24/7</div>
            <div className="hz-fg-muted">Global Support</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
