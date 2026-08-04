
import React from "react";
import { motion } from "framer-motion";
import { Paintbrush, Code2, TestTube, FileCheck, Bug, Workflow } from "lucide-react";

const UseCases = () => {
  const useCases = [
    { name: "Design & Research", icon: <Paintbrush className="hz-sq-4" /> },
    { name: "Everyday Coding", icon: <Code2 className="hz-sq-4" /> },
    { name: "Automated Testing", icon: <TestTube className="hz-sq-4" /> },
    { name: "Automated Code Reviews", icon: <FileCheck className="hz-sq-4" /> },
    { name: "Bug-fixing", icon: <Bug className="hz-sq-4" /> },
    { name: "Self-healing CI/CD", icon: <Workflow className="hz-sq-4" /> }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div 
          className="hz-align-center hz-mb-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Use cases</h2>
          <div className="hz-container-narrow">
            <p className="hz-t-2xl hz-w-semibold hz-mb-2 hz-chrome">
              The Ultimate Developer Experience, Powered by AI
            </p>
            <p className="hz-t-lg hz-fg-soft">
              Hanzo is redefining the developer experience with AI-powered assistance for design, research, coding, reviews, debugging, and CI/CD. Let AI handle the mundane tasks and unlock your full potential.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="hz-grid hz-grid-3 hz-gap-4 hz-mb-7"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {useCases.map((useCase, index) => (
            <motion.div 
              key={index}
              className="hz-card hz-row hz-ai-center hz-gap-3 hz-transition hz-card-interactive"
              variants={item}
            >
              <div className="hz-p-2 hz-bg-raised hz-r-lg hz-fg-soft">
                {useCase.icon}
              </div>
              <span className="hz-w-medium">{useCase.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-7 hz-mt-7 hz-mb-7">
          <motion.div 
            className="hz-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="hz-t-xl hz-w-semibold hz-mb-4">Integrated AI Across the Software Development Lifecycle.</h3>
            <p className="hz-fg-soft">
              Reduce cycle times with the help of AI workflows throughout the entire software development lifecycle. Hanzo's AI Agents support teams at every stage from coding and testing, analyzing production errors and troubleshooting CI/CD pipelines.
            </p>
          </motion.div>

          <motion.div 
            className="hz-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="hz-t-xl hz-w-semibold hz-mb-4">One AI Platform for All Dev Tasks.</h3>
            <p className="hz-fg-soft hz-mb-5">
              Included in one subscription are dozens of built-in AI agentic workflows, carefully planned to perform developer tasks for you. Full-stack engineer? Of course. Bug fixes? Sure. Adding tests to existing code? No problem. UX/UI Improvements? Included. Generating user docs? That too.
            </p>
            <div className="hz-align-right">
              <a href="#learn-more" className="hz-fg-muted hz-inline hz-ai-center hz-link">
                Learn more <span className="hz-ml-1">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
