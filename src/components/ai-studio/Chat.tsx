
import React from "react";
import { MessageInterface } from "./types";

interface ChatProps {
  conversation: MessageInterface[];
  promptText: string;
  setPromptText: (text: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const Chat = ({ 
  conversation, 
  promptText, 
  setPromptText, 
  handleSubmit 
}: ChatProps) => {
  return (
    <div className="hz-grow hz-col hz-clip">
      {/* Messages */}
      <div className="hz-grow hz-scroll-y hz-p-4 hz-stack-4">
        {conversation.map((message, i) => (
          <div 
            key={i} 
            className={`hz-row ${message.role === "user" ? "hz-jc-end" : "hz-jc-start"}`}
          >
            <div 
              className={`hz-mw-lg hz-p-3 hz-r-lg ${
                message.role === "user" 
                  ? "hz-bg-raised hz-bordered hz-border-strong" 
                  : "hz-bg-raised hz-bordered"
              }`}
            >
              <div 
                className="hz-prose hz-t-sm" 
                dangerouslySetInnerHTML={{ 
                  __html: message.content.replace(/```(.+?)```/gs, '<pre><code>$1</code></pre>') 
                }} 
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Input */}
      <div className="hz-p-4 hz-border-t">
        <form onSubmit={handleSubmit}>
          <div className="hz-row hz-ai-center">
            <input
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Send a message..."
              className="hz-grow hz-bg-raised hz-bordered hz-px-4 hz-py-2"
            />
            <button 
              type="submit" 
              className="hz-bg-raised hz-px-4 hz-py-2 hz-fg hz-w-medium hz-hoverable"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
