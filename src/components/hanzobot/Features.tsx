
import React from "react";
import { motion } from "framer-motion";
import { Bot, Braces, Users, Database, FileText, Image, Code, Layers } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Bot,
      title: "Platform Integration",
      description: "Clients for Discord, X (Twitter), Telegram, and many other platforms"
    },
    {
      icon: Braces,
      title: "Flexible Model Support",
      description: "Use Deepseek, Ollama, Grok, OpenAI, Anthropic, Gemini, LLama, and more"
    },
    {
      icon: Users,
      title: "Character System",
      description: "Create diverse agents using characterfiles with unique personalities"
    },
    {
      icon: Layers,
      title: "Multi-Agent Architecture",
      description: "Manage multiple unique AI personalities simultaneously"
    },
    {
      icon: Database,
      title: "Memory Management",
      description: "Easily ingest and interact with documents using RAG for better context"
    },
    {
      icon: Image,
      title: "Media Processing",
      description: "PDF, URLs, Audio, Video, Image analysis, and Conversation summarization"
    },
    {
      icon: Code,
      title: "Technical Foundation",
      description: "100% TypeScript implementation with modular, extensible architecture"
    },
    {
      icon: FileText,
      title: "Comprehensive API",
      description: "Well-documented interfaces for extending and customizing behavior"
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">Key Features</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Designed with flexibility and extensibility in mind to power the next generation of AI agents
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-4 hz-gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card hz-transition hz-card-interactive"
            >
              <feature.icon className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">{feature.title}</h3>
              <p className="hz-fg-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
