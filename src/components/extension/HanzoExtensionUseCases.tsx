
import React from "react";
import { motion } from "framer-motion";
import { FileText, Search, Code, ShoppingCart } from "lucide-react";

const UseCaseCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-card"
    >
      <Icon className="hz-sq-6 hz-fg-muted hz-mb-4" />
      <h3 className="hz-t-2xl hz-w-bold hz-mb-2">{title}</h3>
      <p className="hz-fg-soft">{description}</p>
    </motion.div>
  );
};

const HanzoExtensionUseCases = () => {
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
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Use Cases</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Discover how the Hanzo Extension can enhance your daily workflows
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-2 hz-gap-6">
          <UseCaseCard 
            icon={FileText}
            title="Content Research"
            description="Quickly summarize articles, extract key insights, and save information to your knowledge base while browsing."
          />
          
          <UseCaseCard 
            icon={Search}
            title="Enhanced Web Search"
            description="Get more relevant search results with AI-powered refinements and suggestions based on your context."
          />
          
          <UseCaseCard 
            icon={Code}
            title="Developer Assistance"
            description="Get code explanations, documentation lookups, and debugging suggestions while reviewing technical content."
          />
          
          <UseCaseCard 
            icon={ShoppingCart}
            title="Shopping Assistant"
            description="Compare products, find better deals, and get instant reviews while shopping online."
          />
        </div>
      </div>
    </section>
  );
};

export default HanzoExtensionUseCases;
