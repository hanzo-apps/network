import React from "react";
import { motion } from "framer-motion";

export interface ZenPrinciple {
  number: string;
  title: string;
  japaneseSymbol: string;
  description: string;
  emoji: string;
  discipline?: string;
}

interface ZenPrincipleCardProps {
  principle: ZenPrinciple;
  index: number;
}

const ZenPrincipleCard: React.FC<ZenPrincipleCardProps> = ({ principle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="hz-card hz-glass hz-rel hz-clip"
    >
      {principle.discipline && (
        <div className="hz-abs hz-t-xs hz-fg-muted hz-dim-more hz-transition">
          {principle.discipline}
        </div>
      )}
      <div className="hz-row hz-ai-center hz-mb-3">
        <div className="hz-sq-5 hz-row hz-ai-center hz-jc-center hz-r-full hz-bg-raised hz-fg-muted hz-mr-3">
          {principle.emoji || principle.number}
        </div>
        <h3 className="hz-t-xl hz-fg hz-w-bold">{principle.title}</h3>
      </div>
      <div className="hz-t-sm hz-fg-muted hz-mono hz-mb-2">{principle.japaneseSymbol}</div>
      <p className="hz-fg-soft">{principle.description}</p>
      <div className="hz-abs hz-t-xs hz-fg-muted">
        #{principle.number}/64
      </div>
    </motion.div>
  );
};

export default ZenPrincipleCard;