
import React from "react";
import { motion } from "framer-motion";
import { Bot, Search, BrainCircuit, Image, FileText, Tag } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";
import AnimatedSection, { AnimatedHeading, AnimatedStaggerContainer } from "@/components/ui/animated-section";
import { createAnimationVariant, curves } from "@/components/ui/animation-variants";

const useCaseVariant = createAnimationVariant("fadeInBlur", {
  duration: 0.35,
  curve: curves.smooth,
  distance: 15,
  blur: 5
});

const iconVariant = createAnimationVariant("popIn", {
  duration: 0.35,
  curve: curves.bouncy,
  blur: 3
});

interface UseCaseProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const UseCase = ({ icon, title, description }: UseCaseProps) => (
  <motion.div
    variants={useCaseVariant}
    className="hz-p-5"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <motion.div 
      variants={iconVariant}
      className="hz-sq-7 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center hz-mb-4 hz-mx-auto"
    >
      {icon}
    </motion.div>
    <h3 className="hz-t-xl hz-w-bold hz-fg hz-align-center hz-mb-2">{title}</h3>
    <p className="hz-fg-muted hz-align-center">{description}</p>
  </motion.div>
);

const UseCases = () => {
  const useCases = [
    {
      icon: <Bot className="hz-sq-4 hz-fg-muted" />,
      title: "Chatbots & RAG",
      description: "Build powerful retrieval-augmented generation systems that search across your knowledge base."
    },
    {
      icon: <Search className="hz-sq-4 hz-fg-muted" />,
      title: "Semantic Search",
      description: "Implement intuitive search that understands user intent beyond simple keyword matching."
    },
    {
      icon: <BrainCircuit className="hz-sq-4 hz-fg-muted" />,
      title: "Recommendation Systems",
      description: "Create personalized recommendations based on user preferences and behavior."
    },
    {
      icon: <Image className="hz-sq-4 hz-fg-muted" />,
      title: "Visual Search",
      description: "Enable users to search for visually similar images or products in your catalog."
    },
    {
      icon: <FileText className="hz-sq-4 hz-fg-muted" />,
      title: "Document Intelligence",
      description: "Extract insights from documents and connect related information across sources."
    },
    {
      icon: <Tag className="hz-sq-4 hz-fg-muted" />,
      title: "Automated Tagging",
      description: "Automatically categorize and tag content based on semantic understanding."
    }
  ];

  return (
    <AnimatedSection 
      className="hz-py-7 hz-px-4"
      viewportAmount={0.1}
    >
      <div className="hz-container">
        <AnimatedHeading className="hz-align-center hz-mb-7">
          <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-4">
            Use Cases
          </ChromeText>
          <p className="hz-container-narrow hz-t-xl hz-fg-muted">
            Powering AI applications across industries
          </p>
        </AnimatedHeading>
        
        <AnimatedStaggerContainer 
          className="hz-grid hz-grid-3 hz-gap-6" 
          delayFactor={0.07}
        >
          {useCases.map((useCase, index) => (
            <UseCase
              key={index}
              icon={useCase.icon}
              title={useCase.title}
              description={useCase.description}
            />
          ))}
        </AnimatedStaggerContainer>
      </div>
    </AnimatedSection>
  );
};

export default UseCases;
