import React, { ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface NavbarContainerProps {
  children: ReactNode;
  isScrolled: boolean;
}

const NavbarContainer = ({ children, isScrolled }: NavbarContainerProps) => {
  const { isDarkMode, getGlassClass } = useTheme();
  
  return (
    <nav
      className={cn(
        "hz-fixed hz-w-full hz-z-overlay hz-transition",
        isScrolled ? "hz-glass hz-shadow" : "hz-glass",
        getGlassClass()
      )}
    >
      <div className="hz-container hz-w-full">
        <div className="hz-row hz-ai-center hz-h-header">
          {children}
        </div>
      </div>
    </nav>
  );
};

export default NavbarContainer;