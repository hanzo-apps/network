
import React from "react";
import { motion } from "framer-motion";
import { Github, Star, GitBranch, Terminal, Server, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const CoreProjects = () => {
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
            Core Projects
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Our flagship open source technologies that power the Hanzo Platform
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-6">
          {/* Platform Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <div className="hz-row hz-ai-center hz-mb-4">
              <Server className="hz-sq-7 hz-fg-muted hz-mr-4" />
              <div>
                <h3 className="hz-t-2xl hz-w-semibold hz-fg">Hanzo Platform</h3>
                <div className="hz-row hz-ai-center hz-mt-1">
                  <a href="https://github.com/hanzoai/platform" target="_blank" rel="noopener noreferrer" className="hz-t-sm hz-fg-muted hz-link">github.com/hanzoai/platform</a>
                </div>
              </div>
            </div>
            <p className="hz-fg-soft hz-mb-5 hz-t-lg">
              The free, forever, open-source version of our cloud infrastructure. Run the entire Hanzo stack locally with a single command.
            </p>
            <div className="hz-row hz-ai-center hz-jc-between hz-mb-5">
              <div className="hz-row hz-ai-center">
                <Star className="hz-sq-3 hz-fg-muted hz-mr-2" />
                <span className="hz-fg-soft">5.2k stars</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitBranch className="hz-sq-3 hz-fg-muted hz-mr-2" />
                <span className="hz-fg-soft">742 forks</span>
              </div>
              <div className="hz-row hz-ai-center">
                <div className="hz-sq-1 hz-r-full hz-bg-raised hz-mr-2"></div>
                <span className="hz-fg-soft">Active</span>
              </div>
            </div>
            <div className="hz-row hz-inline-3">
              <Button 
                className="hz-grow hz-bg-raised hz-hoverable"
                size="sm"
              >
                <a href="https://github.com/hanzoai/platform" target="_blank" rel="noopener noreferrer" className="hz-row hz-ai-center hz-jc-center hz-w-full">
                  <Github className="hz-sq-2 hz-mr-2" /> Repository
                </a>
              </Button>
              <Button 
                className="hz-grow"
                variant="outline"
                size="sm"
              >
                <a href="/platform" className="hz-row hz-ai-center hz-jc-center hz-w-full">
                  <Terminal className="hz-sq-2 hz-mr-2" /> Learn More
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Bot Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <div className="hz-row hz-ai-center hz-mb-4">
              <Bot className="hz-sq-7 hz-fg-muted hz-mr-4" />
              <div>
                <h3 className="hz-t-2xl hz-w-semibold hz-fg">Hanzo Bot</h3>
                <div className="hz-row hz-ai-center hz-mt-1">
                  <a href="https://github.com/hanzoai/bot" target="_blank" rel="noopener noreferrer" className="hz-t-sm hz-fg-muted hz-link">github.com/hanzoai/bot</a>
                </div>
              </div>
            </div>
            <p className="hz-fg-soft hz-mb-5 hz-t-lg">
              Agentic framework for building advanced AI assistants with custom tool integration. Create powerful workflows with LLMs.
            </p>
            <div className="hz-row hz-ai-center hz-jc-between hz-mb-5">
              <div className="hz-row hz-ai-center">
                <Star className="hz-sq-3 hz-fg-muted hz-mr-2" />
                <span className="hz-fg-soft">4.8k stars</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitBranch className="hz-sq-3 hz-fg-muted hz-mr-2" />
                <span className="hz-fg-soft">623 forks</span>
              </div>
              <div className="hz-row hz-ai-center">
                <div className="hz-sq-1 hz-r-full hz-bg-raised hz-mr-2"></div>
                <span className="hz-fg-soft">Active</span>
              </div>
            </div>
            <div className="hz-row hz-inline-3">
              <Button 
                className="hz-grow hz-bg-raised hz-hoverable"
                size="sm"
              >
                <a href="https://github.com/hanzoai/bot" target="_blank" rel="noopener noreferrer" className="hz-row hz-ai-center hz-jc-center hz-w-full">
                  <Github className="hz-sq-2 hz-mr-2" /> Repository
                </a>
              </Button>
              <Button 
                className="hz-grow"
                variant="outline"
                size="sm"
              >
                <a href="/bot" className="hz-row hz-ai-center hz-jc-center hz-w-full">
                  <Terminal className="hz-sq-2 hz-mr-2" /> Learn More
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoreProjects;
