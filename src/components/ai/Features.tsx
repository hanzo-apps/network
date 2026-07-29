
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Bot, Code, Server, Database, Shield, Sparkles, Cpu, Microscope, Activity, Scale } from 'lucide-react';

const Features = () => {
  const featuresList = [
    {
      icon: Brain,
      title: 'AI Model Hub',
      description: 'Access a catalog of state-of-the-art foundation models from leading providers and Hanzo\'s specialized models.'
    },
    {
      icon: Bot,
      title: 'AI Agents',
      description: 'Create autonomous agents that can reason, plan, and execute complex tasks with minimal human intervention.'
    },
    {
      icon: Cpu,
      title: 'Optimized Runtime',
      description: 'High-performance inference with automatic batching, caching, and efficient resource utilization.'
    },
    {
      icon: Database,
      title: 'Vector Database',
      description: 'Built-in vector storage for embeddings with automatic indexing and retrieval optimization.'
    },
    {
      icon: Microscope,
      title: 'Evaluation Suite',
      description: 'Comprehensive tools for testing, evaluating, and benchmarking AI models and applications.'
    },
    {
      icon: Activity,
      title: 'AI Observability',
      description: 'Full visibility into AI system behavior with detailed metrics, logging, and performance analytics.'
    },
    {
      icon: Shield,
      title: 'AI Safety & Guardrails',
      description: 'Advanced content filtering, privacy controls, and ethical guardrails for responsible AI deployment.'
    },
    {
      icon: Scale,
      title: 'Enterprise Scale',
      description: 'Built for high-scale production workloads with auto-scaling, high availability, and global distribution.'
    },
    {
      icon: Code,
      title: 'Developer SDK',
      description: 'Intuitive libraries for Python, TypeScript, and other languages with comprehensive documentation.'
    },
    {
      icon: Server,
      title: 'Model Serving',
      description: 'Simplified deployment and management of custom models with automatic versioning and A/B testing.'
    },
    {
      icon: Sparkles,
      title: 'Fine-tuning',
      description: 'User-friendly tools for customizing foundation models to your specific use cases and data.'
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface hz-rel hz-clip">
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
              Complete AI Engineering Toolkit
            </h2>
            <p className="hz-t-xl hz-fg-soft">
              Everything you need to build, deploy, and manage production-grade AI applications
            </p>
          </motion.div>
        </div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          {featuresList.map((feature, index) => (
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
      </div>
    </section>
  );
};

export default Features;
