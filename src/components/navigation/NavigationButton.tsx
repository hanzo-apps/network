
import { ChevronDown } from "lucide-react";
import { type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavigationButtonProps {
  children: ReactNode;
  onHoverStart?: () => void;
  onClick?: () => void;
  noChevron?: boolean;
  isActive?: boolean;
}

export const NavigationButton = forwardRef<HTMLButtonElement, NavigationButtonProps>(
  ({ children, onHoverStart, onClick, noChevron = false, isActive = false, ...props }, ref) => {
    return (
      <button 
        ref={ref}
        className={cn(
          "hz-inline hz-ai-center hz-transition",
          isActive ? "hz-fg" : "hz-fg-soft hz-hoverable"
        )}
        onMouseEnter={onHoverStart}
        onClick={onClick}
        {...props}
      >
        {children}
        {!noChevron && (
          <ChevronDown 
            className={cn(
              "hz-sq-2 hz-ml-1 hz-transition",
              isActive && ""
            )} 
          />
        )}
      </button>
    );
  }
);

NavigationButton.displayName = "NavigationButton";
