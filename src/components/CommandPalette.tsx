import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Terminal,
  Brain,
  Bot,
  Database,
  Zap,
  Shield,
  Cloud,
  Code,
  Server,
  Globe,
  CreditCard,
  Users,
  FileText,
  Settings,
  HelpCircle,
  ExternalLink,
  Command,
} from "lucide-react";


interface CommandItem {
  id: string;
  title: string;
  description?: string;
  href: string;
  icon: React.ElementType;
  category: string;
  external?: boolean;
  keywords?: string[];
}

const commands: CommandItem[] = [
  // Products
  { id: "dev", title: "Hanzo Dev", description: "Multi-agent coding workspace", href: "/dev", icon: Terminal, category: "Products", keywords: ["code", "coding", "agent"] },
  { id: "ai", title: "AI & Models", description: "Foundation models API", href: "/ai", icon: Brain, category: "Products", keywords: ["llm", "gpt", "model"] },
  { id: "operative", title: "Operative", description: "AI agents and automation", href: "/operative", icon: Bot, category: "Products", keywords: ["agent", "automation"] },
  { id: "base", title: "Hanzo Base", description: "Backend-as-a-Service", href: "/base", icon: Database, category: "Products", keywords: ["backend", "database"] },
  { id: "functions", title: "Functions", description: "Serverless compute", href: "/functions", icon: Zap, category: "Products", keywords: ["serverless", "lambda"] },
  { id: "vector", title: "Vector DB", description: "Vector database for AI", href: "/vector", icon: Database, category: "Products", keywords: ["embeddings", "rag"] },
  { id: "identity", title: "Identity", description: "Authentication & SSO", href: "/identity", icon: Shield, category: "Products", keywords: ["auth", "login", "sso"] },
  { id: "realtime", title: "Realtime", description: "WebSocket & live sync", href: "/realtime", icon: Globe, category: "Products", keywords: ["websocket", "sync"] },

  // Platform
  { id: "cloud", title: "Hanzo Cloud", description: "Complete cloud platform", href: "/cloud", icon: Cloud, category: "Platform", keywords: ["hosting", "deploy"] },
  { id: "platform", title: "Hanzo Platform", description: "Open source PaaS", href: "/platform", icon: Server, category: "Platform", keywords: ["self-host", "open source"] },
  { id: "blockchain", title: "Blockchain", description: "Web3 infrastructure", href: "/blockchain", icon: Code, category: "Platform", keywords: ["web3", "crypto"] },
  { id: "edge", title: "Edge", description: "Edge computing", href: "/edge", icon: Globe, category: "Platform", keywords: ["cdn", "edge"] },

  // Resources
  { id: "docs", title: "Documentation", description: "API docs and guides", href: "https://docs.hanzo.ai", icon: FileText, category: "Resources", external: true, keywords: ["api", "guide", "tutorial"] },
  { id: "pricing", title: "Pricing", description: "Plans and pricing", href: "/pricing", icon: CreditCard, category: "Resources", keywords: ["cost", "price", "plan"] },
  { id: "status", title: "Status", description: "System status", href: "/status", icon: Settings, category: "Resources", keywords: ["uptime", "health"] },
  { id: "contact", title: "Contact", description: "Get in touch", href: "/contact", icon: Users, category: "Resources", keywords: ["support", "help"] },

  // Company
  { id: "team", title: "Team", description: "Meet the team", href: "/team", icon: Users, category: "Company", keywords: ["about", "people"] },
  { id: "security", title: "Security", description: "Security practices", href: "/security", icon: Shield, category: "Company", keywords: ["compliance", "soc2"] },
  { id: "philosophy", title: "Philosophy", description: "Zen of Hanzo principles", href: "/philosophy", icon: HelpCircle, category: "Company", keywords: ["philosophy", "values", "zen of hanzo"] },
  { id: "zen-models", title: "Zen Models", description: "Open source AI models", href: "/zen", icon: HelpCircle, category: "Company", keywords: ["ai", "models", "llm", "zen"] },
  { id: "enterprise", title: "Enterprise", description: "Enterprise solutions", href: "/enterprise", icon: Server, category: "Company", keywords: ["business", "sales"] },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Filter commands based on search
  const filteredCommands = search
    ? commands.filter(
        (cmd) =>
          cmd.title.toLowerCase().includes(search.toLowerCase()) ||
          cmd.description?.toLowerCase().includes(search.toLowerCase()) ||
          cmd.keywords?.some((k) => k.toLowerCase().includes(search.toLowerCase()))
      )
    : commands;

  // Group by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  // Flatten for keyboard navigation
  const flatCommands = Object.values(groupedCommands).flat();

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % flatCommands.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + flatCommands.length) % flatCommands.length);
          break;
        case "Enter":
          e.preventDefault();
          if (flatCommands[selectedIndex]) {
            const cmd = flatCommands[selectedIndex];
            if (cmd.external) {
              window.open(cmd.href, "_blank");
            } else {
              navigate(cmd.href);
            }
            onClose();
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    },
    [flatCommands, selectedIndex, navigate, onClose]
  );

  // Global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = (cmd: CommandItem) => {
    if (cmd.external) {
      window.open(cmd.href, "_blank");
    } else {
      navigate(cmd.href);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="hz-fixed hz-inset hz-bg-surface hz-glass hz-z-overlay"
          />

          {/* Command palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="hz-center-x hz-fixed hz-w-full hz-mw-md hz-z-overlay"
          >
            <div className="hz-bg-surface hz-bordered hz-r-lg hz-shadow-lg hz-clip">
              {/* Search input */}
              <div className="hz-row hz-ai-center hz-gap-3 hz-px-4 hz-py-3 hz-border-b">
                <Search className="hz-sq-3 hz-fg-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search pages, products, docs..."
                  className="hz-grow hz-bg-none hz-fg hz-t-sm"
                />
                <kbd className="hz-px-2 hz-py-1 hz-t-xs hz-mono hz-bg-raised hz-r-md hz-fg-muted">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="hz-scroll-y hz-py-2">
                {Object.keys(groupedCommands).length === 0 ? (
                  <div className="hz-px-4 hz-py-6 hz-align-center hz-fg-muted hz-t-sm">
                    No results found for "{search}"
                  </div>
                ) : (
                  Object.entries(groupedCommands).map(([category, items]) => (
                    <div key={category}>
                      <div className="hz-px-4 hz-py-2 hz-t-xs hz-w-semibold hz-fg-muted hz-upper hz-tracking-wide">
                        {category}
                      </div>
                      {items.map((cmd) => {
                        const Icon = cmd.icon;
                        const index = flatCommands.findIndex((c) => c.id === cmd.id);
                        const isSelected = index === selectedIndex;

                        return (
                          <button
                            key={cmd.id}
                            onClick={() => handleSelect(cmd)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`hz-w-full hz-row hz-ai-center hz-gap-3 hz-px-4 hz-py-2 hz-align-left hz-transition ${
                              isSelected
                                ? "hz-bg-raised hz-fg"
                                : "hz-fg-soft hz-hoverable"
                            }`}
                          >
                            <div
                              className={`hz-sq-5 hz-r-lg hz-row hz-ai-center hz-jc-center ${
                                isSelected ? "hz-bg-quiet" : "hz-bg-raised"
                              }`}
                            >
                              <Icon
                                className={`hz-sq-2 ${
                                  isSelected ? "hz-fg" : "hz-fg-muted"
                                }`}
                              />
                            </div>
                            <div className="hz-grow">
                              <div className="hz-row hz-ai-center hz-gap-2">
                                <span className="hz-t-sm hz-w-medium hz-truncate">
                                  {cmd.title}
                                </span>
                                {cmd.external && (
                                  <ExternalLink className="hz-sq-1 hz-fg-muted" />
                                )}
                              </div>
                              {cmd.description && (
                                <div className="hz-t-xs hz-fg-muted hz-truncate">
                                  {cmd.description}
                                </div>
                              )}
                            </div>
                            {isSelected && (
                              <ArrowRight className="hz-sq-2 hz-fg-muted" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="hz-px-4 hz-py-2 hz-border-t hz-row hz-ai-center hz-jc-between">
                <div className="hz-row hz-ai-center hz-gap-4 hz-t-xs hz-fg-muted">
                  <span className="hz-row hz-ai-center hz-gap-1">
                    <kbd className="hz-px-2 hz-py-1 hz-bg-raised hz-r-md">↑</kbd>
                    <kbd className="hz-px-2 hz-py-1 hz-bg-raised hz-r-md">↓</kbd>
                    Navigate
                  </span>
                  <span className="hz-row hz-ai-center hz-gap-1">
                    <kbd className="hz-px-2 hz-py-1 hz-bg-raised hz-r-md">↵</kbd>
                    Select
                  </span>
                </div>
                <div className="hz-row hz-ai-center hz-gap-1 hz-t-xs hz-fg-muted">
                  <Command className="hz-sq-1" />
                  <span>K to toggle</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
