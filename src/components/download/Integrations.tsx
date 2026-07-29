
import React from "react";
import { motion } from "framer-motion";
import { Github, CalendarDays, FileEdit, Trello, MessageSquare, Code } from "lucide-react";

const IntegrationCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="hz-card hz-row hz-ai-start hz-inline-4">
    <div className="hz-none">
      {icon}
    </div>
    <div>
      <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-1">{title}</h3>
      <p className="hz-fg-muted hz-t-sm">{description}</p>
    </div>
  </div>
);

const Integrations = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg-overlay">
      <div className="hz-container-wide">
        <motion.div
          className="hz-align-center hz-mb-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4 hz-fg">
            Connect your own tools & datasources
          </h2>
        </motion.div>
        
        <motion.div 
          className="hz-grid hz-grid-3 hz-gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <IntegrationCard 
            icon={<Github className="hz-sq-5 hz-fg-muted" />}
            title="GitHub"
            description="Automatically manage development work and more"
          />
          
          <IntegrationCard 
            icon={<FileEdit className="hz-sq-5 hz-fg-muted" />}
            title="Notion"
            description="Seamlessly sync notes and tasks with your Notion workspace"
          />
          
          <IntegrationCard 
            icon={<CalendarDays className="hz-sq-5 hz-fg-muted" />}
            title="Google Calendar"
            description="Connect your calendar to automate meeting workflows"
          />
          
          <IntegrationCard 
            icon={<Trello className="hz-sq-5 hz-fg-muted" />}
            title="Linear"
            description="Create Linear issues directly from any context"
          />
          
          <IntegrationCard 
            icon={<MessageSquare className="hz-sq-5 hz-fg-muted" />}
            title="Slack"
            description="Summarize channels and post meeting notes to Slack"
          />
          
          <IntegrationCard 
            icon={<Code className="hz-sq-5 hz-fg-muted" />}
            title="MCP"
            description="Add your own tooling securely using Model Context Protocol"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Integrations;
