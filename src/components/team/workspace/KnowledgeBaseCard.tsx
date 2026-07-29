
import React from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const KnowledgeBaseCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="hz-bg-surface hz-bordered hz-r-lg hz-clip hz-shadow-lg"
    >
      <div className="hz-border-b hz-p-3 hz-row hz-ai-center">
        <FileText className="hz-sq-3 hz-fg-muted hz-mr-2" />
        <span className="hz-w-medium">Knowledge Base</span>
        <Badge variant="outline" className="hz-ml-auto hz-bg-raised hz-border-strong hz-fg-soft">
          Notion-style
        </Badge>
      </div>
      <div className="hz-p-4">
        <div className="hz-bg-overlay hz-r-lg hz-p-4">
          <div className="hz-mb-4 hz-row hz-ai-center hz-jc-between">
            <h3 className="hz-w-medium hz-fg">Company Wiki</h3>
            <div className="hz-row hz-ai-center hz-inline-2">
              <div className="hz-t-xs hz-fg-muted hz-row hz-ai-center">
                <div className="hz-sq-3 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-t-xs hz-mr-1">AI</div>
                <span>Updating</span>
              </div>
            </div>
          </div>
          
          <div className="hz-stack-3">
            <div className="hz-p-2 hz-bg-raised hz-r-md hz-bordered">
              <div className="hz-row hz-ai-center hz-mb-1">
                <Calendar className="hz-sq-2 hz-fg-muted hz-mr-2" />
                <span className="hz-w-medium">Onboarding Process</span>
              </div>
              <p className="hz-t-xs hz-fg-muted">
                Step-by-step guide for new employees, updated automatically by HR Bot.
              </p>
            </div>
            
            <div className="hz-p-2 hz-bg-raised hz-r-md hz-bordered">
              <div className="hz-row hz-ai-center hz-mb-1">
                <FileText className="hz-sq-2 hz-fg-muted hz-mr-2" />
                <span className="hz-w-medium">Technical Documentation</span>
              </div>
              <p className="hz-t-xs hz-fg-muted">
                API references and architectural diagrams maintained by DevBot.
              </p>
            </div>
            
            <div className="hz-p-2 hz-bg-raised hz-r-md hz-bordered">
              <div className="hz-row hz-ai-center hz-mb-1">
                <Bot className="hz-sq-2 hz-fg-muted hz-mr-2" />
                <span className="hz-w-medium">AI Activity: Adding Marketing Guidelines</span>
              </div>
              <div className="hz-row hz-ai-center hz-t-xs hz-fg-soft">
                <span>ContentBot is updating brand guidelines based on latest team meeting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default KnowledgeBaseCard;
