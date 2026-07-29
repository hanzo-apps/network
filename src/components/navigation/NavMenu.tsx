import { useState, ReactNode, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

type NavMenuProps = {
  label: string;
  children: ReactNode | ((closeMenu: () => void) => ReactNode);
};

export const NavMenu = ({ label, children }: NavMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { isDarkMode } = useTheme();
  
  const toggleMenu = () => {
    if (!isDesktop) {
      setIsOpen(!isOpen);
    }
  };
  
  // Add a delay for menu closing to make hover more forgiving
  const closeTimeoutRef = useRef<number | null>(null);
  
  const handleMouseEnter = () => {
    if (isDesktop) {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      closeTimeoutRef.current = window.setTimeout(() => {
        setIsOpen(false);
      }, 150); // 150ms delay before closing
    }
  };
  
  const closeMenu = () => setIsOpen(false);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Handle click outside to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isDesktop && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDesktop]);

  // Pass closeMenu function to children if they are a function
  const childrenWithProps = typeof children === "function" 
    ? children(closeMenu) 
    : children;

  return (
    <div 
      className="hz-rel" 
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Menu trigger button */}
      <button
        onClick={toggleMenu}
        className={cn(
          "hz-inline hz-ai-center hz-transition hz-t-sm hz-w-medium",
          isOpen
            ? (isDarkMode ? "hz-fg" : "hz-fg-inverse")
            : (isDarkMode ? "hz-fg-muted hz-link" : "hz-fg-faint hz-link")
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "hz-sq-2 hz-ml-1 hz-transition",
            isOpen && ""
          )}
        />
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <>
          {/* Desktop: Full viewport width dropdown with backdrop */}
          {isDesktop ? (
            <div className={cn(
                   "hz-fixed hz-left-0 hz-w-full hz-glass hz-z-overlay hz-border-b hz-shadow-lg",
                   isDarkMode
                     ? "hz-bg-surface"
                     : "hz-bg-quiet hz-border-strong"
                 )}
                 style={{
                   top: 'var(--header-height)',
                 }}>
              <div className="hz-py-5">
                <div className="hz-container hz-w-full">
                  {childrenWithProps}
                </div>
              </div>
            </div>
          ) : (
            /* Mobile: Full-viewport menu overlay */
            <div
              className={cn(
                "hz-fixed hz-inset hz-left-0 hz-right-0 hz-glass hz-z-overlay hz-w-full hz-transition",
                isDarkMode ? "hz-bg-surface" : "hz-bg-quiet"
              )}
              style={{
                top: 'var(--header-height)',
                height: 'calc(100vh - var(--header-height))',
                width: '100vw'
              }}
              onClick={closeMenu}
            >
              <div 
                className="hz-rel hz-w-full hz-h-full hz-scroll-y"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="hz-px-4 hz-py-5 hz-h-full hz-col">
                  <div className="hz-grow">
                    {childrenWithProps}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NavMenu;