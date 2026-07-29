
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { OperatorModel } from "./operatorModelData";

interface ModelCardProps {
  model: OperatorModel;
  index: number;
}

const ModelCard = ({ model, index }: ModelCardProps) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        hz-card hz-transition hz-rel hz-card-interactive
        ${model.recommended ? 'hz-border-strong' : ''}
      `}
    >
      {model.recommended && (
        <span className="hz-abs hz-top-0 hz-px-3 hz-py-1 hz-bg-raised hz-fg hz-t-xs hz-w-semibold hz-r-full">
          Recommended
        </span>
      )}
      
      <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-1">{model.name}</h3>
      <p className="hz-t-sm hz-fg-muted hz-mb-4">by {model.provider}</p>
      
      <ul className="hz-stack-2 hz-mb-5">
        {model.features.map((feature, i) => (
          <li key={i} className="hz-row hz-ai-start">
            <Check className="hz-sq-3 hz-fg-muted hz-mr-2 hz-none hz-mt-1" />
            <span className="hz-fg-soft hz-t-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="hz-pt-4 hz-mt-auto">
        <p className="hz-t-sm hz-fg-muted hz-mono">{model.command}</p>
      </div>
    </motion.div>
  );
};

export default ModelCard;
