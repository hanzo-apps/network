import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, MessageCircle } from "lucide-react";


const OpenSource = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-card hz-align-center"
        >
          <div className="hz-row hz-jc-center hz-mb-5">
            <div
              className="hz-sq-8 hz-r-xl hz-row hz-ai-center hz-jc-center hz-bg-quiet"
              >
              <Github className="hz-sq-5 hz-fg" />
            </div>
          </div>

          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Open Source
          </h2>
          <p className="hz-t-xl hz-fg-soft hz-mb-5">
            Inspect, control, contribute
          </p>

          <p className="hz-container-narrow hz-mw-md hz-fg-muted hz-mb-6 hz-leading-relaxed">
            The complete plugin is open-source and licensed under Apache-2.0.
            You can see, control, and modify how Hanzo works. Hanzo does not
            have an auto model, so you always know exactly what model is being
            used. No silent context compression or cut-off. You can see the
            context window size on each request, along with the full prompts.
          </p>

          <div className="hz-row hz-wrap hz-jc-center hz-gap-4 hz-mb-6">
            <a
              href="https://github.com/hanzoai/hanzo-dev"
              target="_blank"
              rel="noreferrer noopener"
              className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
              >
              <Github className="hz-sq-2 hz-mr-2" />
              Star on GitHub
            </a>
            <a
              href="https://discord.gg/hanzo"
              target="_blank"
              rel="noreferrer noopener"
              className="hz-btn hz-btn-ghost hz-transition hz-fg"
            >
              <MessageCircle className="hz-sq-2 hz-mr-2" />
              Join Discord
            </a>
          </div>

          <p className="hz-t-sm hz-fg-muted">
            Join our community on Discord and contribute to help shape Hanzo's
            future.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default OpenSource;
