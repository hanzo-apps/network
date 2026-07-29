
import React from "react";
import { motion } from "framer-motion";
import { Kanban, CheckCircle, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProjectManagementCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="hz-bg-surface hz-bordered hz-r-lg hz-clip hz-shadow-lg"
    >
      <div className="hz-border-b hz-p-3 hz-row hz-ai-center">
        <Kanban className="hz-sq-3 hz-fg-muted hz-mr-2" />
        <span className="hz-w-medium">Project Management</span>
        <Badge variant="outline" className="hz-ml-auto hz-bg-raised hz-border-strong hz-fg-soft">
          Linear-style
        </Badge>
      </div>
      <div className="hz-p-4">
        <div className="hz-bg-overlay hz-r-lg hz-p-4">
          <div className="hz-mb-4 hz-row hz-ai-center hz-jc-between">
            <div className="hz-row hz-ai-center">
              <h3 className="hz-w-medium hz-fg">Website Redesign</h3>
              <Badge className="hz-ml-2 hz-bg-raised hz-fg-muted hz-border-strong">In Progress</Badge>
            </div>
            <div className="hz-row hz-inline-2">
              <div className="hz-sq-4 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-t-xs hz-w-bold">AI</div>
              <div className="hz-sq-4 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-t-xs">JD</div>
            </div>
          </div>
          
          <div className="hz-stack-3">
            <div className="hz-row hz-ai-center hz-p-2 hz-bg-raised hz-r-md hz-bordered">
              <CheckCircle className="hz-sq-2 hz-fg-muted hz-mr-2" />
              <span className="hz-t-sm">Create wireframes</span>
              <div className="hz-ml-auto hz-row hz-ai-center hz-inline-1">
                <div className="hz-sq-3 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-t-xs">JD</div>
              </div>
            </div>
            <div className="hz-row hz-ai-center hz-p-2 hz-bg-raised hz-r-md hz-bordered">
              <CheckCircle className="hz-sq-2 hz-fg-muted hz-mr-2" />
              <span className="hz-t-sm">Design homepage</span>
              <div className="hz-ml-auto hz-row hz-ai-center hz-inline-1">
                <div className="hz-sq-3 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-t-xs">AI</div>
              </div>
            </div>
            <div className="hz-row hz-ai-center hz-p-2 hz-bg-raised hz-r-md hz-bordered">
              <Bot className="hz-sq-2 hz-fg-muted hz-mr-2" />
              <span className="hz-t-sm">AI working: Implementing frontend code</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectManagementCard;
