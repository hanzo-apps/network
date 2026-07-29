
import React from "react";
import { Send, RefreshCw, Camera, Mic, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  isTyping: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  message, 
  setMessage, 
  handleSendMessage, 
  isTyping 
}) => {
  return (
    <div className="hz-p-4 hz-border-t">
      <form onSubmit={handleSendMessage} className="hz-row hz-ai-center">
        <div className="hz-row hz-ai-center hz-inline-2 hz-mr-2">
          <Button type="button" variant="ghost" size="icon" className="hz-fg-muted hz-link">
            <Paperclip className="hz-sq-3" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="hz-fg-muted hz-link">
            <Camera className="hz-sq-3" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="hz-fg-muted hz-link">
            <Mic className="hz-sq-3" />
          </Button>
        </div>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="hz-grow hz-bg-raised hz-bordered hz-px-4 hz-py-2"
        />
        <Button 
          type="submit" 
          disabled={isTyping}
          className="hz-bg-raised hz-hoverable"
        >
          {isTyping ? (
            <RefreshCw className="hz-sq-3" />
          ) : (
            <Send className="hz-sq-3" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
