import { BRAND } from '@/lib/brand';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Database,
  Lock,
  Zap,
  Globe,
  HardDrive,
  Radio,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";


const FEATURES = [
  { id: "database", label: "Database", icon: Database },
  { id: "auth", label: "Auth", icon: Lock },
  { id: "functions", label: "Functions", icon: Zap },
  { id: "storage", label: "Storage", icon: HardDrive },
  { id: "realtime", label: "Realtime", icon: Radio },
];

const FeatureDemo = ({ activeTab }: { activeTab: string }) => {
  const demos: Record<string, { title: string; code: string }> = {
    database: {
      title: "PostgreSQL + pgvector",
      code: `const { data, error } = await hanzo
  .from('products')
  .select('*')
  .textSearch('name', 'coffee')
  .limit(10)

// Vector similarity search
const similar = await hanzo.rpc('match_documents', {
  query_embedding: embedding,
  match_threshold: 0.8
})`,
    },
    auth: {
      title: "Authentication",
      code: `// Sign up with email
const { user } = await hanzo.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password'
})

// OAuth providers
await hanzo.auth.signInWithOAuth({
  provider: 'github'
})`,
    },
    functions: {
      title: "Edge Functions",
      code: `// Deno-powered edge functions
Deno.serve(async (req) => {
  const { name } = await req.json()

  return new Response(
    JSON.stringify({ message: \`Hello \${name}!\` }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})`,
    },
    storage: {
      title: "Object Storage",
      code: `// Upload file
const { data } = await hanzo.storage
  .from('avatars')
  .upload('user-123/avatar.png', file)

// Get public URL
const { publicUrl } = hanzo.storage
  .from('avatars')
  .getPublicUrl('user-123/avatar.png')`,
    },
    realtime: {
      title: "Realtime Subscriptions",
      code: `// Subscribe to changes
const channel = hanzo
  .channel('room-1')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'messages' },
    (payload) => console.log(payload)
  )
  .subscribe()

// Broadcast presence
channel.track({ user: 'user-123', online: true })`,
    },
  };

  const demo = demos[activeTab];

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
            key={activeTab}
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
            key={activeTab}
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

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("database");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx hanzo init");
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
              Open Source • Self-Hostable • Scalable
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="hz-t-3xl hz-w-medium hz-tracking-tight hz-mb-5"
            >
              <span className="hz-fg">Backend for</span>
              <br />
              <span className="hz-fg-muted">modern apps.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6 hz-mw-md"
            >
              PostgreSQL database, authentication, edge functions, realtime subscriptions, and storage. Everything you need, nothing you don't.
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
                Start building
                <ArrowRight className="hz-sq-2 hz-ml-2" />
              </Link>
              <a
                href="https://docs.hanzo.ai/base"
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
                <code className="hz-t-sm hz-mono hz-fg-soft">npx hanzo init</code>
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
                const isActive = activeTab === feature.id;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveTab(feature.id)}
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

          {/* Right Column: Code Demo */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <FeatureDemo activeTab={activeTab} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
