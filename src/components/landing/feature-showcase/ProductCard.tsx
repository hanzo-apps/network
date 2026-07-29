
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
  hoverColor?: string;
  link?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  icon, 
  title, 
  description, 
  color = "bg-neutral-800/30", 
  hoverColor = "bg-neutral-600/40",
  link = "#"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="hz-card hz-h-full hz-transition hz-rel hz-clip hz-card-interactive"
    >
      {/* Background gradient effect */}
      <div className="hz-abs hz-inset hz-dim-more hz-z-base"></div>
      
      {/* Hover background effect */}
      <div className="hz-abs hz-inset hz-invisible hz-transition hz-z-base"></div>
      
      <div className="hz-rel hz-z-raised">
        {/* Icon container with dynamic color and hover effect - now with bigger icons */}
        <div className={cn(
          "hz-sq-8 hz-r-xl hz-row hz-ai-center hz-jc-center hz-mb-5 hz-transition", 
          color,
          `${hoverColor}`,
          ""
        )}>
          {React.cloneElement(icon as React.ReactElement, { className: "hz-sq-7" })}
        </div>
        
        <h3 className="hz-t-xl hz-w-bold hz-mb-3 hz-fg hz-transition hz-hoverable">{title}</h3>
        <p className="hz-fg-muted hz-mb-4 hz-transition hz-link">{description}</p>
        
        {/* Learn more button - now more visible with improved styling */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="hz-fg-muted hz-p-2 hz-row hz-ai-center hz-gap-1 hz-transition hz-dim hz-link"
          asChild
        >
          <a href={link}>
            <span>Learn more</span>
            <ArrowUpRight className="hz-sq-2 hz-ml-1 hz-transition" />
          </a>
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
