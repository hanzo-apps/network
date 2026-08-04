
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AIFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  index: number;
}

const AIFeatureCard = ({ icon, title, description, delay, index }: AIFeatureCardProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      key={index}
      variants={itemVariants}
      initial="hidden"
      animate="hidden"
      transition={{ duration: 0.5, delay }}
      className="hz-card hz-transition hz-card-interactive"
    >
      <div className="hz-mb-4 hz-transition">
        {icon}
      </div>
      <h3 className="hz-t-xl hz-w-bold hz-mb-3">{title}</h3>
      <p className="hz-fg-muted">{description}</p>
    </motion.div>
  );
};

export default AIFeatureCard;
