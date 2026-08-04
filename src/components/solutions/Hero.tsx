
import React from "react";
import { motion } from "framer-motion";
import ChromeText from "@/components/ui/chrome-text";

const SolutionsHero: React.FC = () => {
  return (
    <div className="hz-container-narrow hz-align-center hz-mb-7">
      <ChromeText as="h1" className="hz-t-4xl hz-w-bold hz-mb-5">
        Enterprise Solutions
      </ChromeText>
      <p className="hz-fg-muted hz-t-lg">
        Hanzo delivers a unified ecosystem of AI Cloud infrastructure, developer platforms, and expert consulting 
        to transform how enterprises build, deploy, and scale next-generation applications.
      </p>
    </div>
  );
};

export default SolutionsHero;
