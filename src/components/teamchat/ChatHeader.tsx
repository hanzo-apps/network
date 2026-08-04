
import React from "react";
import { Bot, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatHeader: React.FC = () => {
  return (
    <div className="hz-bg-surface hz-p-4 hz-border-b hz-row hz-ai-center">
      <div className="hz-sq-5 hz-bg-raised hz-r-full hz-row hz-ai-center hz-jc-center hz-mr-3">
        <Bot className="hz-sq-2 hz-fg" />
      </div>
      <div>
        <h3 className="hz-w-medium">Hanzo Assistant</h3>
        <p className="hz-t-xs hz-fg-muted">Powered by GPT-4o</p>
      </div>
      <Button variant="ghost" size="icon" className="hz-ml-auto hz-fg-muted hz-link">
        <Settings className="hz-sq-3" />
      </Button>
    </div>
  );
};

export default ChatHeader;
