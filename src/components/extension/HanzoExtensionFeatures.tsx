
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Lock, Globe, Lightbulb, Share2, FileText, Command } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-card hz-h-full"
    >
      <div className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4 hz-bg-raised">
        <Icon className="hz-sq-4 hz-fg-muted" />
      </div>
      <h3 className="hz-t-xl hz-w-bold hz-mb-2">{title}</h3>
      <p className="hz-fg-soft">{description}</p>
    </motion.div>
  );
};

const HanzoExtensionFeatures = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI Assistance",
      description: "Get intelligent assistance for any website or content you're browsing."
    },
    {
      icon: Zap,
      title: "Quick Access",
      description: "One-click access to Hanzo AI capabilities from any web page."
    },
    {
      icon: Lock,
      title: "Privacy Focused",
      description: "Your data stays private with client-side processing and optional analytics."
    },
    {
      icon: Globe,
      title: "Works Everywhere",
      description: "Compatible with all major websites and content platforms."
    },
    {
      icon: Lightbulb,
      title: "Smart Suggestions",
      description: "Contextual recommendations based on your browsing activity."
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share content directly with your team or to your Hanzo workspace."
    },
    {
      icon: FileText,
      title: "Content Summaries",
      description: "Get instant summaries of articles, documentation, and long-form content."
    },
    {
      icon: Command,
      title: "Keyboard Shortcuts",
      description: "Power users can access all features with customizable shortcuts."
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg-overlay">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Powerful Features</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Enhance your browsing experience with AI-powered capabilities
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-4 hz-gap-5">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HanzoExtensionFeatures;
