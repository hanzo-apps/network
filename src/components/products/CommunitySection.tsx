import { motion } from "framer-motion";
import { ExternalLink, Github, MessageCircle, Users, BookOpen } from "lucide-react";

interface CommunityLink {
  type: "discord" | "github" | "docs" | "discussions" | "twitter" | "slack";
  url: string;
  label?: string;
}

interface CommunitySectionProps {
  productName: string;
  links: CommunityLink[];
  contributors?: number;
  stars?: string;
}

const iconMap = {
  discord: MessageCircle,
  github: Github,
  docs: BookOpen,
  discussions: Users,
  twitter: () => (
    <svg className="hz-sq-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  slack: () => (
    <svg className="hz-sq-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  ),
};

const labelMap = {
  discord: "Join Discord",
  github: "Star on GitHub",
  docs: "Read Docs",
  discussions: "Discussions",
  twitter: "Follow on X",
  slack: "Join Slack",
};

const colorMap = {
  discord: "hz-hoverable",
  github: "",
  docs: "",
  discussions: "",
  twitter: "",
  slack: "hz-hoverable",
};

export function CommunitySection({ productName, links, contributors, stars }: CommunitySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="hz-py-7 hz-px-4"
    >
      <div className="hz-container-narrow">
        <div className="hz-row hz-ai-center hz-gap-2 hz-mb-2">
          <Users className="hz-sq-3 hz-fg" />
          <span className="hz-t-sm hz-w-medium hz-fg hz-upper hz-tracking-wide">
            Community
          </span>
        </div>

        <h2 className="hz-t-2xl hz-w-bold hz-fg hz-mb-2">
          Join the {productName} Community
        </h2>
        <p className="hz-fg-muted hz-mb-6">
          Get help, share ideas, and contribute to the project
        </p>

        {/* Stats */}
        {(contributors || stars) && (
          <div className="hz-row hz-gap-5 hz-mb-6">
            {stars && (
              <div className="hz-row hz-ai-center hz-gap-2">
                <span className="hz-t-2xl hz-w-bold hz-fg">{stars}</span>
                <span className="hz-fg-muted">GitHub Stars</span>
              </div>
            )}
            {contributors && (
              <div className="hz-row hz-ai-center hz-gap-2">
                <span className="hz-t-2xl hz-w-bold hz-fg">{contributors}+</span>
                <span className="hz-fg-muted">Contributors</span>
              </div>
            )}
          </div>
        )}

        {/* Links Grid */}
        <div className="hz-grid hz-grid-3 hz-gap-4">
          {links.map((link, index) => {
            const Icon = iconMap[link.type];
            const label = link.label || labelMap[link.type];
            const colorClass = colorMap[link.type];

            return (
              <motion.a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`hz-card hz-row hz-ai-center hz-gap-3 hz-transition ${colorClass}`}
              >
                <div className="hz-sq-6 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center">
                  {typeof Icon === "function" ? <Icon /> : <Icon className="hz-sq-3 hz-fg-soft" />}
                </div>
                <div className="hz-grow">
                  <span className="hz-w-medium hz-fg">{label}</span>
                </div>
                <ExternalLink className="hz-sq-2 hz-fg-muted" />
              </motion.a>
            );
          })}
        </div>

        {/* Contribute CTA */}
        <div className="hz-card hz-mt-6">
          <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">
            Want to Contribute?
          </h3>
          <p className="hz-fg-muted hz-t-sm hz-mb-4">
            We welcome contributions of all kinds: bug reports, feature requests, documentation improvements, and code contributions.
          </p>
          <a
            href={links.find(l => l.type === "github")?.url + "/blob/main/CONTRIBUTING.md"}
            target="_blank"
            rel="noopener noreferrer"
            className="hz-inline hz-ai-center hz-gap-2 hz-fg hz-t-sm hz-w-medium hz-transition hz-hoverable"
          >
            Read our Contributing Guide
            <ExternalLink className="hz-sq-1" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}

export default CommunitySection;
