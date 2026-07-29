
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ViewAllButtonProps {
  href: string;
  text: string;
  hoverColor: string;
}

const ViewAllButton: React.FC<ViewAllButtonProps> = ({ href, text, hoverColor }) => {
  // Map hover colors to Tailwind classes
  const hoverColorMap: Record<string, { bg: string, border: string, text: string }> = {
    blue: {
      bg: "hover:bg-neutral-800/20",
      border: "hover:border-neutral-500",
      text: "text-neutral-400 hover:text-neutral-300"
    },
    purple: {
      bg: "hover:bg-neutral-800/20",
      border: "hover:border-neutral-500",
      text: "text-neutral-400 hover:text-neutral-300"
    },
    green: {
      bg: "hover:bg-neutral-800/20",
      border: "hover:border-neutral-500",
      text: "text-neutral-400 hover:text-neutral-300"
    }
  };
  
  const colorClasses = hoverColorMap[hoverColor] || hoverColorMap.blue;
  
  return (
    <div className="hz-row hz-jc-center hz-mb-7">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Button 
          variant="outline" 
          size="sm"
          className={cn(
            "hz-transition",
            colorClasses.bg,
            colorClasses.border,
            colorClasses.text
          )}
          asChild
        >
          <a href={href} className="hz-row hz-ai-center hz-gap-2">
            <span>{text}</span>
            <ArrowRight className="hz-sq-2 hz-transition" />
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default ViewAllButton;
