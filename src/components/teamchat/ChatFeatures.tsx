
import React from "react";
import { MessageSquare, Bot, Settings } from "lucide-react";

const ChatFeatures: React.FC = () => {
  return (
    <div className="hz-mt-6 hz-mb-7">
      <h2 className="hz-t-2xl hz-w-bold hz-align-center hz-mb-6">Enhanced Chat Capabilities</h2>
      <div className="hz-grid hz-grid-3 hz-gap-5">
        <div className="hz-card hz-transition hz-card-interactive">
          <div className="hz-sq-7 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4">
            <MessageSquare className="hz-sq-4 hz-fg-muted" />
          </div>
          <h3 className="hz-t-xl hz-w-bold hz-mb-2 hz-fg">Multimodal Conversations</h3>
          <p className="hz-fg-soft">Chat with text, images, audio, and video in natural conversations with our AI assistants.</p>
        </div>
        
        <div className="hz-card hz-transition hz-card-interactive">
          <div className="hz-sq-7 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4">
            <Bot className="hz-sq-4 hz-fg-muted" />
          </div>
          <h3 className="hz-t-xl hz-w-bold hz-mb-2 hz-fg">Specialized Assistants</h3>
          <p className="hz-fg-soft">Access domain-specific experts for coding, design, marketing, legal, and more fields.</p>
        </div>
        
        <div className="hz-card hz-transition hz-card-interactive">
          <div className="hz-sq-7 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4">
            <Settings className="hz-sq-4 hz-fg-muted" />
          </div>
          <h3 className="hz-t-xl hz-w-bold hz-mb-2 hz-fg">Customizable Workflows</h3>
          <p className="hz-fg-soft">Connect your data sources, APIs, and tools to create powerful AI-powered workflows.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatFeatures;
