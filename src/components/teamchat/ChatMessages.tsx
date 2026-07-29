
import React from "react";
import ChatMessage from "./ChatMessage";
import { Bot } from "lucide-react";

interface ChatMessagesProps {
  chatHistory: Array<{
    id: number;
    sender: string;
    message: string;
    timestamp: string;
  }>;
  isTyping: boolean;
  formatTimestamp: (timestamp: string) => string;
  endOfMessagesRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  chatHistory, 
  isTyping, 
  formatTimestamp,
  endOfMessagesRef
}) => {
  return (
    <div className="hz-grow hz-scroll-y hz-p-4 hz-stack-4">
      {chatHistory.map((chat) => (
        <ChatMessage 
          key={chat.id} 
          message={chat} 
          formatTimestamp={formatTimestamp} 
        />
      ))}
      
      {isTyping && (
        <div className="hz-row hz-jc-start hz-mb-4">
          <div className="hz-sq-5 hz-bg-raised hz-r-full hz-row hz-ai-center hz-jc-center hz-mr-2">
            <Bot className="hz-sq-2 hz-fg" />
          </div>
          <div className="hz-bg-raised hz-py-3 hz-px-4 hz-r-lg hz-bordered">
            <div className="hz-row hz-inline-1">
              <div className="hz-sq-1 hz-bg-raised hz-r-full"></div>
              <div className="hz-sq-1 hz-bg-raised hz-r-full" style={{ animationDelay: "0.2s" }}></div>
              <div className="hz-sq-1 hz-bg-raised hz-r-full" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatMessages;
