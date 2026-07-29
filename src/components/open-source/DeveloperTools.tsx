
import React from "react";
import { motion } from "framer-motion";
import { Github, Star, GitBranch, GitMerge, Code, Users, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const DeveloperTools = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Developer Tools
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Tools and libraries that enhance developer productivity
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6">
          {/* Dev Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <div className="hz-row hz-ai-center hz-mb-4">
              <Code className="hz-sq-5 hz-fg-muted hz-mr-3" />
              <h3 className="hz-t-xl hz-w-semibold hz-fg">Hanzo Dev</h3>
            </div>
            <p className="hz-fg-soft hz-mb-5">
              AI-powered software engineering assistant that helps you write, debug, and document code.
            </p>
            <div className="hz-row hz-ai-center hz-jc-between hz-t-sm hz-fg-muted hz-mb-4">
              <div className="hz-row hz-ai-center">
                <Star className="hz-sq-2 hz-mr-1" />
                <span>3.2k stars</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitBranch className="hz-sq-2 hz-mr-1" />
                <span>412 forks</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitMerge className="hz-sq-2 hz-mr-1" />
                <span>TypeScript</span>
              </div>
            </div>
            <Button 
              size="sm" 
              className="hz-w-full hz-bg-raised hz-hoverable"
            >
              <a href="https://github.com/hanzoai/dev" target="_blank" rel="noopener noreferrer" className="hz-row hz-ai-center hz-jc-center hz-w-full">
                <Github className="hz-sq-2 hz-mr-2" /> View Repository
              </a>
            </Button>
          </motion.div>

          {/* Team Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <div className="hz-row hz-ai-center hz-mb-4">
              <Users className="hz-sq-5 hz-fg-muted hz-mr-3" />
              <h3 className="hz-t-xl hz-w-semibold hz-fg">Hanzo Team</h3>
            </div>
            <p className="hz-fg-soft hz-mb-5">
              An integrated collaboration platform with AI-powered tools for remote teams.
            </p>
            <div className="hz-row hz-ai-center hz-jc-between hz-t-sm hz-fg-muted hz-mb-4">
              <div className="hz-row hz-ai-center">
                <Star className="hz-sq-2 hz-mr-1" />
                <span>2.7k stars</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitBranch className="hz-sq-2 hz-mr-1" />
                <span>289 forks</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitMerge className="hz-sq-2 hz-mr-1" />
                <span>TypeScript</span>
              </div>
            </div>
            <Button 
              size="sm" 
              className="hz-w-full hz-bg-raised hz-hoverable"
            >
              <a href="https://github.com/hanzoai/team" target="_blank" rel="noopener noreferrer" className="hz-row hz-ai-center hz-jc-center hz-w-full">
                <Github className="hz-sq-2 hz-mr-2" /> View Repository
              </a>
            </Button>
          </motion.div>

          {/* CLI Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <div className="hz-row hz-ai-center hz-mb-4">
              <Terminal className="hz-sq-5 hz-fg-muted hz-mr-3" />
              <h3 className="hz-t-xl hz-w-semibold hz-fg">Hanzo CLI</h3>
            </div>
            <p className="hz-fg-soft hz-mb-5">
              Command-line interface for scaffolding and managing Hanzo applications. Create, deploy, and manage with ease.
            </p>
            <div className="hz-row hz-ai-center hz-jc-between hz-t-sm hz-fg-muted hz-mb-4">
              <div className="hz-row hz-ai-center">
                <Star className="hz-sq-2 hz-mr-1" />
                <span>1.9k stars</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitBranch className="hz-sq-2 hz-mr-1" />
                <span>213 forks</span>
              </div>
              <div className="hz-row hz-ai-center">
                <GitMerge className="hz-sq-2 hz-mr-1" />
                <span>JavaScript</span>
              </div>
            </div>
            <Button 
              size="sm" 
              className="hz-w-full hz-bg-raised hz-hoverable"
            >
              <a href="https://github.com/hanzoai/cli" target="_blank" rel="noopener noreferrer" className="hz-row hz-ai-center hz-jc-center hz-w-full">
                <Github className="hz-sq-2 hz-mr-2" /> View Repository
              </a>
            </Button>
          </motion.div>
        </div>

        <div className="hz-align-center hz-mt-7">
          <Button size="lg" variant="outline" className="hz-border-strong hz-fg hz-hoverable">
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="hz-row hz-ai-center">
              <Github className="hz-sq-3 hz-mr-2" /> View All Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DeveloperTools;
