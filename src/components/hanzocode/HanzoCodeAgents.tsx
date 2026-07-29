
import React from "react";
import { motion } from "framer-motion";
import { Bot, Cpu, GitBranch, Braces, Users, Brain, Server, Maximize } from "lucide-react";

interface FeatureCardProps {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-card"
    >
      <Icon className="hz-sq-6 hz-fg-muted hz-mb-4" />
      <h3 className="hz-t-xl hz-w-bold hz-mb-2">{title}</h3>
      <p className="hz-fg-soft">{description}</p>
    </motion.div>
  );
};

const HanzoCodeAgents: React.FC = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Autonomous Agentic Control</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Harness the full power of intelligent agents that can operate your editor alongside you
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-4 hz-gap-6 hz-mb-7">
          <FeatureCard 
            icon={Bot}
            title="Superagents"
            description="AI agents that understand your codebase at a deep level and can autonomously edit, refactor, and optimize code"
          />
          
          <FeatureCard 
            icon={Cpu}
            title="Full Environment Control"
            description="Agents can access and control your entire development environment, including terminal commands and external tools"
          />
          
          <FeatureCard 
            icon={GitBranch}
            title="Parallel Work Streams"
            description="Create multiple agents working on different branches simultaneously to tackle complex problems"
          />
          
          <FeatureCard 
            icon={Braces}
            title="Code Generation"
            description="Generate entire modules, components, or services with detailed specifications in plain English"
          />
        </div>
        
        <div className="hz-card">
          <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
            <div>
              <h3 className="hz-t-2xl hz-w-bold hz-mb-5">Massively Parallel Development</h3>
              <p className="hz-t-lg hz-fg-soft hz-mb-6">
                Hanzo Code can create up to 1,000,000 parallel instances of your development environment, each with its own agent, to tackle the largest and most complex coding challenges.
              </p>
              
              <div className="hz-stack-4">
                <div className="hz-row hz-ai-start">
                  <Users className="hz-sq-3 hz-fg-muted hz-mr-3 hz-mt-1" />
                  <p className="hz-fg-soft">True pair programming with agents that have full system access</p>
                </div>
                
                <div className="hz-row hz-ai-start">
                  <Brain className="hz-sq-3 hz-fg-muted hz-mr-3 hz-mt-1" />
                  <p className="hz-fg-soft">Agents learn your coding style and project patterns over time</p>
                </div>
                
                <div className="hz-row hz-ai-start">
                  <Server className="hz-sq-3 hz-fg-muted hz-mr-3 hz-mt-1" />
                  <p className="hz-fg-soft">Scale from a single helper to a massive distributed workforce</p>
                </div>
                
                <div className="hz-row hz-ai-start">
                  <Maximize className="hz-sq-3 hz-fg-muted hz-mr-3 hz-mt-1" />
                  <p className="hz-fg-soft">Tackle enterprise-scale projects that would normally require entire teams</p>
                </div>
              </div>
            </div>
            
            <div className="hz-card">
              <div className="hz-t-sm hz-mono hz-fg-soft hz-stack-2">
                <div className="hz-fg-muted">// Creating a team of agents to refactor an entire codebase</div>
                <div className="hz-fg">const project = await HanzoCode.createProject('./my-app');</div>
                <div className="hz-fg">const agents = await project.createAgentTeam({"{"}</div>
                <div className="hz-fg hz-ml-4">size: 12,</div>
                <div className="hz-fg hz-ml-4">task: 'Refactor to React 18 with TypeScript',</div>
                <div className="hz-fg hz-ml-4">coordination: 'hierarchical',</div>
                <div className="hz-fg hz-ml-4">parallelization: true</div>
                <div className="hz-fg">{"}"});</div>
                <div className="hz-fg">await agents.execute();</div>
                <div className="hz-fg">// Agents will work together, with some focusing on</div>
                <div className="hz-fg">// component logic, others on types, others on tests</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HanzoCodeAgents;
