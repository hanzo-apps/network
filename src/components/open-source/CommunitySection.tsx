
import React from "react";
import { motion } from "framer-motion";
import { Github, Users, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const CommunitySection = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Join Our Community
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Connect with thousands of developers building with Hanzo
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-card hz-align-center"
          >
            <div className="hz-sq-8 hz-bg-raised hz-r-full hz-row hz-ai-center hz-jc-center hz-mx-auto hz-mb-5">
              <Users className="hz-sq-5 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-3">Discord Community</h3>
            <p className="hz-fg-soft hz-mb-5">
              Join 12,000+ developers discussing Hanzo projects and AI development.
            </p>
            <Button className="hz-w-full hz-bg-raised hz-hoverable" size="sm">
              <a href="https://discord.gg/XthHQQj" target="_blank" rel="noopener noreferrer">Join Discord</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-card hz-align-center"
          >
            <div className="hz-sq-8 hz-bg-raised hz-r-full hz-row hz-ai-center hz-jc-center hz-mx-auto hz-mb-5">
              <Github className="hz-sq-5 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-3">GitHub Discussions</h3>
            <p className="hz-fg-soft hz-mb-5">
              Ask questions, share ideas, and collaborate on code with our maintainers.
            </p>
            <Button className="hz-w-full hz-bg-raised hz-hoverable" size="sm">
              <a href="https://github.com/hanzoai/platform/discussions" target="_blank" rel="noopener noreferrer">Go to Discussions</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hz-card hz-align-center"
          >
            <div className="hz-sq-8 hz-bg-raised hz-r-full hz-row hz-ai-center hz-jc-center hz-mx-auto hz-mb-5">
              <Code className="hz-sq-5 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-3">Contribute</h3>
            <p className="hz-fg-soft hz-mb-5">
              Help us improve Hanzo by contributing code, documentation, or ideas.
            </p>
            <Button className="hz-w-full hz-bg-raised hz-hoverable" size="sm">
              <a href="https://github.com/hanzoai/platform/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contributor Guide</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
