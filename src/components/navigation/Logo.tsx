import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { HanzoLogo, getMonoSVG } from "@hanzo/logo";

// The mark is @hanzo/logo's — one blocky H for the whole ecosystem. Copying it
// from the package (rather than a path literal pasted into this file) is what
// keeps this site's logo the same logo as hanzo.ai's.
const LOGO_SVG = getMonoSVG()

// Context menu items for right-click
const contextMenuItems = [
  { label: "Copy Logo SVG", action: "copy-svg" },
  { label: "Brand Guidelines", href: "/brand" },
  { divider: true },
  { label: "All Products", href: "/products" },
  { label: "Hanzo Dev", href: "/dev" },
  { label: "AI & Models", href: "/ai" },
  { label: "Hanzo Cloud", href: "/cloud" },
  { divider: true },
  { label: "Documentation", href: "https://docs.hanzo.ai", external: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Sales", href: "/contact" },
  { label: "Status", href: "/status" },
];

const Logo = () => {
  const { isDarkMode } = useTheme();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showIntroWordmark, setShowIntroWordmark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Animation variants for the container
  const logoVariants = {
    initial: {
      opacity: 0,
      rotateY: 180,
      scale: 0.6
    },
    animate: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        staggerChildren: 0.12,
        when: "beforeChildren"
      }
    }
  };

  // After logo animation, show wordmark briefly then hide
  useEffect(() => {
    const animTimer = setTimeout(() => {
      setAnimationComplete(true);
      setShowIntroWordmark(true);
    }, 1200);

    // Hide the intro wordmark after showing it
    const hideTimer = setTimeout(() => {
      setShowIntroWordmark(false);
    }, 2500);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Close context menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContextMenu(null);
    };

    if (contextMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [contextMenu]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleMenuItemClick = async (item: typeof contextMenuItems[0]) => {
    setContextMenu(null);
    if ('action' in item && item.action === 'copy-svg') {
      try {
        await navigator.clipboard.writeText(LOGO_SVG);
        // Could add a toast notification here
      } catch (err) {
        console.error('Failed to copy SVG:', err);
      }
    } else if ('external' in item && item.external) {
      window.open(item.href, "_blank");
    } else if (item.href) {
      navigate(item.href);
    }
  };

  // Show wordmark when hovering OR during intro animation
  const shouldShowWordmark = isHovered || showIntroWordmark;

  return (
    <>
      <Link
        to="/"
        className="hz-rel hz-row hz-ai-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onContextMenu={handleContextMenu}
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={logoVariants}
          className="hz-sq-4 hz-rel hz-none"
          onAnimationComplete={() => setAnimationComplete(true)}
          style={{ transformOrigin: "center center" }}
        >
          <HanzoLogo
            variant={isDarkMode ? "white" : "mono"}
            size="100%"
            className="hz-w-full hz-h-full"
          />
        </motion.div>

        {/* The wordmark rides in beside the mark on hover and during the intro,
            and takes no width when it is away — so the header never reflows and
            the mark never sits on top of its own name. */}
        <span
          aria-hidden={!shouldShowWordmark}
          className="hz-w-bold hz-t-xl hz-fg hz-whitespace-nowrap hz-clip hz-transition"
          style={{
            maxWidth: shouldShowWordmark ? "6rem" : 0,
            opacity: shouldShowWordmark ? 1 : 0,
            marginLeft: shouldShowWordmark ? "var(--space-2)" : 0,
          }}
        >
          Hanzo
        </span>
      </Link>

      {/* Right-click context menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={`hz-fixed hz-z-overlay hz-r-lg hz-shadow-lg hz-py-1 hz-bordered ${
              isDarkMode
                ? "hz-bg"
                : "hz-bg-inverse hz-border-strong"
            }`}
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            {contextMenuItems.map((item, index) =>
              'divider' in item ? (
                <div key={index} className={`hz-border-t hz-mt-1 hz-mb-1 ${isDarkMode ? "" : "hz-border-strong"}`} />
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleMenuItemClick(item)}
                  className={`hz-w-full hz-align-left hz-px-3 hz-py-2 hz-t-sm hz-transition hz-row hz-ai-center hz-jc-between ${
                    isDarkMode
                      ? "hz-fg-soft hz-hoverable"
                      : "hz-fg-faint hz-link"
                  }`}
                >
                  {item.label}
                  {'action' in item && item.action === 'copy-svg' && (
                    <svg className={`hz-sq-1 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                  {'external' in item && item.external && (
                    <svg className={`hz-sq-1 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Logo;
