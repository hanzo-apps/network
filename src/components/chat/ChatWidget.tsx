import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, ExternalLink, Bot } from "lucide-react";


// Quick action buttons
const quickActions = [
  { label: "What is Hanzo?", value: "What is Hanzo AI and what can I build with it?" },
  { label: "Get started", value: "How do I get started with Hanzo?" },
  { label: "Pricing", value: "What are Hanzo's pricing plans?" },
  { label: "API docs", value: "Where can I find the API documentation?" },
];

// System context for Hanzo AI
const HANZO_CONTEXT = `You are the Hanzo AI assistant on hanzo.ai. Help users understand and use the Hanzo platform.

Key Information:
- Hanzo is an AI PaaS (Platform as a Service) for building AI-powered applications
- Products include: Hanzo Dev (AI coding agent), Hanzo Auto (workflow automation), Hanzo Flow (visual AI workflow builder)
- Infrastructure: Vector DB, SQL, KV, Message Queue, Functions, Machines
- 260+ MCP (Model Context Protocol) tools available
- All core products are open source (MIT/Apache 2.0)
- GitHub orgs: hanzoai (AI), hanzo-js (JavaScript SDKs), hanzo-apps (templates and starters)

Products:
- Hanzo Dev (@hanzo/dev): Terminal-based AI coding agent that writes, debugs, tests, and opens PRs
- Hanzo Auto: Workflow automation with AI agents (based on n8n-style visual flows)
- Hanzo Flow: Visual AI/LLM workflow builder for creating AI pipelines
- Hanzo API: OpenAI-compatible API gateway to 100+ AI models

Hanzo Network:
- Decentralized AI compute network
- Contribute GPU power and earn rewards
- Powers AI inference and training at scale
- Learn more at hanzo.network

Getting Started:
1. Install: curl -fsSL hanzo.sh/install.sh | sh
2. Login: hanzo login
3. Start coding: hanzo dev "Build a RAG chatbot"

Templates (launch instantly at hanzo.app):
- ai-chat: Full-featured AI chat application
- rag-starter: RAG application with vector search
- agent-toolkit: Multi-agent application starter
- api-template: AI API server with streaming
- saas-starter: Full SaaS with AI features

Links:
- Docs: docs.hanzo.ai
- GitHub: github.com/hanzoai
- Discord: discord.gg/hanzo
- Research: zenlm.org
- Network: hanzo.network
- Full Chat: hanzo.chat

Help users understand the platform, get started, find templates, and discover the right resources.`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm Hanzo AI. How can I help you today? I can answer questions about our platform, help you get started, or point you to the right resources.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call Hanzo AI API
      const response = await fetch("https://api.hanzo.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Use public key for widget - rate limited
          "Authorization": "Bearer hz_widget_public",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          messages: [
            { role: "system", content: HANZO_CONTEXT },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: text },
          ],
          max_tokens: 500,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          role: "assistant",
          content: data.choices[0].message.content,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // Fallback response
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm having trouble connecting right now. You can visit [docs.hanzo.ai](https://docs.hanzo.ai) for documentation or join our [Discord](https://discord.gg/hanzo) for help!",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting. Please try again or visit [docs.hanzo.ai](https://docs.hanzo.ai).",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (value: string) => {
    handleSend(value);
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="hz-sq-7 hz-fixed hz-z-overlay hz-r-full hz-row hz-ai-center hz-jc-center hz-shadow-lg hz-transition hz-bg-inverse"
        
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X className="hz-sq-4 hz-fg" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
            >
              <MessageSquare className="hz-sq-4 hz-fg" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hz-fixed hz-z-overlay hz-mw-full hz-r-xl hz-bordered hz-bg-surface hz-shadow-lg hz-col hz-clip"
          >
            {/* Header */}
            <div className="hz-row hz-ai-center hz-jc-between hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
              <div className="hz-row hz-ai-center hz-gap-2">
                <div className="hz-sq-5 hz-r-lg hz-row hz-ai-center hz-jc-center hz-bg-inverse" >
                  <Bot className="hz-sq-2 hz-fg" />
                </div>
                <div>
                  <div className="hz-t-sm hz-w-medium hz-fg">Hanzo AI</div>
                  <div className="hz-t-xs hz-fg-muted">Ask me anything</div>
                </div>
              </div>
              <a
                href="https://hanzo.chat"
                target="_blank"
                rel="noopener noreferrer"
                className="hz-t-xs hz-fg-muted hz-transition hz-row hz-ai-center hz-gap-1 hz-link"
              >
                Full chat
                <ExternalLink className="hz-sq-1" />
              </a>
            </div>

            {/* Messages */}
            <div className="hz-grow hz-scroll-y hz-p-4 hz-stack-4">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`hz-row ${message.role === "user" ? "hz-jc-end" : "hz-jc-start"}`}
                >
                  <div
                    className={`hz-mw-full hz-r-lg hz-px-3 hz-py-2 hz-t-sm ${
                      message.role === "user"
                        ? "hz-bg-inverse hz-fg-inverse"
                        : "hz-bg-surface hz-fg-soft hz-bordered"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="hz-row hz-jc-start">
                  <div className="hz-bg-surface hz-bordered hz-r-lg hz-px-4 hz-py-2">
                    <div className="hz-row hz-gap-1">
                      <div className="hz-sq-1 hz-bg-raised hz-r-full" style={{ animationDelay: "0ms" }} />
                      <div className="hz-sq-1 hz-bg-raised hz-r-full" style={{ animationDelay: "150ms" }} />
                      <div className="hz-sq-1 hz-bg-raised hz-r-full" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick actions */}
            {messages.length <= 1 && (
              <div className="hz-px-4 hz-pb-4">
                <div className="hz-row hz-wrap hz-gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleQuickAction(action.value)}
                      className="hz-t-xs hz-px-3 hz-py-2 hz-r-full hz-bordered hz-fg-muted hz-transition hz-link"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="hz-p-4 hz-border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="hz-row hz-gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="hz-grow hz-bg-surface hz-bordered hz-r-lg hz-px-3 hz-py-2 hz-t-sm hz-fg"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="hz-p-2 hz-r-lg hz-transition hz-bg-inverse"
                  
                >
                  <Send className="hz-sq-2 hz-fg" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
