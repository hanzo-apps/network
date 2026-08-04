
import React from "react";
import { motion } from "framer-motion";
import JapaneseWave from "./JapaneseWave";

interface Principle {
  title: string;
  description: string;
  japaneseSymbol?: string;
}

const principles: Principle[] = [
  {
    title: "Orthogonality",
    japaneseSymbol: "直交性",
    description: "Do one thing exceptionally. Components that stand alone, yet integrate effortlessly."
  },
  {
    title: "Smallness",
    japaneseSymbol: "小型",
    description: "Break complexity into simplicity. The tiniest modules scale infinitely."
  },
  {
    title: "Completeness",
    japaneseSymbol: "完全性",
    description: "No half-measures. Batteries always included. Meticulously crafted to empower creators."
  },
  {
    title: "Dimensionality",
    japaneseSymbol: "次元性",
    description: "Layers of abstraction that vanish complexity yet never block depth."
  },
  {
    title: "Clarity",
    japaneseSymbol: "明晰",
    description: "Complexity is the enemy. APIs should whisper, not shout. Clear thinking fuels innovation."
  },
  {
    title: "Accessibility",
    japaneseSymbol: "アクセス性",
    description: "Democratize access to data, models, and knowledge. Transparency drives rapid iteration."
  },
  {
    title: "Composability",
    japaneseSymbol: "構成性",
    description: "Small components combine into infinite possibility. Every piece purposeful, every connection intuitive."
  },
  {
    title: "Scalability",
    japaneseSymbol: "拡張性",
    description: "Build for tomorrow's traffic, today. We architect for exponential growth."
  },
  {
    title: "Velocity",
    japaneseSymbol: "速度",
    description: "Iteration at the speed of thought. Rapid experimentation is how magic becomes method."
  },
  {
    title: "Longevity",
    japaneseSymbol: "長寿",
    description: "Invest in future-proof designs. We build systems that evolve. Durability by design."
  }
];

const ZenManifesto: React.FC = () => {
  return (
    <div className="hz-rel">
      <div className="hz-abs hz-z-behind hz-top-0 hz-left-0 hz-right-0 hz-h-full">
        <JapaneseWave 
          color="#a3a3a3" 
          height={300} 
          opacity={0.05} 
          speed={30} 
          className="hz-abs"
        />
        <JapaneseWave 
          color="#737373" 
          height={300} 
          delay={1} 
          opacity={0.03} 
          speed={35} 
          className="hz-abs"
        />
      </div>
      
      <div className="hz-container-narrow hz-py-7">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4 hz-fg">Our AI Engineering Manifesto</h2>
          <p className="hz-container-narrow hz-fg-soft">
            Hanzo began as a spark—an intuition that AI was the next great leverage. Since then, 
            we've honed our craft: a fusion of relentless experimentation, bold creativity, and disciplined 
            engineering, forging principles that guide our quest for radical innovation.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-2 hz-gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card hz-glass"
            >
              <div className="hz-row hz-ai-center hz-mb-3">
                <div className="hz-t-3xl hz-fg-muted hz-w-semibold hz-mr-3">{principle.japaneseSymbol}</div>
                <h3 className="hz-t-xl hz-fg hz-w-bold">{principle.title}</h3>
              </div>
              <p className="hz-fg-soft">{principle.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hz-mt-7 hz-align-center"
        >
          <div className="hz-card hz-glass">
            <h3 className="hz-t-xl hz-fg hz-w-bold hz-mb-2">Crafted by Innovators, Proven by Scale</h3>
            <p className="hz-fg-soft">
              The Zen of Hanzo is our battle-tested ethos. Born from the crucible of high-stakes launches,
              explosive successes, and daring experiments. We are AI engineers, cypherpunk innovators, 
              and relentless optimists who believe technology is a lever to amplify human creativity and enterprise.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ZenManifesto;
