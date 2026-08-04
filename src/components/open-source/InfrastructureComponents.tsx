
import React from "react";
import { motion } from "framer-motion";
import { Github, Star, GitBranch, GitMerge, Database, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const InfrastructureComponents = () => {
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
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Infrastructure Components
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            The building blocks of the Hanzo Platform
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6">
          {/* Vector DB */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <div className="hz-row hz-ai-center hz-mb-4">
              <Database className="hz-sq-5 hz-fg-muted hz-mr-3" />
              <h3 className="hz-t-xl hz-w-semibold hz-fg">Vector DB</h3>
            </div>
            <p className="hz-fg-soft hz-mb-5">
              High-performance vector database designed for AI applications with local and distributed modes.
            </p>
            <div className="hz-row hz-ai-center hz-jc-between hz-t-sm hz-fg-muted hz-mb-4">
              <div className="hz-row hz-ai-center">
                <Star className="hz-sq-2 hz-mr-1" />
                <span>3.4k stars</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitBranch className="hz-sq-2 hz-mr-1" />
                <span>410 forks</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitMerge className="hz-sq-2 hz-mr-1" />
                <span>Rust</span>
              </div>
            </div>
            <Button 
              size="sm" 
              className="hz-w-full hz-bg-raised hz-hoverable"
            >
              <a href="https://github.com/hanzoai/vector-db" target="_blank" rel="noopener noreferrer" className="hz-row hz-ai-center hz-jc-center hz-w-full">
                <Github className="hz-sq-2 hz-mr-2" /> View Repository
              </a>
            </Button>
          </motion.div>

          {/* LLM Runtime */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <div className="hz-row hz-ai-center hz-mb-4">
              <Brain className="hz-sq-5 hz-fg-muted hz-mr-3" />
              <h3 className="hz-t-xl hz-w-semibold hz-fg">LLM Runtime</h3>
            </div>
            <p className="hz-fg-soft hz-mb-5">
              Optimized inference engine for running large language models locally with minimal resource usage.
            </p>
            <div className="hz-row hz-ai-center hz-jc-between hz-t-sm hz-fg-muted hz-mb-4">
              <div className="hz-row hz-ai-center">
                <Star className="hz-sq-2 hz-mr-1" />
                <span>4.1k stars</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitBranch className="hz-sq-2 hz-mr-1" />
                <span>520 forks</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitMerge className="hz-sq-2 hz-mr-1" />
                <span>C++/Python</span>
              </div>
            </div>
            <Button 
              size="sm" 
              className="hz-w-full hz-bg-raised hz-hoverable"
            >
              <a href="https://github.com/hanzoai/llm-runtime" target="_blank" rel="noopener noreferrer" className="hz-row hz-ai-center hz-jc-center hz-w-full">
                <Github className="hz-sq-2 hz-mr-2" /> View Repository
              </a>
            </Button>
          </motion.div>

          {/* API Gateway */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <div className="hz-row hz-ai-center hz-mb-4">
              <Zap className="hz-sq-5 hz-fg-muted hz-mr-3" />
              <h3 className="hz-t-xl hz-w-semibold hz-fg">API Gateway</h3>
            </div>
            <p className="hz-fg-soft hz-mb-5">
              High-performance API Gateway for routing, authentication, and rate limiting in AI applications.
            </p>
            <div className="hz-row hz-ai-center hz-jc-between hz-t-sm hz-fg-muted hz-mb-4">
              <div className="hz-row hz-ai-center">
                <Star className="hz-sq-2 hz-mr-1" />
                <span>2.8k stars</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitBranch className="hz-sq-2 hz-mr-1" />
                <span>362 forks</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitMerge className="hz-sq-2 hz-mr-1" />
                <span>Go</span>
              </div>
            </div>
            <Button 
              size="sm" 
              className="hz-w-full hz-bg-raised hz-hoverable"
            >
              <a href="https://github.com/hanzoai/gateway" target="_blank" rel="noopener noreferrer" className="hz-row hz-ai-center hz-jc-center hz-w-full">
                <Github className="hz-sq-2 hz-mr-2" /> View Repository
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureComponents;
