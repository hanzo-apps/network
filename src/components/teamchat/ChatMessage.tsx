
import React from "react";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: {
    id: number;
    sender: string;
    message: string;
    timestamp: string;
  };
  formatTimestamp: (timestamp: string) => string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, formatTimestamp }) => {
  return (
    <div
      className={`hz-row ${message.sender === "user" ? "hz-jc-end" : "hz-jc-start"} hz-mb-4`}
    >
      {message.sender === "ai" && (
        <div className="hz-sq-5 hz-bg-raised hz-r-full hz-row hz-ai-center hz-jc-center hz-mr-2 hz-mt-1">
          <Bot className="hz-sq-2 hz-fg" />
        </div>
      )}
      
      <div
        className={`hz-mw-lg hz-p-3 hz-r-lg ${
          message.sender === "user"
            ? "hz-bg-raised hz-bordered hz-border-strong"
            : "hz-bg-raised hz-bordered"
        }`}
      >
        <div 
          className="hz-prose hz-t-sm" 
          dangerouslySetInnerHTML={{ 
            __html: message.message.replace(/```(.+?)```/gs, '<pre><code>$1</code></pre>').replace(/\n/g, '<br>') 
          }} 
        />
        <div className="hz-align-right hz-mt-1">
          <span className="hz-t-xs hz-fg-muted">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      </div>
      
      {message.sender === "user" && (
        <div className="hz-sq-5 hz-bg-raised hz-r-full hz-row hz-ai-center hz-jc-center hz-ml-2 hz-mt-1">
          <User className="hz-sq-2 hz-fg" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
