
import { motion } from "framer-motion";
import { 
  MessageSquare, Workflow, Code, Cpu, Database, Search, 
  Server, Terminal, FileCode, Github, Zap, Lock, Globe 
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const products = [
  {
    icon: <MessageSquare className="hz-sq-5" />,
    title: "Hanzo Chat",
    description: "Interactive AI chat experiences with advanced context handling and embedding capabilities.",
    code: "import { useChat } from '@hanzo/chat';",
    features: [
      { icon: <Zap className="hz-sq-2" />, text: "Multi-model support including OpenAI, Anthropic, and more" },
      { icon: <Lock className="hz-sq-2" />, text: "Secure, private conversations with enterprise-grade encryption" },
      { icon: <Globe className="hz-sq-2" />, text: "Customizable chat interfaces with rich media support" },
      { icon: <Github className="hz-sq-2" />, text: "Open source client, self-hostable infrastructure" }
    ],
    productUrl: "https://docs.hanzo.ai/products/chat",
    github: "https://github.com/hanzoai/chat"
  },
  {
    icon: <Workflow className="hz-sq-5" />,
    title: "Hanzo Flow",
    description: "Build complex AI agents and automation workflows with our visual flow builder.",
    code: "import { createFlow } from '@hanzo/flow';",
    features: [
      { icon: <Zap className="hz-sq-2" />, text: "Visual workflow editor for building complex AI pipelines" },
      { icon: <Lock className="hz-sq-2" />, text: "Drag-and-drop interface for connecting AI components" },
      { icon: <Globe className="hz-sq-2" />, text: "Multi-agent orchestration and communication" },
      { icon: <Github className="hz-sq-2" />, text: "Extensive library of pre-built flows and components" }
    ],
    productUrl: "https://docs.hanzo.ai/products/flow",
    github: "https://github.com/hanzoai/flow"
  },
  {
    icon: <Code className="hz-sq-5" />,
    title: "Hanzo LLMs",
    description: "Unified gateway to access all major language models with a single API.",
    code: "import { useLLM } from '@hanzo/llms';",
    features: [
      { icon: <Zap className="hz-sq-2" />, text: "Single API for 50+ language models including OpenAI, Claude, Llama" },
      { icon: <Lock className="hz-sq-2" />, text: "Intelligent routing and fallback between providers" },
      { icon: <Globe className="hz-sq-2" />, text: "Cost optimization and performance monitoring" },
      { icon: <Github className="hz-sq-2" />, text: "Open source client with enterprise security features" }
    ],
    productUrl: "https://docs.hanzo.ai/products/llms",
    github: "https://github.com/hanzoai/llms"
  },
  {
    icon: <Cpu className="hz-sq-5" />,
    title: "Hanzo MCPs",
    description: "Server and gateway for multimodal conversational processors with robust tooling.",
    code: "import { useMCP } from '@hanzo/mcps';",
    features: [
      { icon: <Zap className="hz-sq-2" />, text: "Unified interface for GPT-4o, Claude 3, Gemini and more" },
      { icon: <Lock className="hz-sq-2" />, text: "Tool-use capabilities with custom tool integration" },
      { icon: <Globe className="hz-sq-2" />, text: "Distributed MCP deployment across edge and cloud" },
      { icon: <Github className="hz-sq-2" />, text: "Comprehensive observability and monitoring" }
    ],
    productUrl: "https://docs.hanzo.ai/products/mcps",
    github: "https://github.com/hanzoai/mcps"
  },
  {
    icon: <Database className="hz-sq-5" />,
    title: "Hanzo RealtimeDB",
    description: "High-performance real-time database for massive analytics workloads.",
    code: "import { useRealtimeDB } from '@hanzo/realtimedb';",
    features: [
      { icon: <Zap className="hz-sq-2" />, text: "Real-time data synchronization across clients" },
      { icon: <Lock className="hz-sq-2" />, text: "Petabyte-scale analytics with millisecond queries" },
      { icon: <Globe className="hz-sq-2" />, text: "Event-driven architecture with webhooks and triggers" },
      { icon: <Github className="hz-sq-2" />, text: "Self-hostable with cloud-native deployment options" }
    ],
    productUrl: "https://docs.hanzo.ai/products/realtimedb",
    github: "https://github.com/hanzoai/realtimedb"
  },
  {
    icon: <Search className="hz-sq-5" />,
    title: "Hanzo Vector",
    description: "Real-time vector search engine for semantic retrieval and AI applications.",
    code: "import { useVector } from '@hanzo/vector';",
    features: [
      { icon: <Zap className="hz-sq-2" />, text: "High-performance vector database for AI embeddings" },
      { icon: <Lock className="hz-sq-2" />, text: "Hybrid search combining vector and keyword techniques" },
      { icon: <Globe className="hz-sq-2" />, text: "Real-time indexing and search capabilities" },
      { icon: <Github className="hz-sq-2" />, text: "Optimized for RAG and semantic search applications" }
    ],
    productUrl: "https://docs.hanzo.ai/products/vector",
    github: "https://github.com/hanzoai/vector"
  },
  {
    icon: <Server className="hz-sq-5" />,
    title: "Hanzo Base",
    description: "One-file backend with embedded DB that scales to planetary distributed SQL.",
    code: "import { createClient } from '@hanzo/base';",
    features: [
      { icon: <Zap className="hz-sq-2" />, text: "Local-first development with instant cloud scaling" },
      { icon: <Lock className="hz-sq-2" />, text: "Built-in authentication, storage, and functions" },
      { icon: <Globe className="hz-sq-2" />, text: "Edge-optimized with global distribution" },
      { icon: <Github className="hz-sq-2" />, text: "100% open source and MIT licensed" }
    ],
    productUrl: "https://docs.hanzo.ai/products/base",
    github: "https://github.com/hanzoai/base"
  },
  {
    icon: <Terminal className="hz-sq-5" />,
    title: "Hanzo Dev",
    description: "AI-powered development environment with CLI, web, and VSCode extensions.",
    code: "import { useDev } from '@hanzo/dev';",
    features: [
      { icon: <Zap className="hz-sq-2" />, text: "AI assistant integrated into your workflow" },
      { icon: <Lock className="hz-sq-2" />, text: "Code generation, refactoring, and documentation" },
      { icon: <Globe className="hz-sq-2" />, text: "Available as CLI, web app, and IDE plugins" },
      { icon: <Github className="hz-sq-2" />, text: "Fully customizable and extendable" }
    ],
    productUrl: "https://docs.hanzo.ai/products/dev",
    github: "https://github.com/hanzoai/dev"
  },
  {
    icon: <FileCode className="hz-sq-5" />,
    title: "Hanzo Code",
    description: "AI-powered code editor based on VSCode with advanced coding capabilities.",
    code: "import { useCode } from '@hanzo/code';",
    features: [
      { icon: <Zap className="hz-sq-2" />, text: "Built on VSCode with full extension compatibility" },
      { icon: <Lock className="hz-sq-2" />, text: "AI pair programming and code generation" },
      { icon: <Globe className="hz-sq-2" />, text: "Integrated with Hanzo's AI engineering platform" },
      { icon: <Github className="hz-sq-2" />, text: "Open source with enterprise features" }
    ],
    productUrl: "https://docs.hanzo.ai/products/code",
    github: "https://github.com/hanzoai/code"
  }
];

// Simple OpenAI-compatible chat example component
const ChatExample = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "system", content: "Welcome to Hanzo Chat. How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = { role: "user", content: message };
    setChatHistory([...chatHistory, userMessage]);
    setMessage("");
    setIsLoading(true);

    // Simulate API call (in a real app, you'd call your actual API endpoint)
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: `Thanks for trying Hanzo Chat! Your message was: "${userMessage.content}"\n\nIn a real implementation, this would connect to our OpenAI-compatible API endpoint.` 
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="hz-container-narrow hz-mw-md hz-card hz-w-full">
      <div className="hz-card hz-card-tight hz-mb-4 hz-bh-8 hz-scroll-y">
        {chatHistory.map((msg, index) => (
          <div 
            key={index} 
            className={`hz-mb-3 hz-p-2 hz-r-md ${
              msg.role === "user" ? "hz-bg-raised hz-ml-4" : "hz-bg-raised"
            }`}
          >
            <div className="hz-t-xs hz-fg-muted hz-mb-1">
              {msg.role === "user" ? "You" : "Hanzo AI"}
            </div>
            <div className="">{msg.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="hz-row hz-ai-center hz-inline-2 hz-p-2">
            <div className="hz-sq-1 hz-bg-raised hz-r-full"></div>
            <div className="hz-sq-1 hz-bg-raised hz-r-full"></div>
            <div className="hz-sq-1 hz-bg-raised hz-r-full"></div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="hz-row hz-gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Hanzo AI something..."
          className="hz-grow hz-bg-raised hz-fg hz-bordered hz-r-md hz-px-3 hz-py-2"
        />
        <Button type="submit" disabled={isLoading} className="hz-bg-raised hz-hoverable">
          Send
        </Button>
      </form>
      <div className="hz-mt-3 hz-t-xs hz-fg-muted hz-align-center">
        <code>import {'{'} createChat {'}'} from '@hanzoai/chat';</code>
      </div>
    </div>
  );
};

const Products = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
            Hanzo AI Platform
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            A comprehensive suite of AI-native tools and infrastructure
            for building modern applications.
          </p>
        </motion.div>

        {/* OpenAI-compatible chat example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-mb-7"
        >
          <div className="hz-align-center hz-mb-6">
            <h3 className="hz-t-2xl hz-w-semibold hz-fg">Try Hanzo Chat</h3>
            <p className="hz-fg-muted">Powered by our OpenAI-compatible API</p>
          </div>
          <ChatExample />
        </motion.div>

        {/* Product grid */}
        <div className="hz-grid hz-grid-3 hz-gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card hz-transition hz-card-interactive"
            >
              <div className="hz-row hz-ai-center hz-mb-4">
                <div className="hz-sq-7 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center hz-mr-4">
                  {product.icon}
                </div>
                <h3 className="hz-t-xl hz-w-semibold hz-fg">{product.title}</h3>
              </div>
              <p className="hz-fg-soft hz-mb-4">{product.description}</p>
              <div className="hz-bg-surface hz-r-md hz-p-3 hz-mono hz-t-sm hz-fg-muted hz-mb-4 hz-scroll-x">
                {product.code}
              </div>
              <ul className="hz-stack-2 hz-mb-5">
                {product.features.map((feature, fIndex) => (
                  <li key={fIndex} className="hz-row hz-ai-start">
                    <span className="hz-fg-muted hz-mr-2 hz-mt-1">{feature.icon}</span>
                    <span className="hz-fg-muted hz-t-sm">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <div className="hz-row hz-inline-3">
                <Button 
                  className="hz-grow"
                  variant="outline"
                  size="sm"
                >
                  <a href={product.productUrl} className="hz-row hz-ai-center hz-jc-center hz-w-full">
                    Learn More
                  </a>
                </Button>
                <Button 
                  className="hz-grow hz-bg-raised hz-hoverable"
                  size="sm"
                >
                  <a href={product.github} target="_blank" rel="noopener noreferrer" className="hz-row hz-ai-center hz-jc-center hz-w-full">
                    <Github className="hz-sq-2 hz-mr-2" /> GitHub
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: products.length * 0.1 }}
          className="hz-mt-7 hz-p-6 hz-r-lg hz-ring hz-transition"
        >
          <div className="hz-container-narrow hz-align-center">
            <h3 className="hz-t-2xl hz-w-semibold hz-fg hz-mb-4">Ready to Start Building?</h3>
            <p className="hz-fg-soft hz-mb-6">
              Join thousands of developers building the future with Hanzo's AI-native platform.
              Get started for free today.
            </p>
            <div className="hz-col-row hz-jc-center hz-gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <a href="https://docs.hanzo.ai" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="hz-w-full hz-bg-none hz-fg hz-bordered hz-border-strong hz-transition hz-hoverable"
                  >
                    Read the Docs
                  </Button>
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <a href="https://app.hanzo.ai/signup" target="_blank" rel="noopener noreferrer">
                  <Button
                    className="hz-w-full hz-bg-inverse hz-fg-inverse hz-bordered hz-border-strong hz-transition hz-hoverable"
                  >
                    Get Started Free
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
