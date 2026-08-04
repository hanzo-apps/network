
import React from "react";
import { motion } from "framer-motion";
import { Code, Zap, MessageSquare, Globe, Bot, FileCode, Infinity, Network } from "lucide-react";

const FeatureCard = ({ title, description, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-card hz-h-full"
    >
      <div className="hz-col hz-h-full">
        <div className="hz-mb-5">
          {icon}
          <h3 className="hz-t-2xl hz-w-semibold hz-mt-4 hz-mb-2">{title}</h3>
          <p className="hz-fg-soft hz-mb-4">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const HanzoCodeFeatures = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface" id="features">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Beyond Other AI Editors</h2>
          <p className="hz-t-xl hz-fg-soft">
            Capabilities that leave Cursor, Windsurf, and other AI editors far behind
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-4 hz-gap-6">
          <FeatureCard 
            title="Holistic Understanding"
            description="Unlike others, we analyze your entire codebase, not just the current file or context window"
            icon={<Code className="hz-sq-6 hz-fg-muted" />}
          />
          
          <FeatureCard 
            title="Parallel Execution"
            description="Run multiple autonomous agents simultaneously to solve different parts of your project"
            icon={<Zap className="hz-sq-6 hz-fg-muted" />}
          />
          
          <FeatureCard 
            title="Advanced Reasoning"
            description="Complex problem solving with multi-step reasoning that other AI tools can't match"
            icon={<MessageSquare className="hz-sq-6 hz-fg-muted" />}
          />
          
          <FeatureCard 
            title="Multi-repo Context"
            description="Understand dependencies across multiple repositories and codebases simultaneously"
            icon={<Globe className="hz-sq-6 hz-fg-muted" />}
          />
          
          <FeatureCard 
            title="Complete Autonomy"
            description="Agents can work independently, making decisions without constant human guidance"
            icon={<Bot className="hz-sq-6 hz-fg-muted" />}
          />
          
          <FeatureCard 
            title="Full System Access"
            description="Agents have controlled access to your file system, dev environment, and tooling"
            icon={<FileCode className="hz-sq-6 hz-fg-muted" />}
          />
          
          <FeatureCard 
            title="Unlimited Context"
            description="No token limits or context windows - process entire codebases at once"
            icon={<Infinity className="hz-sq-6 hz-fg-muted" />}
          />
          
          <FeatureCard 
            title="Agent Collaboration"
            description="Multiple agents working together with different roles and responsibilities"
            icon={<Network className="hz-sq-6 hz-fg-muted" />}
          />
        </div>
      </div>
    </section>
  );
};

export default HanzoCodeFeatures;
