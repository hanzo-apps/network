import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Twitter, ExternalLink } from "lucide-react";

const OperativeCTA = () => {
  return (
    <section className="hz-py-7 hz-rel hz-clip">
      {/* Background gradient */}
      <div className="hz-abs hz-inset"></div>
      <div className="hz-abs hz-top-0 hz-left-0 hz-w-full"></div>
      <div className="hz-center-x hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container-narrow hz-py-5 hz-rel hz-z-raised">
        <div className="hz-container-narrow hz-align-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="hz-t-2xl hz-w-bold hz-fg">
              Ready to Experience Self-Operating Computing?
            </h2>
            <p className="hz-t-xl hz-fg-soft -6">
              Join the community of developers, researchers, and enthusiasts 
              pioneering the future of human-AI collaboration.
            </p>
            
            <div className="hz-col-row hz-jc-center">
              <Button size="sm" className="hz-t-lg hz-px-4 hz-py-2">
                <a href="https://github.com/hanzoai/operative" className="hz-row hz-ai-center hz-gap-2">
                  <Github className="hz-sq-3" />
                  Star on GitHub
                </a>
              </Button>
              <Button size="sm" variant="outline" className="hz-t-lg hz-px-4 hz-py-2 hz-fg hz-bg-surface hz-hoverable">
                <a href="https://discord.gg/XthHQQj" className="hz-row hz-ai-center hz-gap-2">
                  Join Discord Community
                </a>
              </Button>
            </div>
            
            <div className="hz-grid hz-grid-3 hz-container-narrow hz-mw-md hz-mt-6">
              <a 
                href="https://blog.hanzo.ai/operative"
                className="hz-col hz-ai-center hz-p-4 hz-r-lg hz-transition hz-hoverable"
              >
                <ExternalLink className="hz-sq-4 hz-fg-muted" />
                <span className="hz-fg hz-w-medium">Read the Blog</span>
              </a>
              <a 
                href="https://twitter.com/hanzoai"
                className="hz-col hz-ai-center hz-p-4 hz-r-lg hz-transition hz-hoverable"
              >
                <Twitter className="hz-sq-4 hz-fg-muted" />
                <span className="hz-fg hz-w-medium">Follow Updates</span>
              </a>
              <a 
                href="https://github.com/hanzoai/operative/contribute"
                className="hz-col hz-ai-center hz-p-4 hz-r-lg hz-transition hz-hoverable"
              >
                <Github className="hz-sq-4 hz-fg-muted" />
                <span className="hz-fg hz-w-medium">Contribute</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OperativeCTA;