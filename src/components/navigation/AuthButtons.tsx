import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ExternalLink, Brain, Video, Music, Box, Cpu, Sparkles, Zap } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

interface AuthButtonsProps {
  user: any | null;
  onOpenCommandPalette?: () => void;
}

// Zen model family for dropdown
const zenModels = [
  {
    name: "zen-eco",
    params: "4B",
    description: "Fast general-purpose LLM",
    icon: Brain,
    href: "https://huggingface.co/zenlm/zen-eco-4b-instruct",
    external: true,
  },
  {
    name: "zen-omni",
    params: "8B",
    description: "Multimodal vision + audio",
    icon: Sparkles,
    href: "https://huggingface.co/zenlm/zen-omni-8b",
    external: true,
  },
  {
    name: "zen-director",
    params: "5B",
    description: "Text-to-video generation",
    icon: Video,
    href: "https://huggingface.co/zenlm/zen-director-5b",
    external: true,
  },
  {
    name: "zen-3d",
    params: "3.3B",
    description: "3D asset generation",
    icon: Box,
    href: "https://huggingface.co/zenlm/zen-3d",
    external: true,
  },
];

// Quick access items
const quickAccess = [
  { label: "Hanzo Dev", href: "/dev", external: false },
  { label: "Hanzo Cloud", href: "https://cloud.hanzo.ai", external: true },
  { label: "All Zen Models", href: "/zen", external: false },
  { label: "Pricing", href: "/pricing", external: false },
];

// Login items
const loginItems = [
  { label: "hanzo.chat", href: "https://hanzo.chat", external: true },
  { label: "Console login", href: "https://cloud.hanzo.ai", external: true },
];

const AuthButtons = ({ user, onOpenCommandPalette }: AuthButtonsProps) => {
  const { isDarkMode } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  return (
    <div className="hz-desktop-only hz-row hz-ai-center hz-inline-3">
      {/* Search / Command palette trigger - unified widget */}
      <button
        onClick={onOpenCommandPalette}
        className="hz-btn hz-gap-2 hz-fg-muted hz-transition"
        aria-label="Search (⌘K)"
      >
        <Search className="hz-sq-2" />
        <span className="hz-desktop-only hz-fg-muted hz-t-xs">Search...</span>
        <kbd className="hz-inline hz-ai-center hz-gap-1 hz-px-2 hz-py-1 hz-t-xs hz-mono hz-bg-surface hz-bordered hz-r-md hz-fg-muted">
          <span className="hz-t-xs">⌘</span>K
        </kbd>
      </button>

      {/* Contact sales button */}
      <Link to="/contact">
        <Button
          variant="ghost"
          size="sm"
          className="hz-fg-soft hz-t-sm hz-w-medium hz-bh-5 hz-hoverable"
        >
          Contact sales
        </Button>
      </Link>

      {/* Try Hanzo dropdown - hover activated */}
      <div
        className="hz-rel"
        ref={dropdownRef}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button
          className="hz-btn hz-btn-primary hz-gap-2 hz-fg-inverse hz-transition"
        >
          Try Hanzo
          <ChevronDown className={`hz-sq-2 hz-transition ${isDropdownOpen ? '' : ''}`} />
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="hz-abs hz-right-0 hz-mt-2 hz-bg-surface hz-glass hz-bordered hz-r-xl hz-shadow-lg hz-clip hz-z-overlay"
            >
              {/* Zen AI Models - Featured Section */}
              <div className="hz-p-4">
                <div className="hz-row hz-ai-center hz-jc-between hz-mb-3">
                  <div className="hz-row hz-ai-center hz-gap-2">
                    <Zap className="hz-sq-2 hz-fg-muted" />
                    <span className="hz-t-xs hz-w-semibold hz-fg hz-upper hz-tracking-wide">
                      Zen AI Models
                    </span>
                  </div>
                  <Link
                    to="/zen"
                    onClick={() => setIsDropdownOpen(false)}
                    className="hz-t-xs hz-fg-muted hz-transition hz-link"
                  >
                    View all →
                  </Link>
                </div>

                <div className="hz-grid hz-grid-2 hz-gap-2">
                  {zenModels.map((model) => {
                    const ModelIcon = model.icon;
                    return (
                      <a
                        key={model.name}
                        href={model.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsDropdownOpen(false)}
                        className="hz-row hz-ai-start hz-gap-3 hz-p-3 hz-r-lg hz-bg-raised hz-transition hz-hoverable"
                      >
                        <div className="hz-sq-5 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-none">
                          <ModelIcon className="hz-sq-2 hz-fg-soft hz-transition hz-hoverable" />
                        </div>
                        <div className="">
                          <div className="hz-row hz-ai-center hz-gap-2">
                            <span className="hz-t-sm hz-w-medium hz-fg">{model.name}</span>
                            <span className="hz-t-xs hz-mono hz-fg-muted">{model.params}</span>
                          </div>
                          <p className="hz-t-xs hz-fg-muted hz-truncate">{model.description}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="hz-border-t" />

              {/* Quick Access */}
              <div className="hz-py-2">
                <div className="hz-px-4 hz-py-2">
                  <span className="hz-t-xs hz-w-medium hz-fg-muted hz-upper hz-tracking-wide">
                    Quick Access
                  </span>
                </div>
                {quickAccess.map((item) => {
                  const content = (
                    <div className="hz-row hz-ai-center hz-jc-between hz-w-full hz-py-2 hz-px-4 hz-fg hz-transition hz-hoverable">
                      <span className="hz-t-sm">{item.label}</span>
                      {item.external && <ExternalLink className="hz-sq-2 hz-fg-muted" />}
                    </div>
                  );

                  if (item.external) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <Link key={item.label} to={item.href} onClick={() => setIsDropdownOpen(false)}>
                      {content}
                    </Link>
                  );
                })}
              </div>

              <div className="hz-border-t" />

              {/* Login Section */}
              <div className="hz-py-2">
                <div className="hz-px-4 hz-py-2">
                  <span className="hz-t-xs hz-w-medium hz-fg-muted hz-upper hz-tracking-wide">
                    Log in
                  </span>
                </div>
                {loginItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsDropdownOpen(false)}
                    className="hz-row hz-ai-center hz-jc-between hz-w-full hz-py-2 hz-px-4 hz-fg hz-transition hz-hoverable"
                  >
                    <span className="hz-t-sm">{item.label}</span>
                    <ExternalLink className="hz-sq-2 hz-fg-muted" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthButtons;
