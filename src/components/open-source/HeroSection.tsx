
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Star, GitBranch } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hz-pt-6 hz-pb-6 hz-px-4">
      <div className="hz-container hz-align-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="hz-t-4xl hz-w-bold hz-chrome hz-mb-5">
            Built in the Open, For Everyone
          </h1>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
            Hanzo is proudly open source. We believe in transparency, collaboration, and community-driven innovation. 
            Everything we build is available for you to use, modify, and contribute to.
          </p>
          <div className="hz-row hz-wrap hz-jc-center hz-gap-4">
            <Button 
              size="sm" 
              className="hz-bg-raised hz-hoverable"
            >
              <Github className="hz-sq-2 hz-mr-2" />
              <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="hz-border-strong hz-fg hz-hoverable"
            >
              <Star className="hz-sq-2 hz-mr-2" />
              <a href="https://github.com/hanzoai/platform" target="_blank" rel="noopener noreferrer">Star Platform Repo</a>
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="hz-border-strong hz-fg hz-hoverable"
            >
              <GitBranch className="hz-sq-2 hz-mr-2" />
              <a href="https://github.com/hanzoai/platform/fork" target="_blank" rel="noopener noreferrer">Fork & Contribute</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
