
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TeamChatCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="hz-bg-surface hz-bordered hz-r-lg hz-clip hz-shadow-lg"
    >
      <div className="hz-border-b hz-p-3 hz-row hz-ai-center">
        <MessageSquare className="hz-sq-3 hz-fg-muted hz-mr-2" />
        <span className="hz-w-medium">Team Chat</span>
        <Badge variant="outline" className="hz-ml-auto hz-bg-raised hz-border-strong hz-fg-soft">
          Slack-style
        </Badge>
      </div>
      <div className="hz-p-4">
        <div className="hz-bg-overlay hz-r-lg hz-p-4">
          <div className="hz-mb-4">
            <h3 className="hz-w-medium hz-fg">#project-website</h3>
            <div className="hz-t-xs hz-fg-muted">3 humans, 2 AI agents</div>
          </div>
          
          <div className="hz-stack-4">
            <div className="hz-row">
              <div className="hz-sq-5 hz-r-full hz-bg-raised hz-none hz-row hz-ai-center hz-jc-center hz-t-xs hz-mr-3">JD</div>
              <div>
                <div className="hz-row hz-ai-center">
                  <span className="hz-w-medium">John Doe</span>
                  <span className="hz-t-xs hz-fg-muted hz-ml-2">10:45 AM</span>
                </div>
                <p className="hz-t-sm hz-fg-soft">Can someone help review the landing page design?</p>
              </div>
            </div>
            
            <div className="hz-row">
              <div className="hz-sq-5 hz-r-full hz-bg-raised hz-none hz-row hz-ai-center hz-jc-center hz-t-xs hz-mr-3">AI</div>
              <div>
                <div className="hz-row hz-ai-center">
                  <span className="hz-w-medium">DesignBot</span>
                  <span className="hz-t-xs hz-fg-muted hz-ml-2">10:47 AM</span>
                </div>
                <p className="hz-t-sm hz-fg-soft">I'll review it right away. I see a few opportunities to improve the visual hierarchy and call-to-action placement.</p>
              </div>
            </div>
            
            <div className="hz-row">
              <div className="hz-sq-5 hz-r-full hz-bg-raised hz-none hz-row hz-ai-center hz-jc-center hz-t-xs hz-mr-3">AI</div>
              <div>
                <div className="hz-row hz-ai-center">
                  <span className="hz-w-medium">DesignBot</span>
                  <span className="hz-t-xs hz-fg-muted hz-ml-2">10:49 AM</span>
                </div>
                <div className="hz-bg-raised hz-p-2 hz-r-md hz-t-sm hz-fg-soft hz-bordered">
                  <p>I've created some alternative layouts based on our brand guidelines. You can view them here:</p>
                  <div className="hz-bg-raised hz-fg-soft hz-p-1 hz-mt-1 hz-r-md hz-row hz-ai-center hz-t-xs">
                    <FileText className="hz-sq-1 hz-mr-1" />
                    design-alternatives.figma
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamChatCard;
