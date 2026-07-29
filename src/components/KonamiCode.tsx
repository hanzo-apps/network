import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Konami-inspired code: up up down down down start select enter space
// Using arrow keys + s, e, Enter, Space
const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowDown",
  "KeyS", // start
  "KeyE", // select (using 'e')
  "Enter",
  "Space",
];

// Secret menu site URL
const SECRET_MENU_URL = "https://sfsecretmenu.com";

const KonamiCode = () => {
  const [isActive, setIsActive] = useState(false);
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  // Handle key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.code;

      setInputSequence((prev) => {
        const newSequence = [...prev, key].slice(-KONAMI_SEQUENCE.length);

        // Check if sequence matches
        if (
          newSequence.length === KONAMI_SEQUENCE.length &&
          newSequence.every((k, i) => k === KONAMI_SEQUENCE[i])
        ) {
          setIsActive(true);
          return [];
        }

        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) {
        setIsActive(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="hz-fixed hz-inset hz-z-overlay hz-bg"
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            onClick={() => setIsActive(false)}
            className="hz-card hz-card-tight hz-abs hz-z-raised hz-fg hz-transition hz-shadow-lg hz-card-interactive"
            aria-label="Close secret menu"
          >
            <X className="hz-sq-4" />
          </motion.button>

          {/* Secret hint badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hz-abs hz-z-raised hz-px-3 hz-py-2 hz-r-full hz-bg-surface hz-bordered hz-t-xs hz-fg-muted hz-mono"
          >
            🥷 ↑↑↓↓↓ S E ⏎ ␣
          </motion.div>

          {/* Embedded site */}
          <motion.iframe
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            src={SECRET_MENU_URL}
            className="hz-w-full hz-h-full hz-border-none"
            title="SF Secret Menu"
            allow="geolocation; payment"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiCode;
