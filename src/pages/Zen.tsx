import { BRAND } from '@/lib/brand';
import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Eye,
  Box,
  Video,
  Music,
  Zap,
  ExternalLink,
  Brain,
  Shield,
  Globe,
  Cpu,
  Layers,
  Clock,
} from "lucide-react";

// Model categories overview
const MODEL_CATEGORIES = [
  {
    icon: Brain,
    title: "Core Language Models",
    count: "6 models",
    description: "0.6B to 32B parameters for edge to cloud deployment. Optimized for real-time instruction following and reasoning.",
  },
  {
    icon: Eye,
    title: "Multimodal Models",
    count: "10 models",
    description: "Vision, audio, video, 3D generation, and spatial understanding. Seamless XR/VR platform integration.",
  },
  {
    icon: Code2,
    title: "Zen Coder",
    count: "5 models",
    description: "4B to 1T parameters trained on 8.47B tokens. State-of-the-art agentic coding and tool use.",
  },
  {
    icon: Shield,
    title: "Specialized Systems",
    count: "8 models",
    description: "Agent frameworks, safety guardrails, embeddings, and IDE tools for production AI.",
  },
];

// Key benefits
const BENEFITS = [
  {
    icon: Clock,
    title: "Real-Time Performance",
    description: "Sub-10ms latency with optimized quantization and edge deployment. Seamless XR integration.",
  },
  {
    icon: Globe,
    title: "Spatial Awareness",
    description: "Native 3D understanding, scene generation, and spatial audio for immersive environments.",
  },
  {
    icon: Layers,
    title: "Multimodal Fusion",
    description: "Unified understanding across vision, language, audio, and 3D. Real-time gesture and voice.",
  },
  {
    icon: Cpu,
    title: "Open Source",
    description: "Fully open models, training code, and infrastructure. Complete control and customization.",
  },
];


// Quick stats for the demo panel
const QUICK_STATS = [
  { label: "Models", value: "30+" },
  { label: "Params", value: "0.6B-1T" },
  { label: "Tokens", value: "8.47B" },
  { label: "Latency", value: "<10ms" },
];

const Zen = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Helmet>
        <title>Zen LM - Open Foundation Models for Agentic AI | Hanzo AI</title>
        <meta
          name="description"
          content="Real-time hyper-modal AI for XR/VR/Robotics. 30+ open models from 0.6B to 1T parameters across language, vision, audio, video, and 3D."
        />
      </Helmet>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hz-rel hz-pt-6 hz-pb-6 hz-px-4 hz-clip">
          {/* Background gradient */}
          <div className="hz-abs hz-inset hz-clip hz-z-base hz-no-pointer">
            <div
              className="hz-center-xy hz-abs hz-r-full hz-dim-more"
              style={{
                background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 70%)`,
                filter: "blur(100px)",
              }}
            />
          </div>

          <div className="hz-container hz-rel hz-z-raised">
            <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
              {/* Left Column */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="hz-mb-5"
                >
                  <span className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-bg-raised hz-fg-muted hz-bordered hz-border-strong">
                    <Zap className="hz-sq-1" />
                    Open Source AI
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="hz-t-3xl hz-w-medium hz-tracking-tight hz-mb-5"
                >
                  <span className="hz-fg">Real-Time Hyper-Modal AI</span>
                  <br />
                  <span className="hz-fg-muted">for XR/VR/Robotics</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6 hz-mw-md"
                >
                  Zen LM powers next-generation XR/VR applications and robotic systems with real-time multimodal
                  understanding. Sub-10ms latency for seamless human-AI interaction.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="hz-row hz-wrap hz-ai-center hz-gap-4 hz-mb-6"
                >
                  <Link
                    to="/zen/models"
                    className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                    >
                    Explore Models
                    <ArrowRight className="hz-sq-2 hz-ml-2" />
                  </Link>
                  <a
                    href="https://zenlm.org/research"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hz-btn hz-btn-ghost hz-transition hz-fg"
                  >
                    <ExternalLink className="hz-sq-2 hz-mr-2" />
                    Read Research
                  </a>
                </motion.div>

                {/* Quick links */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="hz-row hz-wrap hz-gap-3"
                >
                  <a
                    href="https://huggingface.co/zenlm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hz-btn hz-gap-2 hz-fg-muted hz-transition"
                  >
                    🤗 HuggingFace
                  </a>
                  <a
                    href="https://github.com/zenlm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hz-btn hz-gap-2 hz-fg-muted hz-transition"
                  >
                    <Globe className="hz-sq-2" />
                    GitHub
                  </a>
                  <a
                    href="https://zenlm.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hz-btn hz-gap-2 hz-fg-muted hz-transition"
                  >
                    <Globe className="hz-sq-2" />
                    zenlm.org
                  </a>
                </motion.div>
              </div>

              {/* Right Column: Stats Demo */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <div className="hz-r-lg hz-bordered hz-bg-surface hz-glass hz-clip hz-shadow-lg">
                  <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
                    <div className="hz-row hz-gap-2">
                      <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                      <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                      <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                    </div>
                    <span className="hz-t-xs hz-fg-muted hz-mono hz-ml-2">zen-models</span>
                  </div>
                  <div className="hz-p-5 hz-bg-surface">
                    <div className="hz-grid hz-grid-2 hz-gap-4 hz-mb-5">
                      {QUICK_STATS.map((stat) => (
                        <div key={stat.label} className="hz-card hz-align-center">
                          <div className="hz-t-2xl hz-w-bold hz-fg hz-mb-1">{stat.value}</div>
                          <div className="hz-t-xs hz-fg-muted hz-upper hz-tracking-wide">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="hz-stack-3">
                      <div className="hz-row hz-ai-center hz-gap-2 hz-t-sm">
                        <Brain className="hz-sq-2 hz-fg-muted" />
                        <span className="hz-fg-soft">Language • Vision • Audio • Video • 3D</span>
                      </div>
                      <div className="hz-row hz-ai-center hz-gap-2 hz-t-sm">
                        <Code2 className="hz-sq-2 hz-fg-muted" />
                        <span className="hz-fg-soft">Agentic coding with tool use</span>
                      </div>
                      <div className="hz-row hz-ai-center hz-gap-2 hz-t-sm">
                        <Shield className="hz-sq-2 hz-fg-muted" />
                        <span className="hz-fg-soft">Apache 2.0 • Open weights & training</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Complete AI Stack Section */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-align-center hz-mb-7"
            >
              <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-3">
                Complete AI Stack for Immersive Computing
              </h2>
            </motion.div>

            <div className="hz-grid hz-grid-4 hz-gap-5">
              {MODEL_CATEGORIES.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="hz-card hz-align-center hz-transition hz-card-interactive"
                  >
                    <div className="hz-sq-7 hz-mx-auto hz-mb-4 hz-row hz-ai-center hz-jc-center hz-r-lg hz-bg-raised hz-bordered hz-border-strong">
                      <Icon className="hz-sq-4 hz-fg-muted" />
                    </div>
                    <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-1">{category.title}</h3>
                    <p className="hz-t-sm hz-fg-muted hz-mb-2">{category.count}</p>
                    <p className="hz-fg-muted hz-t-sm">{category.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Zen Section */}
        <section className="hz-py-7 hz-px-4 hz-bg-surface">
          <div className="hz-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-align-center hz-mb-7"
            >
              <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-3">
                Why Zen for XR/VR/Robotics?
              </h2>
            </motion.div>

            <div className="hz-grid hz-grid-4 hz-gap-5">
              {BENEFITS.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="hz-card hz-align-center hz-transition hz-card-interactive"
                  >
                    <div className="hz-sq-7 hz-mx-auto hz-mb-4 hz-row hz-ai-center hz-jc-center hz-r-lg hz-bg-raised hz-bordered hz-border-strong">
                      <Icon className="hz-sq-4 hz-fg-muted" />
                    </div>
                    <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">{benefit.title}</h3>
                    <p className="hz-fg-muted hz-t-sm">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-align-center hz-mb-7"
            >
              <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-3">Get Started</h2>
            </motion.div>

            <div className="hz-grid hz-grid-3 hz-gap-5">
              <motion.a
                href="https://huggingface.co/zenlm"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="hz-card hz-align-center hz-transition hz-card-interactive"
              >
                <div className="hz-t-3xl hz-mb-4">🤗</div>
                <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">HuggingFace</h3>
                <p className="hz-fg-muted hz-t-sm">Access all 30+ models via HuggingFace Hub</p>
              </motion.a>

              <motion.a
                href="https://github.com/zenlm"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="hz-card hz-align-center hz-transition hz-card-interactive"
              >
                <div className="hz-t-3xl hz-mb-4">💻</div>
                <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">GitHub</h3>
                <p className="hz-fg-muted hz-t-sm">Training code, datasets, and documentation</p>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="hz-card hz-align-center hz-transition hz-card-interactive"
              >
                <Link to="/zen/models" className="">
                  <div className="hz-t-3xl hz-mb-4">📚</div>
                  <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">Models</h3>
                  <p className="hz-fg-muted hz-t-sm">Full catalog with specs and downloads</p>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="hz-py-7 hz-px-4 hz-border-t">
          <div className="hz-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-align-center"
            >
              <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">Ready to build with Zen?</h2>
              <p className="hz-container-narrow hz-mw-md hz-fg-muted hz-mb-6">
                All models are open source under Apache 2.0 or MIT license. Start building today.
              </p>
              <div className="hz-row hz-wrap hz-jc-center hz-gap-4">
                <Link
                  to="/zen/models"
                  className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                  >
                  Explore All Models
                  <ArrowRight className="hz-sq-2 hz-ml-2" />
                </Link>
                <Link
                  to="/dev"
                  className="hz-btn hz-btn-ghost hz-transition hz-fg"
                >
                  Try Hanzo Dev
                </Link>
                <a
                  href="https://zenlm.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-btn-ghost hz-transition hz-fg"
                >
                  <Globe className="hz-sq-2 hz-mr-2" />
                  Visit zenlm.org
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Zen;
