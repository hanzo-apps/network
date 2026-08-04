
import React from "react";
import { motion } from "framer-motion";

const techStacks = [
  "Phoenix Framework",
  "SvelteKit",
  "Ruby on Rails",
  "Docker",
  "Go",
  "Rust",
  "Django",
  "Laravel",
  "NextJS"
];

const TechStack = () => {
  return (
    <section id="learn-more" className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <div className="hz-row hz-wrap hz-jc-center hz-gap-6 hz-mb-7">
          {techStacks.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="hz-px-5 hz-py-3 hz-bg-raised hz-r-full hz-bordered hz-transition hz-hoverable"
            >
              {tech}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
            Developer-Focused Public Cloud
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            Help us build the next public cloud. No, seriously. Is your product something devs can take advantage of to ship better apps? Work with us.
          </p>
          
          <motion.a
            href="#contact"
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="hz-px-6 hz-py-4 hz-r-lg hz-bg-inverse hz-fg-inverse hz-w-medium hz-transition"
          >
            Build A Cloud For Developers
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
