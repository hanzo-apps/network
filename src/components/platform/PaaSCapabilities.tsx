import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  Zap,
  Database,
  Key,
  HardDrive,
  Activity,
  Webhook,
  Terminal,
  Server,
  Lock,
  Users,
  FileJson,
  Clock,
  ChevronRight,
} from "lucide-react";


interface Service {
  name: string;
  description: string;
  icon: React.ElementType;
  href?: string;
}

const CORE_SERVICES: Service[] = [
  {
    name: "Auth",
    description: "Authentication, SSO, OAuth, JWT, and user management out of the box",
    icon: Shield,
    href: "/identity",
  },
  {
    name: "Functions",
    description: "Serverless functions with automatic scaling and edge deployment",
    icon: Zap,
    href: "/functions",
  },
  {
    name: "Database",
    description: "PostgreSQL, vector search, and real-time subscriptions",
    icon: Database,
    href: "/datastore",
  },
  {
    name: "Storage",
    description: "S3-compatible object storage with CDN integration",
    icon: HardDrive,
  },
  {
    name: "Realtime",
    description: "WebSockets, presence, and live sync for collaborative apps",
    icon: Activity,
    href: "/realtime",
  },
  {
    name: "Secrets",
    description: "Encrypted secret management with versioning and rotation",
    icon: Key,
  },
];

const ADDITIONAL_SERVICES: Service[] = [
  {
    name: "API Gateway",
    description: "Rate limiting, caching, and request transformation",
    icon: Server,
  },
  {
    name: "Cron Jobs",
    description: "Scheduled tasks with monitoring and retry logic",
    icon: Clock,
  },
  {
    name: "Webhooks",
    description: "Event-driven integrations with external services",
    icon: Webhook,
  },
  {
    name: "IAM",
    description: "Fine-grained access control and policies",
    icon: Users,
  },
  {
    name: "Edge Config",
    description: "Global configuration with instant propagation",
    icon: FileJson,
  },
  {
    name: "Vault",
    description: "Hardware-backed encryption and key management",
    icon: Lock,
  },
];

const PaaSCapabilities = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <div
            className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-4 hz-bg-quiet hz-fg"
            >
            <Terminal className="hz-sq-2" />
            Platform-as-a-Service
          </div>
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Backend Services, Ready to Deploy
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-fg-muted">
            Everything you need to build production applications. Self-host on your infrastructure,
            or deploy to Hanzo Cloud with zero changes.
          </p>
        </motion.div>

        {/* Core services */}
        <div className="hz-mb-7">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-t-lg hz-w-semibold hz-fg hz-mb-5"
          >
            Core Services
          </motion.h3>
          <div className="hz-grid hz-grid-3 hz-gap-4">
            {CORE_SERVICES.map((service, index) => {
              const Icon = service.icon;
              const content = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`hz-card hz-transition ${
                    service.href ? "hz-pointer hz-hoverable" : ""
                  }`}
                >
                  <div className="hz-row hz-ai-start hz-gap-4">
                    <div
                      className="hz-sq-6 hz-r-lg hz-row hz-ai-center hz-jc-center hz-none hz-bg-quiet"
                      >
                      <Icon className="hz-sq-3 hz-fg" />
                    </div>
                    <div>
                      <h4 className="hz-fg hz-w-medium hz-mb-1">{service.name}</h4>
                      <p className="hz-t-sm hz-fg-muted">{service.description}</p>
                    </div>
                  </div>
                </motion.div>
              );

              return service.href ? (
                <Link key={service.name} to={service.href}>
                  {content}
                </Link>
              ) : (
                <div key={service.name}>{content}</div>
              );
            })}
          </div>
        </div>

        {/* Additional services */}
        <div className="hz-mb-7">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-t-lg hz-w-semibold hz-fg hz-mb-5"
          >
            Additional Services
          </motion.h3>
          <div className="hz-grid hz-grid-3 hz-gap-4">
            {ADDITIONAL_SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="hz-card"
                >
                  <div className="hz-row hz-ai-center hz-gap-3">
                    <Icon className="hz-sq-2 hz-fg-muted" />
                    <div>
                      <span className="hz-t-sm hz-w-medium hz-fg">{service.name}</span>
                      <span className="hz-t-xs hz-fg-muted hz-ml-2">{service.description}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CLI showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-bg-surface hz-bordered hz-r-lg hz-clip"
        >
          <div className="hz-row hz-ai-center hz-gap-3 hz-px-4 hz-py-3 hz-border-b">
            <div className="hz-row hz-gap-2">
              <div className="hz-sq-1 hz-r-full hz-bg-raised" />
              <div className="hz-sq-1 hz-r-full hz-bg-raised" />
              <div className="hz-sq-1 hz-r-full hz-bg-raised" />
            </div>
            <span className="hz-t-xs hz-fg-muted hz-mono">hanzo platform</span>
          </div>
          <div className="hz-p-5 hz-mono hz-t-sm">
            <div className="hz-stack-3">
              <div className="hz-fg-muted">
                <span className="hz-fg-muted">$</span> hanzo init my-app
              </div>
              <div className="hz-fg-muted">
                ✓ Created project configuration
              </div>
              <div className="hz-fg-muted">
                ✓ Initialized Auth, Database, Storage
              </div>
              <div className="hz-fg-muted">
                ✓ Generated TypeScript types
              </div>
              <div className="hz-mt-4 hz-fg-muted">
                <span className="hz-fg-muted">$</span> hanzo dev
              </div>
              <div className="hz-fg-muted">
                Starting local development server...
              </div>
              <div className="hz-row hz-ai-center hz-gap-2">
                <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                <span className="hz-fg-muted">
                  Platform running at http://localhost:8000
                </span>
              </div>
              <div className="hz-mt-4 hz-fg-muted">
                <span className="hz-fg-muted">$</span> hanzo deploy
              </div>
              <div className="hz-fg-muted">
                Deploying to production...
              </div>
              <div className="hz-row hz-ai-center hz-gap-2">
                <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                <span className="hz-fg-muted">
                  Live at https://my-app.hanzo.app
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-mt-7 hz-align-center"
        >
          <div className="hz-row hz-wrap hz-jc-center hz-gap-4">
            <a
              href="https://docs.hanzo.ai/platform/quickstart"
              target="_blank"
              rel="noreferrer noopener"
              className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
              >
              Get Started
              <ChevronRight className="hz-sq-2 hz-ml-2" />
            </a>
            <Link
              to="/cloud"
              className="hz-btn hz-btn-ghost hz-transition hz-fg"
            >
              Compare to Cloud
              <ChevronRight className="hz-sq-2 hz-ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaaSCapabilities;
