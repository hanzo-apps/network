import { BRAND } from '@/lib/brand';
import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Star, GitFork, Heart, ArrowRight, ExternalLink, Code, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OSSCatalog from "@/components/oss/OSSCatalog";


const stats = [
  { label: "Open Source Projects", value: "260+", icon: Code },
  { label: "GitHub Stars", value: "50K+", icon: Star },
  { label: "Contributors", value: "500+", icon: Users },
  { label: "Forks", value: "10K+", icon: GitFork },
];

const OpenSource = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Helmet>
        <title>Open Source - Hanzo AI</title>
        <meta
          name="description"
          content="Explore Hanzo AI's open source projects. 260+ repositories powering AI infrastructure, developer tools, and blockchain technology."
        />
      </Helmet>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hz-rel hz-pt-6 hz-pb-6 hz-px-4 hz-clip">
          <div className="hz-abs hz-inset hz-clip hz-z-base hz-no-pointer">
            <div
              className="hz-center-xy hz-abs hz-r-full hz-dim-more"
              style={{
                background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 70%)`,
                filter: "blur(100px)",
              }}
            />
          </div>

          <div className="hz-container-wide hz-rel hz-z-raised">
            <div className="hz-align-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-5 hz-bg-quiet hz-fg"
                >
                <Github className="hz-sq-2" />
                Open Source First
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="hz-t-3xl hz-w-medium hz-tracking-tight hz-mb-5"
              >
                <span className="hz-fg">Building in the</span>
                <br />
                <span className="hz-fg-muted">open.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="hz-container-narrow hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6"
              >
                We believe in the power of open source. Our tools, libraries, and infrastructure
                are freely available for the developer community.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="hz-row hz-wrap hz-ai-center hz-jc-center hz-gap-4 hz-mb-7"
              >
                <a
                  href="https://github.com/hanzoai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                  >
                  <Github className="hz-sq-2 hz-mr-2" />
                  View on GitHub
                </a>
                <a
                  href="https://github.com/hanzoai/hanzo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-btn-ghost hz-transition hz-fg"
                >
                  <Star className="hz-sq-2 hz-mr-2" />
                  Star Our Repos
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="hz-grid hz-grid-4 hz-gap-4"
              >
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="hz-card"
                    >
                      <Icon className="hz-sq-3 hz-fg-muted hz-mb-2 hz-mx-auto" />
                      <div className="hz-t-2xl hz-w-bold hz-fg">{stat.value}</div>
                      <div className="hz-t-xs hz-fg-muted">{stat.label}</div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* OSS Catalog */}
        <OSSCatalog />

        {/* CTA Section */}
        <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
          <div className="hz-sq-8 hz-abs hz-bg-quiet hz-r-full hz-blur-bg hz-no-pointer" />
          <div className="hz-sq-8 hz-abs hz-bg-quiet hz-r-full hz-blur-bg hz-no-pointer" />

          <div className="hz-container-narrow hz-align-center hz-rel hz-z-raised">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-5 hz-bg-raised hz-fg-muted"
            >
              <Heart className="hz-sq-2" />
              Join the Community
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-t-3xl hz-w-bold hz-fg hz-mb-4"
            >
              Contribute to open source
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted hz-mb-6"
            >
              We welcome contributions of all kinds - code, documentation, bug reports, and feature requests.
              Join our community of developers building the future of AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="hz-row hz-wrap hz-ai-center hz-jc-center hz-gap-4"
            >
              <a
                href="https://github.com/hanzoai/hanzo/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="hz-btn hz-btn-ghost hz-btn-lg hz-transition hz-bg-inverse"
                >
                Start Contributing
                <ArrowRight className="hz-sq-3 hz-ml-2" />
              </a>
              <a
                href="https://discord.gg/hanzo"
                target="_blank"
                rel="noopener noreferrer"
                className="hz-btn hz-btn-ghost hz-btn-lg hz-transition hz-fg"
              >
                Join Discord
                <ExternalLink className="hz-sq-3 hz-ml-2" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OpenSource;
