import React from "react";
import { motion } from "framer-motion";
import { Bot, Globe, Link2, ArrowRight } from "lucide-react";

interface BuildCard {
  icon: React.ElementType;
  title: string;
  sentence: string;
  bullets: string[];
  linkText: string;
  linkHref: string;
}

const buildCards: BuildCard[] = [
  {
    icon: Bot,
    title: "AI Apps",
    sentence: "Build intelligent applications with cutting-edge AI.",
    bullets: ["RAG APIs", "Agent backends", "Multimodal pipelines"],
    linkText: "View templates",
    linkHref: "/templates?category=ai",
  },
  {
    icon: Globe,
    title: "Modern Web Apps",
    sentence: "Ship full-stack apps with auth, data, and realtime.",
    bullets: ["Authentication + data", "Realtime subscriptions", "Edge deployment"],
    linkText: "View templates",
    linkHref: "/templates?category=web",
  },
  {
    icon: Link2,
    title: "Web3 Apps",
    sentence: "Build decentralized apps with identity and proofs.",
    bullets: ["Wallet integration", "Chain deployments", "Indexing + proofs"],
    linkText: "View templates",
    linkHref: "/templates?category=web3",
  },
];

const WhatYouCanBuildSection: React.FC = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
            What you can build
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted">
            Templates and primitives for any stack.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="hz-grid hz-grid-3 hz-gap-5">
          {buildCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className=""
              >
                <div className="hz-card hz-h-full hz-transition hz-card-interactive">
                  {/* Icon */}
                  <div
                    className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-5"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <Icon className="hz-sq-4" style={{ color: "#ffffff" }} />
                  </div>

                  {/* Title */}
                  <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-3">
                    {card.title}
                  </h3>

                  {/* Sentence */}
                  <p className="hz-fg-muted hz-mb-5 hz-leading-relaxed">
                    {card.sentence}
                  </p>

                  {/* Bullets */}
                  <ul className="hz-stack-2 hz-mb-6">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="hz-row hz-ai-center hz-gap-3 hz-t-sm">
                        <div
                          className="hz-sq-1 hz-r-full hz-none"
                          style={{ backgroundColor: "#ffffff" }}
                        />
                        <span className="hz-fg-soft">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <a
                    href={card.linkHref}
                    className="hz-inline hz-ai-center hz-gap-2 hz-t-sm hz-w-medium hz-transition"
                    style={{ color: "#ffffff" }}
                  >
                    {card.linkText}
                    <ArrowRight className="hz-sq-2 hz-transition" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatYouCanBuildSection;
