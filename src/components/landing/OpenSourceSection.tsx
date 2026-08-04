import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, ExternalLink, Heart, ArrowRight, Rocket, Network } from "lucide-react";

// GitHub organizations
const githubOrgs = [
  { name: "hanzoai", label: "Hanzo AI", description: "AI infrastructure and models", url: "https://github.com/hanzoai" },
  { name: "hanzo-js", label: "Hanzo JS", description: "JavaScript & TypeScript SDKs", url: "https://github.com/hanzo-js" },
  { name: "hanzo-apps", label: "Hanzo Apps", description: "Templates and starters", url: "https://github.com/hanzo-apps" },
];

// Repos organized by org
const repos = {
  hanzoai: [
    { name: "hanzo", description: "The complete AI platform. Deploy anywhere.", language: "TypeScript", featured: true },
    { name: "mcp", description: "260+ Model Context Protocol tools and servers", language: "TypeScript", featured: true },
    { name: "llm", description: "Unified gateway to 100+ AI models", language: "Python", featured: true },
    { name: "dev", description: "AI coding agent for the terminal", language: "TypeScript" },
    { name: "auto", description: "Workflow automation with AI agents", language: "TypeScript" },
    { name: "flow", description: "Visual AI/LLM workflow builder", language: "TypeScript" },
  ],
  "hanzo-js": [
    { name: "hanzo.js", description: "Core JavaScript SDK for Hanzo platform", language: "TypeScript" },
    { name: "ui", description: "React component library for AI apps", language: "TypeScript" },
    { name: "kv", description: "Redis-compatible key-value store client", language: "TypeScript" },
    { name: "mq", description: "High-performance message queue client", language: "TypeScript" },
  ],
  "hanzo-apps": [
    { name: "ai-chat", description: "Full-featured AI chat application", language: "TypeScript", template: true },
    { name: "rag-starter", description: "RAG application with vector search", language: "TypeScript", template: true },
    { name: "agent-toolkit", description: "Multi-agent application starter", language: "TypeScript", template: true },
  ],
};

const features = [
  {
    icon: "100%",
    title: "Open Source Core",
    description: "Every core component is open source and MIT/Apache 2.0 licensed",
  },
  {
    icon: <Heart className="hz-sq-3" />,
    title: "Community Driven",
    description: "Built with and for the developer community",
  },
  {
    icon: <Github className="hz-sq-3" />,
    title: "Self-Hostable",
    description: "Run the entire platform on your own infrastructure",
  },
];

const OpenSourceSection = () => {
  // Show featured repos from hanzoai
  const featuredRepos = repos.hanzoai.slice(0, 6);
  // Show templates from hanzo-apps
  const templates = repos["hanzo-apps"].slice(0, 3);

  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel">
      {/* Subtle background pattern */}
      <div className="hz-abs hz-inset hz-dim-more">
        <div
          className="hz-abs hz-inset"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <div className="hz-btn hz-btn-ghost hz-gap-2 hz-t-xs hz-mb-5"
               style={{ color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.3)" }}>
            <Github className="hz-sq-2" />
            Open Source
          </div>
          <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-5">
            Built in the open
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted">
            We believe the future of AI infrastructure should be open. View our code, contribute, or self-host the entire platform.
          </p>
        </motion.div>

        {/* GitHub Organizations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hz-row hz-wrap hz-jc-center hz-gap-4 hz-mb-7"
        >
          {githubOrgs.map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hz-btn hz-gap-3 hz-transition"
            >
              <Github className="hz-sq-3 hz-fg-muted" />
              <div>
                <div className="hz-t-sm hz-w-medium hz-fg hz-transition hz-hoverable">{org.label}</div>
                <div className="hz-t-xs hz-fg-muted">{org.description}</div>
              </div>
              <ExternalLink className="hz-sq-2 hz-fg-faint hz-transition hz-link" />
            </a>
          ))}
        </motion.div>

        {/* Features row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hz-grid hz-grid-3 hz-gap-5 hz-mb-7"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="hz-align-center hz-p-5"
            >
              <div className="hz-sq-7 hz-r-lg hz-bg-quiet hz-row hz-ai-center hz-jc-center hz-mx-auto hz-mb-4 hz-fg hz-w-bold">
                {typeof feature.icon === "string" ? feature.icon : feature.icon}
              </div>
              <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">{feature.title}</h3>
              <p className="hz-t-sm hz-fg-muted">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Repos grid - 3x2 on desktop */}
        <div className="hz-mb-7">
          <h3 className="hz-t-xl hz-w-medium hz-fg hz-mb-5 hz-align-center">Core Infrastructure</h3>
          <div className="hz-grid hz-grid-3 hz-gap-4">
            {featuredRepos.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={`https://github.com/hanzoai/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + (index % 3) * 0.1 }}
                className={`hz-card hz-transition hz-card-interactive ${
                  repo.featured
                    ? "hz-hoverable"
                    : "hz-hoverable"
                }`}
              >
                <div className="hz-row hz-ai-start hz-jc-between hz-mb-3">
                  <div className="hz-row hz-ai-center hz-gap-2">
                    <Github className="hz-sq-2 hz-fg-muted" />
                    <span className="hz-mono hz-t-sm hz-fg">hanzoai/{repo.name}</span>
                  </div>
                  <ExternalLink className="hz-sq-2 hz-fg-faint hz-transition hz-link" />
                </div>
                <p className="hz-t-sm hz-fg-muted hz-mb-3 hz-clamp-2">{repo.description}</p>
                <div className="hz-row hz-ai-center hz-gap-3">
                  <span className="hz-t-xs hz-px-2 hz-py-1 hz-r-md hz-bg-raised hz-fg-muted">{repo.language}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Templates Section */}
        <div className="hz-mb-7">
          <div className="hz-row hz-ai-center hz-jc-between hz-mb-5">
            <h3 className="hz-t-xl hz-w-medium hz-fg">Templates &amp; Starters</h3>
            <a
              href="https://github.com/hanzo-apps"
              target="_blank"
              rel="noopener noreferrer"
              className="hz-t-sm hz-fg-muted hz-transition hz-row hz-ai-center hz-gap-1 hz-link"
            >
              View all templates
              <ExternalLink className="hz-sq-2" />
            </a>
          </div>
          <div className="hz-grid hz-grid-3 hz-gap-4">
            {templates.map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                className="hz-card hz-transition hz-card-interactive"
              >
                <div className="hz-row hz-ai-start hz-jc-between hz-mb-3">
                  <div className="hz-row hz-ai-center hz-gap-2">
                    <Rocket className="hz-sq-2 hz-fg" />
                    <span className="hz-mono hz-t-sm hz-fg">{template.name}</span>
                  </div>
                </div>
                <p className="hz-t-sm hz-fg-muted hz-mb-4 hz-clamp-2">{template.description}</p>
                <div className="hz-row hz-ai-center hz-gap-2">
                  <a
                    href={`https://hanzo.app/new?template=${template.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hz-grow hz-align-center hz-px-3 hz-py-2 hz-r-lg hz-bg-inverse hz-fg-inverse hz-t-xs hz-w-medium hz-transition hz-hoverable"
                  >
                    Launch in Hanzo
                  </a>
                  <a
                    href={`https://github.com/hanzo-apps/${template.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hz-px-3 hz-py-2 hz-r-lg hz-bordered hz-fg-muted hz-t-xs hz-transition hz-link"
                  >
                    <Github className="hz-sq-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hanzo Network Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hz-card hz-mb-7"
        >
          <div className="hz-grid hz-grid-2 hz-gap-6 hz-ai-center">
            <div>
              <div className="hz-btn hz-btn-ghost hz-gap-2 hz-t-xs hz-mb-4"
                   style={{ color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.3)" }}>
                <Network className="hz-sq-2" />
                Hanzo Network
              </div>
              <h3 className="hz-t-2xl hz-w-medium hz-fg hz-mb-4">
                Decentralized AI compute
              </h3>
              <p className="hz-fg-muted hz-mb-5">
                Join the Hanzo Network to contribute GPU power for AI inference and training. Earn rewards while powering the next generation of AI applications.
              </p>
              <div className="hz-row hz-wrap hz-gap-3">
                <a
                  href="https://hanzo.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-btn-primary hz-gap-2 hz-fg-inverse hz-transition"
                >
                  Learn more
                  <ArrowRight className="hz-sq-2" />
                </a>
                <a
                  href="https://github.com/hanzoai/network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-btn-ghost hz-gap-2 hz-fg hz-transition"
                >
                  <Github className="hz-sq-2" />
                  View source
                </a>
              </div>
            </div>
            <div className="hz-row hz-ai-center hz-jc-center">
              <div className="hz-sq-8 hz-r-xl hz-bg-raised hz-row hz-ai-center hz-jc-center">
                <Network className="hz-sq-8 hz-fg" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Research Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hz-align-center hz-mb-7"
        >
          <p className="hz-fg-muted hz-mb-4">
            Read our research papers and technical specifications
          </p>
          <a
            href="https://zenlm.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hz-inline hz-ai-center hz-gap-2 hz-fg"
          >
            zenlm.org - AI Research &amp; Philosophy
            <ExternalLink className="hz-sq-2" />
          </a>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hz-col-row hz-ai-center hz-jc-center hz-gap-4"
        >
          <Link
            to="/open-source"
            className="hz-btn hz-btn-primary hz-gap-2 hz-fg-inverse hz-transition"
          >
            Browse all projects
            <ArrowRight className="hz-sq-2" />
          </Link>
          <a
            href="https://github.com/hanzoai"
            target="_blank"
            rel="noopener noreferrer"
            className="hz-btn hz-btn-ghost hz-gap-2 hz-fg hz-transition"
          >
            <Github className="hz-sq-3" />
            View on GitHub
            <ExternalLink className="hz-sq-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
