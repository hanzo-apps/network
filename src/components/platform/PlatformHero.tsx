import { BRAND } from '@/lib/brand';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Github,
  Terminal,
  Server,
  Database,
  Lock,
  Zap,
  Check,
  Copy,
} from "lucide-react";


const FEATURES = [
  { id: "self-host", label: "Self-Host", icon: Server },
  { id: "auth", label: "Auth", icon: Lock },
  { id: "database", label: "Database", icon: Database },
  { id: "functions", label: "Functions", icon: Zap },
  { id: "cli", label: "CLI", icon: Terminal },
];

const FeatureDemo = ({ activeFeature }: { activeFeature: string }) => {
  const demos: Record<string, { title: string; code: string }> = {
    "self-host": {
      title: "Self-Hosting",
      code: `# One-line install
curl -fsSL install.hanzo.ai | sh

# Docker Compose setup
git clone https://github.com/hanzoai/platform
cd platform && docker compose up -d

# Kubernetes deployment
helm repo add hanzo https://charts.hanzo.ai
helm install hanzo hanzo/platform \\
  --set domain=platform.yourcompany.com`,
    },
    auth: {
      title: "Authentication",
      code: `// OAuth, Email, Phone, SSO
const { user } = await hanzo.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password'
})

// Enterprise SSO
await hanzo.auth.signInWithSSO({
  provider: 'okta',
  domain: 'yourcompany.okta.com'
})

// JWT + RBAC built-in`,
    },
    database: {
      title: "PostgreSQL Database",
      code: `// Type-safe queries
const products = await hanzo
  .from('products')
  .select('id, name, price')
  .eq('category', 'electronics')
  .order('price', { ascending: true })

// Real-time subscriptions
hanzo.channel('products')
  .on('postgres_changes', { event: '*' },
    (payload) => updateUI(payload))
  .subscribe()`,
    },
    functions: {
      title: "Edge Functions",
      code: `// TypeScript/Deno powered
Deno.serve(async (req) => {
  const { email } = await req.json()

  // Send welcome email
  await hanzo.from('emails').insert({
    to: email,
    template: 'welcome'
  })

  return Response.json({ sent: true })
})`,
    },
    cli: {
      title: "Developer CLI",
      code: `# Initialize project
hanzo init my-app

# Local development
hanzo dev

# Database migrations
hanzo db migrate create add_users
hanzo db migrate up

# Deploy to production
hanzo deploy --prod`,
    },
  };

  const demo = demos[activeFeature];

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
            key={activeFeature}
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
            key={activeFeature}
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

const PlatformHero = () => {
  const [activeFeature, setActiveFeature] = useState("self-host");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx @hanzo/cli create my-app");
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
              Open Source • MIT Licensed • Self-Hostable
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="hz-t-3xl hz-w-medium hz-tracking-tight hz-mb-5"
            >
              <span className="hz-fg">Own your</span>
              <br />
              <span className="hz-fg-muted">entire stack.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6 hz-mw-md"
            >
              Open source Backend-as-a-Service with Auth, Database, Storage, and Functions.
              Self-host on your infrastructure or deploy to Hanzo Cloud. No vendor lock-in.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="hz-row hz-wrap hz-ai-center hz-gap-4 hz-mb-5"
            >
              <a
                href="https://github.com/hanzoai/platform"
                target="_blank"
                rel="noreferrer noopener"
                className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                >
                <Github className="hz-sq-2 hz-mr-2" />
                Star on GitHub
              </a>
              <a
                href="https://docs.hanzo.ai/platform"
                target="_blank"
                rel="noreferrer noopener"
                className="hz-btn hz-btn-ghost hz-transition hz-fg"
              >
                Documentation
              </a>
            </motion.div>

            {/* Install command */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="hz-mb-6"
            >
              <div className="hz-btn hz-gap-3">
                <code className="hz-t-sm hz-mono hz-fg-soft">npx @hanzo/cli create my-app</code>
                <button
                  onClick={handleCopy}
                  className="hz-fg-muted hz-transition hz-link"
                >
                  {copied ? <Check className="hz-sq-2 hz-fg-muted" /> : <Copy className="hz-sq-2" />}
                </button>
              </div>
            </motion.div>

            {/* Feature tabs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="hz-row hz-wrap hz-gap-2"
            >
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                const isActive = activeFeature === feature.id;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`hz-btn hz-btn-ghost hz-gap-2 hz-transition ${
                      isActive
                        ? "hz-bg-inverse hz-fg-inverse"
                        : "hz-bg-surface hz-bordered hz-fg-muted hz-link"
                    }`}
                  >
                    <Icon className="hz-sq-2" />
                    {feature.label}
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Feature Demo */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <FeatureDemo activeFeature={activeFeature} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlatformHero;
