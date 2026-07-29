
import React from "react";
import ChromeText from "@/components/ui/chrome-text";

const Hero = () => {
  return (
    <div className="hz-py-6 hz-px-4">
      <div className="hz-container">
        <ChromeText as="h1" className="hz-t-4xl hz-w-bold hz-mb-2">
          Hanzo AI Studio
        </ChromeText>
        <p className="hz-fg-soft hz-mw-md">
          Your workspace for AI model experimentation, prompt engineering, and creating agent-based applications.
        </p>
      </div>
    </div>
  );
};

export default Hero;
