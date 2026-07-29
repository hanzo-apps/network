
import React from "react";
import { motion } from "framer-motion";
import { 
  Code, Brain, Database, Bot, Search, FileText, Workflow, 
  BarChart3, Lock, MessageSquare, Layers, Zap
} from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const capabilities = [
  {
    icon: Brain,
    title: "Model Hub Access",
    description: "One API for thousands of models from top providers and the open-source community"
  },
  {
    icon: Database,
    title: "Vector Database",
    description: "Built-in vector storage with automatic indexing for semantic search and RAG applications"
  },
  {
    icon: FileText,
    title: "Document Processing",
    description: "Process, chunk, and index documents in 30+ formats with automatic metadata extraction"
  },
  {
    icon: Search,
    title: "Semantic Search",
    description: "Natural language search across your knowledge base with advanced relevance tuning"
  },
  {
    icon: Bot,
    title: "Agent Framework",
    description: "Build autonomous AI agents with reasoning, planning and tool-use capabilities"
  },
  {
    icon: Code,
    title: "Code Generation",
    description: "Specialized models for code completion, refactoring, and documentation"
  },
  {
    icon: Workflow,
    title: "Workflow Orchestration",
    description: "Chain AI operations with built-in caching, observability, and error handling"
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description: "Comprehensive analytics and cost tracking across all AI operations"
  },
  {
    icon: Lock,
    title: "Security & Compliance",
    description: "Enterprise-grade security with data residency options and compliance features"
  },
  {
    icon: MessageSquare,
    title: "Chat Interfaces",
    description: "Pre-built chat components with memory management and streaming responses"
  },
  {
    icon: Layers,
    title: "Prompt Management",
    description: "Version, test, and optimize prompts across different models and environments"
  },
  {
    icon: Zap,
    title: "Optimized Edge Serving",
    description: "Global edge deployment for ultra-low latency AI inference and responses"
  }
];

const UnifiedCapabilities = () => {
  return (
    <section className="hz-py-7 hz-rel hz-clip">
      <div className="hz-abs hz-inset"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-container-narrow hz-align-center hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-5">
              Unified AI Platform
            </ChromeText>
            <p className="hz-t-xl hz-fg-soft">
              A complete suite of AI capabilities accessible through a single, 
              consistent API with everything you need to build powerful AI applications
            </p>
          </motion.div>
        </div>
        
        <div className="hz-grid hz-grid-3 hz-gap-5">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="hz-card"
            >
              <capability.icon className="hz-sq-5 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-fg hz-mb-2">{capability.title}</h3>
              <p className="hz-fg-soft">{capability.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnifiedCapabilities;
