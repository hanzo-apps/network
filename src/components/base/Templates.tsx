
import React from "react";
import { motion } from "framer-motion";
import { CreditCard, MessageSquare, Globe, Phone, RefreshCw, Code } from "lucide-react";

const Templates = () => {
  const templates = [
    {
      title: "Billing Subscriptions Starter",
      description: "Complete SaaS subscription management with billing integration",
      icon: CreditCard,
      color: "from-neutral-500 to-neutral-700"
    },
    {
      title: "Next.js App Router with Authentication",
      description: "Secure, fast Next.js application with built-in authentication",
      icon: Globe,
      color: "from-neutral-500 to-neutral-700"
    },
    {
      title: "AI Chatbot Template",
      description: "Intelligent chatbot with natural language processing capabilities",
      icon: MessageSquare,
      color: "from-neutral-500 to-neutral-700"
    },
    {
      title: "LangChain and Next.js Starter",
      description: "LLM-powered application with LangChain and Next.js integration",
      icon: RefreshCw,
      color: "from-neutral-500 to-neutral-700"
    },
    {
      title: "Flutter User Management",
      description: "Cross-platform Flutter app with complete user management",
      icon: Phone,
      color: "from-neutral-500 to-neutral-700"
    },
    {
      title: "Expo React Native Starter",
      description: "Mobile-first React Native application with Expo framework",
      icon: Code,
      color: "from-neutral-500 to-neutral-700"
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">Ready-to-Use Templates</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Jump-start your development with production-ready templates
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-5">
          {templates.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-bg-raised hz-r-lg hz-clip hz-bordered hz-transition hz-hoverable"
            >
              <div className={`hz-bh-1 ${template.color}`}></div>
              <div className="hz-p-5">
                <div className="hz-row hz-ai-center hz-mb-4">
                  <template.icon className="hz-sq-4 hz-mr-3 hz-fg-muted hz-transition hz-link" />
                  <h3 className="hz-t-xl hz-w-semibold hz-fg">{template.title}</h3>
                </div>
                <p className="hz-fg-soft">{template.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;
