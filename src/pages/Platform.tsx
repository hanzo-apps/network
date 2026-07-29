import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlatformHero from "@/components/platform/PlatformHero";
import PaaSCapabilities from "@/components/platform/PaaSCapabilities";
import TrustedBy from "@/components/platform/TrustedBy";
import DeveloperLove from "@/components/platform/DeveloperLove";
import CallToAction from "@/components/platform/CallToAction";
import ZenBackground from "@/components/zen/ZenBackground";
import ZenQuoteSection from "@/components/zen/ZenQuoteSection";
import { motion } from "framer-motion";
import { Github, Cloud, Server, Lock, Code2, Network, Terminal, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


const DeploymentOptions = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4 hz-fg">
            Deploy Your Way
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-fg-muted">
            Same codebase, same APIs, your choice of infrastructure.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-5">
          {/* Self-Hosted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <div
              className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4 hz-bg-quiet"
              >
              <Server className="hz-sq-4 hz-fg" />
            </div>
            <h3 className="hz-t-xl hz-w-bold hz-fg hz-mb-2">Self-Hosted</h3>
            <p className="hz-fg-muted hz-t-sm hz-mb-4">
              Run on your own servers, VMs, or containers. Full control, complete data sovereignty.
            </p>
            <ul className="hz-stack-2 hz-t-sm hz-fg-muted">
              <li className="hz-row hz-ai-center hz-gap-2">
                <span className="hz-fg">✓</span> Docker & Kubernetes ready
              </li>
              <li className="hz-row hz-ai-center hz-gap-2">
                <span className="hz-fg">✓</span> Air-gapped deployments
              </li>
              <li className="hz-row hz-ai-center hz-gap-2">
                <span className="hz-fg">✓</span> No external dependencies
              </li>
            </ul>
            <a
              href="https://github.com/hanzoai/platform"
              target="_blank"
              rel="noreferrer noopener"
              className="hz-inline hz-ai-center hz-mt-5 hz-t-sm hz-fg hz-hoverable"
            >
              <Github className="hz-sq-2 hz-mr-2" />
              View on GitHub
            </a>
          </motion.div>

          {/* Hanzo Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <div
              className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4"
              style={{ backgroundColor: "#a3a3a320" }}
            >
              <Cloud className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-bold hz-fg hz-mb-2">Hanzo Cloud</h3>
            <p className="hz-fg-muted hz-t-sm hz-mb-4">
              Fully managed platform with global edge deployment and automatic scaling.
            </p>
            <ul className="hz-stack-2 hz-t-sm hz-fg-muted">
              <li className="hz-row hz-ai-center hz-gap-2">
                <span className="hz-fg-muted">✓</span> 35+ global regions
              </li>
              <li className="hz-row hz-ai-center hz-gap-2">
                <span className="hz-fg-muted">✓</span> Zero-config deployments
              </li>
              <li className="hz-row hz-ai-center hz-gap-2">
                <span className="hz-fg-muted">✓</span> 99.99% SLA
              </li>
            </ul>
            <Link
              to="/cloud"
              className="hz-inline hz-ai-center hz-mt-5 hz-t-sm hz-fg-muted hz-link"
            >
              Explore Cloud
              <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Link>
          </motion.div>

          {/* Hybrid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hz-card hz-transition hz-card-interactive"
          >
            <div
              className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4"
              style={{ backgroundColor: "#a3a3a320" }}
            >
              <Network className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-bold hz-fg hz-mb-2">Hybrid</h3>
            <p className="hz-fg-muted hz-t-sm hz-mb-4">
              Keep sensitive data on-premise while leveraging cloud for global reach.
            </p>
            <ul className="hz-stack-2 hz-t-sm hz-fg-muted">
              <li className="hz-row hz-ai-center hz-gap-2">
                <span className="hz-fg-muted">✓</span> Data residency compliance
              </li>
              <li className="hz-row hz-ai-center hz-gap-2">
                <span className="hz-fg-muted">✓</span> Edge + origin architecture
              </li>
              <li className="hz-row hz-ai-center hz-gap-2">
                <span className="hz-fg-muted">✓</span> Unified management
              </li>
            </ul>
            <Link
              to="/enterprise"
              className="hz-inline hz-ai-center hz-mt-5 hz-t-sm hz-fg-muted hz-link"
            >
              Contact Sales
              <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const OpenSourceBenefits = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-card"
        >
          <div className="hz-row hz-ai-center hz-gap-4 hz-mb-6">
            <Github className="hz-sq-5 hz-fg" />
            <div>
              <h3 className="hz-t-2xl hz-w-bold hz-fg">100% Open Source</h3>
              <p className="hz-fg-muted">MIT Licensed. Fork, modify, contribute.</p>
            </div>
          </div>

          <div className="hz-grid hz-grid-3 hz-gap-6">
            <div className="hz-stack-4">
              <Code2 className="hz-sq-6 hz-fg" />
              <h4 className="hz-t-lg hz-w-bold hz-fg">MIT Licensed</h4>
              <p className="hz-fg-muted hz-t-sm">
                Use it commercially, modify it freely. No vendor lock-in, no surprise licensing changes.
              </p>
            </div>

            <div className="hz-stack-4">
              <Lock className="hz-sq-6 hz-fg" />
              <h4 className="hz-t-lg hz-w-bold hz-fg">Data Sovereignty</h4>
              <p className="hz-fg-muted hz-t-sm">
                Your code, your data, your infrastructure. Complete control over your stack.
              </p>
            </div>

            <div className="hz-stack-4">
              <Terminal className="hz-sq-6 hz-fg" />
              <h4 className="hz-t-lg hz-w-bold hz-fg">Developer First</h4>
              <p className="hz-fg-muted hz-t-sm">
                Built by developers, for developers. Extensive docs, active community, responsive maintainers.
              </p>
            </div>
          </div>

          <div className="hz-mt-6 hz-pt-6 hz-border-t hz-align-center">
            <a
              href="https://github.com/hanzoai/platform"
              target="_blank"
              rel="noreferrer noopener"
              className="hz-btn hz-btn-ghost hz-transition hz-fg"
            >
              <Github className="hz-sq-2 hz-mr-2" />
              Star on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Platform = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Helmet>
        <title>Hanzo Platform - Open Source Backend-as-a-Service</title>
        <meta
          name="description"
          content="Build production applications with Auth, Database, Storage, Functions, and more. Self-host or deploy to Hanzo Cloud."
        />
      </Helmet>

      <ZenBackground />
      <Navbar />

      <main>
        <PlatformHero />
        <PaaSCapabilities />
        <ZenQuoteSection
          quote="The wise engineer owns their tools, lest their tools own them."
          attribution="Principle 14"
        />
        <DeploymentOptions />
        <OpenSourceBenefits />
        <TrustedBy />
        <DeveloperLove />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
};

export default Platform;
