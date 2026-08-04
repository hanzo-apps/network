
import React from "react";
import { motion } from "framer-motion";
import { HeadsetIcon, MessageCircle, BookOpen, FilePlus } from "lucide-react";

const UseCases = () => {
  const useCases = [
    {
      icon: HeadsetIcon,
      title: "AI Assistants",
      examples: ["Customer support agents", "Community moderators", "Personal assistants"]
    },
    {
      icon: MessageCircle,
      title: "Social Media Personas",
      examples: ["Automated content creators", "Brand representatives", "Influencers"]
    },
    {
      icon: BookOpen,
      title: "Knowledge Workers",
      examples: ["Research assistants", "Content analysts", "Document processors"]
    },
    {
      icon: FilePlus,
      title: "Interactive Characters",
      examples: ["Role-playing characters", "Educational tutors", "Entertainment bots"]
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
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">Use Cases</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Hanzo Bot can be used to create a wide variety of autonomous agents
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-4 hz-gap-5">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card hz-transition hz-card-interactive"
            >
              <div className="hz-bg-raised hz-p-3 hz-r-lg hz-mb-4">
                <useCase.icon className="hz-sq-4 hz-fg-muted" />
              </div>
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-4">{useCase.title}</h3>
              <ul className="hz-stack-2">
                {useCase.examples.map((example, i) => (
                  <li key={i} className="hz-fg-muted hz-row hz-ai-center">
                    <span className="hz-sq-1 hz-bg-raised hz-r-full hz-mr-2"></span>
                    {example}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
