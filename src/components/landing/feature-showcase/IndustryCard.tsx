
import React from "react";
import { motion } from "framer-motion";

interface IndustryCardProps {
  name: string;
  description: string;
  index: number;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ name, description, index }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="hz-card hz-transition hz-card-interactive"
    >
      <h3 className="hz-t-xl hz-w-bold hz-mb-3 hz-fg">{name}</h3>
      <p className="hz-fg-muted">{description}</p>
    </motion.div>
  );
};

export default IndustryCard;
