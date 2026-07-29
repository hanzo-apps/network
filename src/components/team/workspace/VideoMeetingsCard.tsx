
import React from "react";
import { motion } from "framer-motion";
import { Video, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const VideoMeetingsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="hz-bg-surface hz-bordered hz-r-lg hz-clip hz-shadow-lg"
    >
      <div className="hz-border-b hz-p-3 hz-row hz-ai-center">
        <Video className="hz-sq-3 hz-fg-muted hz-mr-2" />
        <span className="hz-w-medium">Video Meetings</span>
        <Badge variant="outline" className="hz-ml-auto hz-bg-raised hz-border-strong hz-fg-soft">
          Zoom-style
        </Badge>
      </div>
      <div className="hz-p-4">
        <div className="hz-bg-overlay hz-r-lg hz-p-4">
          <div className="hz-mb-4 hz-row hz-ai-center hz-jc-between">
            <h3 className="hz-w-medium hz-fg">Weekly Sprint Planning</h3>
            <Badge className="hz-bg-raised hz-fg-muted hz-border-strong">Live</Badge>
          </div>
          
          <div className="hz-grid hz-grid-2 hz-gap-2 hz-mb-3">
            <div className="hz-bg-raised hz-r-md hz-rel">
              <div className="hz-abs hz-bg-overlay hz-px-2 hz-py-1 hz-r-md hz-t-xs">Sarah Johnson</div>
            </div>
            <div className="hz-bg-raised hz-r-md hz-rel">
              <div className="hz-abs hz-bg-overlay hz-px-2 hz-py-1 hz-r-md hz-t-xs">John Doe</div>
            </div>
            <div className="hz-bg-raised hz-r-md hz-rel hz-bordered">
              <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center">
                <Bot className="hz-sq-6 hz-fg-muted" />
              </div>
              <div className="hz-abs hz-bg-raised hz-px-2 hz-py-1 hz-r-md hz-t-xs">DevBot</div>
            </div>
            <div className="hz-bg-raised hz-r-md hz-rel hz-bordered">
              <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center">
                <Bot className="hz-sq-6 hz-fg-muted" />
              </div>
              <div className="hz-abs hz-bg-raised hz-px-2 hz-py-1 hz-r-md hz-t-xs">AnalyticsBot</div>
            </div>
          </div>

          <div className="hz-align-center hz-t-xs hz-fg-muted hz-py-1">
            AI agents are learning from this meeting and will automatically implement the discussed tasks
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoMeetingsCard;
