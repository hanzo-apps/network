import React from "react";
import { motion } from "framer-motion";
import { Cpu, Check } from "lucide-react";

interface ModelData {
  name: string;
  provider: string;
  features: string[];
  description?: string;
}

interface ModelCategoryCardProps {
  model: ModelData;
  modelIndex: number;
  categoryIndex: number;
}

const ModelCategoryCard = ({ model, modelIndex, categoryIndex }: ModelCategoryCardProps) => {
  // Use monochrome styling for frontier AI models, subtle color for others
  const isFrontierAI = categoryIndex === 0;
  const cardClasses = isFrontierAI 
    ? "bg-[var(--black)]/50 border border-gray-800/50 rounded-xl p-6 hover:border-gray-700/50 transition-colors"
    : "bg-[var(--black)]/30 border border-gray-800/30 rounded-xl p-6 hover:border-gray-700/30 transition-colors";
    
  const iconColor = isFrontierAI ? "text-neutral-400" : "text-neutral-500";
  const checkColor = isFrontierAI ? "text-neutral-400" : "text-neutral-500";

  return (
    <motion.div
      key={modelIndex}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: modelIndex * 0.1 }}
      className={cardClasses}
    >
      <div className="hz-row hz-ai-center hz-mb-3">
        <Cpu className={`hz-sq-3 ${iconColor} hz-mr-2`} />
        <h4 className="hz-t-xl hz-w-semibold hz-fg">{model.name}</h4>
      </div>
      
      {model.description && (
        <p className="hz-t-sm hz-fg-muted hz-mb-4 hz-italic">{model.description}</p>
      )}
      
      <p className="hz-t-sm hz-fg-muted hz-mb-4">via {model.provider}</p>
      
      <ul className="hz-stack-2 hz-mb-5">
        {model.features.map((feature, i) => (
          <li key={i} className="hz-row hz-ai-start">
            <Check className={`hz-sq-3 ${checkColor} hz-mr-2 hz-none hz-mt-1`} />
            <span className="hz-fg-soft hz-t-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ModelCategoryCard;