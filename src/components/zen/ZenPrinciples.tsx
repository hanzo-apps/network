
import React from "react";
import { motion } from "framer-motion";

const principles = [
  {
    title: "Orthogonality",
    japanese: "直交性",
    description: "Components that stand alone, yet integrate effortlessly. Each piece precise, purposeful, and independent."
  },
  {
    title: "Smallness",
    japanese: "小型",
    description: "Break complexity into simplicity. The tiniest modules scale infinitely; minimalism multiplied becomes power."
  },
  {
    title: "Completeness",
    japanese: "完全性",
    description: "No half-measures. Batteries always included. Meticulously crafted to empower ambitious creators instantly."
  },
  {
    title: "Dimensionality",
    japanese: "次元性",
    description: "Layers of abstraction that vanish complexity yet never block depth. Simplicity at the surface, depth underneath."
  },
  {
    title: "Clarity",
    japanese: "明晰",
    description: "Complexity is the enemy. APIs should whisper, not shout. Documentation should guide, not obscure."
  }
];

const ZenPrinciples: React.FC = () => {
  return (
    <div className="hz-grid hz-grid-3 hz-gap-5">
      {principles.map((principle, index) => (
        <motion.div
          key={principle.title}
          className="hz-card hz-glass hz-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="hz-t-4xl hz-fg-muted hz-mb-2 hz-w-bold">{principle.japanese}</div>
          <h3 className="hz-t-xl hz-w-bold hz-mb-2 hz-fg">{principle.title}</h3>
          <p className="hz-fg-soft">{principle.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ZenPrinciples;
