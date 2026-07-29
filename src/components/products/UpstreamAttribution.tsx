import { motion } from "framer-motion";
import { ExternalLink, GitFork, Heart, Star } from "lucide-react";

interface UpstreamProject {
  name: string;
  description: string;
  url: string;
  github: string;
  logo?: string;
  license?: string;
  stars?: string;
}

interface UpstreamAttributionProps {
  upstream: UpstreamProject;
  productName: string;
}

export function UpstreamAttribution({ upstream, productName }: UpstreamAttributionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="hz-py-7 hz-px-4 hz-border-t"
    >
      <div className="hz-container-narrow">
        <div className="hz-row hz-ai-center hz-gap-2 hz-mb-5">
          <GitFork className="hz-sq-3 hz-fg" />
          <span className="hz-t-sm hz-w-medium hz-fg-muted hz-upper hz-tracking-wide">
            Built on Open Source
          </span>
        </div>

        <div className="hz-card">
          <div className="hz-col-row hz-gap-5">
            {/* Logo/Icon */}
            <div className="hz-none">
              {upstream.logo ? (
                <img
                  src={upstream.logo}
                  alt={upstream.name}
                  className="hz-sq-8 hz-r-lg"
                />
              ) : (
                <div className="hz-sq-8 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center">
                  <GitFork className="hz-sq-5 hz-fg-muted" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="hz-grow">
              <div className="hz-row hz-ai-center hz-gap-3 hz-mb-2">
                <h3 className="hz-t-xl hz-w-semibold hz-fg">
                  Powered by {upstream.name}
                </h3>
                {upstream.stars && (
                  <span className="hz-inline hz-ai-center hz-gap-1 hz-t-sm hz-fg-muted">
                    <Star className="hz-sq-2" />
                    {upstream.stars}
                  </span>
                )}
              </div>

              <p className="hz-fg-muted hz-mb-4">
                {productName} is built on top of {upstream.name}, an open-source project.
                {upstream.description}
              </p>

              <div className="hz-row hz-wrap hz-gap-3">
                <a
                  href={upstream.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-gap-2 hz-fg hz-transition"
                >
                  <svg className="hz-sq-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  View on GitHub
                  <ExternalLink className="hz-sq-1" />
                </a>

                <a
                  href={upstream.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-btn-ghost hz-gap-2 hz-fg-soft hz-transition"
                >
                  Visit {upstream.name}
                  <ExternalLink className="hz-sq-1" />
                </a>
              </div>

              {upstream.license && (
                <p className="hz-mt-4 hz-t-xs hz-fg-muted">
                  Licensed under {upstream.license}
                </p>
              )}
            </div>
          </div>

          {/* Thank you message */}
          <div className="hz-mt-5 hz-pt-6 hz-border-t">
            <p className="hz-row hz-ai-center hz-gap-2 hz-t-sm hz-fg-muted">
              <Heart className="hz-sq-2 hz-fg" />
              We're grateful to the {upstream.name} maintainers and community for their incredible work.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default UpstreamAttribution;
