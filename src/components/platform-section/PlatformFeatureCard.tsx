
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PlatformFeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

const PlatformFeatureCard: React.FC<PlatformFeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  index,
}) => {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      className="hz-card"
    >
      <div className="hz-sq-7 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4">
        <Icon className="hz-sq-4 hz-fg-muted" />
      </div>
      <h3 className="hz-t-xl hz-w-bold hz-mb-2 hz-fg">{title}</h3>
      <p className="hz-fg-muted">{description}</p>
    </motion.div>
  );
};

export default PlatformFeatureCard;
