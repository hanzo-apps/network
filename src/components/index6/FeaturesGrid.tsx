import React from "react";
import { motion } from "framer-motion";
import { features } from "./data/featuresData";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, bgColor, iconColor, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 30px -15px rgba(136, 58, 234, 0.5)",
        borderColor: "rgba(163, 163, 163, 0.5)" 
      }}
      className="hz-card hz-transition"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        viewport={{ once: true }}
        className={`hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4 ${bgColor}`}
      >
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Icon className={`hz-sq-4 ${iconColor}`} />
        </motion.div>
      </motion.div>
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        viewport={{ once: true }}
        className="hz-t-xl hz-w-bold hz-mb-2 hz-fg"
      >
        {title}
      </motion.h3>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
        viewport={{ once: true }}
        className="hz-fg-muted"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const FeaturesGrid: React.FC = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg-overlay hz-rel">
      {/* Animated background dots */}
      <motion.div 
        className="hz-abs hz-inset hz-dim-more hz-z-base hz-no-pointer"
        initial={{ backgroundPositionY: "0%" }}
        animate={{ backgroundPositionY: "100%" }}
        transition={{ duration: 40, repeat: Infinity, repeatType: "reverse" }}
        style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hz-t-3xl hz-w-bold hz-align-center hz-mb-4 hz-fg"
        >
          The Complete AI Engineering Platform
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hz-bw-8 hz-bh-1 hz-r-full hz-mx-auto hz-mb-7"
        />
        
        <div className="hz-grid hz-grid-3 hz-gap-5">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              bgColor={feature.bgColor}
              iconColor={feature.iconColor}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
