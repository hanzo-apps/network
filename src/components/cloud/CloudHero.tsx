import { BRAND } from '@/lib/brand';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Server,
  Globe,
  Database,
  Cpu,
  Shield,
  Zap,
  Cloud,
  Check,
  Copy,
} from "lucide-react";


const SERVICES = [
  { id: "compute", label: "Compute", icon: Server },
  { id: "ai", label: "AI/ML", icon: Cpu },
  { id: "database", label: "Database", icon: Database },
  { id: "edge", label: "Edge", icon: Globe },
  { id: "security", label: "Security", icon: Shield },
];

const ServiceDemo = ({ activeService }: { activeService: string }) => {
  const demos: Record<string, { title: string; code: string }> = {
    compute: {
      title: "Auto-scaling Compute",
      code: `# Deploy with auto-scaling
hanzo deploy --min 1 --max 100

# Scale based on metrics
hanzo scale web \\
  --cpu-target 70% \\
  --memory-target 80%

# GPU instances for AI workloads
hanzo compute create \\
  --type a100-80gb \\
  --spot-instances`,
    },
    ai: {
      title: "AI Infrastructure",
      code: `# Deploy ML models
hanzo ai deploy ./model \\
  --gpu a100 \\
  --replicas 3

# Inference endpoints
curl https://api.hanzo.cloud/v1/predict \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"input": "Hello world"}'

# Fine-tuning jobs
hanzo ai train --base llama-3 --data ./dataset`,
    },
    database: {
      title: "Managed Databases",
      code: `# PostgreSQL with pgvector
hanzo db create postgres \\
  --version 16 \\
  --extensions pgvector,postgis

# Redis cluster
hanzo db create redis \\
  --cluster \\
  --replicas 3

# Automatic backups
hanzo db backup --schedule "0 2 * * *"`,
    },
    edge: {
      title: "Global Edge Network",
      code: `# Deploy to edge
hanzo edge deploy ./functions \\
  --regions all

# Edge KV storage
hanzo edge kv put user:123 '{"name":"Alice"}'

# 35+ regions, <50ms latency
hanzo edge status
# ✓ 35 regions active
# ✓ Avg latency: 23ms`,
    },
    security: {
      title: "Enterprise Security",
      code: `# SOC 2 & HIPAA compliant
hanzo security audit

# Private networking
hanzo vpc create production \\
  --cidr 10.0.0.0/16

# Secrets management
hanzo secrets set API_KEY --env production

# Zero-trust access
hanzo access grant user@company.com \\
  --role developer`,
    },
  };

  const demo = demos[activeService];

  return (
    <div className="hz-r-lg hz-bordered hz-bg-surface hz-glass hz-clip hz-shadow-lg">
      <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
        <div className="hz-row hz-gap-2">
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
          <div className="hz-sq-1 hz-r-full hz-bg-raised" />
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={activeService}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hz-t-xs hz-fg-muted hz-mono hz-ml-2"
          >
            {demo.title}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="hz-p-4 hz-bg-surface">
        <AnimatePresence mode="wait">
          <motion.pre
            key={activeService}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="hz-t-sm hz-mono hz-fg-soft hz-scroll-x"
          >
            <code>{demo.code}</code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
};

const CloudHero = () => {
  const [activeService, setActiveService] = useState("compute");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx hanzo deploy");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
              className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-5 hz-bg-quiet hz-fg"
              >
              90+ Managed Services • Global Edge • 99.99% SLA
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="hz-t-3xl hz-w-medium hz-tracking-tight hz-mb-5"
            >
              <span className="hz-fg">Cloud that</span>
              <br />
              <span className="hz-fg-muted">scales with you.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6 hz-mw-md"
            >
              AI infrastructure, managed databases, serverless compute, and global edge deployment.
              Build, deploy, and scale modern applications on a unified platform.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="hz-row hz-wrap hz-ai-center hz-gap-4 hz-mb-5"
            >
              <Link
                to="/signup"
                className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                >
                Start free
                <ArrowRight className="hz-sq-2 hz-ml-2" />
              </Link>
              <a
                href="https://docs.hanzo.ai/cloud"
                target="_blank"
                rel="noreferrer noopener"
                className="hz-btn hz-btn-ghost hz-transition hz-fg"
              >
                Documentation
              </a>
            </motion.div>

            {/* Deploy command */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="hz-mb-6"
            >
              <div className="hz-btn hz-gap-3">
                <code className="hz-t-sm hz-mono hz-fg-soft">npx hanzo deploy</code>
                <button
                  onClick={handleCopy}
                  className="hz-fg-muted hz-transition hz-link"
                >
                  {copied ? <Check className="hz-sq-2 hz-fg-muted" /> : <Copy className="hz-sq-2" />}
                </button>
              </div>
            </motion.div>

            {/* Service tabs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="hz-row hz-wrap hz-gap-2"
            >
              {SERVICES.map((service) => {
                const Icon = service.icon;
                const isActive = activeService === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`hz-btn hz-btn-ghost hz-gap-2 hz-transition ${
                      isActive
                        ? "hz-bg-inverse hz-fg-inverse"
                        : "hz-bg-surface hz-bordered hz-fg-muted hz-link"
                    }`}
                  >
                    <Icon className="hz-sq-2" />
                    {service.label}
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Service Demo */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <ServiceDemo activeService={activeService} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CloudHero;
