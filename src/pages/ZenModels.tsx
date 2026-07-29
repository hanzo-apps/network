import { BRAND } from '@/lib/brand';
import React, { useState } from "react";
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
  Check,
  Github,
  ChevronDown,
  Brain,
  Layers,
  Database,
  Shield,
  Globe,
  BookOpen,
  Terminal,
  Download,
} from "lucide-react";

// Zen Coder lineup from zenlm.org
const ZEN_CODER_MODELS = [
  {
    name: "Zen Coder 4B",
    size: "4B",
    base: "Qwen3-4B-Instruct",
    vram: "8 GB",
    context: "32K",
    status: "Trained",
  },
  {
    name: "Zen Coder 24B",
    size: "24B",
    base: "Devstral Small 2",
    vram: "24 GB",
    context: "256K",
    status: "Trained",
    flagship: true,
  },
  {
    name: "Zen Coder 123B",
    size: "123B",
    base: "Devstral 2",
    vram: "128 GB",
    context: "256K",
    status: "Training",
  },
  {
    name: "Zen Coder Max",
    size: "358B",
    base: "GLM-4.7 (MoE)",
    vram: "180 GB",
    context: "200K",
    status: "Planned",
    frontier: true,
  },
  {
    name: "Zen Coder Ultra",
    size: "1T",
    base: "Kimi K2 (MoE)",
    vram: "256 GB",
    context: "128K",
    status: "Planned",
  },
];

// Dataset stats from zenlm.org
const DATASET_STATS = [
  { value: "8.47B", label: "Tokens", description: "Total training tokens across all data sources" },
  { value: "3.35M", label: "Samples", description: "Training samples with conversation context" },
  { value: "1,452", label: "Repositories", description: "Open source and private codebases" },
  { value: "15yr", label: "History", description: "Years of development history (2010-2025)" },
];

// AI Ecosystem categories from zenlm.org
const ECOSYSTEM_CATEGORIES = [
  {
    icon: Brain,
    title: "Language Models",
    description: "6 core models from 0.6B to 32B. zen-nano for edge, zen-eco for efficiency, zen-omni for multimodal, zen-next for frontier reasoning.",
  },
  {
    icon: Code2,
    title: "Zen Coder",
    description: "5 coding models from 4B to 1T trained on 8.47B tokens of agentic programming data. State-of-the-art on tool use and multi-step coding.",
  },
  {
    icon: Eye,
    title: "Vision & Multimodal",
    description: "zen-vl for vision-language, zen-designer for visual understanding, zen-artist for image generation, zen-omni for unified multimodal.",
  },
  {
    icon: Video,
    title: "Video & 3D",
    description: "zen-director for video generation, zen-video for high-quality synthesis, zen-3d for 3D assets, zen-world for world simulation.",
  },
  {
    icon: Music,
    title: "Audio",
    description: "zen-musician for music generation, zen-foley for sound effects, zen-scribe for transcription, zen-dub for voice dubbing.",
  },
  {
    icon: Shield,
    title: "Specialized",
    description: "zen-guard for safety, zen-embedding for vectors, zen-reranker for search, zen-translator for translation, zen-agent for tool use.",
  },
];

// Model families with full details
const MODEL_FAMILIES = {
  coder: {
    title: "Zen Coder",
    description: "Agentic coding models trained on 8.47B tokens of real programming sessions",
    icon: Code2,
    models: [
      {
        name: "Zen Coder 4B",
        params: "4B",
        context: "32K tokens",
        vram: "8 GB",
        license: "Apache 2.0",
        base: "Qwen3-4B-Instruct",
        features: [
          "Edge deployment",
          "Real agentic debug sessions",
          "Multi-file refactoring",
          "Tool use patterns",
        ],
        status: "Trained",
        huggingface: "https://huggingface.co/zenlm/zen-coder",
      },
      {
        name: "Zen Coder 24B",
        badge: "FLAGSHIP",
        params: "24B",
        context: "256K tokens",
        vram: "24 GB",
        license: "Apache 2.0",
        base: "Devstral Small 2",
        features: [
          "Production-ready agentic coding",
          "Long context understanding",
          "Real debugging workflows",
          "Professional development patterns",
        ],
        status: "Trained",
        huggingface: "https://huggingface.co/zenlm/zen-coder-24b",
      },
      {
        name: "Zen Coder 123B",
        params: "123B",
        context: "256K tokens",
        vram: "128 GB",
        license: "Apache 2.0",
        base: "Devstral 2",
        features: [
          "Large-scale agentic tasks",
          "Complex multi-step coding",
          "Advanced tool orchestration",
          "Enterprise-grade performance",
        ],
        status: "Training",
        huggingface: "https://huggingface.co/zenlm/zen-coder-123b",
      },
      {
        name: "Zen Coder Max",
        badge: "FRONTIER",
        params: "358B MoE",
        context: "200K tokens",
        vram: "180 GB",
        license: "Apache 2.0",
        base: "GLM-4.7 (MoE)",
        features: [
          "Frontier agentic capability",
          "MoE efficiency",
          "State-of-the-art SWE-bench",
          "Tool calling with glm47 parser",
        ],
        status: "Planned",
        huggingface: "https://huggingface.co/zenlm/zen-coder-max",
      },
      {
        name: "Zen Coder Ultra",
        badge: "1T",
        params: "1T MoE",
        context: "128K tokens",
        vram: "256 GB",
        license: "Apache 2.0",
        base: "Kimi K2 (MoE)",
        features: [
          "Trillion parameter scale",
          "Ultimate agentic reasoning",
          "200-300 sequential tool calls",
          "Heavy mode (8 trajectories)",
        ],
        status: "Planned",
        huggingface: "https://huggingface.co/zenlm/zen-coder-ultra",
      },
    ],
  },
  language: {
    title: "Language Models",
    description: "Efficient general-purpose language understanding",
    icon: Brain,
    models: [
      {
        name: "zen-nano",
        params: "0.6B",
        context: "40K tokens",
        license: "Apache 2.0",
        base: "Qwen3-0.6B",
        performance: "44K tokens/sec (M3 Max)",
        memory: "0.4-1.2GB",
        features: [
          "Edge deployment",
          "Mobile devices",
          "Embedded systems",
          "On-device AI",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-nano-0.6b",
      },
      {
        name: "zen-eco",
        params: "4B",
        context: "32K tokens",
        license: "Apache 2.0",
        base: "Qwen3-3B",
        performance: "28K tokens/sec (RTX 4090)",
        memory: "2-8GB",
        features: [
          "General-purpose",
          "Instruction following",
          "Thinking variants",
          "Agent variants",
        ],
        status: "In Development",
        huggingface: "https://huggingface.co/zenlm/zen-eco-4b-instruct",
      },
      {
        name: "zen-agent",
        params: "4B",
        context: "32K tokens",
        license: "Apache 2.0",
        base: "Qwen3-3B",
        features: [
          "Tool calling",
          "MCP support",
          "Agentic workflows",
          "Function execution",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-agent-4b",
      },
      {
        name: "zen-omni",
        badge: "MULTIMODAL",
        params: "7B",
        context: "32K tokens",
        license: "Apache 2.0",
        base: "Qwen3-Omni",
        features: [
          "Text + Vision + Audio",
          "Unified multimodal",
          "Cross-modal reasoning",
          "Speech interaction",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-omni",
      },
    ],
  },
  vision: {
    title: "Vision-Language Models",
    description: "Advanced visual understanding and multimodal reasoning",
    icon: Eye,
    models: [
      {
        name: "zen-vl-4b-instruct",
        params: "4B",
        context: "32K (256K expandable)",
        license: "Apache 2.0",
        base: "Qwen3-VL-4B",
        features: [
          "Image analysis",
          "OCR (32 languages)",
          "Multimodal reasoning",
          "Zen persona",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-vl-4b-instruct",
      },
      {
        name: "zen-vl-4b-agent",
        params: "4B",
        context: "32K (256K expandable)",
        license: "Apache 2.0",
        features: [
          "Function calling",
          "GUI interaction",
          "Visual agent",
          "Tool use",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-vl-4b-agent",
      },
      {
        name: "zen-vl-8b-instruct",
        params: "8B",
        context: "256K (1M expandable)",
        license: "Apache 2.0",
        base: "Qwen3-VL-8B",
        features: [
          "Video comprehension",
          "Spatial reasoning",
          "STEM/math/code",
          "Comprehensive analysis",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-vl-8b-instruct",
      },
      {
        name: "zen-vl-30b-instruct",
        params: "30B (31B MoE)",
        context: "256K (1M expandable)",
        license: "Apache 2.0",
        base: "Qwen3-VL-30B",
        features: [
          "Comprehensive vision",
          "OCR (32 languages)",
          "STEM reasoning",
          "Video comprehension",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-vl-30b-instruct",
      },
    ],
  },
  generative3d: {
    title: "3D Generation",
    description: "Create 3D assets and worlds from text and images",
    icon: Box,
    models: [
      {
        name: "zen-3d",
        params: "3.3B",
        license: "Apache 2.0",
        features: [
          "Point cloud control",
          "OBJ/GLB/USD/FBX output",
          "~30s per model",
          "10GB memory",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-3d",
      },
      {
        name: "zen-voyager",
        license: "Apache 2.0",
        features: [
          "Image → 3D video",
          "Camera control",
          "RGB + depth output",
          "Point clouds",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-voyager",
      },
      {
        name: "zen-world",
        license: "Apache 2.0",
        features: [
          "City-scale environments",
          "Complete world synthesis",
          "Large-scale generation",
          "24GB+ memory",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-world",
      },
    ],
  },
  video: {
    title: "Video Generation",
    description: "Create videos from text and images",
    icon: Video,
    models: [
      {
        name: "zen-director",
        params: "5B",
        license: "Apache 2.0",
        features: [
          "Text/Image to video",
          "Up to 10s, 24 FPS",
          "1280x720 output",
          "~60s generation",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-director-5b",
      },
      {
        name: "zen-video",
        license: "Apache 2.0",
        features: [
          "High-quality video",
          "Professional synthesis",
          "High-resolution",
          "Variable length",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-video",
      },
      {
        name: "zen-video-i2v",
        license: "Apache 2.0",
        features: [
          "Image to video",
          "Animate static images",
          "~45s generation",
          "5 second output",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-video-i2v",
      },
    ],
  },
  audio: {
    title: "Audio Generation",
    description: "Create music and sound effects",
    icon: Music,
    models: [
      {
        name: "zen-musician",
        params: "7B",
        license: "Apache 2.0",
        features: [
          "Lyrics → full songs",
          "Vocals + accompaniment",
          "5 languages",
          "~360s for 30s audio",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-musician-7b",
      },
      {
        name: "zen-foley",
        license: "Apache 2.0",
        features: [
          "Video → sound effects",
          "Professional foley",
          "48kHz audio",
          "~15s for 10s audio",
        ],
        status: "Released",
        huggingface: "https://huggingface.co/zenlm/zen-foley",
      },
    ],
  },
};

const ModelCard = ({ model }: { model: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`hz-card ${
        model.badge === "FLAGSHIP"
          ? "hz-ring"
          : ""
      }`}
    >
      <div className="hz-row hz-ai-start hz-jc-between hz-mb-4">
        <div>
          <div className="hz-row hz-ai-center hz-gap-2 hz-mb-1">
            <h3 className="hz-t-lg hz-w-bold hz-fg">{model.name}</h3>
            {model.badge && (
              <span className="hz-px-2 hz-py-1 hz-t-xs hz-w-bold hz-r-full hz-bg-quiet hz-fg hz-bordered">
                {model.badge}
              </span>
            )}
          </div>
          {model.base && (
            <p className="hz-t-xs hz-fg-muted">Based on {model.base}</p>
          )}
        </div>
        <span
          className={`hz-t-xs hz-px-2 hz-py-1 hz-r-full ${
            model.status === "Released" || model.status === "Latest" || model.status === "Trained"
              ? "hz-bg-quiet hz-fg hz-bordered"
              : model.status === "Training"
              ? "hz-bg-raised hz-fg-soft hz-bordered"
              : "hz-bg-surface hz-fg-muted hz-bordered"
          }`}
        >
          {model.status}
        </span>
      </div>

      <div className="hz-grid hz-grid-2 hz-gap-4 hz-mb-4">
        {model.params && (
          <div>
            <p className="hz-t-xs hz-fg-muted hz-upper hz-tracking-wide hz-mb-1">
              Parameters
            </p>
            <p className="hz-t-sm hz-w-medium hz-fg">{model.params}</p>
          </div>
        )}
        {model.context && (
          <div>
            <p className="hz-t-xs hz-fg-muted hz-upper hz-tracking-wide hz-mb-1">
              Context
            </p>
            <p className="hz-t-sm hz-w-medium hz-fg">{model.context}</p>
          </div>
        )}
        {model.license && (
          <div>
            <p className="hz-t-xs hz-fg-muted hz-upper hz-tracking-wide hz-mb-1">
              License
            </p>
            <p className="hz-t-sm hz-w-medium hz-fg">{model.license}</p>
          </div>
        )}
        {model.performance && (
          <div>
            <p className="hz-t-xs hz-fg-muted hz-upper hz-tracking-wide hz-mb-1">
              Performance
            </p>
            <p className="hz-t-sm hz-w-medium hz-fg">{model.performance}</p>
          </div>
        )}
      </div>

      <div className="hz-stack-2 hz-mb-4">
        {model.features.slice(0, isExpanded ? undefined : 3).map((feature: string, idx: number) => (
          <div key={idx} className="hz-row hz-ai-center hz-gap-2">
            <Check className="hz-sq-1 hz-fg-muted" />
            <span className="hz-t-sm hz-fg-soft">{feature}</span>
          </div>
        ))}
        {model.features.length > 3 && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="hz-t-xs hz-fg-muted hz-row hz-ai-center hz-gap-1 hz-link"
          >
            +{model.features.length - 3} more
            <ChevronDown className="hz-sq-1" />
          </button>
        )}
      </div>

      {model.huggingface && (
        <a
          href={model.huggingface}
          target="_blank"
          rel="noopener noreferrer"
          className="hz-inline hz-ai-center hz-gap-2 hz-t-sm hz-fg-muted hz-transition hz-link"
        >
          <span>View on HuggingFace</span>
          <ExternalLink className="hz-sq-1" />
        </a>
      )}
    </motion.div>
  );
};

const FamilySection = ({
  familyKey,
  family,
}: {
  familyKey: string;
  family: (typeof MODEL_FAMILIES)[keyof typeof MODEL_FAMILIES];
}) => {
  const Icon = family.icon;

  return (
    <section id={familyKey} className="hz-py-7 hz-border-t">
      <div className="hz-row hz-ai-center hz-gap-4 hz-mb-6">
        <div className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-bg-quiet hz-bordered">
          <Icon className="hz-sq-4 hz-fg" />
        </div>
        <div>
          <h2 className="hz-t-2xl hz-w-bold hz-fg">{family.title}</h2>
          <p className="hz-fg-muted">{family.description}</p>
        </div>
      </div>

      <div className="hz-grid hz-grid-3 hz-gap-5">
        {family.models.map((model) => (
          <ModelCard key={model.name} model={model} />
        ))}
      </div>
    </section>
  );
};


const ZenModels = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Helmet>
        <title>Zen LM - Open Foundation Models for Agentic AI | Hanzo AI</title>
        <meta
          name="description"
          content="30+ models from 0.6B to 1T parameters across language, vision, audio, video, and 3D. Production-ready AI models for agentic coding, multimodal understanding, and creative generation."
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
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="hz-mb-5 hz-align-center"
            >
              <span className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-bg-raised hz-fg-muted hz-bordered hz-border-strong">
                <Code2 className="hz-sq-1" />
                30+ Open Models
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="hz-t-3xl hz-w-medium hz-tracking-tight hz-mb-5 hz-align-center"
            >
              <span className="hz-fg">Open Foundation Models</span>
              <br />
              <span className="hz-fg-muted">for Agentic AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="hz-container-narrow hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6 hz-align-center"
            >
              Zen LM provides production-ready AI models for agentic coding, multimodal understanding,
              and creative generation. Our flagship Zen Coder models are trained on 8.47B tokens
              of real programming sessions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="hz-row hz-wrap hz-jc-center hz-ai-center hz-gap-4 hz-mb-6"
            >
              <a
                href="#models"
                className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                >
                Explore Models
                <ArrowRight className="hz-sq-2 hz-ml-2" />
              </a>
              <a
                href="#dataset"
                className="hz-btn hz-btn-ghost hz-transition hz-fg"
              >
                <Database className="hz-sq-2 hz-mr-2" />
                Training Data
              </a>
              <a
                href="https://zenlm.org/research"
                target="_blank"
                rel="noopener noreferrer"
                className="hz-btn hz-btn-ghost hz-transition hz-fg"
              >
                <BookOpen className="hz-sq-2 hz-mr-2" />
                Research Papers
              </a>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="hz-row hz-wrap hz-jc-center hz-gap-3"
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
                <Github className="hz-sq-2" />
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
        </section>

        {/* Zen Coder Feature Section */}
        <section id="zen-coder" className="hz-py-7 hz-px-4">
          <div className="hz-container hz-py-7 hz-r-xl hz-bg-surface hz-bordered">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-align-center hz-mb-6"
            >
              <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-3">
                Zen Coder - Agentic Coding Models
              </h2>
              <p className="hz-fg-muted hz-t-lg">
                Fine-tuned on 8.47B tokens of real programming sessions
              </p>
            </motion.div>

            {/* Models Table */}
            <div className="hz-scroll-x hz-mb-6">
              <table className="hz-w-full hz-bg hz-bordered hz-r-lg hz-clip">
                <thead>
                  <tr className="hz-bg-surface">
                    <th className="hz-px-5 hz-py-4 hz-align-left hz-t-xs hz-w-semibold hz-fg-muted hz-upper hz-tracking-wide">Model</th>
                    <th className="hz-px-5 hz-py-4 hz-align-left hz-t-xs hz-w-semibold hz-fg-muted hz-upper hz-tracking-wide">Size</th>
                    <th className="hz-px-5 hz-py-4 hz-align-left hz-t-xs hz-w-semibold hz-fg-muted hz-upper hz-tracking-wide">Base</th>
                    <th className="hz-px-5 hz-py-4 hz-align-left hz-t-xs hz-w-semibold hz-fg-muted hz-upper hz-tracking-wide">VRAM</th>
                    <th className="hz-px-5 hz-py-4 hz-align-left hz-t-xs hz-w-semibold hz-fg-muted hz-upper hz-tracking-wide">Context</th>
                    <th className="hz-px-5 hz-py-4 hz-align-left hz-t-xs hz-w-semibold hz-fg-muted hz-upper hz-tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ZEN_CODER_MODELS.map((model) => (
                    <tr
                      key={model.name}
                      className={`hz-border-t hz-transition hz-hoverable ${model.flagship ? "hz-bg-quiet" : ""}`}
                    >
                      <td className="hz-px-5 hz-py-4">
                        <div className="hz-row hz-ai-center hz-gap-2">
                          <span className="hz-w-semibold hz-fg">{model.name}</span>
                          {model.flagship && (
                            <span className="hz-px-2 hz-py-1 hz-t-xs hz-w-bold hz-r-full hz-bg-quiet hz-fg hz-bordered">
                              FLAGSHIP
                            </span>
                          )}
                          {model.frontier && (
                            <span className="hz-px-2 hz-py-1 hz-t-xs hz-w-bold hz-r-full hz-bg-quiet hz-fg hz-bordered">
                              FRONTIER
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="hz-px-5 hz-py-4 hz-fg-soft">{model.size}</td>
                      <td className="hz-px-5 hz-py-4 hz-fg-soft">{model.base}</td>
                      <td className="hz-px-5 hz-py-4 hz-fg-soft">{model.vram}</td>
                      <td className="hz-px-5 hz-py-4 hz-fg-soft">{model.context}</td>
                      <td className="hz-px-5 hz-py-4">
                        <span
                          className={`hz-px-3 hz-py-1 hz-t-xs hz-w-semibold hz-r-full hz-upper ${
                            model.status === "Trained"
                              ? "hz-bg-quiet hz-fg hz-bordered"
                              : model.status === "Training"
                              ? "hz-bg-raised hz-fg-soft hz-bordered"
                              : "hz-bg-surface hz-fg-muted hz-bordered"
                          }`}
                          style={model.status === "Training" ? { animation: "pulse 2s infinite" } : {}}
                        >
                          {model.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Coder Features Grid */}
            <div className="hz-grid hz-grid-3 hz-gap-5">
              <div className="hz-card hz-transition hz-card-interactive">
                <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Real Agentic Data</h3>
                <p className="hz-fg-muted hz-t-sm">
                  Trained on actual agentic debug sessions - not synthetic data. Real debugging workflows,
                  multi-file refactoring, and tool use patterns.
                </p>
              </div>
              <div className="hz-card hz-transition hz-card-interactive">
                <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Production Code</h3>
                <p className="hz-fg-muted hz-t-sm">
                  15 years of professional development across AI, Web3, cryptography, and modern software
                  engineering from 1,452 repositories.
                </p>
              </div>
              <div className="hz-card hz-transition hz-card-interactive">
                <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Open Training</h3>
                <p className="hz-fg-muted hz-t-sm">
                  Use{" "}
                  <a
                    href="https://github.com/zenlm/zen-trainer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hz-underline hz-fg hz-hoverable"
                  >
                    zen-trainer
                  </a>
                  {" "}to fine-tune on your own data. Supports MLX (Apple Silicon), Unsloth, and DeepSpeed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Complete AI Model Ecosystem */}
        <section id="overview" className="hz-py-7 hz-px-4">
          <div className="hz-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-align-center hz-mb-7"
            >
              <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-3">
                Complete AI Model Ecosystem
              </h2>
            </motion.div>

            <div className="hz-grid hz-grid-3 hz-gap-5">
              {ECOSYSTEM_CATEGORIES.map((category, idx) => {
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
                    <div className="hz-sq-8 hz-t-4xl hz-mb-4 hz-mx-auto hz-row hz-ai-center hz-jc-center hz-r-lg hz-bg-raised hz-bordered hz-border-strong">
                      <Icon className="hz-sq-5 hz-fg-muted" />
                    </div>
                    <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">{category.title}</h3>
                    <p className="hz-fg-muted hz-t-sm">{category.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dataset Section */}
        <section id="dataset" className="hz-py-7 hz-px-4 hz-bg-surface">
          <div className="hz-container hz-py-7 hz-r-xl hz-bg-surface hz-bordered">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-align-center hz-mb-6"
            >
              <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-3">
                Zen Agentic Dataset
              </h2>
              <p className="hz-fg-muted hz-t-lg">
                8.47 Billion Tokens of Real-World Agentic Programming
              </p>
            </motion.div>

            <div className="hz-grid hz-grid-4 hz-gap-5 hz-mb-6">
              {DATASET_STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="hz-card hz-align-center hz-transition hz-card-interactive"
                >
                  <div className="hz-t-3xl hz-w-bold hz-fg hz-mb-2">
                    {stat.value}
                  </div>
                  <h3 className="hz-t-lg hz-w-semibold hz-fg-soft hz-mb-1">{stat.label}</h3>
                  <p className="hz-fg-muted hz-t-sm">{stat.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="hz-align-center">
              <p className="hz-fg-muted hz-mb-5">Available for research and commercial licensing.</p>
              <div className="hz-row hz-wrap hz-jc-center hz-gap-4">
                <a
                  href="mailto:z@hanzo.ai"
                  className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                  >
                  Request Access
                </a>
                <a
                  href="https://huggingface.co/datasets/hanzoai/zen-agentic-dataset"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-btn-ghost hz-transition hz-fg"
                >
                  View on HuggingFace
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Model Families Section */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container">
            {/* Quick Nav */}
            <div id="models" className="hz-mb-7 hz-row hz-wrap hz-gap-3 hz-jc-center">
              {Object.entries(MODEL_FAMILIES).map(([key, family]) => {
                const Icon = family.icon;
                return (
                  <a
                    key={key}
                    href={`#${key}`}
                    className="hz-btn hz-btn-ghost hz-gap-2 hz-transition hz-fg-muted"
                  >
                    <Icon className="hz-sq-2" />
                    {family.title}
                  </a>
                );
              })}
            </div>

            {/* Model Families */}
            {Object.entries(MODEL_FAMILIES).map(([key, family]) => (
              <FamilySection key={key} familyKey={key} family={family} />
            ))}
          </div>
        </section>

        {/* Get Started Section */}
        <section id="downloads" className="hz-py-7 hz-px-4 hz-border-t">
          <div className="hz-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-align-center hz-mb-7"
            >
              <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-3">
                Get Started
              </h2>
            </motion.div>

            <div className="hz-grid hz-grid-4 hz-gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="hz-card hz-align-center hz-transition hz-card-interactive"
              >
                <Download className="hz-sq-5 hz-mx-auto hz-mb-4 hz-fg-muted" />
                <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">HuggingFace</h3>
                <p className="hz-fg-muted hz-t-sm hz-mb-4">Access all 30+ models via HuggingFace Hub</p>
                <a
                  href="https://huggingface.co/zenlm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                  >
                  Visit HuggingFace
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="hz-card hz-align-center hz-transition hz-card-interactive"
              >
                <Github className="hz-sq-5 hz-mx-auto hz-mb-4 hz-fg-muted" />
                <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">GitHub</h3>
                <p className="hz-fg-muted hz-t-sm hz-mb-4">Training code, documentation, and source</p>
                <a
                  href="https://github.com/zenlm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                  >
                  View on GitHub
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="hz-card hz-align-center hz-transition hz-card-interactive"
              >
                <Terminal className="hz-sq-5 hz-mx-auto hz-mb-4 hz-fg-muted" />
                <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">zen-trainer</h3>
                <p className="hz-fg-muted hz-t-sm hz-mb-4">Fine-tune models on your own data</p>
                <div className="hz-card hz-card-tight">
                  <code className="hz-t-sm hz-fg">pip install zen-trainer</code>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="hz-card hz-align-center hz-transition hz-card-interactive"
              >
                <BookOpen className="hz-sq-5 hz-mx-auto hz-mb-4 hz-fg-muted" />
                <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">Research</h3>
                <p className="hz-fg-muted hz-t-sm hz-mb-4">Technical papers and whitepapers</p>
                <a
                  href="https://zenlm.org/research"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                  >
                  Read Papers
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Infrastructure Section */}
        <section className="hz-py-7 hz-px-4 hz-bg-surface hz-border-t">
          <div className="hz-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-align-center hz-mb-7"
            >
              <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-3">
                Infrastructure
              </h2>
              <p className="hz-fg-muted">
                Train and deploy Zen models with our optimized platforms
              </p>
            </motion.div>

            <div className="hz-grid hz-grid-2 hz-gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="hz-card hz-transition hz-card-interactive"
              >
                <div className="hz-row hz-ai-center hz-gap-3 hz-mb-4">
                  <Layers className="hz-sq-4 hz-fg-muted" />
                  <h3 className="hz-t-xl hz-w-bold hz-fg">Zen Gym</h3>
                </div>
                <p className="hz-fg-muted hz-mb-4">
                  Unified training platform for all Zen models with 2-5x
                  speedup.
                </p>
                <div className="hz-stack-2 hz-mb-5">
                  {[
                    "LoRA, QLoRA, GRPO, GSPO, DPO, PPO",
                    "Unsloth acceleration",
                    "FlashAttention-2",
                    "Liger Kernel optimization",
                  ].map((feature, idx) => (
                    <div key={idx} className="hz-row hz-ai-center hz-gap-2">
                      <Check className="hz-sq-1 hz-fg-muted" />
                      <span className="hz-t-sm hz-fg-soft">{feature}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="https://github.com/zenlm/zen-gym"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-inline hz-ai-center hz-gap-2 hz-t-sm hz-fg-muted hz-transition hz-link"
                >
                  View on GitHub
                  <ExternalLink className="hz-sq-1" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="hz-card hz-transition hz-card-interactive"
              >
                <div className="hz-row hz-ai-center hz-gap-3 hz-mb-4">
                  <Zap className="hz-sq-4 hz-fg-muted" />
                  <h3 className="hz-t-xl hz-w-bold hz-fg">Zen Engine</h3>
                </div>
                <p className="hz-fg-muted hz-mb-4">
                  High-performance inference for all Zen models with
                  OpenAI-compatible API.
                </p>
                <div className="hz-stack-2 hz-mb-5">
                  {[
                    "44K tokens/sec (M3 Max)",
                    "OpenAI-compatible REST API",
                    "PyTorch, MLX, GGUF formats",
                    "MCP integration",
                  ].map((feature, idx) => (
                    <div key={idx} className="hz-row hz-ai-center hz-gap-2">
                      <Check className="hz-sq-1 hz-fg-muted" />
                      <span className="hz-t-sm hz-fg-soft">{feature}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="https://github.com/zenlm/zen-engine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-inline hz-ai-center hz-gap-2 hz-t-sm hz-fg-muted hz-transition hz-link"
                >
                  View on GitHub
                  <ExternalLink className="hz-sq-1" />
                </a>
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
              <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
                Ready to build with Zen?
              </h2>
              <p className="hz-container-narrow hz-mw-md hz-fg-muted hz-mb-6">
                All models are open source under Apache 2.0 or MIT license. Start
                building today.
              </p>
              <div className="hz-row hz-wrap hz-jc-center hz-gap-4">
                <a
                  href="https://huggingface.co/zenlm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                  >
                  Get Started
                  <ArrowRight className="hz-sq-2 hz-ml-2" />
                </a>
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

      {/* Add pulse animation for training status */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default ZenModels;
