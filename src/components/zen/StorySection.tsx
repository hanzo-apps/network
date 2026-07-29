
import React from "react";
import { motion } from "framer-motion";

const StorySection = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Our Story</h2>
          <div className="hz-bh-1 hz-bw-8 hz-bg-raised hz-mx-auto"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-card hz-glass hz-stack-4"
        >
          <p className="hz-fg-soft hz-leading-relaxed">
            Hanzo began as Crowdstart, a small, hungry team driving explosive product launches—most notably, 
            the record-breaking SKULLY Technologies AR-1 helmet on Indiegogo, raising millions and demonstrating 
            the immense power of data-driven innovation. That success signaled we were onto something special.
          </p>
          
          <p className="hz-fg-soft hz-leading-relaxed">
            We soon evolved into Hanzo AI, incubated by Techstars, pioneering intelligent e-commerce, 
            AI-driven marketing, and blockchain innovation. Our tools democratized technology previously 
            reserved for giants, enabling startups and enterprises alike to scale beyond expectation. 
            Under the leadership of co-founders Zach Kelling (Founding CTO) and Michael Kelling 
            (original co-founder, current CEO), Hanzo became synonymous with turning ambitious ideas into reality.
          </p>
          
          <p className="hz-fg-soft hz-leading-relaxed">
            Today, as Hanzo Industries, we fuse AI and engineering discipline to build powerful platforms, 
            open-source tools, and autonomous AI solutions—fueling the next generation of innovation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;
