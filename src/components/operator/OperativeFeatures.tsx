
import React from "react";
import { motion } from "framer-motion";
import { Github, Globe, Zap, ShieldCheck, Compass, Database, Cpu, Cloud } from "lucide-react";

const OperativeFeatures = () => {
  const features = [
    {
      icon: Globe,
      title: "Cross-Platform",
      description: "Compatible with Mac OS, Windows, and Linux with X server installed."
    },
    {
      icon: Zap,
      title: "Self-Operating",
      description: "Models can view the screen and decide on mouse and keyboard actions autonomously."
    },
    {
      icon: ShieldCheck,
      title: "Secure Framework",
      description: "Open-source implementation with transparent security practices."
    },
    {
      icon: Compass,
      title: "Objective-Driven",
      description: "Complete complex tasks based on natural language objectives."
    },
    {
      icon: Database,
      title: "OCR Integration",
      description: "Optional OCR mode provides models with clickable element maps for enhanced accuracy."
    },
    {
      icon: Cpu,
      title: "Model Flexibility",
      description: "Compatible with various multimodal models including GPT-4o, Claude 3, Gemini Pro Vision."
    }
  ];

  return (
    <section className="hz-py-7 hz-bg-surface hz-rel hz-clip">
      {/* Background gradient */}
      <div className="hz-center-x hz-abs hz-bottom-0 hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-container-narrow hz-align-center hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
              Key Capabilities
            </h2>
            <p className="hz-t-xl hz-fg-soft">
              Hanzo Operative gives AI models the ability to interact with computers
              the same way humans do
            </p>
          </motion.div>
        </div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card hz-transition hz-card-interactive"
            >
              <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4">
                <feature.icon className="hz-sq-4 hz-fg-muted" />
              </div>
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">{feature.title}</h3>
              <p className="hz-fg-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="hz-mt-7 hz-row hz-jc-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hz-btn hz-inline-3"
          >
            <Github className="hz-sq-3 hz-fg-muted" />
            <span className="hz-fg-soft">Open Source on</span>
            <a href="https://github.com/hanzo-ai/operative" className="hz-fg hz-w-semibold hz-transition hz-hoverable">GitHub</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OperativeFeatures;
