import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Download, ExternalLink } from "lucide-react";

const STORAGE_KEY = "hanzo-desktop-banner-dismissed";

interface DesktopAppBannerProps {
  variant?: "floating" | "inline";
}

const DesktopAppBanner = ({ variant = "floating" }: DesktopAppBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Check if already dismissed
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    // Check if on macOS
    const platform = navigator.platform.toLowerCase();
    const isMacOS = platform.includes("mac");
    setIsMac(isMacOS);

    // Show after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const downloadUrl = isMac
    ? "https://github.com/hanzoai/hanzo-dev/releases/latest/download/Hanzo-Dev-darwin-arm64.dmg"
    : "https://github.com/hanzoai/hanzo-dev/releases";

  if (variant === "inline") {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="hz-border-b"
          >
            <div className="hz-container hz-py-3 hz-row hz-ai-center hz-jc-between hz-gap-4">
              <div className="hz-row hz-ai-center hz-gap-3">
                <div className="hz-sq-5 hz-r-lg hz-bg-surface hz-row hz-ai-center hz-jc-center">
                  <Monitor className="hz-sq-2 hz-fg-soft" />
                </div>
                <div>
                  <p className="hz-t-sm hz-fg hz-w-medium">
                    Hanzo Dev Desktop App
                  </p>
                  <p className="hz-t-xs hz-fg-muted">
                    Native performance. All your tools in one place.
                  </p>
                </div>
              </div>
              <div className="hz-row hz-ai-center hz-gap-2">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-gap-2 hz-fg hz-transition"
                >
                  <Download className="hz-sq-2" />
                  {isMac ? "Download for Mac" : "Download"}
                </a>
                <button
                  onClick={handleDismiss}
                  className="hz-p-2 hz-r-full hz-fg-muted hz-transition hz-link"
                >
                  <X className="hz-sq-2" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="hz-fixed hz-z-header hz-mw-xs"
        >
          <div className="hz-bg-surface hz-bordered hz-r-xl hz-shadow-lg hz-clip">
            {/* Header with close button */}
            <div className="hz-row hz-ai-center hz-jc-between hz-px-4 hz-py-3 hz-border-b">
              <div className="hz-row hz-ai-center hz-gap-2">
                <div className="hz-sq-4 hz-r-md hz-bg-surface hz-row hz-ai-center hz-jc-center">
                  <Monitor className="hz-sq-2 hz-fg-soft" />
                </div>
                <span className="hz-t-xs hz-w-medium hz-fg">NEW</span>
              </div>
              <button
                onClick={handleDismiss}
                className="hz-p-1 hz-r-md hz-fg-muted hz-transition hz-link"
              >
                <X className="hz-sq-2" />
              </button>
            </div>

            {/* Content */}
            <div className="hz-p-4">
              <h3 className="hz-t-base hz-w-semibold hz-fg hz-mb-1">
                Get Hanzo Dev for Desktop
              </h3>
              <p className="hz-t-sm hz-fg-muted hz-mb-4">
                Native app with faster performance, offline access, and system integrations.
              </p>

              <div className="hz-row hz-ai-center hz-gap-2">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-grow hz-gap-2 hz-fg hz-transition"
                >
                  <Download className="hz-sq-2" />
                  {isMac ? "Download for Mac" : "Download"}
                </a>
                <a
                  href="/dev"
                  className="hz-px-4 hz-py-2 hz-r-lg hz-bordered hz-fg-soft hz-t-sm hz-w-medium hz-transition hz-hoverable"
                >
                  Learn more
                </a>
              </div>

              {/* Platform note */}
              <p className="hz-mt-3 hz-t-xs hz-fg-muted hz-row hz-ai-center hz-gap-1">
                {isMac ? (
                  <>Apple Silicon & Intel supported</>
                ) : (
                  <>
                    <ExternalLink className="hz-sq-1" />
                    Also available for Windows & Linux
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DesktopAppBanner;
