
import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface ScrollToTopButtonProps {
  scrolled: boolean;
}

const ScrollToTopButton = ({ scrolled }: ScrollToTopButtonProps) => {
  console.log("ScrollToTopButton rendering, scrolled:", scrolled);
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: scrolled ? 1 : 0 }}
      className={`hz-card hz-card-tight hz-fixed hz-glass hz-transition hz-z-overlay hz-card-interactive ${
        !scrolled ? 'hz-no-pointer' : ''
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp className="hz-sq-3 hz-fg" />
    </motion.button>
  );
};

export default ScrollToTopButton;
