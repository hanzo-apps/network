
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenLine,
  BookOpen,
  Code,
  Send,
  ArrowUp,
  X,
  Apple,
  CheckSquare,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


// Quick action presets
const chatPresets = [
  { icon: PenLine, label: "Write" },
  { icon: BookOpen, label: "Learn" },
  { icon: Code, label: "Code" },
];

const HeroSection = () => {
  const [chatInput, setChatInput] = useState("");
  const [showMacOSPromo, setShowMacOSPromo] = useState(true);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      // Open global chat with this message
      window.dispatchEvent(new CustomEvent('openGlobalChat', { detail: { message: chatInput } }));
      setChatInput("");
    }
  };

  const handlePresetClick = (label: string) => {
    window.dispatchEvent(new CustomEvent('openGlobalChat', { detail: { action: label } }));
  };

  return (
    <section className="hz-rel hz-col hz-ai-center hz-jc-center hz-clip">
      {/* Subtle background gradient */}
      <div className="hz-abs hz-inset hz-no-pointer">
        <div className="hz-abs hz-bg-quiet hz-r-full hz-blur-bg"></div>
        <div className="hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      </div>

      <div className="hz-container hz-mx-auto hz-px-4 hz-rel hz-z-raised">
        <div className="hz-container-narrow">
          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hz-align-center hz-mb-6"
          >
            <h1 className="hz-t-5xl hz-w-bold hz-fg hz-mb-4 hz-tracking-tight">
              Meet your
              <br />
              <span className="hz-fg" >thinking partner.</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hz-container-narrow hz-mw-md hz-t-xl hz-fg-muted hz-align-center hz-mb-6"
          >
            Tackle any big, bold, bewildering challenge with Hanzo AI.
          </motion.p>

          {/* Chat input */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleChatSubmit}
            className="hz-mb-5"
          >
            <div className="hz-rel hz-row hz-ai-center">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="How can I help you today?"
                className="hz-w-full hz-bg-surface hz-bordered hz-r-lg hz-px-4 hz-py-4 hz-px-6 hz-t-base hz-fg hz-transition"
              />
              <Button
                type="submit"
                className="hz-btn hz-btn-ghost hz-abs hz-gap-2 hz-bg-inverse"
                >
                Ask Hanzo
                <ArrowUp className="hz-sq-2" />
              </Button>
            </div>
          </motion.form>

          {/* Quick action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hz-row hz-jc-center hz-gap-3"
          >
            {chatPresets.map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.label}
                  onClick={() => handlePresetClick(preset.label)}
                  className="hz-btn hz-gap-2 hz-fg-soft hz-transition"
                >
                  <Icon className="hz-sq-2" />
                  {preset.label}
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* macOS Download Promo - Bottom right popup */}
      <AnimatePresence>
        {showMacOSPromo && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="hz-fixed hz-z-overlay hz-mw-xs"
          >
            <div className="hz-card hz-shadow-lg">
              {/* Header with close button */}
              <div className="hz-row hz-ai-center hz-jc-between hz-mb-3">
                <div className="hz-row hz-ai-center hz-gap-2 hz-fg-muted hz-t-xs">
                  <span className="hz-sq-1 hz-r-full hz-bg-raised"></span>
                  Preview
                </div>
                <button
                  onClick={() => setShowMacOSPromo(false)}
                  className="hz-fg-muted hz-transition hz-link"
                >
                  <X className="hz-sq-2" />
                </button>
              </div>

              <div className="hz-row hz-gap-4">
                {/* Text content */}
                <div className="hz-grow">
                  <h3 className="hz-fg hz-w-semibold hz-t-lg hz-mb-2">
                    Some tasks just work better on macOS
                  </h3>
                  <p className="hz-fg-muted hz-t-sm hz-mb-4">
                    With Hanzo Dev, AI can now work directly with your local files and tools. Available in the macOS app.
                  </p>

                  {/* Action buttons */}
                  <div className="hz-row hz-gap-2">
                    <Link to="/download">
                      <Button
                        size="sm"
                        variant="outline"
                        className="hz-fg hz-hoverable"
                      >
                        Download
                      </Button>
                    </Link>
                    <Link to="/dev">
                      <Button
                        size="sm"
                        className="hz-fg hz-bg-inverse"
                        >
                        Learn more
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Visual - Checklist illustration */}
                <div className="hz-sq-8 hz-bg-quiet hz-r-lg hz-col hz-ai-start hz-jc-center hz-p-3 hz-none">
                  <div className="hz-row hz-ai-center hz-gap-2 hz-mb-2">
                    <CheckSquare className="hz-sq-2 hz-fg" />
                    <div className="hz-bw-6 hz-bh-1 hz-bg-raised hz-r-md"></div>
                  </div>
                  <div className="hz-row hz-ai-center hz-gap-2 hz-mb-2">
                    <Square className="hz-sq-2 hz-fg-faint" />
                    <div className="hz-bw-5 hz-bh-1 hz-bg-raised hz-r-md"></div>
                  </div>
                  <div className="hz-row hz-ai-center hz-gap-2">
                    <Square className="hz-sq-2 hz-fg-faint" />
                    <div className="hz-bw-4 hz-bh-1 hz-bg-raised hz-r-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
