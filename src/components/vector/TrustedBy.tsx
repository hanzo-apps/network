
import React from "react";
import { motion } from "framer-motion";
import AnimatedSection, { AnimatedHeading, AnimatedStaggerContainer } from "@/components/ui/animated-section";
import { createAnimationVariant, curves } from "@/components/ui/animation-variants";

const companyItemVariant = createAnimationVariant("fadeInBlur", {
  duration: 0.3,
  curve: curves.snappy,
  distance: 10,
  blur: 4
});

const TrustedBy = () => {
  const companies = [
    "OpenAI", "Anthropic", "HuggingFace", "LangChain", "LlamaIndex", 
    "Replit", "Vercel", "GitHub", "Square", "Shopify", 
    "Microsoft", "Snap", "Bloomberg", "Twilio", "Intel"
  ];

  return (
    <AnimatedSection 
      className="hz-py-7 hz-px-4 hz-bg-surface"
      viewportAmount={0.3}
    >
      <div className="hz-container">
        <AnimatedHeading className="hz-align-center hz-mb-6">
          <h2 className="hz-t-2xl hz-w-semibold hz-fg hz-mb-2">Trusted By AI Innovators</h2>
          <div className="hz-bw-8 hz-bh-1 hz-bg-raised hz-mx-auto"></div>
        </AnimatedHeading>
        
        <AnimatedStaggerContainer className="hz-row hz-wrap hz-jc-center hz-gap-6 hz-gap-5" delayFactor={0.03}>
          {companies.map((company, index) => (
            <motion.div 
              key={index}
              variants={companyItemVariant}
              className="hz-fg-muted hz-w-medium hz-t-lg hz-transition hz-link"
              whileHover={{ scale: 1.05, color: "#ffffff" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {company}
            </motion.div>
          ))}
        </AnimatedStaggerContainer>
      </div>
    </AnimatedSection>
  );
};

export default TrustedBy;
