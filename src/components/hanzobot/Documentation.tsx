
import React from "react";
import { motion } from "framer-motion";
import { Rocket, HelpCircle, BookOpen, GraduationCap, Folder, Star, List, Book } from "lucide-react";

const Documentation = () => {
  const docs = [
    {
      title: "Getting Started",
      icon: Rocket,
      items: ["Quick Start", "FAQ", "CHANGELOG", "Tutorials"]
    },
    {
      title: "Core Concepts",
      icon: BookOpen,
      items: ["Overview", "Character Files", "Clients", "Agent Runtime", "Plugins", "Providers", "Actions", "Evaluators", "Database Adapters"]
    },
    {
      title: "Guides",
      icon: Book,
      items: ["Configuration", "Deployment", "Fine-tuning", "Secrets Management", "Memory Management", "WSL Setup"]
    },
    {
      title: "Advanced Topics",
      icon: GraduationCap,
      items: ["Trust Engine", "Autonomous Trading", "Hanzo in TEE", "Verified Inference"]
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">Documentation</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Comprehensive guides to help you build, deploy, and manage your agents
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-4 hz-gap-5">
          {docs.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card"
            >
              <div className="hz-row hz-ai-center hz-mb-4">
                <section.icon className="hz-sq-3 hz-fg-muted hz-mr-2" />
                <h3 className="hz-t-lg hz-w-semibold hz-fg">{section.title}</h3>
              </div>
              
              <ul className="hz-stack-2">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a 
                      href="#" 
                      className="hz-fg-muted hz-transition hz-row hz-ai-center hz-py-1 hz-link"
                    >
                      <div className="hz-sq-1 hz-bg-raised hz-r-full hz-mr-2"></div>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hz-mt-6 hz-align-center"
        >
          <a 
            href="#" 
            className="hz-inline hz-ai-center hz-fg-muted hz-link"
          >
            <Book className="hz-sq-3 hz-mr-2" />
            View Complete Documentation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Documentation;
